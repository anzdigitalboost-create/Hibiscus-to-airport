// POST /api/bookings/:id/duplicate — Duplicate a booking (admin)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { ok, unauthorized, notFound, serverError, methodNotAllowed, uuid } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { ref: id } = req.query;

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (rows.length === 0) return notFound(res, "Booking not found");

    const original = rows[0];

    // Generate new booking ref (atomic)
    const lastRef = await sql`
      SELECT booking_ref FROM bookings
      WHERE booking_ref LIKE 'H%'
      ORDER BY CAST(SUBSTRING(booking_ref FROM 2) AS INTEGER) DESC
      LIMIT 1
    `;
    const nextNum = lastRef.length > 0 ? parseInt(lastRef[0].booking_ref.slice(1), 10) + 1 : 1;
    const newRef = `H${nextNum}`;
    const newId = uuid();
    const now = new Date().toISOString();

    await sql`
      INSERT INTO bookings (
        id, booking_ref, name, email, phone, pickup_address, dropoff_address,
        date, time, passengers, notes, pricing, total_price, status,
        payment_status, service_type, created_at
      ) VALUES (
        ${newId}, ${newRef}, ${original.name}, ${original.email}, ${original.phone},
        ${original.pickup_address}, ${original.dropoff_address},
        ${original.date}, ${original.time}, ${original.passengers},
        ${"Duplicated from " + original.booking_ref + ". " + (original.notes || "")},
        ${JSON.stringify(original.pricing)}, ${original.total_price},
        'pending', 'unpaid', ${original.service_type}, ${now}
      )
    `;

    return ok(res, {
      message: "Booking duplicated",
      original_ref: original.booking_ref,
      new_ref: newRef,
      new_id: newId,
    });
  } catch (err) {
    return serverError(res, err.message);
  }
};
