import Link from "next/link";
import type { ReactNode } from "react";

/** Надзаголовок секции — тонкая линия + разрядка, как в печатном каталоге. */
export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tone === "light" ? "text-gold-400/85" : "text-gold-700"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-8 ${tone === "light" ? "bg-gold-400/50" : "bg-gold-500/55"}`}
      />
      {children}
    </p>
  );
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "dark" | "cream";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    dark: "bg-olive-800 text-cream-100",
    cream: "bg-cream-100 text-ink",
  };
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-[var(--spacing-section)] sm:py-[var(--spacing-section-lg)]">
        {children}
      </div>
    </section>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center eyebrow min-h-[48px] px-6 py-3.5 transition-colors duration-200 cursor-pointer text-center";
  const variants = {
    solid: "bg-olive-800 text-cream-100 hover:bg-olive-900",
    outline: "border border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-cream-100",
    light: "bg-cream-100 text-olive-900 hover:bg-gold-400 hover:text-olive-900",
    ghost:
      "border border-cream-200/35 text-cream-100 hover:border-gold-400 hover:text-gold-400",
  };
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/** Пометка примерных данных — видимая, а не сноской в подвале. */
export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-block eyebrow text-[0.6875rem] text-gold-700 border border-gold-500/40 px-1.5 py-0.5 align-middle ${className}`}
      title="Пример. Заменить реальными данными перед публикацией."
    >
      Пример
    </span>
  );
}

/** Числовой факт с расшифровкой — элемент доверия, а не декоративная плашка. */
export function Metric({
  value,
  label,
  note,
  sample,
  tone = "dark",
}: {
  value: string;
  label: string;
  note: string;
  sample?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <div className={tone === "light" ? "text-cream-100" : "text-ink"}>
      <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
        {value}
        {sample && <SampleTag className="ml-2 -translate-y-2" />}
      </p>
      <p className={`mt-2 text-sm ${tone === "light" ? "text-cream-200/85" : "text-ink-soft"}`}>
        {label}
      </p>
      <p
        className={`mt-1 text-[0.8125rem] leading-snug ${
          tone === "light" ? "text-cream-300/60" : "text-ink-muted"
        }`}
      >
        {note}
      </p>
    </div>
  );
}

/** Плашка «мы обязаны предупредить» — юридическая честность как элемент дизайна. */
export function Caution({ children, title = "Что важно знать" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="border-l-2 border-gold-500 bg-cream-100 px-5 py-5 sm:px-7 sm:py-6">
      <p className="eyebrow text-gold-700">{title}</p>
      <div className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}
