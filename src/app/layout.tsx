import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickySearch } from "@/components/StickySearch";

export const metadata: Metadata = {
  metadataBase: new URL("https://elizabeth-villas.example"),
  title: {
    default: "Elizabeth — виллы Пхукета $1–2M: продажа и длительная аренда",
    template: "%s — Elizabeth Luxury Villa Collection",
  },
  description:
    "Виллы $1–2M в пяти кластерах Пхукета: Bang Tao, Laguna, Layan, Kamala/Surin, Cape Yamu. Проверка структуры сделки до показа, честная экономика владения, длительная аренда как шаг к покупке.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Elizabeth Luxury Villa Collection",
  },
};

/** Подпапка, в которой живёт сайт. Пусто локально, /elizabeth на Pages. */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Файлы в public отдаются с учётом подпапки, в которой живёт сайт.
            На GitHub Pages это /elizabeth, локально — пусто. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href={`${base}/fonts/henri-didot-caps.woff2`}
          crossOrigin=""
        />
        <link
          rel="preload"
          as="image"
          href={`${base}/photos/hero.webp`}
          type="image/webp"
          media="(min-width: 641px)"
        />
        <link
          rel="preload"
          as="image"
          href={`${base}/photos/hero-sm.webp`}
          type="image/webp"
          media="(max-width: 640px)"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-3 focus:left-3 focus:bg-olive-800 focus:text-cream-100 focus:px-4 focus:py-3 focus:eyebrow"
        >
          К основному содержанию
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickySearch />
      </body>
    </html>
  );
}
