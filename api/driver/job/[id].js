// GET /api/driver/job/:id?token=... — Fetch job details for a driver to review (token-gated, no admin auth)

const { getDb } = require("../../lib/db");
const { ok, badRequest, notFound, unauthorized, serverError, methodNotAllowed } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return methodNotAllowed(res, ["GET"]);

  const { id } = req.query;
  const { token } = req.query;
  if (!token) return badRequest(res, "token is required");

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (rows.length === 0) return notFound(res, "Job not found");

    const booking = rows[0];
    if (!booking.acceptance_token || booking.acceptance_token !== token) {
      return unauthorized(res, "Invalid or expired link");
    }

    return ok(res, {
      booking_ref: booking.booking_ref,
      date: booking.date,
      time: booking.time,
      pickup_address: booking.pickup_address,
      dropoff_address: booking.dropoff_address,
      passengers: booking.passengers,
      customer_name: booking.name,
      customer_phone: booking.phone,
      driver_payout: booking.driver_payout != null ? parseFloat(booking.driver_payout) : 0,
      driver_notes: booking.driver_notes,
      driver_accepted: booking.driver_accepted,
      flight_info: {
        departure_flight: booking.departure_flight_number,
        departure_time: booking.departure_time,
        arrival_flight: booking.arrival_flight_number,
        arrival_time: booking.arrival_time,
      },
    });
  } catch (err) {
    return serverError(res, err.message);
  }
};
