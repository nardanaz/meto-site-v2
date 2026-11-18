type Props = {
  size?: number;
  variant?: "flat" | "gradient";
  /** Loop the coral dot through the 5 canonical positions (official Motion 01 "Respiración") */
  animated?: boolean;
  className?: string;
};

export default function Isotype({
  size = 40,
  variant = "flat",
  animated = false,
  className,
}: Props) {
  const id = `iso-grad-${variant}`;
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7038FF" />
            <stop offset="100%" stopColor="#9B72FF" />
          </linearGradient>
        </defs>
      )}
      <rect
        width="140"
        height="140"
        rx="32"
        fill={variant === "gradient" ? `url(#${id})` : "#7038FF"}
      />
      <g transform="translate(28, 28)">
        <rect x="0" y="0" width="38" height="38" rx="4" fill="#FFFFFF" />
        <rect x="46" y="0" width="38" height="38" rx="4" fill="#FFFFFF" />
        <rect x="0" y="46" width="38" height="38" rx="4" fill="#FFFFFF" />
        <rect x="46" y="46" width="38" height="38" rx="4" fill="#FFFFFF" />
        {animated ? (
          <circle r="8" fill="#FF4D6D">
            <animate
              attributeName="cx"
              values="42; 19; 65; 65; 19; 42"
              keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
            />
            <animate
              attributeName="cy"
              values="42; 19; 19; 65; 65; 42"
              keyTimes="0; 0.2; 0.4; 0.6; 0.8; 1"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </circle>
        ) : (
          <circle cx="42" cy="42" r="8" fill="#FF4D6D" />
        )}
      </g>
    </svg>
  );
}
