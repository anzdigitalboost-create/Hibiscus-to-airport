// POST /api/bookings/:id/cancel — Cancel a booking (admin only)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { sendCancellationEmail } = require("../../lib/email");
const { sendCancellationSms } = require("../../lib/sms");
const { ok, notFound, unauthorized, serverError, methodNotAllowed, rowToBooking } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { ref: id } = req.query;

  try {
    const sql = getDb();

    const rows = await sql`SELECT * FROM bookings WHERE id = ${id} OR booking_ref = ${id}`;
    if (rows.length === 0) return notFound(res, "Booking not found");

    const booking = rowToBooking(rows[0]);

    await sql`
      UPDATE bookings
      SET status = 'cancelled', updated_at = ${new Date().toISOString()}
      WHERE id = ${rows[0].id}
    `;

    // Send cancellation notifications
    try { await sendCancellationEmail(booking); } catch (e) { console.error("Cancel email failed:", e.message); }
    try { await sendCancellationSms(booking); } catch (e) { console.error("Cancel SMS failed:", e.message); }

    return ok(res, { message: "Booking cancelled", booking_ref: booking.booking_ref });
  } catch (err) {
    return serverError(res, err.message);
  }
};
