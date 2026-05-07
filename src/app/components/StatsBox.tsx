import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StatsBoxProps {
  darkMode: boolean;
}

const stats = [
  { value: "3+", key: "main.years" },
  { value: "20+", key: "main.succesfullProjects" },
  { value: "13+", key: "main.businessTransformed" },
  { value: "98%", key: "main.satisfactionRate" },
];

export default function StatsBox({ darkMode }: StatsBoxProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-panel mt-6 grid grid-cols-2 overflow-hidden rounded-3xl md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className={`relative p-6 text-left md:p-8 ${
            index !== stats.length - 1 ? "md:border-r" : ""
          } ${index < 2 ? "border-b md:border-b-0" : ""}`}
          style={{ borderColor: "var(--line-color)" }}
        >
          <div className="text-3xl font-black md:text-5xl" style={{ color: darkMode ? "var(--accent)" : "var(--text-color)" }}>
            {stat.value}
          </div>
          <div className="mt-2 text-sm font-semibold muted md:text-base">
            {t(stat.key)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
