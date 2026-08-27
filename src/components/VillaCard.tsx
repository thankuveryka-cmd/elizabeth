import Link from "next/link";
import { Photo } from "./Photo";
import { headlinePrice, modeLabel, modesOf, ownershipLabel, statusLabel, type Villa } from "@/data/villas";

export function VillaCard({ villa, priority = false }: { villa: Villa; priority?: boolean }) {
  const price = headlinePrice(villa);

  return (
    <article className="group">
      <Link href={`/villas/${villa.id}`} className="block">
        <div className="relative overflow-hidden">
          <Photo
            name={villa.images[0]}
            caption={villa.imageCaptions[0]}
            aspect="4/3"
            priority={priority}
            className="transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.03]"
          />
          <div className="absolute top-0 left-0 flex flex-wrap gap-px">
            {/* Режимы, а не один тип сделки: дом может и сдаваться, и продаваться */}
            {modesOf(villa).map((m) => (
              <span key={m} className="eyebrow bg-paper/95 text-olive-900 px-2.5 py-1.5">
                {modeLabel[m]}
              </span>
            ))}
            {villa.status === "off-plan" && (
              <span className="eyebrow bg-olive-900/90 text-cream-100 px-2.5 py-1.5">
                Off-plan · {villa.year}
              </span>
            )}
            {villa.rentalLicensed && (
              <span className="eyebrow bg-emerald-signal text-white px-2.5 py-1.5">
                Лицензия
              </span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <p className="eyebrow text-ink-muted">{villa.cluster}</p>
            <p className="text-right">
              <span className="font-[family-name:var(--font-display)] text-lg whitespace-nowrap block">
                {price.main}
              </span>
              {price.note && (
                <span className="text-[0.75rem] text-ink-muted whitespace-nowrap">
                  {price.note}
                </span>
              )}
            </p>
          </div>

          <h3 className="mt-3.5 text-[1.375rem] sm:text-2xl leading-tight transition-colors duration-200 group-hover:text-gold-700">
            {villa.title}
          </h3>

          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft line-clamp-3">
            {villa.summary}
          </p>

          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.8125rem] text-ink-muted">
            <div className="flex gap-1.5">
              <dt className="sr-only">Спальни</dt>
              <dd>{villa.bedrooms} спальни</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Размещение</dt>
              <dd>до {villa.sleeps} гостей</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Площадь дома</dt>
              <dd>{villa.livingAreaSqm} м²</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Участок</dt>
              <dd>участок {villa.landSizeSqm.toLocaleString("ru-RU")} м²</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Владение</dt>
              <dd>{ownershipLabel[villa.ownership]}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Статус</dt>
              <dd>{statusLabel[villa.status]}</dd>
            </div>
          </dl>
        </div>
      </Link>
    </article>
  );
}
