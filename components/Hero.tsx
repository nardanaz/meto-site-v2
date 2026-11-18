"use client";

import { useEffect, useRef } from "react";
import PhoneFrame from "./PhoneFrame";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Simple JS-driven stagger reveal for the title words so we don't need
  // GSAP for the hero shell. GSAP is reserved for scroll-driven moments.
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>(".hero-word");
    words.forEach((w, i) => {
      w.style.transform = "translateY(110%)";
      w.style.opacity = "0";
      requestAnimationFrame(() => {
        w.style.transition = `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${
          600 + i * 90
        }ms, opacity 900ms cubic-bezier(0.22, 1, 0.36, 1) ${600 + i * 90}ms`;
        w.style.transform = "translateY(0)";
        w.style.opacity = "1";
      });
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "max(120px, 12vh)",
        paddingBottom: "max(80px, 10vh)",
      }}
    >
      {/* Opening: point of light bloom (CSS animated) */}
      <div className="hero-origin" aria-hidden="true" />
      {/* Grain layer on top of everything */}
      <div className="grain" aria-hidden="true" />

      {/* Content grid */}
      <div
        className="relative z-10 grid gap-12 md:gap-16 items-center"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 48px)",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
          {/* Copy */}
          <div className="relative">
            <p
              className="font-mono-tiny text-[color:var(--violet-400)] mb-8 inline-flex items-center gap-2"
              style={{
                animation:
                  "fadeInUp 700ms var(--ease-out-expo) 400ms both",
              }}
            >
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)] shadow-[0_0_8px_var(--coral-glow)]"
              />
              El marketplace de tu barrio
            </p>

            <h1
              ref={titleRef}
              className="font-display text-ink"
              style={{
                fontSize: "var(--text-display)",
                margin: 0,
              }}
            >
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="hero-word inline-block will-change-transform">Lo</span>{" "}
                <span className="hero-word inline-block will-change-transform">que</span>{" "}
                <span className="hero-word inline-block will-change-transform">tenés</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="hero-word inline-block will-change-transform gradient-text">cerca,</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className="hero-word inline-block will-change-transform">en</span>{" "}
                <span className="hero-word inline-block will-change-transform">un</span>{" "}
                <span className="hero-word inline-block will-change-transform">swipe.</span>
              </span>
            </h1>

            <p
              className="mt-8 text-[color:var(--text-secondary)] max-w-[52ch]"
              style={{
                fontSize: "var(--text-body)",
                lineHeight: 1.5,
                animation: "fadeInUp 900ms var(--ease-out-expo) 1200ms both",
              }}
            >
              Descubrí productos a pocas cuadras, conectá con quienes los
              venden y comprá sin las vueltas de siempre. Sin envíos, sin
              esperas, sin fricción.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3"
              style={{
                animation: "fadeInUp 900ms var(--ease-out-expo) 1400ms both",
              }}
            >
              <a
                href="#descargar"
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[color:var(--violet-500)] hover:bg-[color:var(--violet-400)] text-white text-[15px] font-semibold transition-colors shadow-[0_8px_32px_-8px_var(--violet-glow)] focus-ring"
              >
                Descubrí MeTo
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[color:var(--border-strong)] text-white text-[15px] font-medium hover:border-[color:var(--violet-400)] hover:text-[color:var(--violet-300)] transition-colors focus-ring"
              >
                Mirá cómo funciona
              </a>
            </div>

            <p
              className="mt-8 font-mono-tiny text-[color:var(--text-tertiary)]"
              style={{
                animation: "fadeInUp 900ms var(--ease-out-expo) 1700ms both",
              }}
            >
              Comprá cerca · Vendé fácil · Conectá al instante
            </p>
          </div>

          {/* Phone — cycling through the real app experience */}
          <div className="relative flex items-center justify-center min-h-[480px]">
            <PhoneFrame
              screens={[
                {
                  src: "/mockups/01-auth.png",
                  alt: "MeTo — pantalla de bienvenida",
                  label: "Bienvenida",
                },
                {
                  src: "/mockups/03-feed.png",
                  alt: "MeTo — feed con swipe de productos cercanos",
                  productPhoto: {
                    src: "/products/campera.jpg",
                    alt: "Campera de jean vintage",
                  },
                  product: {
                    icon: "🧥",
                    name: "Campera vintage",
                    price: "$18.000",
                    distance: "a 4 cuadras",
                    tone: "coral",
                  },
                },
                {
                  src: "/mockups/04-match.png",
                  alt: "MeTo — match recíproco",
                  chipVariant: "match",
                  label: "A 4 cuadras tuyas",
                },
                {
                  src: "/mockups/05-chat.png",
                  alt: "MeTo — chat con el vendedor",
                  chipVariant: "chat",
                  label: "Coordinando...",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#que-es"
        className="scroll-cue font-mono-tiny focus-ring"
        aria-label="Seguir leyendo"
      >
        <span>scroll</span>
        <span className="scroll-cue-line" aria-hidden />
      </a>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
