import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import GroupsIcon from "@mui/icons-material/Groups";
import BuildIcon from "@mui/icons-material/Build";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TranslateIcon from "@mui/icons-material/Translate";
import SchemaIcon from "@mui/icons-material/Schema";

interface SkillsProps {
  darkMode?: boolean;
}

const skillsData = [
  { key: "webDesign", icon: DesignServicesIcon },
  { key: "frontend", icon: CodeIcon },
  { key: "backend", icon: StorageIcon },
  { key: "softSkills", icon: GroupsIcon },
  { key: "tools", icon: BuildIcon },
  { key: "platforms", icon: CloudQueueIcon },
  { key: "languages", icon: TranslateIcon },
  { key: "extra", icon: SchemaIcon },
];

const Skills: React.FC<SkillsProps> = () => {
  const { t } = useTranslation();

  return (
    <section className="section-shell relative z-10 py-24">
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{t("skills.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            {t("skills.title")}
            <span className="text-gradient-wave">.</span>
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-8 muted">{t("skills.description")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.key}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="glass-panel min-h-[210px] rounded-3xl p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--text-color)] text-[var(--background)]">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-black">{t(`skills.${skill.key}.title`)}</h3>
              <p className="mt-3 text-sm leading-7 muted">{t(`skills.${skill.key}.description`)}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
