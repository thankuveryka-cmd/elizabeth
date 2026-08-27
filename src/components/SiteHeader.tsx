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

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Закрываем мобильное меню при переходе — иначе «назад» ведёт себя непредсказуемо
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-paper/92 backdrop-blur-sm border-b border-rule">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Elizabeth Luxury Villa Collection — на главную"
          >
            <LogoMark className="h-8 w-9 text-olive-800" />
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-display)] text-base sm:text-lg tracking-[0.3em] uppercase">
                Elizabeth
              </span>
              <span className="script text-[0.7rem] text-ink-muted mt-0.5 hidden sm:block">
                Luxury Villa Collection
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Основная навигация">
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`eyebrow transition-colors duration-200 hover:text-gold-700 ${
                    active ? "text-gold-700" : "text-ink-soft"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="eyebrow border border-olive-800 text-olive-800 px-4 py-2.5 transition-colors duration-200 hover:bg-olive-800 hover:text-cream-100"
            >
              Подобрать объект
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="lg:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center text-olive-800 cursor-pointer"
          >
            <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-rule bg-paper">
          <nav className="mx-auto max-w-[86rem] px-5 py-4 flex flex-col" aria-label="Мобильная навигация">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 text-lg font-[family-name:var(--font-display)] border-b border-rule/60 last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="eyebrow text-center bg-olive-800 text-cream-100 py-4"
              >
                Подобрать объект
              </Link>
              <a
                href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
                className="eyebrow text-center border border-olive-800 text-olive-800 py-4"
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
