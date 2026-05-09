import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  darkMode?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = i18n.language.startsWith("es") ? "es" : "en";

  return (
    <div className="inline-flex rounded-full border bg-[var(--surface)] p-1" style={{ borderColor: "var(--line-color)" }}>
      {["en", "es"].map((lang) => (
        <button
          key={lang}
          onClick={() => i18n.changeLanguage(lang)}
          className={`rounded-full px-3 py-1.5 text-xs font-black uppercase transition ${
            current === lang ? "bg-[var(--text-color)] text-[var(--background)]" : "muted"
          }`}
          aria-pressed={current === lang}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
