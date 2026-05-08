"use client";

import "../../i18n";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import StatsBox from "./StatsBox";

export default function HeroSection({ darkMode }: { darkMode: boolean }) {
  const { t, i18n } = useTranslation();
  const cvFile = i18n.language === "es" ? "/cv/cv-es.pdf" : "/cv/cv-en.pdf";

  return (
    <section
      className="section-shell relative z-10 grid min-h-screen items-center gap-12 pt-28 lg:grid-cols-[1.08fr_0.92fr]"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold glass-panel">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
          {t("main.availability")}
        </div>

        <h1 className="text-[3.1rem] font-black leading-[0.94] md:text-[5.7rem] lg:text-[6.5rem]">
          {t("main.title1")}
          <span className="block text-gradient-wave">{t("main.title2")}</span>
          <span className="block">{t("main.title3")}</span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 muted md:text-xl">
          {t("main.pitch")}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="cta-primary" href="#contact">
            {t("main.ctaContact")} <ArrowForwardIcon fontSize="small" />
          </a>
          <a
            className="cta-secondary"
            href={cvFile}
            download={i18n.language === "es" ? "CV-GioVazquez-ES.pdf" : "CV-GioVazquez-EN.pdf"}
          >
            <DownloadIcon fontSize="small" /> {t("main.ctaCv")}
          </a>
          <a
            className="cta-secondary"
            href="https://www.linkedin.com/in/gio-vazquez-rangel-7985bb217/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="small" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5 muted">
          <span className="text-sm font-bold uppercase">{t("main.trustedBy")}</span>
          <Image
            src={darkMode ? "/jd.png" : "https://www.jdgroup.net/wp-content/uploads/2023/05/logo-jd-group@2.png"}
            alt="JD Group"
            width={112}
            height={40}
            className="object-contain"
          />
          <Image
            src={darkMode ? "https://g-global.com/wp-content/uploads/2023/07/Asset-9.webp" : "/logo-gg.svg"}
            alt="G-Global"
            width={112}
            height={40}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[460px]"
      >
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4">
          <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent-3)]" />

          <div className="relative grid aspect-[4/5] w-full place-items-end overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_18%,rgba(57,213,191,0.26),transparent_34%),linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]">
            <Image
              src="/avatars/gio-avatar-v2.png"
              alt="Avatar 3D de Gio Vazquez"
              fill
              className="object-contain object-[50% 75%] drop-shadow-[0_24px_55px_rgba(0,0,0,0.35)]"
            />
          </div>
          <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/55 p-4 text-white backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
              {t("main.roleLabel")}
            </p>
          <div className="absolute right-6 top-6 z-10 rounded-full border border-[var(--accent)] bg-[rgba(15,159,143,0.14)] px-2.5 py-1 text-[0.7rem] font-semibold text-[var(--accent)] shadow-[0_10px_30px_rgba(15,159,143,0.18)]">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Tijuana, BC
          </div>
            <p className="mt-1 text-xl font-black">Gio Vazquez</p>
            <p className="mt-2 text-sm text-white/78">{t("main.roleDetail")}</p>
          </div>
        </div>
      </motion.div>

      <div className="lg:col-span-2">
        <StatsBox darkMode={darkMode} />
      </div>
    </section>
  );
}
