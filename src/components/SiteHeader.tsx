"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
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
          {/* --- слева: разделы --- */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Основная навигация">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`eyebrow transition-colors duration-200 ${
                    active ? "text-gold-400" : "text-cream-200/85 hover:text-gold-400"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden -ml-2 inline-flex h-11 w-11 items-center justify-center text-cream-100 cursor-pointer"
          >
            <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              ) : (
                <path d="M3 8h18M3 16h18" strokeLinecap="round" />
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
            <LogoMark className="h-6 w-7 text-cream-200/90 hidden sm:block" />
            <span className="font-[family-name:var(--font-display)] text-sm sm:text-base tracking-[0.34em] uppercase indent-[0.34em]">
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

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-cream-200/12">
          <nav className="mx-auto max-w-[110rem] px-5 py-4 flex flex-col" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 text-lg font-[family-name:var(--font-display)] border-b border-cream-200/10 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <Link href="/contact" className="eyebrow text-center bg-cream-100 text-olive-900 py-4">
                Подобрать объект
              </Link>
              <a
                href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
                className="eyebrow text-center border border-cream-200/40 py-4"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
