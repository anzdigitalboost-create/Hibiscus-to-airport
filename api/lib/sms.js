// api/lib/sms.js
// Twilio SMS sender for Vercel Serverless Functions

const { escapeHtml, formatDateNz, formatDateWithDay } = require("./helpers");

/**
 * Send SMS via Twilio REST API (no SDK needed — direct HTTP).
 * Lighter than the full Twilio SDK for serverless.
 */
async function sendSms(toPhone, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromPhone) {
    console.error("Twilio not configured (set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER)");
    return false;
  }

  const formData = new URLSearchParams();
  formData.append("To", toPhone);
  formData.append("From", fromPhone);
  formData.append("Body", message);

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    if (response.ok) {
      console.log(`SMS sent to ${toPhone}`);
      return true;
    }
    const text = await response.text();
    console.error(`Twilio error (${response.status}): ${text}`);
    return false;
  } catch (err) {
    console.error(`SMS send error: ${err.message}`);
    return false;
  }
}

/**
 * Send customer booking confirmation SMS.
 */
function sendCustomerSms(booking) {
  const ref = booking.booking_ref || booking.bookingRef || "N/A";
  const formattedDate = formatDateWithDay(booking.date);
  const totalPrice = booking.pricing?.totalPrice || booking.totalPrice || 0;

  const message = `HIBISCUS TO AIRPORT\nTransfer CONFIRMED\n\nRef: ${ref}\n${formattedDate}, ${booking.time}\n${(booking.pickupAddress || "").slice(0, 50)} to ${(booking.dropoffAddress || "").slice(0, 50)}\n${booking.passengers} passengers | $${Number(totalPrice).toFixed(2)}\n\nQuestions? 021 743 321\nhibiscustoairport.co.nz`;

  return sendSms(booking.phone, message);
}

/**
 * Send admin SMS notification for new booking.
 */
function sendAdminSmsNotification(booking) {
  const adminPhone = process.env.ADMIN_PHONE;
  if (!adminPhone) {
    console.warn("ADMIN_PHONE not set — skipping admin SMS");
    return Promise.resolve(false);
  }

  const ref = booking.booking_ref || booking.bookingRef || "N/A";
  const formattedDate = formatDateNz(booking.date);
  const total = booking.pricing?.totalPrice || booking.totalPrice || 0;

  const pickupRaw = booking.pickupAddress || booking.pickup_address || "";
  const dropoffRaw = booking.dropoffAddress || booking.dropoff_address || "";
  const pickupStr = pickupRaw.length > 40 ? pickupRaw.slice(0, 40) + "..." : pickupRaw;
  const dropoffStr = dropoffRaw.length > 40 ? dropoffRaw.slice(0, 40) + "..." : dropoffRaw;
  const message = `NEW BOOKING!\n\nRef: ${ref}\n${booking.name}\n${formattedDate} at ${booking.time}\n${booking.passengers} pax | $${Number(total).toFixed(2)}\n\nFrom: ${pickupStr}\nTo: ${dropoffStr}\n\nLogin to admin to manage.`;

  return sendSms(adminPhone, message);
}

/**
 * Send cancellation SMS to customer.
 */
function sendCancellationSms(booking) {
  const ref = booking.booking_ref || "N/A";
  const formattedDate = formatDateNz(booking.date);

  const message = `Hibiscus to Airport - Booking Cancelled\nRef: ${ref}\nDate: ${formattedDate} at ${booking.time}\n\nYour booking has been cancelled. Contact us: 021 743 321`;

  return sendSms(booking.phone, message);
}

/**
 * Send day-before reminder SMS.
 */
function sendReminderSms(booking) {
  const ref = booking.booking_ref;
  const formattedDate = formatDateNz(booking.date);

  const pickup = booking.pickupAddress || booking.pickup_address || "";
  const message = `REMINDER: Your airport transfer is tomorrow!\nRef: ${ref}\nPickup: ${formattedDate} at ${booking.time}\nFrom: ${pickup.slice(0, 50)}\nBe ready 5-10 mins early. Questions? 021 743 321`;

  return sendSms(booking.phone, message);
}

/**
 * Send job dispatch SMS to a driver, with a link to accept/decline.
 */
function sendDriverJobAlert(driver, booking, token) {
  const frontendUrl = process.env.FRONTEND_URL || "https://hibiscustoairport.co.nz";
  const ref = booking.booking_ref || "N/A";
  const formattedDate = formatDateNz(booking.date);
  const payout = booking.driver_payout != null ? Number(booking.driver_payout).toFixed(2) : "0.00";
  const pickup = (booking.pickup_address || "").slice(0, 60);
  const link = `${frontendUrl}/driver/job/${booking.id}?token=${token}`;

  const message = `NEW JOB - Hibiscus to Airport\nRef: ${ref}\n${formattedDate} at ${booking.time}\nPickup: ${pickup}\nPayout: $${payout}\n\nAccept/decline: ${link}`;

  return sendSms(driver.phone, message);
}

/**
 * Notify admin that a driver accepted or declined a job.
 */
function sendDriverResponseAdminSms(booking, driverName, accepted, declineReason) {
  const adminPhone = process.env.ADMIN_PHONE;
  if (!adminPhone) return Promise.resolve(false);

  const ref = booking.booking_ref || "N/A";
  const message = accepted
    ? `DRIVER ACCEPTED\nRef: ${ref}\nDriver: ${driverName}\n${formatDateNz(booking.date)} at ${booking.time}`
    : `DRIVER DECLINED\nRef: ${ref}\nDriver: ${driverName}\nReason: ${declineReason || "No reason given"}\n\nPlease reassign this job.`;

  return sendSms(adminPhone, message);
}

/**
 * Send urgent booking alert SMS to admin.
 */
function sendUrgentAdminSms(booking, hoursUntil) {
  const adminPhone = process.env.ADMIN_PHONE;
  if (!adminPhone) return Promise.resolve(false);

  const ref = booking.booking_ref || booking.bookingRef || "N/A";
  const formattedDate = formatDateNz(booking.date);
  const total = booking.pricing?.totalPrice || booking.totalPrice || 0;

  const message = `URGENT BOOKING!\n\nONLY ${Math.floor(hoursUntil)}hrs NOTICE!\n\nRef: ${ref}\n${booking.name}\n${booking.phone}\n\n${formattedDate} at ${booking.time}\n${booking.passengers} pax | $${Number(total).toFixed(2)}\n\nACTION REQUIRED NOW!`;

  return sendSms(adminPhone, message);
}

module.exports = {
  sendSms,
  sendCustomerSms,
  sendAdminSmsNotification,
  sendCancellationSms,
  sendReminderSms,
  sendUrgentAdminSms,
  sendDriverJobAlert,
  sendDriverResponseAdminSms,
};
