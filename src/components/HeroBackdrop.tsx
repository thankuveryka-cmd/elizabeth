"use client";

import { useEffect, useRef } from "react";

/**
 * Фон первого экрана.
 *
 * Слои снизу вверх:
 *   1. градиент-заглушка — виден, пока не положена реальная фотография;
 *   2. сама фотография с медленным отъездом и параллаксом;
 *   3. свечение низкого солнца за деревом, медленно дышит;
 *   4. дрейф тумана над травой;
 *   5. затемнение под текст — без него кремовый текст не читается на светлом небе.
 *
 * КУДА КЛАСТЬ ФОТО: public/photos/hero.jpg
 * Файла нет — показывается заглушка, вёрстка не ломается.
 */
export function HeroBackdrop() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Фон уезжает втрое медленнее контента — глубина без «плавающей» страницы
      const y = Math.min(window.scrollY, window.innerHeight) * 0.3;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      {/* Заглушка под фотографией — если файла нет, экран не станет пустым */}
      <div className="hero-fallback" />

      <div ref={imgRef} className="hero-parallax will-change-transform">
        <div className="hero-photo" />
      </div>

      <div className="hero-sun" />
      <div className="hero-mist" />
      <div className="hero-scrim" />
    </div>
  );
}
