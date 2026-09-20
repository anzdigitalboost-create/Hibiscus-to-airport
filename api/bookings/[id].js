// GET /api/bookings/:id — Fetch booking by reference or ID
// PUT /api/bookings/:id — Update booking (admin)
// DELETE /api/bookings/:id — Soft-delete booking (admin)

const { getDb } = require("../lib/db");
const { authenticateRequest } = require("../lib/auth");
const {
  ok, badRequest, unauthorized, notFound, serverError, methodNotAllowed,
  rowToBooking,
} = require("../lib/helpers");

module.exports = async function handler(req, res) {
  // Segment is named [id] to match api/bookings/[id]/* (Vercel requires one name per level).
  // The value may be a booking_ref (e.g. H123) or a UUID; lookups try both.
  const { id: ref } = req.query;

  if (req.method === "GET") return getBooking(req, res, ref);
  if (req.method === "PUT") return updateBooking(req, res, ref);
  if (req.method === "DELETE") return deleteBooking(req, res, ref);
  return methodNotAllowed(res, ["GET", "PUT", "DELETE"]);
};

async function getBooking(req, res, ref) {
  try {
    const sql = getDb();

    // Try by booking_ref first, then by id
    let rows = await sql`SELECT * FROM bookings WHERE booking_ref = ${ref}`;
    if (rows.length === 0) {
      rows = await sql`SELECT * FROM bookings WHERE id = ${ref}`;
    }
    if (rows.length === 0) {
      return notFound(res, "Booking not found");
    }

    return ok(res, { booking: rowToBooking(rows[0]) });
  } catch (err) {
    return serverError(res, err.message);
  }
}

async function updateBooking(req, res, ref) {
  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  try {
    const sql = getDb();
    const updates = req.body || {};

    // Map camelCase to snake_case
    const fieldMap = {
      name: "name", email: "email", phone: "phone",
      pickupAddress: "pickup_address", dropoffAddress: "dropoff_address",
      date: "date", time: "time", passengers: "passengers",
      notes: "notes", totalPrice: "total_price",
      status: "status", payment_status: "payment_status",
      assignedDriverId: "assigned_driver_id", assignedDriverName: "assigned_driver_name",
      driverPayout: "driver_payout", driverNotes: "driver_notes",
      trackingStatus: "tracking_status", paymentMethod: "payment_method",
    };

    const setClauses = [];
    const values = [];
    let paramIdx = 1;

    for (const [camel, snake] of Object.entries(fieldMap)) {
      if (updates[camel] !== undefined) {
        setClauses.push(`${snake} = $${paramIdx}`);
        values.push(updates[camel]);
        paramIdx++;
      }
    }

    if (setClauses.length === 0) {
      return badRequest(res, "No fields to update");
    }

    // Add updated_at
    setClauses.push(`updated_at = $${paramIdx}`);
    values.push(new Date().toISOString());
    paramIdx++;

    // Where clause
    values.push(ref);
    const query = `UPDATE bookings SET ${setClauses.join(", ")} WHERE (booking_ref = $${paramIdx} OR id = $${paramIdx}) RETURNING *`;

    // Use raw query for dynamic SET
    const { neon } = require("@neondatabase/serverless");
    const sqlRaw = neon(process.env.DATABASE_URL);
    const result = await sqlRaw(query, values);

    if (result.length === 0) {
      return notFound(res, "Booking not found");
    }

    return ok(res, { message: "Booking updated", booking: rowToBooking(result[0]) });
  } catch (err) {
    return serverError(res, err.message);
  }
}

async function deleteBooking(req, res, ref) {
  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  try {
    const sql = getDb();

    // Fetch booking first
    let rows = await sql`SELECT * FROM bookings WHERE booking_ref = ${ref} OR id = ${ref}`;
    if (rows.length === 0) {
      return notFound(res, "Booking not found");
    }

    const booking = rows[0];

    // Soft delete — move to deleted_bookings
    await sql`
      INSERT INTO deleted_bookings (
        id, booking_ref, name, email, phone, pickup_address, dropoff_address,
        date, time, passengers, notes, service_type, pricing, total_price,
        status, payment_status, tracking_id, assigned_driver_name,
        created_at, updated_at, deleted_at, deleted_by, booking_data
      ) VALUES (
        ${booking.id}, ${booking.booking_ref}, ${booking.name}, ${booking.email},
        ${booking.phone}, ${booking.pickup_address}, ${booking.dropoff_address},
        ${booking.date}, ${booking.time}, ${booking.passengers}, ${booking.notes},
        ${booking.service_type}, ${JSON.stringify(booking.pricing)}, ${booking.total_price},
        ${booking.status}, ${booking.payment_status}, ${booking.tracking_id},
        ${booking.assigned_driver_name}, ${booking.created_at}, ${booking.updated_at},
        ${new Date().toISOString()}, ${user.sub || "admin"}, ${JSON.stringify(booking)}
      )
    `;

    // Delete from bookings
    await sql`DELETE FROM bookings WHERE id = ${booking.id}`;

    return ok(res, { message: "Booking deleted", booking_ref: booking.booking_ref });
  } catch (err) {
    return serverError(res, err.message);
  }
}
