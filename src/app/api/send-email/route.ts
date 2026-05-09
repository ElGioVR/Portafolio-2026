import { NextResponse } from "next/server";
import { format, toZonedTime } from "date-fns-tz";
import React from "react";
import { render } from "@react-email/render";
import ContactConfirmationEmail from "@/app/components/template/contactConfirmationEmail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const palette = {
  bg: "#070908",
  panel: "#131816",
  panelStrong: "#171d1b",
  text: "#f3f7f4",
  muted: "#a8b5af",
  line: "rgba(243, 247, 244, 0.14)",
  accent: "#39d5bf",
  accent2: "#ff8f70",
  accent3: "#8f9cff",
};

const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const sender = `Gio Form <${senderEmail}>`;

async function createResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return null;
  }

  const { Resend } = await import("resend");
  return new Resend(resendApiKey);
}

async function sendEmail(
  resend: Awaited<ReturnType<typeof createResendClient>>,
  payload: Parameters<NonNullable<typeof resend>["emails"]["send"]>[0],
  label: string
) {
  if (!resend) {
    throw new Error("Missing Resend client");
  }

  const result = await resend.emails.send(payload);

  if (result.error) {
    console.error(`${label} failed:`, result.error);
    throw new Error(`${label} failed: ${result.error.message}`);
  }

  return result;
}

function isTestingSenderBlocked(error: unknown) {
  return (
    error instanceof Error &&
    error.message.includes("You can only send testing emails")
  );
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function emailLayout({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return `
    <div style="margin:0;padding:32px 16px;background:${palette.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${palette.text};">
      <div style="max-width:640px;margin:0 auto;overflow:hidden;border-radius:24px;background:${palette.panel};border:1px solid ${palette.line};box-shadow:0 24px 70px rgba(0,0,0,0.35);">
        <div style="padding:34px 30px;background:linear-gradient(135deg,rgba(57,213,191,0.24),rgba(255,143,112,0.16) 52%,rgba(143,156,255,0.18));border-bottom:1px solid ${palette.line};">
          <p style="margin:0 0 10px;color:${palette.accent};font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
          <h1 style="margin:0;color:${palette.text};font-size:32px;line-height:1.08;font-weight:800;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:30px;">
          ${body}
          <div style="margin-top:26px;padding-top:18px;border-top:1px solid ${palette.line};color:${palette.muted};font-size:12px;text-align:center;">
            Enviado automaticamente desde codebygio.pro
          </div>
        </div>
      </div>
    </div>
  `;
}

function fieldRow(label: string, value: unknown) {
  return `
    <tr>
      <td style="padding:12px 0;color:${palette.muted};font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 0;color:${palette.text};font-size:14px;font-weight:700;text-align:right;vertical-align:top;">${escapeHtml(value || "-")}</td>
    </tr>
  `;
}

function buildVisitEmail(visitData: Record<string, unknown>) {
  const body = `
    <h2 style="margin:0 0 16px;color:${palette.text};font-size:20px;">Detalles de la visita</h2>
    <table style="width:100%;border-collapse:collapse;border-top:1px solid ${palette.line};border-bottom:1px solid ${palette.line};">
      ${fieldRow("Hora (Tijuana)", visitData.tijuana_time)}
      ${fieldRow("Timestamp", visitData.timestamp)}
      ${fieldRow(
        "Ubicacion",
        `${visitData.city || "Desconocida"}, ${visitData.state || ""} ${visitData.country || ""}`
      )}
      ${fieldRow("Lat/Lon", `${visitData.lat || "n/a"}, ${visitData.lon || "n/a"}`)}
      ${fieldRow("Fuente", visitData.location_source)}
    </table>
    <div style="margin-top:18px;padding:16px;border-radius:16px;background:${palette.panelStrong};border:1px solid rgba(57,213,191,0.26);">
      <p style="margin:0 0 8px;color:${palette.accent};font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">User agent</p>
      <p style="margin:0;color:${palette.muted};font-size:13px;line-height:1.6;word-break:break-word;">${escapeHtml(visitData.userAgent || "-")}</p>
    </div>
  `;

  return emailLayout({
    eyebrow: "Portfolio analytics",
    title: "Nueva visita recibida",
    body,
  });
}

function buildAdminEmail({
  name,
  email,
  message,
  budget,
}: {
  name: string;
  email: string;
  message: string;
  budget: string;
}) {
  const safeEmail = escapeHtml(email);
  const body = `
    <table style="width:100%;border-collapse:collapse;border-top:1px solid ${palette.line};border-bottom:1px solid ${palette.line};">
      ${fieldRow("Nombre", name)}
      <tr>
        <td style="padding:12px 0;color:${palette.muted};font-size:14px;vertical-align:top;">Email</td>
        <td style="padding:12px 0;text-align:right;vertical-align:top;">
          <a href="mailto:${safeEmail}" style="color:${palette.accent};font-size:14px;font-weight:800;text-decoration:none;">${safeEmail}</a>
        </td>
      </tr>
      ${fieldRow("Presupuesto", budget)}
    </table>
    <div style="margin-top:18px;padding:18px;border-radius:16px;background:${palette.panelStrong};border:1px solid rgba(57,213,191,0.26);box-shadow:inset 4px 0 0 ${palette.accent};">
      <p style="margin:0 0 8px;color:${palette.text};font-size:14px;font-weight:800;">Mensaje</p>
      <p style="margin:0;color:${palette.text};font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  return emailLayout({
    eyebrow: "Nueva oportunidad",
    title: "Nueva solicitud de cotizacion",
    body,
  });
}

function getContactLanguage(lang: unknown): "es" | "en" {
  return String(lang).toLowerCase().startsWith("es") ? "es" : "en";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, message, budget, lang, visit } = body;

    const resend = await createResendClient();

    if (!resend) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    let visitEmail = {};
    let adminEmail = {};
    let confirmationEmail = {};

    const tz = "America/Tijuana";
    const date = visit?.timestamp ? new Date(visit.timestamp) : new Date();

    const tijuanaTime = format(toZonedTime(date, tz), "yyyy-MM-dd HH:mm:ss", {
      timeZone: tz,
    });

    const visitData = {
      ...visit,
      tijuana_time: tijuanaTime,
    };

    if (visit) {
      visitEmail = await sendEmail(resend, {
        from: sender,
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `Nueva visita - ${visitData.city || "Ubicacion desconocida"}`,
        html: buildVisitEmail(visitData),
      }, "Visit email");
    }

    const contactLanguage = getContactLanguage(lang);

    if (name && email) {
      const confirmationHtml = await render(
        React.createElement(ContactConfirmationEmail, {
          name,
          language: contactLanguage,
        })
      );

      confirmationEmail = await sendEmail(resend, {
        from: sender,
        to: [email],
        subject:
          contactLanguage === "es" ? "Solicitud recibida" : "Request received",
        html: confirmationHtml,
      }, "Contact confirmation email");
    }

    if (name && email && message && budget) {
      adminEmail = await sendEmail(resend, {
        from: sender,
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `Nueva solicitud de cotizacion de ${name}`,
        replyTo: email,
        html: buildAdminEmail({ name, email, message, budget }),
      }, "Admin quote email");
    }

    return NextResponse.json({
      success: true,
      adminEmail,
      confirmationEmail,
      visitEmail,
    });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    const blockedByTestingMode = isTestingSenderBlocked(error);

    return NextResponse.json(
      {
        success: false,
        code: blockedByTestingMode
          ? "RESEND_DOMAIN_NOT_VERIFIED"
          : "EMAIL_SEND_FAILED",
        error:
          error instanceof Error ? error.message : "Unable to send email",
        message: blockedByTestingMode
          ? "Resend is in testing mode. Verify a domain and set RESEND_FROM_EMAIL to send confirmations to external email addresses."
          : "Unable to send email",
      },
      { status: blockedByTestingMode ? 409 : 502 }
    );
  }
}
