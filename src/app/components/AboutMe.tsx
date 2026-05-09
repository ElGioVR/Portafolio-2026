"use client";

import React, { useState } from "react";
import "../../i18n";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CodeIcon from "@mui/icons-material/Code";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from "@mui/icons-material/Download";

export default function AboutMe({ darkMode }: { darkMode?: boolean }) {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(0);
  const cvFile = i18n.language === "es" ? "/cv/cv-es.pdf" : "/cv/cv-en.pdf";

  const services = [
    { key: "developer", icon: CodeIcon },
    { key: "uiux", icon: DesignServicesIcon },
    { key: "designer", icon: AutoAwesomeIcon },
  ];
  const selectedService = services[selected];
  const SelectedIcon = selectedService.icon;

  return (
    <section className="section-shell relative z-10 py-24" data-theme={darkMode ? "dark" : "light"}>
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="lg:sticky lg:top-28"
        >
          <p className="eyebrow">{t("about.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            {t("about.title1")}
            <span className="block text-gradient-wave">{t("about.title2")}</span>
          </h2>
          <p className="mt-5 text-lg leading-8 muted">{t("about.summary")}</p>
          <a
            href={cvFile}
            download={i18n.language === "es" ? "CV-GioVazquez-ES.pdf" : "CV-GioVazquez-EN.pdf"}
            className="cta-primary mt-8"
          >
            <DownloadIcon fontSize="small" />
            {i18n.language === "es" ? "Descargar CV" : "Download CV"}
          </a>
        </motion.div>

        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.key}
                  onClick={() => setSelected(index)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    selected === index ? "bg-[var(--text-color)] text-[var(--background)]" : "glass-panel"
                  }`}
                  style={{ borderColor: "var(--line-color)" }}
                >
                  <Icon sx={{ color: selected === index ? "var(--background)" : "var(--accent)" }} />
                  <h3 className="mt-4 text-lg font-black">{t(`about.${service.key}.title`)}</h3>
                  <p className={`mt-2 text-sm leading-6 ${selected === index ? "opacity-75" : "muted"}`}>{t(`about.${service.key}.desc`)}</p>
                </button>
              );
            })}
          </div>

          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-panel rounded-3xl p-7 md:p-9"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--text-color)] text-[var(--background)]">
                <SelectedIcon />
              </div>
              <div>
                <p className="eyebrow">{t("about.focusLabel")}</p>
                <h3 className="text-2xl font-black">{t(`about.${selectedService.key}.title`)}</h3>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8">{t(`about.${selectedService.key}.details`)}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["impact1", "impact2", "impact3"].map((key) => (
                <div key={key} className="rounded-2xl border p-4" style={{ borderColor: "var(--line-color)" }}>
                  <p className="text-sm font-bold muted">{t(`about.${key}.label`)}</p>
                  <p className="mt-1 font-black">{t(`about.${key}.value`)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
