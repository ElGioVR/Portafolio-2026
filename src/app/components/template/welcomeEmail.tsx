// emails/QuoteReceivedEmail.tsx
import React from "react";

interface QuoteReceivedEmailProps {
  name: string;
  email: string;
  message: string;
  budget: string;
}

export const QuoteReceivedEmail: React.FC<QuoteReceivedEmailProps> = ({
  name,
  email,
  message,
  budget,
}) => (
  <div
    style={{
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      maxWidth: 600,
      margin: "0 auto",
      padding: 0,
      backgroundColor: "#070908",
      borderRadius: 24,
      color: "#f3f7f4",
      lineHeight: 1.5,
      overflow: "hidden",
      border: "1px solid rgba(243, 247, 244, 0.14)",
      boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
    }}
  >
    <div
      style={{
        padding: "32px 28px",
        background:
          "linear-gradient(135deg, rgba(57, 213, 191, 0.24), rgba(255, 143, 112, 0.16) 52%, rgba(143, 156, 255, 0.18))",
        borderBottom: "1px solid rgba(243, 247, 244, 0.14)",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          color: "#39d5bf",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        Nueva oportunidad
      </p>
      <h2
        style={{
          margin: 0,
          color: "#f3f7f4",
          fontSize: 30,
          lineHeight: 1.1,
        }}
      >
        Nueva solicitud de cotizacion recibida
      </h2>
    </div>

    <div style={{ padding: "28px" }}>
      <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
        <p style={{ margin: 0, color: "#a8b5af" }}>
          <strong style={{ color: "#f3f7f4" }}>Nombre:</strong> {name}
        </p>
        <p style={{ margin: 0, color: "#a8b5af" }}>
          <strong style={{ color: "#f3f7f4" }}>Email del cliente:</strong>{" "}
          <a href={`mailto:${email}`} style={{ color: "#39d5bf", fontWeight: 700 }}>
            {email}
          </a>
        </p>
        <p style={{ margin: 0, color: "#a8b5af" }}>
          <strong style={{ color: "#f3f7f4" }}>Presupuesto:</strong> {budget}
        </p>
      </div>

      <p style={{ margin: "0 0 8px", color: "#f3f7f4", fontWeight: 800 }}>
        Mensaje
      </p>
      <div
        style={{
          padding: 18,
          backgroundColor: "rgba(19, 24, 22, 0.92)",
          borderRadius: 16,
          whiteSpace: "pre-wrap",
          color: "#f3f7f4",
          border: "1px solid rgba(57, 213, 191, 0.28)",
          boxShadow: "inset 4px 0 0 #39d5bf",
        }}
      >
        {message}
      </div>

      <footer
        style={{
          fontSize: 12,
          color: "#a8b5af",
          textAlign: "center",
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(243, 247, 244, 0.14)",
        }}
      >
        Este correo fue enviado automaticamente desde la plataforma. Por favor,
        no responda a este mensaje directamente.
      </footer>
    </div>
  </div>
);
