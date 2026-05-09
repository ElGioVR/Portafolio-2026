import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

interface ExperienceItem {
  companyKey: string;
  roleKey: string;
  dateKey: string;
  detailKeys: string[];
  technologies: string[];
}

interface ExperienceProps {
  darkMode?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    companyKey: "experience.companyGlobal.name",
    roleKey: "experience.companyGlobal.role",
    dateKey: "experience.companyGlobal.date",
    detailKeys: [
      "experience.companyGlobal.details1",
      "experience.companyGlobal.details2",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Nest.js",
      "TypeScript",
      "Tailwind CSS",
      "MUI",
      "GraphQL",
      "MongoDB",
      "Next.js",
    ],
  },
  {
    companyKey: "experience.companyGroup.name",
    roleKey: "experience.companyGroup.role",
    dateKey: "experience.companyGroup.date",
    detailKeys: ["experience.companyGroup.details1"],
    technologies: ["C#", ".NET", "ASP.NET", "SQL Server", "Dashboards"],
  },
];

const chipColors = [
  { bg: "rgba(15, 159, 143, 0.14)", text: "var(--accent)" },
  { bg: "rgba(255, 107, 74, 0.14)", text: "var(--accent-2)" },
  { bg: "rgba(89, 103, 232, 0.14)", text: "var(--accent-3)" },
];

const Experience = ({ darkMode }: ExperienceProps) => {
  const [selected, setSelected] = useState(0);
  const { t } = useTranslation();
  const active = experiences[selected];

  return (
    <section className="section-shell relative z-10 py-24">
      <div className="mb-10 grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="eyebrow">{t("experience.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            {t("experience.title")}
            <span className="text-gradient-wave">.</span>
          </h2>
        </div>
        <p className="text-lg leading-8 muted">{t("experience.description")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {experiences.map((exp, index) => (
            <button
              key={exp.companyKey}
              onClick={() => setSelected(index)}
              className={`w-full rounded-2xl border p-5 text-left transition duration-200 ${
                selected === index
                  ? "bg-[var(--text-color)] text-[var(--background)] shadow-[0_24px_60px_rgba(15,159,143,0.16)]"
                  : "glass-panel hover:border-[var(--accent)] hover:shadow-[0_18px_40px_rgba(15,159,143,0.08)]"
              }`}
              style={{ borderColor: "var(--line-color)" }}
            >
              <div className="flex items-start gap-4">
                <WorkOutlineIcon sx={{ color: selected === index ? "var(--background)" : "var(--accent)" }} />
                <div>
                  <h3 className="text-lg font-black">{t(exp.companyKey)}</h3>
                  <p className={`mt-1 text-sm ${selected === index ? "opacity-75" : "muted"}`}>
                    {t(exp.roleKey)}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <motion.article
          key={selected}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-panel rounded-3xl p-7 md:p-9"
        >
          <div
            className="flex flex-col gap-3 border-b pb-7 md:flex-row md:items-start md:justify-between"
            style={{ borderColor: "var(--line-color)" }}
          >
            <div>
              <p className="eyebrow text-[var(--accent)]">{t(active.companyKey)}</p>
              <h3 className="mt-2 text-3xl font-black">{t(active.roleKey)}</h3>
            </div>
            <span
              className="rounded-full border px-4 py-2 text-sm font-bold"
              style={{ borderColor: "var(--line-color)", color: "var(--muted-color)" }}
            >
              {t(active.dateKey)}
            </span>
          </div>

          <ul className="mt-7 space-y-4">
            {active.detailKeys.map((key) => (
              <li key={key} className="flex gap-3 text-base leading-8">
                <span className="mt-3 h-2 w-2 flex-none rounded-full bg-[var(--accent)]" />
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {active.technologies.map((tech, index) => {
              const color = chipColors[index % chipColors.length];
              return (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1.5 text-xs font-black"
                  style={{ backgroundColor: color.bg, color: darkMode ? color.text : color.text }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default Experience;
