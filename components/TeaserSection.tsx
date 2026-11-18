"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export default function TeaserSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // Scroll progress of the section: 0 when top enters, 1 when bottom leaves.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Video container grows and loses rounded corners as you scroll through.
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.78, 1, 1, 0.92]);
  const radius = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [36, 20, 20, 24]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [0, 0.9, 0.9, 0]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="que-es"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Ambient violet glow (grows with scroll progress) */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: "-10%",
          background:
            "radial-gradient(60% 50% at 50% 55%, rgba(112, 56, 255, 0.35), transparent 70%)",
          filter: "blur(40px)",
          opacity: reduced ? 0.6 : glowOpacity,
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 mx-auto"
        style={{
          maxWidth: 1360,
          padding: "0 clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <motion.div
          className="max-w-[720px]"
          style={{ y: reduced ? 0 : yParallax }}
        >
          <p className="font-mono-tiny text-[color:var(--violet-400)] inline-flex items-center gap-2 mb-5">
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full bg-[color:var(--coral-500)]"
            />
            Conocé MeTo
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: "var(--text-chapter)", lineHeight: 0.95 }}
          >
            Tu próximo descubrimiento está a la{" "}
            <span className="gradient-text">vuelta de la esquina.</span>
          </h2>
          <p
            className="mt-6 text-[color:var(--text-secondary)] max-w-[56ch]"
            style={{
              fontSize: "var(--text-body)",
              lineHeight: 1.55,
            }}
          >
            Todos los días pasás cerca de cosas que te encantaría tener. Un
            vecino que vende eso que buscás. Un comercio con algo que
            necesitás. Una oportunidad que está mucho más cerca de lo que
            imaginás. <span className="text-white">MeTo conecta todo eso en una sola app.</span>
          </p>
        </motion.div>

        {/* Teaser video — scroll-driven scale */}
        <motion.div
          className="relative mt-16 md:mt-20"
          style={{
            scale: reduced ? 1 : scale,
            borderRadius: reduced ? 24 : radius,
            overflow: "hidden",
            aspectRatio: "16 / 9",
            background: "var(--bg-canvas)",
            border: "1px solid var(--border-strong)",
            boxShadow:
              "0 40px 100px -30px rgba(112, 56, 255, 0.4), 0 20px 60px -20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <video
            className="w-full h-full object-cover"
            src="/videos/teaser.mp4"
            poster="/videos/teaser-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Teaser oficial de MeTo"
          />
        </motion.div>

        {/* Caption below the video */}
        <p className="mt-6 font-mono-tiny text-[color:var(--text-tertiary)] text-center">
          · Teaser oficial · 60 s ·
        </p>
      </div>
    </section>
  );
}
