"use client";

import { useEffect, useState } from "react";
import { TreeMark } from "./TreeMark";

/**
 * Заставка при первом заходе: только знак-деревце на оливковом поле.
 *
 * Почему без надписи: имя бренда стоит крупно в первом экране сразу под
 * заставкой — на заставке оно читалось как дубль. Плюс шрифт имени
 * подгружается, и на заставке было видно, как подменяется начертание.
 *
 * Заставка держится, пока не выполнится всё сразу:
 *  - прошло минимум времени, чтобы она не мигнула;
 *  - шрифты загружены (иначе текст под ней подменится на глазах);
 *  - страница догрузилась.
 * И в любом случае уходит по предельному сроку, чтобы не запереть сайт.
 */

const MIN_MS = 900;
const MAX_MS = 4000;

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

    let closed = false;
    const timers: number[] = [];

    const close = () => {
      if (closed) return;
      closed = true;
      setPhase("out");
      timers.push(
        window.setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
        }, 700),
      );
    };

    const started = performance.now();
    const waitReady = Promise.all([
      // Шрифты: без этого имя бренда подменяется уже после снятия заставки
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true })),
    ]);

    waitReady.then(() => {
      const left = Math.max(0, MIN_MS - (performance.now() - started));
      timers.push(window.setTimeout(close, left));
    });

    // Предохранитель: что бы ни случилось, сайт открывается
    timers.push(window.setTimeout(close, MAX_MS));

    return () => {
      timers.forEach(clearTimeout);
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
      <TreeMark className="intro-mark h-14 w-[6.4rem] sm:h-20 sm:w-[9.1rem] text-cream-200" />
    </div>
  );
}
