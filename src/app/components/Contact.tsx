"use client";

import React, { useState } from "react";
import ContactForm from "./ContactForm";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface ContactProps {
  darkMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="relative z-10 py-24">
      <div className="section-shell overflow-hidden rounded-[2rem] border p-7 md:p-12" style={{ borderColor: "var(--line-color)", background: "var(--surface-strong)" }}>
        {!showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <p className="eyebrow">{t("contactSection.eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-7xl">
                {t("contactSection.titleLine1")}
                <span className="block text-gradient-wave">{t("contactSection.titleLine2")}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 muted">{t("contactSection.description")}</p>
            </div>

            <button onClick={() => setShowForm(true)} className="cta-primary w-full md:w-auto">
              <MailOutlineIcon fontSize="small" />
              {t("contactSection.contactBtn")}
              <ArrowForwardIcon fontSize="small" />
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 35 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ContactForm darkMode={darkMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
