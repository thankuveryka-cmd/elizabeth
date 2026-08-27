"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TreeMark } from "./TreeMark";
import { contacts } from "@/data/agency";

const NAV = [
  { href: "/villas", label: "Каталог" },
  { href: "/areas", label: "Районы" },
  { href: "/rent-to-buy", label: "Аренда → покупка" },
  { href: "/legal", label: "Юридика" },
  { href: "/about", label: "Об агентстве" },
];

/**
 * Тонкая тёмная шапка поверх контента.
 *
 * Логотип живёт по центру и проявляется только тогда, когда крупный знак
 * в первом экране уехал вверх (событие eliz:herologo от HeroLockup).
 * На внутренних страницах крупного знака нет — логотип на месте сразу.
 *
 * Отступление от референса намеренное: там разделы спрятаны за бургер даже
 * на десктопе. Бренду отеля это можно, нам — нет: каталог, спрятанный в меню,
 * стоит заявок. Разделы оставляем видимыми, забираем только визуал.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [logoInHeader, setLogoInHeader] = useState(pathname !== "/");

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setLogoInHeader(true);
      return;
    }
    setLogoInHeader(false);
    const onHeroLogo = (e: Event) =>
      setLogoInHeader(!(e as CustomEvent<{ visible: boolean }>).detail.visible);
    window.addEventListener("eliz:herologo", onHeroLogo);
    return () => window.removeEventListener("eliz:herologo", onHeroLogo);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-olive-900 text-cream-100">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8">
        <div className="relative flex items-center justify-between h-14 sm:h-16">
          {/* --- слева: только три полоски, как в референсе --- */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-nav"
            className="-ml-2 inline-flex h-11 w-11 items-center justify-center text-cream-100 cursor-pointer"
          >
            <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              )}
            </svg>
          </button>

          {/* --- по центру: логотип, проявляющийся при скролле --- */}
          <Link
            href="/"
            className={`header-logo absolute left-1/2 -translate-x-1/2 flex items-center gap-2 ${
              logoInHeader ? "is-in" : ""
            }`}
            aria-label="Elizabeth Luxury Villa Collection — на главную"
            tabIndex={logoInHeader ? 0 : -1}
          >
            <TreeMark className="h-5 w-9 text-cream-200/90 hidden sm:block" />
            <span className="font-[family-name:var(--font-wordmark)] text-base sm:text-lg tracking-[0.28em] uppercase indent-[0.28em]">
              Elizabeth
            </span>
          </Link>

          {/* --- справа: целевое действие --- */}
          <Link
            href="/contact"
            className="eyebrow text-cream-200/85 hover:text-gold-400 transition-colors duration-200"
          >
            Заявка
          </Link>
        </div>
      </div>

      {/* Разделы раскрываются поверх экрана: в шапке остаются только
          три полоски, как в референсе */}
      <div
        id="site-nav"
        className={`site-nav ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav
          className="mx-auto max-w-[110rem] px-5 sm:px-8 pt-10 pb-16 sm:pt-16"
          aria-label="Разделы сайта"
        >
          <ul className="flex flex-col">
            {NAV.map((item, i) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href} style={{ transitionDelay: `${60 + i * 45}ms` }} className="site-nav-item">
                  <Link
                    href={item.href}
                    className={`block py-4 sm:py-5 border-b border-cream-200/12 font-[family-name:var(--font-display)] text-[1.75rem] sm:text-5xl leading-tight transition-colors duration-200 ${
                      active ? "text-gold-400" : "hover:text-gold-400"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="eyebrow inline-flex items-center justify-center min-h-[52px] px-8 bg-cream-100 text-olive-900 hover:bg-gold-400 transition-colors duration-200"
            >
              Подобрать объект
            </Link>
            <a
              href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
              className="eyebrow inline-flex items-center justify-center min-h-[52px] px-8 border border-cream-200/40 hover:border-gold-400 hover:text-gold-400 transition-colors duration-200"
            >
              WhatsApp {contacts.whatsappDisplay}
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}
