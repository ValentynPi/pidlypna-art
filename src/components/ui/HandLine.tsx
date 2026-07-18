interface HandLineProps {
  className?: string;
  variant?: 'underline' | 'circle' | 'swirl';
}

export function HandLine({ className = '', variant = 'underline' }: HandLineProps) {
  if (variant === 'circle') {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className={`pointer-events-none ${className}`}
        aria-hidden
      >
        <path
          d="M60 10 C20 10, 5 50, 15 75 C25 100, 55 110, 85 95 C110 82, 115 55, 100 30 C88 12, 72 8, 60 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    );
  }

  if (variant === 'swirl') {
    return (
      <svg
        viewBox="0 0 200 40"
        fill="none"
        className={`pointer-events-none ${className}`}
        aria-hidden
      >
        <path
          d="M5 28 Q40 5, 80 22 T160 18 T195 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      className={`pointer-events-none ${className}`}
      aria-hidden
    >
      <path
        d="M2 8 Q50 2, 100 6 T198 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
