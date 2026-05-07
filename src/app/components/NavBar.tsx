"use client";

import "../../i18n";
import I18nButton from "./i18nButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface NavBarProps {
  darkMode: boolean;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export default function NavBar({ darkMode, menuOpen, setMenuOpen, navLinks }: NavBarProps) {
  return (
    <>
      <nav className="fixed left-0 top-0 z-40 w-full px-3 py-3 md:px-5">
        <div
          className="mx-auto flex min-h-14 w-full max-w-[1180px] items-center justify-between gap-3 rounded-full border px-3 shadow-sm backdrop-blur-2xl md:px-4"
          style={{ background: "var(--nav-bg)", borderColor: "var(--line-color)" }}
        >
          <a href="#home" className="flex shrink-0 items-center gap-2 font-black">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--text-color)] text-sm text-[var(--background)]">
              GV
            </span>
            <span className="hidden lg:block">Gio Vazquez</span>
          </a>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold muted transition hover:bg-[var(--surface)] hover:text-[var(--text-color)] xl:px-4"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <I18nButton darkMode={darkMode} />
            <a
              href="#contact"
              className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[var(--text-color)] px-4 py-2 text-sm font-black text-[var(--background)] transition hover:-translate-y-0.5 lg:inline-flex"
            >
              Hire <span className="hidden xl:inline">me</span>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full border md:hidden"
              style={{ borderColor: "var(--line-color)" }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 flex flex-col px-6 py-6 transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: darkMode ? "#070908" : "#f7f4ef",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black">Gio Vazquez</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="grid h-12 w-12 place-items-center rounded-full border"
            style={{ borderColor: "var(--line-color)" }}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="mt-14 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b py-5 text-right text-4xl font-black"
              style={{ borderColor: "var(--line-color)" }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mr-4 text-sm muted">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
