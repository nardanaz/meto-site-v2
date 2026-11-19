"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Benefit = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  /** Grid span on desktop. default = 1 */
  spanCol?: 1 | 2;
  /** Row span on desktop. default = 1 */
  spanRow?: 1 | 2;
  icon: ReactNode;
};

const benefits: Benefit[] = [
  {
    id: "sin-comisiones",
    eyebrow: "01 · Sin comisiones",
    headline: "Vendé. Ganá. Quedate con lo tuyo.",
    body: "Publicá tus productos y conectá con compradores cercanos sin pagar comisiones por la venta.",
    spanCol: 2,
    icon: <IconNoFees />,
  },
  {
    id: "sin-logistica",
    eyebrow: "02 · Sin logística tradicional",
    headline: "A pocas cuadras. Sin esperar días.",
    body: "¿Por qué esperar un envío cuando lo que buscás puede estar a la vuelta de la esquina? Coordiná directo con el vendedor.",
    icon: <IconPin />,
  },
  {
    id: "entre-vecinos",
    eyebrow: "03 · Entre vecinos",
    headline: "Tu barrio tiene mucho para ofrecer.",
    body: "Descubrí productos de personas y comercios de tu zona. Más conexiones locales. Más oportunidades.",
    icon: <IconNetwork />,
  },
  {
    id: "simple",
    eyebrow: "04 · Simple",
    headline: "Un swipe puede cambiarlo todo.",
    body: "Descubrí, elegí y conectá sin formularios interminables ni procesos complicados.",
    spanCol: 2,
    icon: <IconSwipe />,
  },
  {
    id: "confianza",
    eyebrow: "05 · Confianza",
    headline: "Conectá con más confianza.",
    body: "Perfiles, chats dentro de la app y herramientas de protección pensadas para operar más tranquilo.",
    icon: <IconShield />,
  },
  {
    id: "descubrimiento",
    eyebrow: "06 · Descubrimiento inteligente",
    headline: "Encontrá cosas que ni sabías que querías.",
    body: "MeTo aprende de tus intereses para mostrarte productos relevantes que están cerca.",
    spanCol: 2,
    icon: <IconSparkles />,
  },
];

export default function BenefitsSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="beneficios"
      className="relative py-32 md:py-40"
      style={{ backgroundColor: "var(--bg-canvas)" }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(112, 56, 255, 0.18), transparent 60%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: 1360, padding: "0 clamp(24px, 4vw, 48px)" }}
      >
        {/* Header */}
        <div className="max-w-[720px]">
          <p className="font-mono-tiny text-[color:var(--violet-400)] inline-flex items-center gap-2 mb-5">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)]" />
            Beneficios
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: "var(--text-chapter)", lineHeight: 0.95 }}
          >
            Menos vueltas.<br />
            <span className="gradient-text">Más encuentros.</span>
          </h2>
          <p
            className="mt-6 text-[color:var(--text-secondary)] max-w-[52ch]"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
          >
            Todo lo que necesitás para comprar y vender cerca, sin complicarte la vida.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="mt-14 md:mt-20 grid gap-4 md:gap-5"
          style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        >
          {benefits.map((b, i) => (
            <motion.article
              key={b.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: (i % 3) * 0.08,
              }}
              className="benefit-card group"
              style={{
                gridColumn: `span ${b.spanCol ?? 1} / span ${b.spanCol ?? 1}`,
              }}
            >
              <div className="benefit-icon">{b.icon}</div>
              <div className="benefit-content">
                <p className="benefit-eyebrow font-mono-tiny">{b.eyebrow}</p>
                <h3 className="benefit-headline">{b.headline}</h3>
                <p className="benefit-body">{b.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Icons ───────────────────────────────────────── */

function IconNoFees() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <path
        d="M30 16H20a4 4 0 0 0 0 8h8a4 4 0 0 1 0 8H18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M24 12v4M24 32v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M10 38 38 10"
        stroke="var(--coral-500)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <path
        d="M34 20c0 10-10 20-10 20S14 30 14 20a10 10 0 1 1 20 0z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="20" r="4" fill="var(--coral-500)" />
      <circle cx="24" cy="20" r="11" stroke="var(--coral-500)" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="24" cy="20" r="17" stroke="var(--coral-500)" strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  );
}

function IconNetwork() {
  const nodes = [
    { x: 24, y: 8, big: true },
    { x: 10, y: 22 },
    { x: 38, y: 22 },
    { x: 17, y: 40 },
    { x: 31, y: 40 },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 2],
    [3, 4],
  ];
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.big ? 4 : 3}
          fill={n.big ? "var(--coral-500)" : "currentColor"}
        />
      ))}
    </svg>
  );
}

function IconSwipe() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <rect x="10" y="12" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <rect
        x="18"
        y="10"
        width="20"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="rgba(112, 56, 255, 0.12)"
      />
      <path
        d="M30 22l4 2-4 2"
        stroke="var(--coral-500)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 24h12" stroke="var(--coral-500)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <path
        d="M24 6l14 5v12c0 10-7 17-14 19-7-2-14-9-14-19V11l14-5z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="m18 24 5 5 8-10"
        stroke="var(--coral-500)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none" aria-hidden="true">
      <path
        d="M22 8l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M36 26l1.5 3.5L41 31l-3.5 1.5L36 36l-1.5-3.5L31 31l3.5-1.5L36 26z"
        fill="var(--coral-500)"
      />
      <circle cx="12" cy="36" r="2" fill="var(--violet-400)" />
    </svg>
  );
}
