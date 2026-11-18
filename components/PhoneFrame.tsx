"use client";

import Image from "next/image";

type Product = {
  /** Short emoji or icon for the product thumbnail */
  icon: string;
  name: string;
  price: string;
  distance: string;
  /** Tint of the thumbnail background */
  tone?: "violet" | "coral" | "amber" | "teal";
};

type Screen = {
  src: string;
  alt: string;
  /** Short label for the floating chip (fallback when no product) */
  label?: string;
  /** Rich product card shown next to the phone while this screen is active */
  product?: Product;
  /** Variant for the chip look (default = product card) */
  chipVariant?: "product" | "match" | "chat";
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

const toneBg: Record<NonNullable<Product["tone"]>, string> = {
  violet: "linear-gradient(135deg, rgba(112, 56, 255, 0.35), rgba(74, 31, 217, 0.5))",
  coral:  "linear-gradient(135deg, rgba(255, 77, 109, 0.35), rgba(255, 122, 145, 0.25))",
  amber:  "linear-gradient(135deg, rgba(255, 183, 77, 0.3), rgba(201, 162, 39, 0.3))",
  teal:   "linear-gradient(135deg, rgba(56, 189, 201, 0.3), rgba(26, 127, 153, 0.3))",
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

      {/* Floating rich card (product / match / chat) */}
      {list.length > 1 && list.some((s) => s.product || s.label) && (
        <div
          aria-hidden
          className="absolute hero-card-mount"
          style={{
            top: "16%",
            display: "grid",
            zIndex: 2,
            minWidth: 170,
          }}
        >
          {list.map((s, i) =>
            s.product ? (
              <article
                key={s.src + "-card"}
                className="hero-screen-card hero-screen-card--product"
                style={{
                  gridRow: 1,
                  gridColumn: 1,
                  animationDelay: `${i * dwell}s`,
                  animationDuration: `${cycleDur}s`,
                }}
              >
                <div
                  className="product-thumb"
                  style={{
                    background: toneBg[s.product.tone ?? "violet"],
                  }}
                >
                  <span className="product-icon">{s.product.icon}</span>
                </div>
                <div className="product-info">
                  <p className="product-name">{s.product.name}</p>
                  <p className="product-meta">
                    <span className="product-price">{s.product.price}</span>
                    <span className="product-sep">·</span>
                    <span className="product-distance">
                      <span aria-hidden className="pin-dot" />
                      {s.product.distance}
                    </span>
                  </p>
                </div>
              </article>
            ) : s.chipVariant === "match" ? (
              <div
                key={s.src + "-match"}
                className="hero-screen-card hero-screen-card--match"
                style={{
                  gridRow: 1,
                  gridColumn: 1,
                  animationDelay: `${i * dwell}s`,
                  animationDuration: `${cycleDur}s`,
                }}
              >
                <span className="match-label">¡Match!</span>
                <span className="match-sub">{s.label ?? "Están a cuadras tuyas"}</span>
              </div>
            ) : s.chipVariant === "chat" ? (
              <div
                key={s.src + "-chat"}
                className="hero-screen-card hero-screen-card--chat"
                style={{
                  gridRow: 1,
                  gridColumn: 1,
                  animationDelay: `${i * dwell}s`,
                  animationDuration: `${cycleDur}s`,
                }}
              >
                <span className="chat-dots" aria-hidden>
                  <span /><span /><span />
                </span>
                <span>{s.label ?? "Escribiendo..."}</span>
              </div>
            ) : s.label ? (
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
