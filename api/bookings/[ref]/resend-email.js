// POST /api/bookings/:id/resend-email — Resend confirmation email (with cooldown)

const { getDb } = require("../../lib/db");
const { sendCustomerConfirmation } = require("../../lib/email");
const { ok, notFound, tooManyRequests, serverError, methodNotAllowed, rowToBooking, checkCooldown } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const { ref: id } = req.query;
  const force = req.query.force === "true";

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (rows.length === 0) return notFound(res, "Booking not found");

    const booking = rowToBooking(rows[0]);

    // Check cooldown (5 min) unless forced
    if (!force) {
      const waitMinutes = checkCooldown(booking.lastEmailSent);
      if (waitMinutes > 0) {
        return tooManyRequests(res, `Email was recently sent. Wait ${waitMinutes} minute(s).`);
      }
    }

    const sent = await sendCustomerConfirmation(booking);
    if (!sent) return serverError(res, "Failed to send email — check Mailgun configuration");

    await sql`UPDATE bookings SET last_email_sent = ${new Date().toISOString()} WHERE id = ${id}`;

    return ok(res, { message: `Email sent to ${booking.email}`, booking_ref: booking.booking_ref });
  } catch (err) {
    return serverError(res, err.message);
  }
};
