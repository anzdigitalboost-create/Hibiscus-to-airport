// POST /api/bookings/:id/update-status — Update booking status (admin)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { sendCustomerConfirmation } = require("../../lib/email");
const { sendCustomerSms } = require("../../lib/sms");
const { ok, badRequest, unauthorized, notFound, serverError, methodNotAllowed, rowToBooking } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { ref: id } = req.query;
  const { status, payment_status } = req.body || {};

  if (!status && !payment_status) {
    return badRequest(res, "Provide status and/or payment_status");
  }

  const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled", "no_show"];
  const VALID_PAYMENT_STATUSES = ["unpaid", "paid", "pay_on_day", "refunded", "failed"];
  if (status && !VALID_STATUSES.includes(status)) {
    return badRequest(res, `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`);
  }
  if (payment_status && !VALID_PAYMENT_STATUSES.includes(payment_status)) {
    return badRequest(res, `Invalid payment_status. Must be one of: ${VALID_PAYMENT_STATUSES.join(", ")}`);
  }

  try {
    const sql = getDb();
    const now = new Date().toISOString();

    // Build update
    if (status && payment_status) {
      await sql`UPDATE bookings SET status = ${status}, payment_status = ${payment_status}, updated_at = ${now} WHERE id = ${id}`;
    } else if (status) {
      await sql`UPDATE bookings SET status = ${status}, updated_at = ${now} WHERE id = ${id}`;
    } else {
      await sql`UPDATE bookings SET payment_status = ${payment_status}, updated_at = ${now} WHERE id = ${id}`;
    }

    const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (rows.length === 0) return notFound(res, "Booking not found");

    const booking = rowToBooking(rows[0]);

    // If just confirmed+paid, send customer notifications
    if (status === "confirmed" && (payment_status === "paid" || booking.payment_status === "paid")) {
      try { await sendCustomerConfirmation(booking); } catch (e) { console.error("Customer email failed:", e.message); }
      try { await sendCustomerSms(booking); } catch (e) { console.error("Customer SMS failed:", e.message); }
    }

    return ok(res, { message: "Status updated", booking });
  } catch (err) {
    return serverError(res, err.message);
  }
};
