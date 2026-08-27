/** Знак Elizabeth: дуб с испанским мхом. Векторная интерпретация логотипа. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 96"
      className={className}
      role="img"
      aria-label="Знак Elizabeth — раскидистый дуб"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        {/* крона */}
        <path
          d="M60 12c14 0 25 5 32 12 8 8 12 15 12 19 0 3-2 5-5 5M60 12c-14 0-25 5-32 12-8 8-12 15-12 19 0 3 2 5 5 5"
          strokeWidth="1.4"
        />
        <path d="M24 32c8-7 20-11 36-11s28 4 36 11" />
        <path d="M32 25c7-5 17-8 28-8s21 3 28 8" />
        {/* ствол и ветви */}
        <path d="M60 84V44M60 52c-6-3-12-8-16-14M60 52c6-3 12-8 16-14M60 62c-9-4-18-10-24-18M60 62c9-4 18-10 24-18" strokeWidth="1.5" />
        {/* корневая подушка */}
        <path d="M44 84c5-3 10-4 16-4s11 1 16 4" strokeWidth="1.2" />
        <path d="M36 86h48" strokeWidth="1" opacity="0.55" />
        {/* свисающий мох */}
        {[22, 30, 38, 46, 54, 62, 70, 78, 86, 94].map((x, i) => (
          <path
            key={x}
            d={`M${x} ${30 + (i % 3) * 4}v${16 + ((i * 7) % 18)}`}
            strokeWidth="0.7"
            opacity="0.7"
          />
        ))}
        {[26, 34, 42, 50, 58, 66, 74, 82, 90].map((x, i) => (
          <path
            key={`b-${x}`}
            d={`M${x} ${34 + ((i * 5) % 10)}v${10 + ((i * 11) % 14)}`}
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}
      </g>
    </svg>
  );
}

/** Полная подпись бренда: знак + имя + скрипт. */
export function Wordmark({
  className = "",
  showMark = true,
}: {
  className?: string;
  showMark?: boolean;
}) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      {showMark && <LogoMark className="h-8 w-10 opacity-90" />}
      <span className="font-[family-name:var(--font-display)] text-[1.05rem] tracking-[0.34em] uppercase mt-1.5">
        Elizabeth
      </span>
      <span className="script text-[0.8rem] opacity-70 mt-0.5">Luxury Villa Collection</span>
    </span>
  );
}
