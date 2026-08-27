"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { LogoMark } from "./Logo";
import { clusters } from "@/data/clusters";

/**
 * Первый экран: знак и имя бренда поверх фотографии на всю высоту.
 * При скролле лок-ап уменьшается, уезжает вверх и гаснет — а в шапке
 * навстречу проявляется компактная версия (событие eliz:herologo).
 *
 * Двигаем только transform и opacity, всё считаем в rAF: иначе на телефоне
 * это будет заметно дёргаться.
 */
export function HeroLockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.dispatchEvent(new CustomEvent("eliz:herologo", { detail: { visible: false } }));
      return;
    }

    let frame = 0;
    let handedOver: boolean | null = null;

    const update = () => {
      frame = 0;
      const distance = Math.max(240, window.innerHeight * 0.5);
      const p = Math.min(1, Math.max(0, window.scrollY / distance));

      el.style.transform = `translate3d(0, ${(-p * 70).toFixed(2)}px, 0) scale(${(
        1 - p * 0.25
      ).toFixed(4)})`;
      el.style.opacity = String(Math.max(0, 1 - p * 1.35));

      const heroVisible = p < 0.65;
      if (heroVisible !== handedOver) {
        handedOver = heroVisible;
        window.dispatchEvent(
          new CustomEvent("eliz:herologo", { detail: { visible: heroVisible } }),
        );
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      window.dispatchEvent(new CustomEvent("eliz:herologo", { detail: { visible: false } }));
    };
  }, []);

  return (
    /* Два слоя намеренно: анимация появления с fill-mode заканчивается
       значением transform: none и перебивала бы inline-стиль от скролла —
       у анимаций приоритет выше. Снаружи скролл, внутри появление. */
    <div ref={ref} className="hero-lockup will-change-transform">
      <div className="hero-lockup-in">
      <LogoMark className="mx-auto h-16 w-20 sm:h-24 sm:w-28 text-cream-200/85" />

      <p className="hero-word font-[family-name:var(--font-display)] text-cream-100">
        ELIZABETH
      </p>

      {/* Ряд кластеров — как список регионов в референсе: сразу говорит,
          где мы работаем, и уводит вглубь сайта с первого экрана */}
      <nav
        aria-label="Гео-кластеры"
        className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 px-4"
      >
        {clusters.slice(0, 5).map((c) => (
          <Link
            key={c.slug}
            href={`/areas/${c.slug}`}
            className="eyebrow text-cream-200/80 hover:text-gold-400 transition-colors duration-200"
          >
            {c.name}
          </Link>
        ))}
      </nav>
      </div>
    </div>
  );
}
