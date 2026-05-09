import { NextResponse } from "next/server";
import { format, toZonedTime } from "date-fns-tz";

// 🔥 Evita que Next intente ejecutar esto en build
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function createResendClient() {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return null;
  }

  const { Resend } = await import("resend");
  return new Resend(resendApiKey);
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

    const tz = "America/Tijuana";
    const date = visit?.timestamp ? new Date(visit.timestamp) : new Date();

    const tijuanaTime = format(
      toZonedTime(date, tz),
      "yyyy-MM-dd HH:mm:ss",
      { timeZone: tz }
    );

    const visitData = {
      ...visit,
      tijuana_time: tijuanaTime,
    };

    // 🌎 EMAIL DE VISITA
    if (visit) {
      visitEmail = await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `🌎 Nueva visita — ${
          visitData.city || "Ubicación desconocida"
        }`,
        html: `
        <div style="max-width:600px;margin:0 auto;padding:0;border-radius:16px;font-family:'Segoe UI',Arial,sans-serif;background:#fff;box-shadow:0 2px 12px #e0e0e0;">
          <div style="background: linear-gradient(90deg, #a537e0 0%, #f43f5e 100%); padding:32px 20px; text-align:center; color:white; border-radius:16px 16px 0 0;">
            <span style="font-size:38px;">🌎</span>
            <h1 style="margin:0; font-size:32px; font-weight:700; letter-spacing:2px;">VISITA RECIBIDA</h1>
          </div>
          <div style="padding:32px 24px;">
            <h2 style="color:#a537e0; margin-top:0; font-size:22px;">📍 Detalles de la visita</h2>
            <table style="width:100%; margin-top:18px; font-size:16px;">
              <tr><td><strong>🕒 Hora (Tijuana):</strong></td><td>${visitData.tijuana_time ?? "-"}</td></tr>
              <tr><td><strong>⏱️ Timestamp:</strong></td><td>${visitData.timestamp ?? "-"}</td></tr>
              <tr><td><strong>🌆 Ubicación:</strong></td><td>${visitData.city ?? "Desconocida"}, ${visitData.state ?? ""} ${visitData.country ?? ""}</td></tr>
              <tr><td><strong>📍 Lat/Lon:</strong></td><td>${visitData.lat ?? "n/a"}, ${visitData.lon ?? "n/a"}</td></tr>
              <tr><td><strong>🔗 Fuente:</strong></td><td>${visitData.location_source ?? "-"}</td></tr>
              <tr><td><strong>🖥️ User-Agent:</strong></td><td>${visitData.userAgent ?? "-"}</td></tr>
            </table>
          </div>
        </div>
        `,
      });
    }

    // 💼 EMAIL ADMIN
    if (name && email && message && budget) {
      adminEmail = await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `💻 Nueva solicitud de cotización de ${name}`,
        replyTo: email,
        html: `
        <div style="max-width:600px;margin:0 auto;padding:20px;font-family:sans-serif;">
          <h2>💻 Nueva cotización</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Presupuesto:</strong> ${budget}</p>
          <p><strong>Mensaje:</strong> ${message}</p>
        </div>
        `,
      });
    }

    // 🌐 CONFIRMACIÓN
    const isSpanish = lang === "es";

    const confirmationHtml = isSpanish
      ? `
      <div style="font-family:sans-serif;">
        <h2>🙌 ¡Gracias por tu mensaje!</h2>
        <p>Hola <strong>${name}</strong>, recibimos tu solicitud.</p>
      </div>
    `
      : `
      <div style="font-family:sans-serif;">
        <h2>🙌 Thank you!</h2>
        <p>Hi <strong>${name}</strong>, we received your request.</p>
      </div>
    `;

    if (email) {
      await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: [email],
        subject: isSpanish
          ? "🎉 ¡Solicitud recibida!"
          : "🎉 Request received!",
        html: confirmationHtml,
      });
    }

    return NextResponse.json({
      success: true,
      adminEmail,
      visitEmail,
    });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return NextResponse.json(
      { success: false, error: "Unable to send email" },
      { status: 500 }
    );
  }
}
