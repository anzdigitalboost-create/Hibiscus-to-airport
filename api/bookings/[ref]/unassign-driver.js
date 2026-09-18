// POST /api/bookings/:ref/unassign-driver — Remove the assigned driver from a booking (admin only)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { ok, notFound, unauthorized, serverError, methodNotAllowed, rowToBooking } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { ref } = req.query;

  try {
    const sql = getDb();
    const now = new Date().toISOString();

    const updated = await sql`
      UPDATE bookings SET
        assigned_driver_id = NULL,
        assigned_driver_name = NULL,
        driver_payout = NULL,
        driver_notes = NULL,
        acceptance_token = NULL,
        driver_accepted = NULL,
        driver_accepted_at = NULL,
        driver_declined_at = NULL,
        driver_decline_reason = NULL,
        driver_assigned_at = NULL,
        updated_at = ${now}
      WHERE id = ${ref} OR booking_ref = ${ref}
      RETURNING *
    `;

    if (updated.length === 0) return notFound(res, "Booking not found");

    return ok(res, { message: "Driver unassigned", booking: rowToBooking(updated[0]) });
  } catch (err) {
    return serverError(res, err.message);
  }
};
