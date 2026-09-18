// POST /api/bookings/:id/resend-sms — Resend confirmation SMS (with cooldown)

const { getDb } = require("../../lib/db");
const { sendCustomerSms } = require("../../lib/sms");
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

    if (!force) {
      const waitMinutes = checkCooldown(booking.lastSmsSent);
      if (waitMinutes > 0) {
        return tooManyRequests(res, `SMS was recently sent. Wait ${waitMinutes} minute(s).`);
      }
    }

    const sent = await sendCustomerSms(booking);
    if (!sent) return serverError(res, "Failed to send SMS — check Twilio configuration");

    await sql`UPDATE bookings SET last_sms_sent = ${new Date().toISOString()} WHERE id = ${id}`;

    return ok(res, { message: `SMS sent to ${booking.phone}`, booking_ref: booking.booking_ref });
  } catch (err) {
    return serverError(res, err.message);
  }
};
