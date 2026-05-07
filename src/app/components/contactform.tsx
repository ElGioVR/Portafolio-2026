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
        console.error("Error sending email");
      }
    } catch (error) {
      console.error("Error:", error);
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
          </form>
        </div>
      )}
    </section>
  );
}
