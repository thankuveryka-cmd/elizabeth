"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Появление блока при въезде в экран. Сдвиг маленький (16px) — это должно
 * читаться как проявление, а не как выезд элемента сбоку.
 *
 * Важно для SEO и для тех, у кого не отработал JS: контент отрисован всегда,
 * анимируются только opacity и transform. Ничего не скрывается насовсем.
 */
export function ScrollReveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Уважаем системную настройку: показываем сразу, без движения
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Запускаем чуть раньше, чем блок доедет до низа экрана
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal-target ${shown ? "is-shown" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
