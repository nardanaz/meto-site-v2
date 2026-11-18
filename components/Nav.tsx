"use client";

import { useEffect, useState } from "react";
import Isotype from "./Isotype";

const links = [
  { href: "#que-es", label: "Qué es" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#hiperlocal", label: "Hiperlocal" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--bg-void)]/60 border-b border-[color:var(--border-subtle)]"
          : "bg-transparent"
      }`}
      style={{
        paddingTop: "max(14px, env(safe-area-inset-top, 0px))",
        paddingLeft: "max(20px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(20px, env(safe-area-inset-right, 0px))",
        paddingBottom: 14,
      }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2.5 text-white focus-ring"
          aria-label="MeTo home"
        >
          <Isotype size={32} />
          <span className="font-display text-[17px] tracking-[-0.02em]">
            MeTo
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[color:var(--text-secondary)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors focus-ring"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#descargar"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[color:var(--bg-void)] text-[13px] font-semibold hover:bg-[color:var(--violet-400)] hover:text-white transition-colors focus-ring"
        >
          Descargá MeTo
          <span
            aria-hidden
            className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)] shadow-[0_0_10px_var(--coral-glow)]"
          />
        </a>
      </div>
    </header>
  );
}
