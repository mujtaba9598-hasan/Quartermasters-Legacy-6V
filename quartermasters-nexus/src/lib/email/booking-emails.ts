import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Quartermasters <hello@quartermasters.me>";
const INTERNAL_ADDRESS = "ceocli@quartermasters.me";
const BOOKING_URL = "https://quartermasters.me/booking";

interface BookingData {
  attendee_name: string;
  attendee_email: string;
  cal_event_type: string | null;
  start_time: string;
  end_time: string;
  attendee_timezone?: string | null;
  status?: string | null;
}

function formatDateTime(iso: string, timezone?: string | null): string {
  const date = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  };
  if (timezone) opts.timeZone = timezone;
  return date.toLocaleString("en-US", opts);
}

function emailWrapper(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#C15A2C;"></td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <h2 style="margin:0;color:#C15A2C;font-size:14px;text-transform:uppercase;letter-spacing:2px;">Quartermasters</h2>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <h1 style="margin:0 0 24px;color:#f0f0f0;font-size:22px;">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Quartermasters &mdash; Management &amp; Technology Consultancy</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendBookingConfirmation(booking: BookingData) {
  const dateStr = formatDateTime(booking.start_time, booking.attendee_timezone);
  const endStr = formatDateTime(booking.end_time, booking.attendee_timezone);

  const html = emailWrapper(
    "Your Consultation is Confirmed",
    `<p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Hi ${booking.attendee_name},
    </p>
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Your consultation has been confirmed. Here are the details:
    </p>
    <table style="width:100%;margin:20px 0;" cellpadding="8" cellspacing="0">
      <tr><td style="color:#9ca3af;width:120px;">Service</td><td style="color:#f0f0f0;font-weight:600;">${booking.cal_event_type || "Consultation"}</td></tr>
      <tr><td style="color:#9ca3af;">Start</td><td style="color:#f0f0f0;">${dateStr}</td></tr>
      <tr><td style="color:#9ca3af;">End</td><td style="color:#f0f0f0;">${endStr}</td></tr>
      ${booking.attendee_timezone ? `<tr><td style="color:#9ca3af;">Timezone</td><td style="color:#f0f0f0;">${booking.attendee_timezone}</td></tr>` : ""}
    </table>
    <p style="margin:28px 0;">
      <a href="${BOOKING_URL}" style="display:inline-block;padding:12px 28px;background:#C15A2C;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Manage Booking</a>
    </p>
    <p style="color:#9ca3af;font-size:14px;">We look forward to speaking with you.</p>`
  );

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: booking.attendee_email,
    subject: "Your consultation with Quartermasters is confirmed",
    html,
  });
}

export async function sendBookingCancellation(booking: BookingData) {
  const html = emailWrapper(
    "Consultation Cancelled",
    `<p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Hi ${booking.attendee_name},
    </p>
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Your consultation for <strong style="color:#f0f0f0;">${booking.cal_event_type || "Consultation"}</strong> has been cancelled.
    </p>
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      If this was a mistake or you'd like to reschedule, you can book a new time below.
    </p>
    <p style="margin:28px 0;">
      <a href="${BOOKING_URL}" style="display:inline-block;padding:12px 28px;background:#C15A2C;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Book Again</a>
    </p>`
  );

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: booking.attendee_email,
    subject: "Your Quartermasters consultation has been cancelled",
    html,
  });
}

export async function sendBookingReschedule(booking: BookingData) {
  const newDate = formatDateTime(booking.start_time, booking.attendee_timezone);
  const newEnd = formatDateTime(booking.end_time, booking.attendee_timezone);

  const html = emailWrapper(
    "Consultation Rescheduled",
    `<p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Hi ${booking.attendee_name},
    </p>
    <p style="color:#d1d5db;font-size:16px;line-height:1.6;">
      Your consultation has been rescheduled. Here are the updated details:
    </p>
    <table style="width:100%;margin:20px 0;" cellpadding="8" cellspacing="0">
      <tr><td style="color:#9ca3af;width:120px;">Service</td><td style="color:#f0f0f0;font-weight:600;">${booking.cal_event_type || "Consultation"}</td></tr>
      <tr><td style="color:#9ca3af;">New Start</td><td style="color:#f0f0f0;">${newDate}</td></tr>
      <tr><td style="color:#9ca3af;">New End</td><td style="color:#f0f0f0;">${newEnd}</td></tr>
    </table>
    <p style="margin:28px 0;">
      <a href="${BOOKING_URL}" style="display:inline-block;padding:12px 28px;background:#C15A2C;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Manage Booking</a>
    </p>`
  );

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: booking.attendee_email,
    subject: "Your Quartermasters consultation has been rescheduled",
    html,
  });
}

export async function sendInternalNotification(booking: BookingData) {
  const dateStr = formatDateTime(booking.start_time, booking.attendee_timezone);

  const html = emailWrapper(
    "New Booking Received",
    `<table style="width:100%;margin:12px 0;" cellpadding="8" cellspacing="0">
      <tr><td style="color:#9ca3af;width:120px;">Name</td><td style="color:#f0f0f0;font-weight:600;">${booking.attendee_name}</td></tr>
      <tr><td style="color:#9ca3af;">Email</td><td style="color:#f0f0f0;">${booking.attendee_email}</td></tr>
      <tr><td style="color:#9ca3af;">Service</td><td style="color:#f0f0f0;">${booking.cal_event_type || "Consultation"}</td></tr>
      <tr><td style="color:#9ca3af;">When</td><td style="color:#f0f0f0;">${dateStr}</td></tr>
      <tr><td style="color:#9ca3af;">Timezone</td><td style="color:#f0f0f0;">${booking.attendee_timezone || "Not specified"}</td></tr>
    </table>`
  );

  return resend.emails.send({
    from: FROM_ADDRESS,
    to: INTERNAL_ADDRESS,
    subject: `[New Booking] ${booking.attendee_name} — ${booking.cal_event_type || "Consultation"}`,
    html,
  });
}
