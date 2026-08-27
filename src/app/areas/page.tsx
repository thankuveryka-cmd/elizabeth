import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Eyebrow } from "@/components/ui";
import { clusters } from "@/data/clusters";
import { villas } from "@/data/villas";
import { clusterSlugByName } from "@/data/clusters";

export const metadata: Metadata = {
  title: "Гео-кластеры Пхукета: где именно жить",
  description:
    "Laguna, Bang Tao, Layan, Kamala/Surin, Cape Yamu, Nai Thon, Nai Harn — инфраструктура, трафик в сезон, кому подходит и кому нет. Без рекламных описаний.",
};

const PHOTOS = ["hero", "view", "sunset", "bay", "terrace", "garden", "pool"];

export default function AreasPage() {
  return (
    <>
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Eyebrow>География</Eyebrow>
        <h1 className="mt-5 text-[2.25rem] sm:text-6xl leading-[1.04] max-w-[20ch]">
          Остров маленький. Разница между районами — огромная
        </h1>
        <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          От Nai Harn до BISP — час в одну сторону. От Cape Yamu до пляжа, где можно купаться, —
          сорок минут. Эти цифры решают, какой будет жизнь, гораздо сильнее, чем метраж дома. По
          каждому кластеру мы пишем и то, кому он не подходит: район без минусов читается как
          реклама и ничего не объясняет.
        </p>
      </div>

      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pb-8">
        <div className="flex flex-col divide-y divide-rule border-y border-rule">
          {clusters.map((c, i) => {
            const count = villas.filter((v) => clusterSlugByName[v.cluster] === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/areas/${c.slug}`}
                className="group grid gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10 items-center"
              >
                <div className="lg:col-span-4">
                  <Photo
                    name={PHOTOS[i % PHOTOS.length]}
                    caption={`${c.name} — панорама кластера`}
                    aspect="16/10"
                    className="transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="lg:col-span-6">
                  <p className="eyebrow text-ink-muted">{c.coast}</p>
                  <h2 className="mt-2 text-[1.75rem] sm:text-4xl leading-tight transition-colors duration-200 group-hover:text-gold-700">
                    {c.name}
                  </h2>
                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[52ch]">
                    {c.positioning}
                  </p>
                  <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-muted max-w-[52ch]">
                    <span className="text-ink-soft">Не подойдёт: </span>
                    {c.notFor}
                  </p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <p className="font-[family-name:var(--font-display)] text-3xl">{count}</p>
                  <p className="text-sm text-ink-muted">
                    {count === 1 ? "объект" : count < 5 ? "объекта" : "объектов"} в каталоге
                  </p>
                  <p className="mt-3 eyebrow text-gold-700">Разбор →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
