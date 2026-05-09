"use client";

export default function AnimatedBackground({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      aria-hidden
      className={`portfolio-background ${darkMode ? "is-dark" : "is-light"}`}
    >
      <div className="portfolio-grid" />
      <div className="portfolio-scanline" />
    </div>
  );
}
