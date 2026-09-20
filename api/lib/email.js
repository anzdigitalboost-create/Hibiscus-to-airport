// api/lib/email.js
// Resend HTTP API email sender for Vercel Serverless Functions
// Owner-approved provider (September 2026). DO NOT replace with Gmail API,
// SendGrid, Mailgun, or raw SMTP.

const { escapeHtml, formatDateWithDay } = require("./helpers");

const RESEND_API_URL = "https://api.resend.com/emails";
const SENDER_NAME = "Hibiscus to Airport";

/**
 * Send email via the Resend HTTP API.
 * Returns true on success, false on any failure (never throws).
 */
async function sendEmail(to, subject, htmlBody) {
  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL || "noreply@bookaride.co.nz";

  if (!apiKey) {
    console.error("Resend not configured (set RESEND_API_KEY)");
    return false;
  }
  if (!to || typeof to !== "string" || !to.includes("@")) {
    console.error("Email send skipped: invalid recipient");
    return false;
  }

  const payload = {
    from: `${SENDER_NAME} <${senderEmail}>`,
    to: [to],
    subject,
    html: `<html><body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">${htmlBody}</body></html>`,
  };

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) return true;

    const text = await response.text();
    console.error(`Resend error (${response.status}): ${text}`);
    return false;
  } catch (err) {
    console.error(`Email send error: ${err.message}`);
    return false;
  }
}

/**
 * Send customer booking confirmation email.
 * All user-provided fields are HTML-escaped.
 */
function sendCustomerConfirmation(booking) {
  const ref = escapeHtml(booking.booking_ref || booking.bookingRef || "N/A");
  const name = escapeHtml(booking.name);
  const pickup = escapeHtml(booking.pickupAddress);
  const dropoff = escapeHtml(booking.dropoffAddress);
  const formattedDate = formatDateWithDay(booking.date);
  const time = escapeHtml(booking.time);
  const passengers = escapeHtml(booking.passengers);
  const pricing = booking.pricing || {};
  const frontendUrl = process.env.FRONTEND_URL || "https://hibiscustoairport.co.nz";

  // Flight info (escaped)
  let flightSection = "";
  if (booking.departureFlightNumber || booking.departureTime || booking.arrivalFlightNumber || booking.arrivalTime) {
    const parts = [];
    if (booking.departureFlightNumber || booking.departureTime) {
      parts.push(`Departure: ${escapeHtml(booking.departureFlightNumber || "")} at ${escapeHtml(booking.departureTime || "")}`);
    }
    if (booking.arrivalFlightNumber || booking.arrivalTime) {
      parts.push(`Arrival: ${escapeHtml(booking.arrivalFlightNumber || "")} at ${escapeHtml(booking.arrivalTime || "")}`);
    }
    flightSection = `
      <div style="margin-bottom: 20px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 500;">FLIGHT INFORMATION</p>
        <p style="margin: 5px 0 0; color: #1f2937; font-size: 16px;">${parts.join(" | ")}</p>
      </div>`;
  }

  const subject = `Your Premium Transfer is Confirmed - ${ref}`;

  const body = `
    <div style="max-width: 650px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: white; padding: 40px 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">HIBISCUS TO AIRPORT</h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: #f59e0b; font-weight: 500;">PREMIUM TRANSPORTATION</p>
      </div>
      <div style="background: white; padding: 40px 30px;">
        <h2 style="margin: 0; color: #1f2937; font-size: 28px; text-align: center;">Dear ${name},</h2>
        <p style="text-align: center; color: #6b7280;">Your premium airport transfer has been confirmed.</p>
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 25px; border-radius: 12px; text-align: center; margin: 30px 0;">
          <h3 style="margin: 0 0 10px; font-size: 18px;">BOOKING CONFIRMATION</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold;">${ref}</p>
        </div>
        <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 4px solid #f59e0b;">
          <h3 style="margin: 0 0 20px; color: #f59e0b;">TRANSFER DETAILS</h3>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">PICKUP LOCATION</p>
            <p style="margin: 5px 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${pickup}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">DESTINATION</p>
            <p style="margin: 5px 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${dropoff}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">DATE &amp; TIME</p>
            <p style="margin: 5px 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${formattedDate} at ${time}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">PASSENGERS</p>
            <p style="margin: 5px 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">${passengers} guests</p>
          </div>
          ${flightSection}
        </div>
        <div style="background: white; border: 2px solid #f3f4f6; border-radius: 12px; padding: 30px; margin: 30px 0;">
          <h3 style="margin: 0 0 20px; color: #f59e0b;">INVESTMENT BREAKDOWN</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Distance (${pricing.distance || 0} km)</td><td style="padding: 8px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #f3f4f6;">$${(pricing.basePrice || 0).toFixed(2)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Airport Service Fee</td><td style="padding: 8px 0; text-align: right; font-weight: 600; border-bottom: 1px solid #f3f4f6;">$${(pricing.airportFee || 0).toFixed(2)}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280; border-bottom: 2px solid #f59e0b;">Additional Passengers</td><td style="padding: 8px 0; text-align: right; font-weight: 600; border-bottom: 2px solid #f59e0b;">$${(pricing.passengerFee || 0).toFixed(2)}</td></tr>
            <tr><td style="padding: 15px 0 0; color: #f59e0b; font-size: 18px; font-weight: bold;">TOTAL</td><td style="padding: 15px 0 0; text-align: right; color: #f59e0b; font-size: 20px; font-weight: bold;">$${(pricing.totalPrice || 0).toFixed(2)} NZD</td></tr>
          </table>
        </div>
        <div style="text-align: center; background: #f8fafc; border-radius: 12px; padding: 30px; margin: 30px 0;">
          <p style="margin: 10px 0; color: #6b7280;"><strong>Email:</strong> <span style="color: #f59e0b;">info@bookaride.co.nz</span></p>
          <p style="margin: 10px 0; color: #6b7280;"><strong>Phone:</strong> <span style="color: #f59e0b;">021 743 321</span></p>
          <p style="margin: 10px 0; color: #6b7280;"><strong>Track:</strong> <span style="color: #f59e0b;">${escapeHtml(frontendUrl)}/tracking/${ref}</span></p>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 30px 0 0;">This is an automated confirmation. Please keep for your records.</p>
      </div>
    </div>`;

  return sendEmail(booking.email, subject, body);
}

/**
 * Send admin notification email for new booking.
 */
function sendAdminNotification(booking) {
  const adminEmail = process.env.ADMIN_EMAIL || "bookings@bookaride.co.nz";
  const ref = escapeHtml(booking.booking_ref || booking.bookingRef || "N/A");
  const name = escapeHtml(booking.name);
  const phone = escapeHtml(booking.phone);
  const email = escapeHtml(booking.email);
  const pickup = escapeHtml(booking.pickupAddress);
  const dropoff = escapeHtml(booking.dropoffAddress);
  const formattedDate = formatDateWithDay(booking.date);
  const time = escapeHtml(booking.time);
  const passengers = escapeHtml(booking.passengers);
  const notes = escapeHtml(booking.notes || "");
  const pricing = booking.pricing || {};
  const totalPrice = pricing.totalPrice || booking.totalPrice || 0;

  const subject = `New Booking - ${ref}`;

  const body = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="color: #D4AF37;">New Booking Received</h2>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37;">
        <p><strong>Reference:</strong> <span style="font-size: 18px; color: #D4AF37;">${ref}</span></p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p><strong>Pickup:</strong> ${pickup}</p>
        <p><strong>Drop-off:</strong> ${dropoff}</p>
        <p><strong>Date/Time:</strong> ${formattedDate} at ${time}</p>
        <p><strong>Passengers:</strong> ${passengers}</p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p><strong>Total Price:</strong> <span style="font-size: 18px; color: green;">$${Number(totalPrice).toFixed(2)} NZD</span></p>
        <p><strong>Payment Status:</strong> ${escapeHtml(booking.payment_status || "pending")}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
      </div>
    </div>`;

  return sendEmail(adminEmail, subject, body);
}

/**
 * Send cancellation email to customer.
 */
function sendCancellationEmail(booking) {
  const ref = escapeHtml(booking.booking_ref || "N/A");
  const name = escapeHtml(booking.name);
  const pickup = escapeHtml(booking.pickupAddress);
  const dropoff = escapeHtml(booking.dropoffAddress);
  const formattedDate = formatDateWithDay(booking.date);
  const time = escapeHtml(booking.time);

  const subject = `Booking Cancelled - ${ref}`;

  const body = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #8B0000, #DC143C); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">Booking Cancelled</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Your booking with Hibiscus to Airport has been cancelled.</p>
        <div style="background: #ffe6e6; padding: 20px; border-radius: 8px; border-left: 4px solid #DC143C;">
          <p><strong>Booking Reference:</strong> <span style="color: #DC143C; font-size: 20px; font-weight: bold;">${ref}</span></p>
        </div>
        <table style="width: 100%; margin: 20px 0;">
          <tr><td style="padding: 10px 0; color: #666;"><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;"><strong>Pickup:</strong></td><td>${pickup}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;"><strong>Drop-off:</strong></td><td>${dropoff}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;"><strong>Date &amp; Time:</strong></td><td>${formattedDate} at ${time}</td></tr>
        </table>
        <p style="color: #666;">Contact us: 021 743 321 | info@bookaride.co.nz</p>
      </div>
    </div>`;

  return sendEmail(booking.email, subject, body);
}

/**
 * Send password reset email.
 */
function sendPasswordResetEmail(email, resetToken) {
  const frontendUrl = process.env.FRONTEND_URL || "https://hibiscustoairport.co.nz";
  const resetLink = `${frontendUrl}/admin/reset-password?token=${resetToken}`;

  const subject = "Password Reset - Hibiscus to Airport Admin";

  const body = `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', sans-serif;">
      <div style="background: linear-gradient(135deg, #1f2937, #111827); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">PASSWORD RESET</h1>
        <p style="margin: 8px 0 0; color: #f59e0b;">HIBISCUS TO AIRPORT ADMIN</p>
      </div>
      <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px;">
        <p>We received a request to reset your admin password.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${escapeHtml(resetLink)}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password</a>
        </div>
        <p style="font-size: 12px; color: #f59e0b; word-break: break-all; background: #f8fafc; padding: 15px; border-radius: 8px;">${escapeHtml(resetLink)}</p>
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">This link expires in <strong>1 hour</strong>. Ignore if you didn't request this.</p>
        </div>
      </div>
    </div>`;

  return sendEmail(email, subject, body);
}

/**
 * Send day-before reminder email.
 */
function sendReminderEmail(booking) {
  const ref = escapeHtml(booking.booking_ref);
  const name = escapeHtml(booking.name);
  const pickup = escapeHtml(booking.pickupAddress || booking.pickup_address || "");
  const dropoff = escapeHtml(booking.dropoffAddress || booking.dropoff_address || "");
  const formattedDate = formatDateWithDay(booking.date);
  const time = escapeHtml(booking.time);

  const subject = `Reminder: Your Airport Transfer Tomorrow - ${ref}`;

  const body = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #1f2937, #111827); color: #fff; padding: 30px; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 24px;">Transfer Reminder</h1>
        <p style="margin: 8px 0 0; color: #f59e0b;">Your transfer is tomorrow!</p>
      </div>
      <div style="background: #fff; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e5e7eb;">
        <p>Hi ${name},</p>
        <p>Just a friendly reminder that your airport transfer is scheduled for <strong>tomorrow</strong>.</p>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p><strong>Booking:</strong> ${ref}</p>
          <p><strong>Date &amp; Time:</strong> ${formattedDate} at ${time}</p>
          <p><strong>Pickup:</strong> ${pickup}</p>
          <p><strong>Drop-off:</strong> ${dropoff}</p>
        </div>
        <p>Questions? Contact us at 021 743 321 or info@bookaride.co.nz</p>
      </div>
    </div>`;

  return sendEmail(booking.email, subject, body);
}

module.exports = {
  sendEmail,
  sendCustomerConfirmation,
  sendAdminNotification,
  sendCancellationEmail,
  sendPasswordResetEmail,
  sendReminderEmail,
};
