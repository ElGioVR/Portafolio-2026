"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../../i18n";
import { useTranslation } from "react-i18next";
import AboutMe from "./AboutMe";
import AnimatedBackground from "./AnimatedBackground";
import ConfettiBurst from "./ConfettiBurst";
import Contact from "./Contact";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";

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
      {newVisit && <ConfettiBurst trigger={newVisit} />}
      <AnimatedBackground darkMode={darkMode} />

      <HeroSection darkMode={darkMode} />
      <div id="about">
        <AboutMe darkMode={darkMode} />
      </div>
      <div id="experience">
        <Experience darkMode={darkMode} />
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
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" fill="var(--accent)" />
            <g stroke="var(--accent)" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>
        ) : (
          <Image src="/moon.svg" alt="Moon icon" width={24} height={24} />
        )}
      </button>
    </main>
  );
}
