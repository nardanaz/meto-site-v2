"use client";

import { motion, useReducedMotion } from "motion/react";

/* Dot positions on an abstract isometric grid, in SVG viewBox units.
   The map is a 600x380 diamond, user at the center. */
const sellers = [
  { x: 240, y: 150, delay: 0.1 },
  { x: 370, y: 140, delay: 0.25 },
  { x: 280, y: 200, delay: 0.4 },
  { x: 390, y: 220, delay: 0.55 },
  { x: 220, y: 240, delay: 0.7 },
  { x: 350, y: 280, delay: 0.85 },
  { x: 160, y: 190, delay: 1.0 },
  { x: 440, y: 180, delay: 1.15 },
];

const buyers = [
  { x: 310, y: 160, delay: 0.3 },
  { x: 260, y: 270, delay: 0.5 },
  { x: 400, y: 190, delay: 0.7 },
  { x: 200, y: 215, delay: 0.9 },
];

export default function HyperlocalSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hiperlocal"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--bg-void)",
        paddingBlock: "clamp(100px, 16vh, 180px)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(74, 31, 217, 0.22), transparent 70%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{ maxWidth: 1360, padding: "0 clamp(24px, 4vw, 48px)" }}
      >
        <div className="max-w-[760px]">
          <p className="font-mono-tiny text-[color:var(--violet-400)] inline-flex items-center gap-2 mb-5">
            <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)]" />
            El poder de lo hiperlocal
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: "var(--text-chapter)", lineHeight: 0.95 }}
          >
            El mundo es enorme.<br />
            Tu próximo cliente está a{" "}
            <span className="gradient-text">10 cuadras.</span>
          </h2>
          <p
            className="mt-6 text-[color:var(--text-secondary)] max-w-[60ch]"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
          >
            Imaginá un marketplace donde no necesitás venderle a alguien del otro lado del país.
            Donde tus próximos clientes caminan por tu misma calle. Donde los comercios del barrio
            llegan a nuevas personas y los vecinos descubren productos que están literalmente a la
            vuelta de la esquina. <span className="text-white">Eso es MeTo.</span>
          </p>
        </div>

        {/* Map visualization */}
        <div className="mt-16 md:mt-20 relative mx-auto" style={{ maxWidth: 800 }}>
          <HyperlocalMap reduced={!!reduced} />
        </div>

        {/* Three audiences */}
        <div
          className="mt-16 md:mt-24 grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          <AudienceCard
            eyebrow="Para quienes compran"
            body="Descubrí oportunidades cerca de vos y coordiná sin depender de envíos tradicionales."
            delay={0}
          />
          <AudienceCard
            eyebrow="Para quienes venden"
            body="Convertí la cercanía en una ventaja. Mostrá tus productos a personas de tu zona que podrían estar interesadas."
            delay={0.1}
          />
          <AudienceCard
            eyebrow="Para tu barrio"
            body="Más conexiones. Más circulación comercial. Más oportunidades para los negocios locales."
            delay={0.2}
          />
        </div>

        {/* Closing line */}
        <p
          className="mt-20 md:mt-28 font-display text-white text-center mx-auto"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            maxWidth: "22ch",
          }}
        >
          No necesitás ir más lejos.{" "}
          <span className="gradient-text">Necesitás mirar más cerca.</span>
        </p>
      </div>
    </section>
  );
}

/* ── Map (SVG) ──────────────────────────────────────────── */
function HyperlocalMap({ reduced }: { reduced: boolean }) {
  // The isometric grid is drawn as a grid rotated and skewed.
  // We render a diamond of streets using two sets of parallel lines.
  const w = 600;
  const h = 380;
  const cx = w / 2;
  const cy = h / 2 + 10;

  // Generate street lines (NE-SW and NW-SE) that cross a diamond region.
  const streets: { x1: number; y1: number; x2: number; y2: number; op: number }[] = [];
  // NE-SW lines
  for (let i = -8; i <= 8; i++) {
    const offset = i * 24;
    streets.push({
      x1: cx - 280 + offset,
      y1: cy + 130,
      x2: cx + 140 + offset,
      y2: cy - 110,
      op: 0.15 + (1 - Math.abs(i) / 9) * 0.1,
    });
  }
  // NW-SE lines
  for (let i = -8; i <= 8; i++) {
    const offset = i * 24;
    streets.push({
      x1: cx + 280 + offset,
      y1: cy + 130,
      x2: cx - 140 + offset,
      y2: cy - 110,
      op: 0.15 + (1 - Math.abs(i) / 9) * 0.1,
    });
  }

  return (
    <div className="relative" style={{ aspectRatio: `${w} / ${h}`, width: "100%" }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 w-full h-full"
        aria-labelledby="hyperlocal-map-title"
        role="img"
      >
        <title id="hyperlocal-map-title">Visualización abstracta de un barrio con vendedores y compradores a 10 cuadras del usuario</title>

        <defs>
          {/* Clip the streets to a diamond so they don't bleed */}
          <clipPath id="hl-diamond">
            <polygon points={`${cx},${cy - 150} ${cx + 300},${cy} ${cx},${cy + 150} ${cx - 300},${cy}`} />
          </clipPath>

          <radialGradient id="hl-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7038FF" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#7038FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#7038FF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hl-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7038FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#7038FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7038FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Proximity glow */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={300}
          ry={150}
          fill="url(#hl-glow)"
        />

        {/* Streets */}
        <g clipPath="url(#hl-diamond)" stroke="#9B72FF" strokeWidth="1">
          {streets.map((s, i) => (
            <line
              key={i}
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              strokeOpacity={s.op}
            />
          ))}
        </g>

        {/* 10-block proximity ring (the master prompt's "10 cuadras") */}
        <motion.ellipse
          cx={cx}
          cy={cy}
          rx={200}
          ry={100}
          fill="none"
          stroke="#9B72FF"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          strokeDasharray="4 4"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Radar sweep */}
        {!reduced && (
          <motion.ellipse
            cx={cx}
            cy={cy}
            rx={200}
            ry={100}
            fill="url(#hl-sweep)"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            opacity={0.8}
          />
        )}

        {/* Sellers (violet dots) */}
        {sellers.map((s, i) => (
          <motion.g
            key={"s" + i}
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: s.delay, ease: [0.34, 1.4, 0.4, 1] }}
            style={{ transformOrigin: `${s.x}px ${s.y}px` }}
          >
            <circle cx={s.x} cy={s.y} r="5" fill="#9B72FF" />
            <circle cx={s.x} cy={s.y} r="10" fill="#7038FF" opacity="0.2" />
          </motion.g>
        ))}

        {/* Buyers (teal dots to differentiate) */}
        {buyers.map((b, i) => (
          <motion.g
            key={"b" + i}
            initial={reduced ? false : { opacity: 0, scale: 0 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: b.delay, ease: [0.34, 1.4, 0.4, 1] }}
            style={{ transformOrigin: `${b.x}px ${b.y}px` }}
          >
            <circle cx={b.x} cy={b.y} r="4" fill="#38BDC9" />
          </motion.g>
        ))}

        {/* Central user */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.34, 1.4, 0.4, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy} r="20" fill="#FF4D6D" fillOpacity="0.15" />
          <circle cx={cx} cy={cy} r="12" fill="#FF4D6D" fillOpacity="0.4" />
          <circle cx={cx} cy={cy} r="6" fill="#FF4D6D" />
          <circle cx={cx} cy={cy} r="2.5" fill="#fff" />
        </motion.g>

        {/* Label pills */}
        <g className="hl-labels">
          <foreignObject x={cx - 60} y={cy + 110} width={120} height={28}>
            <div className="hl-pill hl-pill--user">
              <span className="dot" /> Vos
            </div>
          </foreignObject>
          <foreignObject x={cx + 220} y={cy - 70} width={140} height={28}>
            <div className="hl-pill">
              <span className="dot" style={{ background: "#9B72FF" }} /> Vendedores
            </div>
          </foreignObject>
          <foreignObject x={cx - 350} y={cy - 70} width={140} height={28}>
            <div className="hl-pill">
              <span className="dot" style={{ background: "#38BDC9" }} /> Compradores
            </div>
          </foreignObject>
          <foreignObject x={cx - 72} y={cy - 130} width={144} height={28}>
            <div className="hl-pill hl-pill--radius">
              Radio · 10 cuadras
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}

function AudienceCard({
  eyebrow,
  body,
  delay,
}: {
  eyebrow: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl border"
      style={{
        background: "color-mix(in oklab, #fff 3%, var(--bg-raised))",
        borderColor: "var(--border-base)",
      }}
    >
      <p className="font-mono-tiny text-[color:var(--coral-500)] mb-3">{eyebrow}</p>
      <p
        className="text-white"
        style={{ fontSize: "1.0625rem", lineHeight: 1.5, letterSpacing: "-0.005em" }}
      >
        {body}
      </p>
    </motion.div>
  );
}
