import React from "react";

interface ContactConfirmationEmailProps {
  name: string;
  language: "es" | "en";
}

const palette = {
  bg: "#070908",
  panel: "#131816",
  panelStrong: "#171d1b",
  text: "#f3f7f4",
  muted: "#a8b5af",
  line: "rgba(243, 247, 244, 0.14)",
  accent: "#39d5bf",
};

const copy = {
  es: {
    eyebrow: "Solicitud recibida",
    title: "Gracias por contactarme",
    greeting: "Hola",
    intro:
      "Gracias por escribirme. Ya recibi tu mensaje y revisare la informacion que compartiste.",
    next:
      "Te respondere lo antes posible con los siguientes pasos o cualquier pregunta necesaria para entender mejor tu proyecto.",
    noteTitle: "Mientras tanto",
    note:
      "Si necesitas agregar mas contexto, puedes responder directamente a este correo.",
    footer: "Este correo confirma que tu solicitud fue recibida correctamente.",
  },
  en: {
    eyebrow: "Request received",
    title: "Thanks for reaching out",
    greeting: "Hi",
    intro:
      "Thanks for contacting me. I received your message and will review the information you shared.",
    next:
      "I will get back to you as soon as possible with next steps or any questions needed to better understand your project.",
    noteTitle: "In the meantime",
    note:
      "If you need to add more context, you can reply directly to this email.",
    footer: "This email confirms that your request was received successfully.",
  },
};

export default function ContactConfirmationEmail({
  name,
  language,
}: ContactConfirmationEmailProps) {
  const text = copy[language];

  return (
    <div
      style={{
        margin: 0,
        padding: "32px 16px",
        background: palette.bg,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
        color: palette.text,
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: 24,
          background: palette.panel,
          border: `1px solid ${palette.line}`,
          boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            padding: "34px 30px",
            background:
              "linear-gradient(135deg, rgba(57,213,191,0.24), rgba(255,143,112,0.16) 52%, rgba(143,156,255,0.18))",
            borderBottom: `1px solid ${palette.line}`,
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: palette.accent,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {text.eyebrow}
          </p>
          <h1
            style={{
              margin: 0,
              color: palette.text,
              fontSize: 32,
              lineHeight: 1.08,
              fontWeight: 800,
            }}
          >
            {text.title}
          </h1>
        </div>

        <div style={{ padding: 30 }}>
          <p
            style={{
              margin: "0 0 14px",
              color: palette.text,
              fontSize: 17,
              lineHeight: 1.7,
            }}
          >
            {text.greeting} <strong>{name}</strong>,
          </p>
          <p
            style={{
              margin: "0 0 14px",
              color: palette.muted,
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            {text.intro}
          </p>
          <p
            style={{
              margin: 0,
              color: palette.muted,
              fontSize: 15,
              lineHeight: 1.7,
            }}
          >
            {text.next}
          </p>

          <div
            style={{
              marginTop: 22,
              padding: 18,
              borderRadius: 16,
              background: palette.panelStrong,
              border: "1px solid rgba(57,213,191,0.26)",
              boxShadow: `inset 4px 0 0 ${palette.accent}`,
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                color: palette.text,
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              {text.noteTitle}
            </p>
            <p
              style={{
                margin: 0,
                color: palette.muted,
                fontSize: 14,
                lineHeight: 1.7,
              }}
            >
              {text.note}
            </p>
          </div>

          <div
            style={{
              marginTop: 26,
              paddingTop: 18,
              borderTop: `1px solid ${palette.line}`,
              color: palette.muted,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {text.footer}
          </div>
        </div>
      </div>
    </div>
  );
}
