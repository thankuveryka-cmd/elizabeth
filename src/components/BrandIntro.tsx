"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/**
 * Заставка при первом заходе: знак и имя бренда на оливковом поле,
 * которое затем уходит вверх и открывает главную.
 *
 * Правила, без которых заставка превращается в раздражитель:
 *  - показывается один раз за сессию, а не на каждом переходе;
 *  - выключается при prefers-reduced-motion;
 *  - не блокирует контент: он уже отрисован под ней, заставка только сверху;
 *  - целиком уходит за 1.6 секунды.
 */
export function BrandIntro() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out" | "done">("hidden");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("eliz-intro") === "1";
    } catch {
      // приватный режим — считаем, что не видели, но и записать не сможем
    }

    if (reduced || seen) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem("eliz-intro", "1");
    } catch {}

    document.body.style.overflow = "hidden";
    setPhase("in");

    const toOut = setTimeout(() => setPhase("out"), 1100);
    const toDone = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 1900);

    return () => {
      clearTimeout(toOut);
      clearTimeout(toDone);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro-veil ${phase === "in" ? "is-in" : ""} ${
        phase === "out" ? "is-out" : ""
      }`}
    >
      <div className="intro-lockup">
        <LogoMark className="intro-mark h-24 w-28 text-cream-200" />
        <p className="intro-word font-[family-name:var(--font-display)] text-cream-100">
          ELIZABETH
        </p>
        <p className="intro-tag script text-gold-400">Luxury Villa Collection</p>
      </div>
    </div>
  );
}
