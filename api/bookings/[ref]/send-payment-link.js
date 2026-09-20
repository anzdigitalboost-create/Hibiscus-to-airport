// POST /api/bookings/:ref/send-payment-link — Create a Stripe payment link and email/SMS it to the customer (admin only)

const { getDb } = require("../../lib/db");
const { authenticateRequest } = require("../../lib/auth");
const { sendPaymentLinkEmail } = require("../../lib/email");
const { sendSms } = require("../../lib/sms");
const { ok, badRequest, notFound, unauthorized, serverError, methodNotAllowed, formatDateWithDay } = require("../../lib/helpers");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

  const user = authenticateRequest(req);
  if (!user) return unauthorized(res);

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return serverError(res, "Stripe not configured");

  const { ref } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || "https://hibiscustoairport.co.nz";

  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM bookings WHERE id = ${ref} OR booking_ref = ${ref}`;
    if (rows.length === 0) return notFound(res, "Booking not found");

    const booking = rows[0];
    if (booking.payment_status === "paid") {
      return badRequest(res, "This booking has already been paid");
    }

    const totalPrice = parseFloat(booking.total_price) || 0;
    if (totalPrice <= 0) return badRequest(res, "Invalid booking price");

    const stripe = require("stripe")(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: `Airport Transfer - ${booking.booking_ref}`,
              description: `${booking.pickup_address} to ${booking.dropoff_address}`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontendUrl}/payment/success?booking_ref=${booking.booking_ref}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/payment/cancel?booking_ref=${booking.booking_ref}`,
      metadata: {
        booking_id: booking.id,
        booking_ref: booking.booking_ref,
      },
    });

    const now = new Date().toISOString();
    await sql`UPDATE bookings SET payment_link_sent = ${now} WHERE id = ${booking.id}`;

    const emailSent = await sendPaymentLinkEmail(booking, session.url);

    try {
      const formattedDate = formatDateWithDay(booking.date);
      await sendSms(
        booking.phone,
        `Hibiscus to Airport\nPayment required for ${booking.booking_ref}\n${formattedDate} at ${booking.time}\n$${totalPrice.toFixed(2)} NZD\n\nPay here: ${session.url}`
      );
    } catch (e) {
      console.error("Payment link SMS failed:", e.message);
    }

    if (!emailSent) {
      return ok(res, { message: "Payment link created but email failed to send — check Mailgun configuration", url: session.url });
    }

    return ok(res, { message: `Payment link sent to ${booking.email}`, url: session.url });
  } catch (err) {
    return serverError(res, err.message);
  }
};
