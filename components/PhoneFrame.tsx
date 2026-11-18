"use client";

import Image from "next/image";

type Screen = {
  src: string;
  alt: string;
  /** Short label shown as a floating badge when this screen is active */
  label?: string;
};

type Props = {
  /** Single-screen mode (back-compat) */
  screen?: string;
  screenAlt?: string;
  /** Loop mode — rotate through these screens. Overrides `screen`. */
  screens?: Screen[];
  /** How long each screen stays fully visible (s) */
  dwell?: number;
  /** Fade duration between screens (s) */
  fade?: number;
  width?: number;
  rotate?: number;
};

export default function PhoneFrame({
  screen,
  screenAlt,
  screens,
  dwell = 3,
  fade = 0.6,
  width = 320,
  rotate = -4,
}: Props) {
  const list: Screen[] =
    screens ??
    (screen ? [{ src: screen, alt: screenAlt ?? "" }] : []);

  const cycleDur = list.length * dwell; // total loop in seconds
  const visiblePct = (dwell / cycleDur) * 100;
  const fadePct = Math.max(1.5, (fade / cycleDur) * 100);

  return (
    <div
      className="relative"
      style={{
        width,
        maxWidth: "70vw",
        aspectRatio: "300 / 620",
        transform: `perspective(1200px) rotateY(${rotate}deg) rotateX(2deg)`,
        transformStyle: "preserve-3d",
        animation: "phone-float 6s ease-in-out infinite",
      }}
    >
      {/* Ambient glow */}
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

      {/* Frame */}
      <div
        className="relative w-full h-full bg-[#0A0A12] p-3 overflow-hidden"
        style={{
          borderRadius: 48,
          boxShadow:
            "0 0 0 1.5px #050508, 0 0 0 3px rgba(255,255,255,0.03), 0 40px 80px -20px rgba(112, 56, 255, 0.35), 0 60px 120px -40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 rounded-[20px] bg-[#050508]"
          style={{ top: 18, width: 110, height: 28, zIndex: 3 }}
        />
        {/* Screen stack */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: 36 }}
        >
          {list.map((s, i) => (
            <Image
              key={s.src + i}
              src={s.src}
              alt={s.alt}
              width={width}
              height={Math.round((width * 620) / 300)}
              priority={i === 0}
              className="hero-screen-img absolute inset-0 w-full h-full object-cover object-top"
              style={{
                animationDelay: `${i * dwell}s`,
                animationDuration: `${cycleDur}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating labels (one per screen, synced to the cycle) */}
      {list.length > 1 && list.some((s) => s.label) && (
        <div
          aria-hidden
          className="absolute"
          style={{
            top: "14%",
            right: "-14%",
            display: "grid",
            gap: 0,
          }}
        >
          {list.map((s, i) =>
            s.label ? (
              <span
                key={s.src + "-label"}
                className="hero-screen-chip font-mono-tiny"
                style={{
                  gridRow: 1,
                  gridColumn: 1,
                  animationDelay: `${i * dwell}s`,
                  animationDuration: `${cycleDur}s`,
                }}
              >
                <span
                  aria-hidden
                  className="chip-dot"
                />
                {s.label}
              </span>
            ) : null
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes phone-float {
          0%, 100% { transform: perspective(1200px) rotateY(${rotate}deg) rotateX(2deg) translateY(0); }
          50%      { transform: perspective(1200px) rotateY(${rotate}deg) rotateX(2deg) translateY(-10px); }
        }
        :global(.hero-screen-img) {
          opacity: 0;
          transform: scale(1.03);
          animation-name: hero-cycle;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-iteration-count: infinite;
          will-change: opacity, transform;
        }
        @keyframes hero-cycle {
          0%             { opacity: 0; transform: scale(1.03); }
          ${fadePct}%    { opacity: 1; transform: scale(1); }
          ${visiblePct}% { opacity: 1; transform: scale(1); }
          ${visiblePct + fadePct}% { opacity: 0; transform: scale(0.98); }
          100%           { opacity: 0; transform: scale(0.98); }
        }
        :global(.hero-screen-chip) {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 12px 7px 10px;
          border-radius: 999px;
          background: color-mix(in oklab, var(--bg-canvas) 70%, transparent);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--border-strong);
          color: var(--text-primary);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          animation-name: chip-cycle;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-iteration-count: infinite;
          will-change: opacity, transform;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
        }
        :global(.chip-dot) {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--coral-500);
          box-shadow: 0 0 8px var(--coral-glow);
        }
        @keyframes chip-cycle {
          0%             { opacity: 0; transform: translateX(10px); }
          ${fadePct}%    { opacity: 1; transform: translateX(0); }
          ${visiblePct}% { opacity: 1; transform: translateX(0); }
          ${visiblePct + fadePct}% { opacity: 0; transform: translateX(-6px); }
          100%           { opacity: 0; transform: translateX(-6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
          :global(.hero-screen-img) { animation: none !important; opacity: 0; }
          :global(.hero-screen-img:first-child) { opacity: 1 !important; transform: none !important; }
          :global(.hero-screen-chip) { animation: none !important; opacity: 0; }
          :global(.hero-screen-chip:first-child) { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
