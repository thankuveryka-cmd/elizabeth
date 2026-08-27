import Link from "next/link";
import { TreeMark } from "./TreeMark";
import { contacts, legalDisclaimer } from "@/data/agency";
import { clusters } from "@/data/clusters";

export function SiteFooter() {
  return (
    <footer className="bg-olive-900 text-cream-200 mt-[var(--spacing-section-lg)]">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <TreeMark className="h-10 w-[4.6rem] text-cream-200/85" />
            <p className="font-[family-name:var(--font-wordmark)] text-2xl tracking-[0.24em] uppercase indent-[0.24em] mt-4">
              Elizabeth
            </p>
            <p className="script text-cream-300/75 text-sm">Luxury Villa Collection</p>
            <p className="mt-6 text-sm text-cream-300/70 max-w-[34ch] leading-relaxed">
              Виллы $1–2M в пяти кластерах западного и восточного побережья Пхукета. Продажа и
              длительная аренда.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Разделы сайта">
            <p className="eyebrow text-gold-400/80">Разделы</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[
                ["/villas", "Каталог вилл"],
                ["/areas", "Гео-кластеры"],
                ["/rent-to-buy", "Аренда → покупка"],
                ["/legal", "Юридический гид"],
                ["/about", "Об агентстве"],
                ["/contact", "Заявка"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream-200/80 hover:text-gold-400 transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Районы">
            <p className="eyebrow text-gold-400/80">Районы</p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {clusters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/areas/${c.slug}`}
                    className="text-cream-200/80 hover:text-gold-400 transition-colors duration-200"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold-400/80">Связь</p>
            <ul className="mt-5 space-y-2.5 text-sm text-cream-200/80">
              <li>
                <a
                  href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
                  className="hover:text-gold-400 transition-colors duration-200"
                >
                  WhatsApp {contacts.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`https://t.me/${contacts.telegram}`}
                  className="hover:text-gold-400 transition-colors duration-200"
                >
                  Telegram @{contacts.telegram}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contacts.email}`}
                  className="hover:text-gold-400 transition-colors duration-200"
                >
                  {contacts.email}
                </a>
              </li>
              <li className="pt-2 text-cream-300/60">{contacts.office}</li>
              <li className="text-cream-300/60">{contacts.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream-200/12">
          <p className="text-xs leading-relaxed text-cream-300/75 max-w-[80ch]">
            {legalDisclaimer}
          </p>
          <p className="mt-4 text-xs text-cream-300/65">
            © {new Date().getFullYear()} Elizabeth Luxury Villa Collection. Цены указаны в USD
            справочно; расчёты по сделкам в тайских батах по курсу на дату платежа.
          </p>
        </div>
      </div>
    </footer>
  );
}
