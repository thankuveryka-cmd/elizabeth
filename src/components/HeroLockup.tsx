"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "./Logo";

/**
 * Крупный знак бренда в первом экране. При скролле уезжает вверх, уменьшается
 * и гаснет — а навстречу ему в шапке проявляется компактная версия
 * (см. SiteHeader, событие eliz:herologo).
 *
 * Считаем всё в rAF и двигаем только transform и opacity: никаких layout-свойств,
 * иначе на телефоне это будет заметно дёргаться.
 */
export function HeroLockup() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Без движения: логотип в шапке просто есть с самого начала
      window.dispatchEvent(new CustomEvent("eliz:herologo", { detail: { visible: false } }));
      return;
    }

    let frame = 0;
    let lastHandedOver: boolean | null = null;

    const update = () => {
      frame = 0;
      // Путь, за который лок-ап полностью уходит
      const distance = Math.max(240, window.innerHeight * 0.45);
      const p = Math.min(1, Math.max(0, window.scrollY / distance));

      el.style.transform = `translate3d(0, ${(-p * 56).toFixed(2)}px, 0) scale(${(
        1 - p * 0.22
      ).toFixed(4)})`;
      el.style.opacity = String(Math.max(0, 1 - p * 1.25));

      // Передаём эстафету шапке чуть раньше, чем лок-ап погаснет целиком
      const heroLogoVisible = p < 0.7;
      if (heroLogoVisible !== lastHandedOver) {
        lastHandedOver = heroLogoVisible;
        window.dispatchEvent(
          new CustomEvent("eliz:herologo", { detail: { visible: heroLogoVisible } }),
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
      // Уходим со страницы — возвращаем шапке её логотип
      window.dispatchEvent(new CustomEvent("eliz:herologo", { detail: { visible: false } }));
    };
  }, []);

  return (
    <div ref={ref} className="hero-lockup will-change-transform">
      <LogoMark className="mx-auto h-20 w-24 sm:h-28 sm:w-32 text-cream-200/90" />
      <p className="hero-word font-[family-name:var(--font-display)] text-cream-100">
        ELIZABETH
      </p>
      <p className="script text-gold-400 text-lg sm:text-2xl mt-1">Luxury Villa Collection</p>
    </div>
  );
}
