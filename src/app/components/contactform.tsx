"use client";

import React, { useState } from "react";
import ConfferyVisit from "../components/conffety";
import ThankYouContact from "../components/ThanksYouContact";
import "../../i18n";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface GetAQuoteSectionProps {
  darkMode?: boolean;
}

export default function GetAQuoteSection({ darkMode }: GetAQuoteSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    budget: "",
  });

  const { name, email, message, budget } = form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, budget, lang }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setShowThankYou(true), 1800);
      } else {
        const data = await res.json().catch(() => null);
        const needsVerifiedDomain =
          data?.code === "RESEND_DOMAIN_NOT_VERIFIED";

        console.error("Error sending email");
        setErrorMessage(
          needsVerifiedDomain
            ? lang === "es"
              ? "Resend necesita un dominio verificado para mandar confirmaciones a correos externos."
              : "Resend needs a verified domain to send confirmations to external emails."
            : lang === "es"
              ? "No pudimos enviar la confirmacion. Intenta de nuevo o escribeme directo por correo."
              : "We could not send the confirmation. Please try again or email me directly."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        lang === "es"
          ? "No pudimos conectar con el servicio de correo. Intenta de nuevo en unos minutos."
          : "We could not connect to the email service. Please try again in a few minutes."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border bg-[var(--background)] px-4 py-3.5 text-[var(--text-color)] outline-none transition placeholder:text-[var(--muted-color)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[rgba(15,159,143,0.16)]";

  return (
    <section data-theme={darkMode ? "dark" : "light"}>
      {submitted && <ConfferyVisit trigger={true} />}

      {showThankYou ? (
        <ThankYouContact darkMode={darkMode} />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow">{t("contactSection.eyebrow")}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              {t("contact.title")}
              <span className="block muted">{t("contact.subtitle")}</span>
            </h1>
            <p className="mt-6 leading-8 muted">
              {t("contact.noForm")}{" "}
              <a href="mailto:giovazquezrangel@gmail.com" className="font-bold text-[var(--text-color)] underline">
                giovazquezrangel@gmail.com
              </a>
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder={t("contact.name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={{ borderColor: "var(--line-color)" }}
                required
              />
              <input
                type="email"
                placeholder={t("contact.email")}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                style={{ borderColor: "var(--line-color)" }}
                required
              />
            </div>

            <textarea
              placeholder={t("contact.message")}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass}
              style={{ borderColor: "var(--line-color)" }}
              rows={5}
              required
            />

            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className={inputClass}
              style={{ borderColor: "var(--line-color)" }}
            >
              <option value="">{t("contact.selectBudget")}</option>
              <option value="Less than $1,000">{t("contact.budget1")}</option>
              <option value="$1,000 - $5,000">{t("contact.budget2")}</option>
              <option value="$5,000 - $10,000">{t("contact.budget3")}</option>
              <option value="More than $10,000">{t("contact.budget4")}</option>
            </select>

            <button type="submit" disabled={loading} className="cta-primary mt-2 justify-self-start disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? t("contact.sending") : t("contact.send")}
              {!loading && <ArrowForwardIcon fontSize="small" />}
            </button>

            {errorMessage && (
              <p
                className="rounded-2xl border px-4 py-3 text-sm font-semibold"
                style={{
                  borderColor: "rgba(255, 143, 112, 0.45)",
                  background: "rgba(255, 143, 112, 0.12)",
                  color: "var(--text-color)",
                }}
              >
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      )}
    </section>
  );
}
