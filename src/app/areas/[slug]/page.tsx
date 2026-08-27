import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { VillaCard } from "@/components/VillaCard";
import { Button, Caution, Eyebrow } from "@/components/ui";
import { clusterSlugByName, clusters, getCluster } from "@/data/clusters";
import { villas } from "@/data/villas";

export function generateStaticParams() {
  return clusters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) return { title: "Район не найден" };
  return {
    title: `${cluster.name} — район Пхукета: инфраструктура, трафик, кому подходит`,
    description: cluster.positioning + ". " + cluster.notFor,
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) notFound();

  const inCluster = villas.filter((v) => clusterSlugByName[v.cluster] === cluster.slug);
  const others = clusters.filter((c) => c.slug !== cluster.slug).slice(0, 3);

  return (
    <>
      {/* ================= ШАПКА ================= */}
      <section className="relative bg-olive-900 text-cream-100 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Photo name="view" caption="" aspect="auto" className="h-full w-full opacity-40" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/75 to-olive-900/40"
        />
        <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 py-16 sm:py-24">
          <nav aria-label="Хлебные крошки" className="eyebrow text-cream-300/70">
            <Link href="/areas" className="hover:text-gold-400 transition-colors duration-200">
              Районы
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span>{cluster.coast}</span>
          </nav>

          <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.03]">
            {cluster.name}
          </h1>
          <p className="mt-5 accent text-gold-400 text-[1.75rem] sm:text-4xl max-w-[24ch]">
            {cluster.positioning}
          </p>
          <p className="mt-7 max-w-[58ch] text-[1.0625rem] leading-relaxed text-cream-200/85">
            {cluster.intro}
          </p>
          <p className="mt-6 eyebrow text-cream-300/70">{cluster.priceBand}</p>
        </div>
      </section>

      {/* ================= КОМУ ПОДХОДИТ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Кому подходит</Eyebrow>
            <div className="mt-8 flex flex-col gap-8">
              {cluster.fits.map((f) => (
                <div key={f.job} className="border-l-2 border-olive-800 pl-5 sm:pl-7">
                  <h2 className="text-xl sm:text-2xl">{f.job}</h2>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft max-w-[56ch]">
                    {f.why}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Caution title="Кому не подходит">
                <p>{cluster.notFor}</p>
              </Caution>
            </div>
          </div>

          {/* Инфраструктура */}
          <div className="lg:col-span-5">
            <Eyebrow>Инфраструктура</Eyebrow>
            <dl className="mt-7 divide-y divide-rule border-y border-rule">
              {cluster.infrastructure.map((item) => (
                <div key={item.label} className="py-4">
                  <dt className="eyebrow text-gold-700">{item.label}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* ================= ТРАФИК И СЕЗОН ================= */}
      <section className="bg-cream-100">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-14 sm:py-20">
          <Eyebrow>То, о чём не пишут в объявлениях</Eyebrow>
          <div className="mt-8 grid gap-10 sm:gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-[1.5rem] sm:text-3xl leading-tight">Трафик</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[52ch]">
                {cluster.traffic}
              </p>
            </div>
            <div>
              <h2 className="text-[1.5rem] sm:text-3xl leading-tight">Сезонность</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[52ch]">
                {cluster.seasonality}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ОБЪЕКТЫ В КЛАСТЕРЕ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-14 sm:py-20">
        <Eyebrow>В каталоге</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">
          {inCluster.length > 0
            ? `Объекты в ${cluster.name}`
            : `Сейчас в ${cluster.name} публичных объектов нет`}
        </h2>

        {inCluster.length > 0 ? (
          <div className="mt-10 grid gap-10 sm:gap-x-8 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {inCluster.map((v, i) => (
              <VillaCard key={v.id} villa={v} priority={i === 0} />
            ))}
          </div>
        ) : (
          <div className="mt-6 max-w-[54ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
              Мы показываем только то, что проверили сами, поэтому каталог по кластеру бывает
              пустым. Непубличная часть предложения в этом районе обсуждается лично.
            </p>
            <div className="mt-7">
              <Button href="/contact" variant="solid">
                Спросить, что есть в {cluster.name}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ================= ДРУГИЕ РАЙОНЫ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="border-t border-rule pt-10">
          <Eyebrow>Сравнить</Eyebrow>
          <ul className="mt-6 grid gap-px bg-rule border border-rule sm:grid-cols-3">
            {others.map((c) => (
              <li key={c.slug} className="bg-paper">
                <Link
                  href={`/areas/${c.slug}`}
                  className="group block p-6 transition-colors duration-200 hover:bg-cream-100"
                >
                  <p className="eyebrow text-ink-muted">{c.coast}</p>
                  <h3 className="mt-2 text-xl transition-colors duration-200 group-hover:text-gold-700">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                    {c.positioning}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
