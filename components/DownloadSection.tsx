"use client";

import { motion, useReducedMotion } from "motion/react";
import Isotype from "./Isotype";
import WaitlistForm from "./WaitlistForm";

const orbiting = [
  { icon: "🧥", name: "Campera vintage", price: "$18.000", pos: { x: -200, y: -40 }, delay: 0.1 },
  { icon: "☕", name: "Set de mate", price: "$3.500", pos: { x: 180, y: -70 }, delay: 0.25 },
  { icon: "📚", name: "Libros usados", price: "$800", pos: { x: -170, y: 110 }, delay: 0.4 },
  { icon: "🎸", name: "Guitarra criolla", price: "$45.000", pos: { x: 210, y: 80 }, delay: 0.55 },
];

export default function DownloadSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="descargar"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#050308",
        paddingBlock: "clamp(120px, 20vh, 200px)",
      }}
    >
      {/* Big radial halo */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(112, 56, 255, 0.35), rgba(74, 31, 217, 0.1) 40%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto text-center"
        style={{ maxWidth: 960, padding: "0 clamp(24px, 4vw, 48px)" }}
      >
        <p className="font-mono-tiny text-[color:var(--violet-400)] inline-flex items-center gap-2 mb-5 mx-auto">
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)]" />
          Tu próximo descubrimiento te espera
        </p>

        <h2
          className="font-display text-white"
          style={{ fontSize: "var(--text-chapter)", lineHeight: 0.95, textWrap: "balance" }}
        >
          Lo que buscás puede estar{" "}
          <span className="gradient-text">a la vuelta de la esquina.</span>
        </h2>

        <p
          className="mt-6 text-[color:var(--text-secondary)] mx-auto"
          style={{ fontSize: "var(--text-body)", lineHeight: 1.55, maxWidth: "46ch" }}
        >
          Descubrí una nueva forma de comprar y vender. Más cerca. Más simple. Más MeTo.
        </p>

        {/* Floating phone with orbiting products */}
        <div
          className="relative mx-auto mt-14 md:mt-20"
          style={{ width: 280, height: 420, maxWidth: "70vw" }}
        >
          {/* Orbiting product cards */}
          {orbiting.map((p, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 z-10"
              initial={reduced ? false : { opacity: 0, scale: 0.8, x: 0, y: 0 }}
              whileInView={
                reduced
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      x: p.pos.x,
                      y: p.pos.y,
                    }
              }
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: p.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ translateX: "-50%", translateY: "-50%" }}
            >
              <div className="orbit-card">
                <span className="orbit-icon">{p.icon}</span>
                <div className="orbit-info">
                  <p className="orbit-name">{p.name}</p>
                  <p className="orbit-price">{p.price}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* The giant isotype that stands in for the app */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-20"
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          >
            <div
              className="relative"
              style={{
                filter:
                  "drop-shadow(0 20px 40px rgba(112, 56, 255, 0.5)) drop-shadow(0 10px 20px rgba(14, 14, 20, 0.6))",
                animation: reduced ? "none" : "phone-float 6s ease-in-out infinite",
              }}
            >
              <Isotype size={180} animated />
            </div>
          </motion.div>
        </div>

        {/* Store badges — explicitly 'coming soon' per master prompt */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-3"
        >
          <StoreButton
            store="App Store"
            caption="Descargar en"
            icon={<AppleGlyph />}
          />
          <StoreButton
            store="Google Play"
            caption="Disponible en"
            icon={<PlayGlyph />}
          />
        </div>

        <p className="mt-5 font-mono-tiny text-[color:var(--text-tertiary)]">
          Próximamente · Dejá tu mail abajo y te avisamos cuando podamos
          arrancar en tu zona.
        </p>

        <div id="waitlist" className="mt-2">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}

function StoreButton({
  store,
  caption,
  icon,
}: {
  store: string;
  caption: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="relative inline-flex items-center gap-3 rounded-2xl px-5 py-3 cursor-not-allowed"
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border-strong)",
        opacity: 0.85,
      }}
    >
      <span className="text-white" aria-hidden>
        {icon}
      </span>
      <div className="text-left leading-tight">
        <p className="font-mono-tiny text-[color:var(--text-tertiary)]">
          {caption}
        </p>
        <p className="text-white text-base font-semibold tracking-tight">
          {store}
        </p>
      </div>
      <span
        className="absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{
          background: "var(--coral-500)",
          color: "#fff",
          letterSpacing: "0.05em",
        }}
      >
        Pronto
      </span>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 12.5c0-2.5 2-3.7 2.1-3.8-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.1-2.9.9-3.7.9-.8 0-1.9-.9-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.2 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8 1.4 0 1.8.8 3 .8 1.3 0 2.1-1.2 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.6-1-2.6-3.7zm-2.3-6.9c.7-.8 1.1-2 1-3.1-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.3-.6 2.9-1.4z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l16 9-16 9V3z" fill="#7038FF" />
      <path d="M3 3l10 9-10 9V3z" fill="#9B72FF" opacity="0.8" />
    </svg>
  );
}
