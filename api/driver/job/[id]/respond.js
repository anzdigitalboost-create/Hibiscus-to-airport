// POST /api/driver/job/:id/respond — Driver accepts or declines a job (token-gated, no admin auth)

const { getDb } = require("../../../lib/db");
const { sendDriverResponseAdminSms } = require("../../../lib/sms");
const { ok, badRequest, notFound, unauthorized, serverError, methodNotAllowed } = require("../../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const { id } = req.query;
  const { token, accepted, decline_reason } = req.body || {};

  if (!token) return badRequest(res, "token is required");
  if (typeof accepted !== "boolean") return badRequest(res, "accepted (boolean) is required");

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (rows.length === 0) return notFound(res, "Job not found");

    const booking = rows[0];
    if (!booking.acceptance_token || booking.acceptance_token !== token) {
      return unauthorized(res, "Invalid or expired link");
    }

    const now = new Date().toISOString();
    let updated;
    if (accepted) {
      updated = await sql`
        UPDATE bookings SET driver_accepted = TRUE, driver_accepted_at = ${now}, updated_at = ${now}
        WHERE id = ${id}
        RETURNING *
      `;
    } else {
      updated = await sql`
        UPDATE bookings SET driver_accepted = FALSE, driver_declined_at = ${now}, driver_decline_reason = ${decline_reason || ""}, updated_at = ${now}
        WHERE id = ${id}
        RETURNING *
      `;
    }

    try {
      await sendDriverResponseAdminSms(updated[0], booking.assigned_driver_name, accepted, decline_reason);
    } catch (e) {
      console.error("Admin driver-response SMS failed:", e.message);
    }

    return ok(res, { message: accepted ? "Job accepted" : "Job declined" });
  } catch (err) {
    return serverError(res, err.message);
  }
};
