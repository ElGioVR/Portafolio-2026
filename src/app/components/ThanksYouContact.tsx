import React from "react";
import { useTranslation } from "react-i18next";

interface ThankYouContactProps {
  darkMode?: boolean;
}

const ThankYouContact = ({ darkMode }: ThankYouContactProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="glass-panel relative overflow-hidden rounded-[2rem] border px-6 py-7 md:px-8 md:py-8 max-w-3xl mx-auto flex flex-col items-center gap-6 md:flex-row"
      style={{ borderColor: "var(--line-color)", background: "var(--surface)" }}
    >
      <div
        className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-4"
        style={{
          borderColor: "var(--accent)",
          background: darkMode
            ? "linear-gradient(135deg, rgba(57,213,191,0.12), rgba(255,255,255,0.08))"
            : "linear-gradient(135deg, rgba(15,159,143,0.12), rgba(255,255,255,0.88))",
        }}
      >
        <img
          src="/avatars/gio-avatar-v2.png"
          alt="Persona"
          className="h-20 w-20 rounded-full object-cover shadow-[0_18px_35px_rgba(0,0,0,0.18)]"
        />
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-black text-[var(--text-color)]">{t("thankyouContact.title")}</h2>
        <p className="mt-3 text-lg leading-8 text-[var(--muted-color)]">{t("thankyouContact.message")}</p>
      </div>
    </div>
  );
};

export default ThankYouContact;
