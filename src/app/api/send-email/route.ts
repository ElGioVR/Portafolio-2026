import { NextResponse } from "next/server";
import { Resend } from "resend";
import { format, toZonedTime } from 'date-fns-tz';

export async function POST(req: Request) {
  const { name, email, message, budget, lang, visit } = await req.json();
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY environment variable");
    return NextResponse.json({ success: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
  }
  const resend = new Resend(resendApiKey);

  try {
    let visitEmail = {};
    let adminEmail = {};
    const tz = 'America/Tijuana';
    const date = visit?.timestamp ? new Date(visit.timestamp) : new Date();
    const tijuanaTime = format(toZonedTime(date, tz), 'yyyy-MM-dd HH:mm:ss', { timeZone: tz });
    const visitData = {
      ...visit,
      tijuana_time: tijuanaTime,
    };
    if (visit) {
      visitEmail = await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `🌎 Nueva visita — ${visitData.city || "Ubicación desconocida"}`,
        html: `
    <div style="max-width:600px;margin:0 auto;padding:0;border-radius:16px;font-family:'Segoe UI',Arial,sans-serif;background:#fff;box-shadow:0 2px 12px #e0e0e0;">
      <div style="background: linear-gradient(90deg, #a537e0 0%, #f43f5e 100%); padding:32px 20px; text-align:center; color:white; border-radius:16px 16px 0 0;">
        <span style="font-size:38px;">🌎</span>
        <h1 style="margin:0; font-size:32px; font-weight:700; letter-spacing:2px;">VISITA RECIBIDA</h1>
      </div>
      <div style="padding:32px 24px;">
        <h2 style="color:#a537e0; margin-top:0; font-size:22px;">📍 Detalles de la visita</h2>
        <table style="width:100%; margin-top:18px; font-size:16px;">
          <tr>
            <td style="padding:8px 0;"><strong>🕒 Hora local (Tijuana):</strong></td>
            <td style="padding:8px 0;">${visitData.tijuana_time ?? '-'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>⏱️ Timestamp:</strong></td>
            <td style="padding:8px 0;">${visitData.timestamp ?? '-'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>🌆 Ubicación:</strong></td>
            <td style="padding:8px 0;">${visitData.city ?? 'Desconocida'}, ${visitData.state ?? ''} ${visitData.country ?? ''}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>📍 Latitud, Longitud:</strong></td>
            <td style="padding:8px 0;">${visitData.lat ?? 'n/a'}, ${visitData.lon ?? 'n/a'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>🔗 Fuente:</strong></td>
            <td style="padding:8px 0;">${visitData.location_source ?? '-'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;"><strong>🖥️ User-Agent:</strong></td>
            <td style="padding:8px 0;">${visitData.userAgent ?? '-'}</td>
          </tr>
        </table>
        <p style="margin-top:32px; font-size:15px; color:#888; text-align:center;">
          Este correo fue generado automáticamente por el sistema de visitas de tu portfolio.
        </p>
      </div>
    </div>
  `,
      });
    }
    if (name && email && message && budget) {
      adminEmail = await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: ["giovanniantoniovazquezrangel@gmail.com"],
        subject: `💻 Nueva solicitud de cotización de ${name}`,
        replyTo: email,
        html: `
        <div style="max-width:600px;margin:0 auto;padding:0;border:1px solid #e0e0e0;border-radius:8px;font-family:sans-serif;background-color:#ffffff;overflow:hidden;">
          <div style="background: linear-gradient(135deg, #7f00ff, #e100ff); padding:40px 20px; text-align:center; color:white; position:relative;">
            <h1 style="margin:0; font-size:28px; letter-spacing:2px;">💼 CHAMBA</h1>
          </div>
          <div style="padding:20px; position:relative;">
            <h2 style="color:#2d2d2d; margin-top:0;">💻 Nueva cotización recibida</h2>
            <p style="font-size:16px; color:#555;">Hola Gio,</p>
            <p style="font-size:16px; color:#555;">Has recibido una nueva solicitud de cotización con los siguientes detalles:</p>
            <table style="width:100%; margin-top:20px;">
              <tr>
                <td style="padding:8px 0;"><strong>👤 Nombre:</strong></td>
                <td style="padding:8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><strong>📧 Email:</strong></td>
                <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><strong>💰 Presupuesto:</strong></td>
                <td style="padding:8px 0;">${budget}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; vertical-align:top;"><strong>📝 Mensaje:</strong></td>
                <td style="padding:8px 0;">${message}</td>
              </tr>
            </table>
            <p style="margin-top:30px; font-size:14px; color:#999;">Este correo fue generado automáticamente desde el formulario de cotización.</p>
          </div>
        </div>
      `,
      });
    }
    const isSpanish = lang === "es";

    const confirmationHtml = isSpanish
      ? `
        <div style="max-width:600px;margin:0 auto;padding:0;border:1px solid #e0e0e0;border-radius:8px;font-family:'Segoe UI', sans-serif;background-color:#ffffff;overflow:hidden;">
          <div style="background: linear-gradient(135deg, #7f00ff, #e100ff); padding:40px 20px; text-align:center; color:white;">
            <h1 style="margin:0; font-size:28px;">🙌 ¡Gracias por tu mensaje!</h1>
          </div>
          <div style="padding:24px;">
            <p style="font-size:16px; color:#333; margin:0 0 16px;">Hola <strong>${name}</strong>,</p>
            <p style="font-size:16px; color:#555; margin:0 0 16px;">Hemos recibido tu solicitud de cotización. En breve me pondré en contacto contigo para darte seguimiento.</p>
            <div style="margin:24px 0; padding:16px; background:#f9f9f9; border-left:4px solid #7f00ff;">
              <h3 style="margin:0 0 12px; font-size:18px; color:#7f00ff;">🧾 Resumen de tu solicitud</h3>
              <table style="width:100%; font-size:15px; color:#444;">
                <tr><td style="padding:6px 0;"><strong>👤 Nombre:</strong></td><td style="padding:6px 0;">${name}</td></tr>
                <tr><td style="padding:6px 0;"><strong>📧 Email:</strong></td><td style="padding:6px 0;">${email}</td></tr>
                <tr><td style="padding:6px 0;"><strong>💰 Presupuesto:</strong></td><td style="padding:6px 0;">${budget}</td></tr>
                <tr><td style="padding:6px 0; vertical-align:top;"><strong>📝 Mensaje:</strong></td><td style="padding:6px 0;">${message}</td></tr>
              </table>
            </div>
            <p style="font-size:15px; color:#555;">Si tienes alguna duda adicional o deseas agregar más detalles, puedes responder directamente a este correo.</p>
            <p style="font-size:15px; color:#999; margin-top:40px; text-align:center;">— Gio Vazquez</p>
          </div>
        </div>
      `
      : `
        <div style="max-width:600px;margin:0 auto;padding:0;border:1px solid #e0e0e0;border-radius:8px;font-family:'Segoe UI', sans-serif;background-color:#ffffff;overflow:hidden;">
          <div style="background: linear-gradient(135deg, #7f00ff, #e100ff); padding:40px 20px; text-align:center; color:white;">
            <h1 style="margin:0; font-size:28px;">🙌 Thank you for your message!</h1>
          </div>
          <div style="padding:24px;">
            <p style="font-size:16px; color:#333; margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
            <p style="font-size:16px; color:#555; margin:0 0 16px;">We've received your quote request. I will contact you shortly to follow up.</p>
            <div style="margin:24px 0; padding:16px; background:#f9f9f9; border-left:4px solid #7f00ff;">
              <h3 style="margin:0 0 12px; font-size:18px; color:#7f00ff;">🧾 Summary of your request</h3>
              <table style="width:100%; font-size:15px; color:#444;">
                <tr><td style="padding:6px 0;"><strong>👤 Name:</strong></td><td style="padding:6px 0;">${name}</td></tr>
                <tr><td style="padding:6px 0;"><strong>📧 Email:</strong></td><td style="padding:6px 0;">${email}</td></tr>
                <tr><td style="padding:6px 0;"><strong>💰 Budget:</strong></td><td style="padding:6px 0;">${budget}</td></tr>
                <tr><td style="padding:6px 0; vertical-align:top;"><strong>📝 Message:</strong></td><td style="padding:6px 0;">${message}</td></tr>
              </table>
            </div>
            <p style="font-size:15px; color:#555;">If you have any additional questions or would like to provide more details, you can reply to this email.</p>
            <p style="font-size:15px; color:#999; margin-top:40px; text-align:center;">— Gio Vazquez</p>
          </div>
        </div>
      `;

    // Enviar confirmación al cliente
    if (email) {
      await resend.emails.send({
        from: "Gio Form <onboarding@resend.dev>",
        to: [email],
        subject: isSpanish
          ? "🎉 ¡Hemos recibido tu solicitud!"
          : "🎉 We’ve received your request!",
        html: confirmationHtml,
      });
    }
    return NextResponse.json({ success: true, adminEmail, visitEmail });
  } catch (error) {
    console.error("Error al enviar correos:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}