import nodemailer from "nodemailer";
import { getSettings } from "./settings";

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  const s = await getSettings();
  const host = s.smtpHost || process.env.SMTP_HOST;
  const port = Number(s.smtpPort || process.env.SMTP_PORT || 587);
  const user = s.smtpUser || process.env.SMTP_USER;
  const pass = s.smtpPass || process.env.SMTP_PASS;
  const from =
    s.smtpFrom || process.env.SMTP_FROM || "CompuBlue Website <no-reply@compublue.com>";
  const to =
    s.leadNotifyEmail || process.env.LEAD_NOTIFY_EMAIL || "contact@compublue.com";

  if (!host || !user) {
    console.warn("[mail] SMTP not configured - lead stored but email not sent.");
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const rows = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "-"],
    ["Company", lead.company || "-"],
    ["Service required", lead.service || "-"],
    ["Budget", lead.budget || "-"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px">${k}</td><td style="padding:6px 12px;font-size:14px"><strong>${escapeHtml(
          v as string
        )}</strong></td></tr>`
    )
    .join("");

  await transporter.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: `New enquiry from ${lead.name} — compublue.com`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px">
        <h2 style="color:#0f172a">New website enquiry</h2>
        <table style="border-collapse:collapse;width:100%">${rows}</table>
        <p style="padding:12px;background:#f1f5f9;border-radius:8px;font-size:14px;white-space:pre-wrap">${escapeHtml(
          lead.message
        )}</p>
        <p style="color:#94a3b8;font-size:12px">Sent automatically by the CompuBlue website. The lead is also stored in the admin dashboard.</p>
      </div>`,
  });
  return { sent: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
