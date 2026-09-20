// PUT /api/drivers/:id — Update a driver (admin)
// DELETE /api/drivers/:id — Remove a driver (admin)

const { getDb } = require("../lib/db");
const { authenticateRequest } = require("../lib/auth");
const { ok, badRequest, notFound, unauthorized, serverError, methodNotAllowed } = require("../lib/helpers");

module.exports = async function handler(req, res) {
  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const { id } = req.query;

  if (req.method === "PUT") return updateDriver(req, res, id);
  if (req.method === "DELETE") return deleteDriver(req, res, id);
  return methodNotAllowed(res, ["PUT", "DELETE"]);
};

async function updateDriver(req, res, id) {
  const { name, phone, email, vehicle, license, active } = req.body || {};
  if (!name || !phone || !email) return badRequest(res, "name, phone, and email are required");

  try {
    const sql = getDb();
    const now = new Date().toISOString();

    const updated = await sql`
      UPDATE drivers SET
        name = ${name}, phone = ${phone}, email = ${email},
        vehicle = ${vehicle || ""}, license = ${license || ""},
        active = ${active !== undefined ? active : true},
        updated_at = ${now}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updated.length === 0) return notFound(res, "Driver not found");

    return ok(res, { message: "Driver updated", driver: updated[0] });
  } catch (err) {
    return serverError(res, err.message);
  }
}

async function deleteDriver(req, res, id) {
  try {
    const sql = getDb();
    const deleted = await sql`DELETE FROM drivers WHERE id = ${id} RETURNING id`;
    if (deleted.length === 0) return notFound(res, "Driver not found");

    return ok(res, { message: "Driver deleted" });
  } catch (err) {
    return serverError(res, err.message);
  }
}
