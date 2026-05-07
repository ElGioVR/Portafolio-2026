import React from "react";
import CountVisit from "./countVisit";
import {
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface FooterProps {
  darkMode?: boolean;
}

const socialLinks = [
  { href: "https://www.linkedin.com/in/gio-vazquez-rangel-7985bb217/", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://www.instagram.com/elgiovr/", label: "Instagram", icon: InstagramIcon },
  { href: "https://x.com/ElGioVR", label: "X", icon: TwitterIcon },
];

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  return (
    <footer className="relative z-10 py-10">
      <div className="section-shell rounded-[2rem] border p-7 md:p-10" style={{ borderColor: "var(--line-color)", background: "var(--surface-strong)", boxShadow: "var(--shadow-soft)" }}>
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="mb-5">
            <CountVisit darkMode={darkMode} />
          </div>
          <h2 className="text-4xl font-black">
            Gio <span className="text-gradient-wave">Vazquez</span>
          </h2>
          <p className="mt-4 max-w-xl leading-7 muted">{t("footer.description")}</p>
        </div>

        <div className="flex gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-11 w-11 place-items-center rounded-full border transition hover:-translate-y-1 hover:bg-[var(--surface)]"
                style={{ borderColor: "var(--line-color)" }}
              >
                <Icon fontSize="small" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-sm muted" style={{ borderColor: "var(--line-color)" }}>
        ©2026. {t("footer.madeBy")} <span className="font-bold">Gio Vazquez</span>.
      </div>
      </div>
    </footer>
  );
};

export default Footer;
