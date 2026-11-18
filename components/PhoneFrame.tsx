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
  /** Loop mode — rotate through these screens */
  screens?: Screen[];
  width?: number;
  rotate?: number;
};

export default function PhoneFrame({
  screen,
  screenAlt,
  screens,
  width = 320,
  rotate = -4,
}: Props) {
  const list: Screen[] =
    screens ??
    (screen ? [{ src: screen, alt: screenAlt ?? "" }] : []);

  // Keyframes in globals.css are tuned for a 4-step cycle with ~3.2s dwell
  // and ~0.55s fade. The animationDuration below sets the loop length;
  // keyframes use relative %, so the proportions stay right.
  const dwell = 3.2;
  const cycleDur = Math.max(list.length, 1) * dwell;

  return (
    <div
      className="relative"
      style={{
        width,
        maxWidth: "70vw",
        aspectRatio: "300 / 620",
      }}
    >
      {/* Floating container — 3D tilt stays here, phone-float only translates */}
      <div
        className="relative w-full h-full"
        style={{
          transform: `perspective(1200px) rotateY(${rotate}deg) rotateX(2deg)`,
          transformStyle: "preserve-3d",
          animation: "phone-float 6s ease-in-out infinite",
          willChange: "transform",
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
                className="hero-screen-img"
                style={{
                  animationDelay: `${i * dwell}s`,
                  animationDuration: `${cycleDur}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating chip (label of the active screen) */}
      {list.length > 1 && list.some((s) => s.label) && (
        <div
          aria-hidden
          className="absolute"
          style={{
            top: "12%",
            right: "-16%",
            display: "grid",
            zIndex: 2,
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
                <span aria-hidden className="chip-dot" />
                {s.label}
              </span>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
