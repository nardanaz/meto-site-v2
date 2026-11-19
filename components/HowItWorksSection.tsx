"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import PhoneFrame from "./PhoneFrame";
import FeedScreen from "./phone-screens/FeedScreen";
import MatchScreen from "./phone-screens/MatchScreen";

const campera = {
  photo: "/products/campera.jpg",
  photoAlt: "Campera de jean vintage color terracota",
};

type Chapter = {
  step: string; // "01"
  title: string;
  body: string;
  screenSrc?: string;
  screenAlt?: string;
  screenRender?: () => React.ReactNode;
};

const chapters: Chapter[] = [
  {
    step: "01",
    title: "Tu mundo. Tus intereses.",
    body:
      "Contale a MeTo qué te interesa y empezá a descubrir productos seleccionados para vos, cerca de donde estás.",
    screenSrc: "/mockups/02-onboarding.png",
    screenAlt: "MeTo — elegí tus intereses",
  },
  {
    step: "02",
    title: "Deslizá. Descubrí. Sorprendete.",
    body:
      "Explorá productos de tu zona con un simple movimiento. A la derecha, lo que te gusta. A la izquierda, lo que no es para vos. Todo a pocas cuadras.",
    screenRender: () => (
      <FeedScreen
        product={{
          ...campera,
          price: "$ 18.000",
          name: "Campera de jean vintage Levi's",
          distance: "4 cuadras",
          agoLabel: "hace 2 h",
          seller: {
            initial: "C",
            name: "Carolina M.",
            rating: "★ 4.7 (87)",
          },
        }}
      />
    ),
    screenAlt: "MeTo — feed con swipe",
  },
  {
    step: "03",
    title: "¿Te gustó? Hacé match.",
    body:
      "Cuando mostrás interés y el vendedor acepta la conexión, se abre una conversación directa. No más ida y vuelta por mensajes dispersos.",
    screenRender: () => (
      <MatchScreen
        product={{
          ...campera,
          name: "Campera vintage Levi's",
          distance: "4 cuadras",
        }}
      />
    ),
    screenAlt: "MeTo — match",
  },
  {
    step: "04",
    title: "Un mensaje. Y listo.",
    body:
      "Hablá directamente con el vendedor, resolvé dudas y coordiná cómo concretar la operación. Sin intermediarios innecesarios.",
    screenSrc: "/mockups/05-chat.png",
    screenAlt: "MeTo — chat",
  },
  {
    step: "05",
    title: "Cerca. Fácil. Hecho.",
    body:
      "Elegí cómo concretar la operación, coordiná un punto de encuentro y disfrutá de comprar cerca. Pago protegido disponible cuando lo habilitemos.",
    screenSrc: "/mockups/08-profile.png",
    screenAlt: "MeTo — perfil con operaciones",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const activeIdx = useTransform(scrollYProgress, (p) => {
    const i = Math.floor(p * chapters.length);
    return Math.min(chapters.length - 1, Math.max(0, i));
  });

  // Progress bar fill (0..1 across full section)
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="relative"
      style={{
        backgroundColor: "var(--bg-void)",
        minHeight: `${chapters.length * 100}vh`,
      }}
    >
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 40% at 30% 50%, rgba(74, 31, 217, 0.18), transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Sticky viewport layer */}
      <div
        className="sticky top-0 left-0 right-0"
        style={{
          height: "100vh",
          zIndex: 1,
        }}
      >
        <div
          className="relative h-full mx-auto"
          style={{
            maxWidth: 1360,
            padding: "clamp(80px, 12vh, 120px) clamp(24px, 4vw, 48px) clamp(40px, 7vh, 80px)",
          }}
        >
          <div className="h-full grid items-center gap-10 md:gap-16"
               style={{ gridTemplateColumns: "1fr" }}
          >
            <div className="hiw-layout h-full items-center">
              {/* TEXT column */}
              <div className="relative flex flex-col justify-center">
                {/* Sticky header above the chapter stack */}
                <p className="font-mono-tiny text-[color:var(--violet-400)] inline-flex items-center gap-2 mb-6">
                  <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)]" />
                  Cómo funciona
                </p>

                {/* Chapters stack — only the active one is opaque */}
                <div className="relative" style={{ minHeight: 260 }}>
                  {chapters.map((c, i) => (
                    <ChapterText
                      key={c.step}
                      chapter={c}
                      index={i}
                      total={chapters.length}
                      activeIdx={activeIdx}
                      reduced={!!reduced}
                    />
                  ))}
                </div>

                {/* Progress rail */}
                <div className="mt-10 flex items-center gap-4">
                  <ActiveStep activeIdx={activeIdx} total={chapters.length} />
                  <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-[color:var(--border-base)]">
                    <motion.div
                      className="absolute inset-0 origin-left bg-gradient-to-r from-[color:var(--violet-500)] to-[color:var(--coral-500)]"
                      style={{ scaleX: barScale }}
                    />
                  </div>
                </div>
              </div>

              {/* PHONE column */}
              <div className="relative flex items-center justify-center">
                <PhoneSwitcher
                  chapters={chapters}
                  activeIdx={activeIdx}
                  reduced={!!reduced}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invisible spacers that drive the scroll — one per chapter */}
      <div className="relative" style={{ zIndex: 0 }}>
        {chapters.map((_, i) => (
          <div key={i} style={{ height: "100vh" }} aria-hidden />
        ))}
      </div>
    </section>
  );
}

/* ── Chapter text (fades in/out around its own range) ──── */

function ChapterText({
  chapter,
  index,
  total,
  activeIdx,
  reduced,
}: {
  chapter: Chapter;
  index: number;
  total: number;
  activeIdx: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
}) {
  const opacity = useTransform(activeIdx, (v) => {
    const d = Math.abs(v - index);
    if (d < 0.5) return 1;
    if (d < 1) return 0.1;
    return 0;
  });
  const y = useTransform(activeIdx, (v) => {
    const d = v - index;
    return d * -30; // outgoing chapters slide up a little
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        opacity: reduced ? (index === 0 ? 1 : 0) : opacity,
        y: reduced ? 0 : y,
        pointerEvents: "none",
      }}
    >
      <p className="font-mono-tiny text-[color:var(--text-tertiary)] mb-4">
        {chapter.step} / {String(total).padStart(2, "0")}
      </p>
      <h3
        className="font-display text-white"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
          lineHeight: 0.97,
          margin: 0,
        }}
      >
        {chapter.title}
      </h3>
      <p
        className="mt-5 text-[color:var(--text-secondary)] max-w-[52ch]"
        style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
      >
        {chapter.body}
      </p>
    </motion.div>
  );
}

/* ── Active step number (00 / 05) ──────────────────────── */

function ActiveStep({
  activeIdx,
  total,
}: {
  activeIdx: ReturnType<typeof useTransform<number, number>>;
  total: number;
}) {
  const stepNumber = useTransform(activeIdx, (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v)));
    return `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  });
  return (
    <motion.span
      className="font-mono-tiny text-[color:var(--violet-400)]"
      style={{ minWidth: 72 }}
    >
      <motion.span>{stepNumber}</motion.span>
    </motion.span>
  );
}

/* ── Phone switcher — screen crossfades between chapters ─ */

function PhoneSwitcher({
  chapters,
  activeIdx,
  reduced,
}: {
  chapters: Chapter[];
  activeIdx: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
}) {
  return (
    <div className="relative" style={{ width: 300, maxWidth: "70vw", aspectRatio: "300 / 620" }}>
      <div
        className="relative w-full h-full"
        style={{
          transform: "perspective(1200px) rotateY(-4deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            inset: "-60px -80px -80px",
            background:
              "radial-gradient(ellipse at 40% 40%, var(--violet-glow), transparent 60%)",
            filter: "blur(40px)",
            zIndex: -1,
          }}
        />
        <div
          className="relative w-full h-full bg-[#0A0A12] p-3 overflow-hidden"
          style={{
            borderRadius: 48,
            boxShadow:
              "0 0 0 1.5px #050508, 0 0 0 3px rgba(255,255,255,0.03), 0 40px 80px -20px rgba(112, 56, 255, 0.35)",
          }}
        >
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-[20px] bg-[#050508]"
            style={{ top: 18, width: 110, height: 28, zIndex: 3 }}
          />
          <div
            className="relative w-full h-full overflow-hidden"
            style={{ borderRadius: 36 }}
          >
            {chapters.map((c, i) => (
              <ChapterScreen
                key={c.step}
                chapter={c}
                index={i}
                activeIdx={activeIdx}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterScreen({
  chapter,
  index,
  activeIdx,
  reduced,
}: {
  chapter: Chapter;
  index: number;
  activeIdx: ReturnType<typeof useTransform<number, number>>;
  reduced: boolean;
}) {
  const opacity = useTransform(activeIdx, (v) => {
    const d = Math.abs(v - index);
    if (d < 0.5) return 1;
    if (d < 1) return 0;
    return 0;
  });
  const scale = useTransform(activeIdx, (v) => {
    const d = Math.abs(v - index);
    if (d < 0.5) return 1;
    return 1.03;
  });

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity: reduced ? (index === 0 ? 1 : 0) : opacity,
        scale: reduced ? 1 : scale,
      }}
    >
      {chapter.screenRender ? (
        chapter.screenRender()
      ) : chapter.screenSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={chapter.screenSrc}
          alt={chapter.screenAlt ?? ""}
          className="w-full h-full object-cover object-top"
        />
      ) : null}
    </motion.div>
  );
}
