import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo } from "@/components/Photo";
import { VillaCard } from "@/components/VillaCard";
import { Button, Caution, Eyebrow, SampleTag } from "@/components/ui";
import { clusterSlugByName, getCluster } from "@/data/clusters";
import {
  formatPrice,
  getVilla,
  jobLabel,
  ownershipLabel,
  statusLabel,
  villas,
} from "@/data/villas";

export function generateStaticParams() {
  return villas.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const villa = getVilla(id);
  if (!villa) return { title: "Объект не найден" };
  return {
    title: `${villa.title}, ${villa.cluster} — ${formatPrice(villa)}`,
    description: villa.summary,
  };
}

/** Аргументы под задачу: один объект — разные разговоры. */
const JOB_ANGLE: Record<string, { title: string; body: (v: NonNullable<ReturnType<typeof getVilla>>) => string }> = {
  relocate: {
    title: "Если вы переезжаете",
    body: (v) =>
      `Смотрите на дорогу, а не на площадь: ${v.nearby
        .slice(0, 2)
        .map((n) => `${n.place} — ${n.minutes} мин`)
        .join(", ")}. В хай-сизон эти цифры растут в полтора раза. Проверьте маршрут в будний день между 7:30 и 9:00, до того как принимать решение.`,
  },
  invest: {
    title: "Если вы считаете доход",
    body: (v) =>
      v.rentalLicensed
        ? `У проекта есть гостиничная лицензия — краткосрочная сдача здесь легальна, и это меньшинство объектов на острове. Считайте от NOI: содержание оценивается в $${(v.annualCostsUSD ?? 0).toLocaleString("en-US")} в год, и это до менеджмента и простоя.`
        : `Гостиничной лицензии у объекта нет. Легальный сценарий — аренда от 30 дней; сдача посуточно попадает под Hotel Act и требует разрешительного статуса. Любую модель доходности стройте только на длительной аренде.`,
  },
  "second-home": {
    title: "Если это второй дом",
    body: (v) =>
      `Главный расход второго дома — не покупка, а содержание в ваше отсутствие: бассейн, сад, влажность, охрана. По этому объекту ориентир — $${(v.annualCostsUSD ?? 12_000).toLocaleString("en-US")} в год плюс управление. В муссон дом без присмотра теряет состояние за один сезон.`,
  },
  "try-first": {
    title: "Если сначала пробуете",
    body: () =>
      `Ставка ниже на 30–40% в мае–октябре. Это худшая погода и лучшее время понять район без витрины хай-сизона: если он нравится в муссон, в феврале он понравится тем более.`,
  },
};

export default async function VillaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const villa = getVilla(id);
  if (!villa) notFound();

  const clusterSlug = clusterSlugByName[villa.cluster];
  const cluster = clusterSlug ? getCluster(clusterSlug) : undefined;
  const similar = villas.filter((v) => v.id !== villa.id && v.dealType === villa.dealType).slice(0, 3);

  return (
    <>
      {/* ================= ШАПКА ОБЪЕКТА ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pt-8 sm:pt-12">
        <nav aria-label="Хлебные крошки" className="eyebrow text-ink-muted">
          <Link href="/villas" className="hover:text-gold-700 transition-colors duration-200">
            Каталог
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          {cluster ? (
            <Link
              href={`/areas/${cluster.slug}`}
              className="hover:text-gold-700 transition-colors duration-200"
            >
              {villa.cluster}
            </Link>
          ) : (
            <span>{villa.cluster}</span>
          )}
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-[2rem] sm:text-5xl lg:text-[3.5rem] leading-[1.05]">
              {villa.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="eyebrow border border-rule px-3 py-1.5 text-ink-soft">
                {villa.dealType === "sale" ? "Продажа" : "Длительная аренда"}
              </span>
              <span className="eyebrow border border-rule px-3 py-1.5 text-ink-soft">
                {statusLabel[villa.status]} · {villa.year}
              </span>
              <span className="eyebrow border border-rule px-3 py-1.5 text-ink-soft">
                {ownershipLabel[villa.ownership]}
              </span>
              {villa.rentalLicensed && (
                <span className="eyebrow border border-emerald-signal/45 text-emerald-signal px-3 py-1.5">
                  Гостиничная лицензия есть
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
              {formatPrice(villa)}
            </p>
            {villa.pricePeriod === "month" && (
              <p className="mt-1.5 text-sm text-ink-muted">
                ставка хай-сизона, май–октябрь ниже
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= ГАЛЕРЕЯ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 mt-8 sm:mt-12">
        <div className="grid gap-2 sm:gap-3 sm:grid-cols-12">
          <Photo
            name={villa.images[0]}
            caption={villa.imageCaptions[0]}
            aspect="16/10"
            priority
            className="sm:col-span-12 lg:col-span-8"
          />
          <div className="hidden lg:grid lg:col-span-4 gap-3">
            {villa.images.slice(1, 3).map((img, i) => (
              <Photo
                key={img}
                name={img}
                caption={villa.imageCaptions[i + 1]}
                aspect="4/3"
              />
            ))}
          </div>
        </div>
        {/* Ниже lg боковой колонки нет, поэтому кадры 2 и 3 показываем здесь —
            иначе на мобильном они выпадали бы из галереи целиком. */}
        <div className="mt-2 grid grid-cols-2 gap-2 lg:hidden">
          {villa.images.slice(1).map((img, i) => (
            <Photo key={img} name={img} caption={villa.imageCaptions[i + 1]} aspect="4/3" />
          ))}
        </div>
        <div className="mt-3 hidden gap-3 lg:grid lg:grid-cols-4">
          {villa.images.slice(3).map((img, i) => (
            <Photo key={img} name={img} caption={villa.imageCaptions[i + 3]} aspect="4/3" />
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Плейсхолдеры под съёмку. Профессиональная фотосессия объекта проводится после подписания
          соглашения с собственником — рендеры девелопера мы подписываем как рендеры.
        </p>
      </div>

      {/* ================= ОСНОВНОЙ БЛОК ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 mt-14 sm:mt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* --- левая колонка --- */}
          <div className="lg:col-span-7 xl:col-span-8">
            <p className="text-lg sm:text-xl leading-relaxed text-ink-soft max-w-[62ch]">
              {villa.summary}
            </p>

            {/* Характеристики */}
            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-px bg-rule border border-rule">
              {[
                ["Спальни", String(villa.bedrooms)],
                ["Санузлы", String(villa.bathrooms)],
                ["Дом", `${villa.livingAreaSqm} м²`],
                ["Участок", `${villa.landSizeSqm.toLocaleString("ru-RU")} м²`],
                ["Кластер", villa.cluster],
                [
                  villa.status === "off-plan" ? "Сдача" : "Построен",
                  String(villa.year),
                ],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper px-4 py-5 sm:px-5">
                  <dt className="eyebrow text-ink-muted">{k}</dt>
                  <dd className="mt-1.5 font-[family-name:var(--font-display)] text-2xl">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Честный минус — выше по странице, чем достоинства */}
            <div className="mt-12">
              <Caution title="Что не так с этим объектом">
                <p>{villa.tradeoff}</p>
              </Caution>
            </div>

            {/* Структура владения */}
            <section className="mt-14">
              <Eyebrow>Структура владения</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">
                {ownershipLabel[villa.ownership]}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[60ch]">
                {villa.ownershipNote}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted max-w-[60ch]">
                Иностранец не может владеть землёй в Таиланде — это Земельный кодекс, а не серая
                зона. Значение имеет только то, что фактически зарегистрировано в Земельном
                департаменте. Разбор трёх структур и их рисков — в{" "}
                <Link href="/legal" className="text-gold-700 underline underline-offset-4">
                  юридическом гиде
                </Link>
                .
              </p>
            </section>

            {/* Что мы проверили */}
            <section className="mt-14">
              <Eyebrow>Что мы проверили по этому объекту</Eyebrow>
              <ul className="mt-6 divide-y divide-rule border-y border-rule">
                {villa.dueDiligence.map((d) => (
                  <li key={d} className="flex gap-4 py-4">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1 h-4 w-4 shrink-0 text-gold-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted max-w-[60ch]">
                Полное письменное заключение с рисками передаётся до внесения задатка. Проверку
                подтверждает лицензированный тайский юрист — мы не заменяем его собой.
              </p>
            </section>

            {/* Планировка */}
            <section className="mt-14">
              <Eyebrow>Планировка</Eyebrow>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Photo
                  name="plan"
                  caption="Место под поэтажный план: чертёж в масштабе с указанием площадей"
                  aspect="4/3"
                />
                <ul className="divide-y divide-rule border-y border-rule sm:border-t-0 sm:pt-0">
                  {villa.floorPlan.map((f) => (
                    <li key={f.level} className="py-4 first:pt-0 sm:first:pt-4">
                      <p className="eyebrow text-gold-700">{f.level}</p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {f.rooms}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Что рядом */}
            <section className="mt-14">
              <Eyebrow>Что рядом</Eyebrow>
              <p className="mt-4 text-sm text-ink-muted">
                Время в пути на машине вне часа пик. В хай-сизон закладывайте плюс 40–50%.
              </p>
              <ul className="mt-6 divide-y divide-rule border-y border-rule">
                {villa.nearby.map((n) => (
                  <li key={n.place} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-[0.9375rem] text-ink-soft">{n.place}</span>
                    <span className="font-[family-name:var(--font-display)] text-lg whitespace-nowrap">
                      {n.minutes} мин
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Разные аргументы под разные задачи */}
            <section className="mt-14">
              <Eyebrow>Один дом — разные разговоры</Eyebrow>
              <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight max-w-[20ch]">
                Что смотреть именно вам
              </h2>
              <div className="mt-8 grid gap-px bg-rule border border-rule sm:grid-cols-2">
                {villa.fitsJobs.map((j) => {
                  const angle = JOB_ANGLE[j];
                  return (
                    <div key={j} className="bg-paper p-6 sm:p-7">
                      <p className="eyebrow text-gold-700">{jobLabel[j]}</p>
                      <h3 className="mt-2.5 text-xl">{angle.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {angle.body(villa)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Экономика владения */}
            {villa.dealType === "sale" && (
              <section className="mt-14">
                <Eyebrow>Экономика владения</Eyebrow>
                <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight max-w-[22ch]">
                  Мы не публикуем цифру доходности
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[60ch]">
                  Любой «yield 8–10%» на баннере — это выручка до расходов, посчитанная на
                  загрузке, которую никто не подтверждает документом. Мы отдаём модель, в которой
                  видны все допущения, и вы можете спорить с каждым.
                </p>

                <div className="mt-8 border border-rule">
                  <div className="flex items-center gap-3 border-b border-rule bg-cream-100 px-5 py-4">
                    <p className="eyebrow text-ink-soft">Структура расчёта</p>
                    <SampleTag />
                  </div>
                  <dl className="divide-y divide-rule">
                    {[
                      [
                        "Содержание объекта",
                        `≈ $${(villa.annualCostsUSD ?? 0).toLocaleString("en-US")} в год`,
                        "Бассейн, сад, охрана, страховка, взнос УК, ремонтный резерв",
                      ],
                      [
                        "Валовая выручка от аренды",
                        "[ПРИМЕР — заменить реальными данными]",
                        "Считается от подтверждённых ставок и фактической загрузки по месяцам",
                      ],
                      [
                        "Управление и простой",
                        "[ПРИМЕР — заменить реальными данными]",
                        "Комиссия управляющей компании, вакансия между арендаторами, амортизация",
                      ],
                      [
                        "NOI и доходность",
                        "[ПРИМЕР — заменить реальными данными]",
                        "Итог после всех расходов и налогов — единственная цифра, о которой имеет смысл говорить",
                      ],
                    ].map(([k, v, note]) => (
                      <div key={k} className="px-5 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <dt className="text-[0.9375rem] text-ink">{k}</dt>
                          <dd className="text-[0.9375rem] text-ink-soft font-[family-name:var(--font-sans)]">
                            {v}
                          </dd>
                        </div>
                        <p className="mt-1 text-[0.8125rem] text-ink-muted">{note}</p>
                      </div>
                    ))}
                  </dl>
                </div>

                <p className="mt-4 text-sm text-ink-muted max-w-[60ch]">
                  Модель по конкретному объекту готовится индивидуально и передаётся в файле с
                  формулами. Прогноз доходности не является офертой и не гарантируется.
                </p>
              </section>
            )}
          </div>

          {/* --- правая колонка: липкий блок действия --- */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 border border-rule bg-cream-100 p-6 sm:p-8">
              <p className="eyebrow text-gold-700">Следующий шаг</p>
              <h2 className="mt-3 text-2xl sm:text-[1.75rem] leading-tight">
                Запросить проверку по этому объекту
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                Пришлём выписку по титулу, схему структуры сделки и список того, что мы бы
                проверили дополнительно перед задатком. Просмотр — вторым шагом, после того как
                вы поймёте, что покупаете.
              </p>

              <div className="mt-7 flex flex-col gap-3">
                <Button href={`/contact?villa=${villa.id}`} variant="solid">
                  Запросить документы
                </Button>
                <Button href="/contact" variant="outline">
                  Записаться на просмотр
                </Button>
              </div>

              <dl className="mt-8 pt-6 border-t border-rule space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Ответ на заявку</dt>
                  <dd className="text-ink">в течение рабочего дня</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Комиссия покупателя</dt>
                  <dd className="text-ink">не взимаем</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">Юридическая проверка</dt>
                  <dd className="text-ink">внешняя фирма</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* ================= РАЙОН ================= */}
      {cluster && (
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 mt-20 sm:mt-28">
          <div className="border border-rule p-7 sm:p-10 bg-cream-100">
            <Eyebrow>Район</Eyebrow>
            <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">{cluster.name}</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[62ch]">
              {cluster.positioning}. {cluster.traffic}
            </p>
            <div className="mt-7">
              <Button href={`/areas/${cluster.slug}`} variant="outline">
                Разбор района целиком
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ПОХОЖИЕ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 mt-20 sm:mt-28">
        <Eyebrow>Ещё в этом формате</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">
          {villa.dealType === "sale" ? "Другие объекты в продаже" : "Другие дома в аренду"}
        </h2>
        <div className="mt-10 grid gap-10 sm:gap-x-8 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((v) => (
            <VillaCard key={v.id} villa={v} />
          ))}
        </div>
      </div>
    </>
  );
}
