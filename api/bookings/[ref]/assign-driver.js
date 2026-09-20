// POST /api/bookings/:ref/assign-driver — Assign a driver to a booking (admin only)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { sendDriverJobAlert } = require("../../lib/sms");
const { ok, badRequest, notFound, unauthorized, serverError, methodNotAllowed, rowToBooking, uuid } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { ref } = req.query;
  const { driver_id, driver_payout, notes_to_driver } = req.body || {};

  if (!driver_id) return badRequest(res, "driver_id is required");

  try {
    const sql = getDb();

    const bookingRows = await sql`SELECT * FROM bookings WHERE id = ${ref} OR booking_ref = ${ref}`;
    if (bookingRows.length === 0) return notFound(res, "Booking not found");

    const driverRows = await sql`SELECT * FROM drivers WHERE id = ${driver_id}`;
    if (driverRows.length === 0) return notFound(res, "Driver not found");

    const driver = driverRows[0];
    const bookingId = bookingRows[0].id;
    const payout = driver_payout != null && driver_payout !== "" ? parseFloat(driver_payout) : null;
    const acceptanceToken = uuid();
    const now = new Date().toISOString();

    const updated = await sql`
      UPDATE bookings SET
        assigned_driver_id = ${driver.id},
        assigned_driver_name = ${driver.name},
        driver_payout = ${payout},
        driver_notes = ${notes_to_driver || ""},
        acceptance_token = ${acceptanceToken},
        driver_accepted = NULL,
        driver_accepted_at = NULL,
        driver_declined_at = NULL,
        driver_decline_reason = NULL,
        driver_assigned_at = ${now},
        updated_at = ${now}
      WHERE id = ${bookingId}
      RETURNING *
    `;

    const booking = updated[0];

    try {
      await sendDriverJobAlert(driver, booking, acceptanceToken);
    } catch (e) {
      console.error("Driver job alert SMS failed:", e.message);
    }

    return ok(res, { message: "Driver assigned", booking: rowToBooking(booking) });
  } catch (err) {
    return serverError(res, err.message);
  }
};
