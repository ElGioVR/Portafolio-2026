"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CodeIcon from "@mui/icons-material/Code";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  repoUrl: string;
  demoUrl: string | null;
  imageUrl: string;
}

interface ProjectsResponse {
  username?: string;
  projects: Project[];
}

const formatName = (name: string) => name.replaceAll("-", " ");

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<ProjectsResponse>({ projects: [] });
  const [loading, setLoading] = useState(true);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  const handleImageError = (projectId: number) => {
    setImageErrorMap((prev) => ({ ...prev, [projectId]: true }));
  };

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const response = await fetch("/api/github-projects");
        const payload = (await response.json()) as ProjectsResponse;
        if (active) setData(payload);
      } catch {
        if (active) setData({ projects: [] });
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section-shell relative z-10 py-24">
      <div className="mb-10 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="eyebrow">{t("projects.eyebrow")}</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            {t("projects.title")}
            <span className="text-gradient-wave">.</span>
          </h2>
        </div>
        <p className="text-lg leading-8 muted">
          {t("projects.description")}{" "}
          {data.username && (
            <a
              href={`https://github.com/${data.username}`}
              target="_blank"
              rel="noreferrer"
              className="font-black text-[var(--text-color)] underline"
            >
              @{data.username}
            </a>
          )}
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="glass-panel h-72 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : data.projects.length === 0 ? (
        <div className="glass-panel rounded-3xl p-8 text-center muted">
          {t("projects.empty")}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="glass-panel flex min-h-[420px] flex-col overflow-hidden rounded-3xl"
            >
              <a
                href={project.demoUrl || project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[16/9] overflow-hidden border-b"
                style={{ borderColor: "var(--line-color)" }}
                aria-label={project.demoUrl ? `${project.name} demo` : `${project.name} GitHub`}
              >
                <Image
                  src={imageErrorMap[project.id] ? "/file.svg" : project.imageUrl}
                  alt={`${project.name} preview`}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                  onError={() => handleImageError(project.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                <span className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-black text-black shadow-lg">
                  {project.demoUrl ? t("projects.demo") : t("projects.code")}
                  <ArrowOutwardIcon sx={{ fontSize: 15 }} />
                </span>
              </a>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] muted">
                      {project.language || t("projects.projectLabel")}
                    </p>
                    <h3 className="mt-3 text-2xl font-black capitalize">
                      {formatName(project.name)}
                    </h3>
                  </div>
                  <span className="rounded-full border px-3 py-1 text-xs font-black" style={{ borderColor: "var(--line-color)" }}>
                    {new Intl.DateTimeFormat(i18n.language, {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(project.updatedAt))}
                  </span>
                </div>

                <p className="mt-5 flex-1 leading-7 muted">
                  {project.description || t("projects.noDescription")}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="rounded-full bg-[rgba(15,159,143,0.13)] px-3 py-1 text-xs font-black text-[var(--accent)]">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--line-color)" }}>
                  <div className="flex gap-3 text-sm font-bold muted">
                    <span className="inline-flex items-center gap-1">
                      <StarBorderIcon sx={{ fontSize: 17 }} /> {project.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CallSplitIcon sx={{ fontSize: 17 }} /> {project.forks}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-10 w-10 place-items-center rounded-full border transition hover:-translate-y-1"
                      style={{ borderColor: "var(--line-color)" }}
                      aria-label={`${project.name} GitHub`}
                    >
                      <CodeIcon fontSize="small" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--text-color)] px-4 text-sm font-black text-[var(--background)] transition hover:-translate-y-1"
                        aria-label={`${project.name} demo`}
                      >
                        <ArrowOutwardIcon fontSize="small" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
