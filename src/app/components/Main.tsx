"use client";

import { useEffect, useState } from "react";
import "../../i18n";
import { useTranslation } from "react-i18next";
import AbouthMe from "./abouthMe";
import AnimatedBackground from "./animateBackGround";
import ConfferyVisit from "./conffety";
import Contact from "./contact";
import Footer from "./footer";
import HeroSection from "./heroSection";
import NavBar from "./NavBar";
import Projects from "./projects";
import Skills from "./skills";
import TimelineExperience from "./experiense";

export default function Main() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newVisit, setNewVisit] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { label: t("menu.home"), href: "#home" },
    { label: t("menu.about"), href: "#about" },
    { label: t("menu.experience"), href: "#experience" },
    { label: t("menu.projects"), href: "#projects" },
    { label: t("menu.skills"), href: "#skills" },
    { label: t("menu.contact"), href: "#contact" },
  ];

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    return () => document.body.classList.remove("dark-mode");
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const alreadyVisited = localStorage.getItem("confetty");
    if (!alreadyVisited) setNewVisit(true);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "var(--background)", color: "var(--text-color)" }}>
      <NavBar darkMode={darkMode} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navLinks={navLinks} />
      {newVisit && <ConfferyVisit trigger={newVisit} />}
      <AnimatedBackground darkMode={darkMode} />

      <HeroSection darkMode={darkMode} />
      <div id="about">
        <AbouthMe darkMode={darkMode} />
      </div>
      <div id="experience">
        <TimelineExperience darkMode={darkMode} />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <Skills darkMode={darkMode} />
      </div>
      <div id="contact">
        <Contact darkMode={darkMode} />
      </div>
      <Footer darkMode={darkMode} />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full border bg-[var(--surface-strong)] shadow-lg backdrop-blur-xl transition hover:-translate-y-1"
        style={{ borderColor: "var(--line-color)" }}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <img src={darkMode ? "/sun.svg" : "/moon.svg"} alt="" className="h-6 w-6" />
      </button>
    </main>
  );
}
