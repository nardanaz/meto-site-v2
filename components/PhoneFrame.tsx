"use client";

import Image from "next/image";

type Props = {
  screen: string;
  screenAlt: string;
  /** Approximate frame width in px at desktop */
  width?: number;
  rotate?: number;
};

export default function PhoneFrame({
  screen,
  screenAlt,
  width = 320,
  rotate = -4,
}: Props) {
  const height = Math.round((width * 620) / 300);
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
      {/* Ambient glow behind the phone */}
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
          style={{
            top: 18,
            width: 110,
            height: 28,
            zIndex: 3,
          }}
        />
        {/* Screen */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: 36 }}
        >
          <Image
            src={screen}
            alt={screenAlt}
            width={width}
            height={height}
            className="w-full h-full object-cover object-top"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes phone-float {
          0%, 100% { transform: perspective(1200px) rotateY(${rotate}deg) rotateX(2deg) translateY(0); }
          50%      { transform: perspective(1200px) rotateY(${rotate}deg) rotateX(2deg) translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
