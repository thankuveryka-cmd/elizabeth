"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { VillaCard } from "./VillaCard";
import { Button } from "./ui";
import { jobLabel, villas, type Villa } from "@/data/villas";
import { clusters } from "@/data/clusters";

/** Бюджетные полосы разные для продажи и аренды — иначе фильтр врёт. */
const SALE_BUDGETS = [
  { key: "lt12", label: "до $1.2M", test: (p: number) => p < 1_200_000 },
  { key: "12-16", label: "$1.2–1.6M", test: (p: number) => p >= 1_200_000 && p < 1_600_000 },
  { key: "gt16", label: "от $1.6M", test: (p: number) => p >= 1_600_000 },
];

const RENT_BUDGETS = [
  { key: "lt7", label: "до $7k / мес", test: (p: number) => p < 7_000 },
  { key: "7-10", label: "$7–10k / мес", test: (p: number) => p >= 7_000 && p < 10_000 },
  { key: "gt10", label: "от $10k / мес", test: (p: number) => p >= 10_000 },
];

const DEALS = [
  { key: "sale", label: "Продажа" },
  { key: "rent", label: "Аренда" },
];

const STATUSES = [
  { key: "ready", label: "Готов" },
  { key: "off-plan", label: "Off-plan" },
];

const BEDROOMS = [
  { key: "3", label: "3+" },
  { key: "4", label: "4+" },
  { key: "5", label: "5+" },
];

const JOBS: { key: Villa["fitsJobs"][number]; label: string }[] = (
  ["relocate", "invest", "second-home", "try-first"] as const
).map((k) => ({ key: k, label: jobLabel[k] }));

const clusterNames = Array.from(new Set(villas.map((v) => v.cluster)));

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`eyebrow min-h-[40px] px-3.5 py-2 border transition-colors duration-200 cursor-pointer ${
        active
          ? "bg-olive-800 text-cream-100 border-olive-800"
          : "bg-transparent text-ink-soft border-rule hover:border-olive-600 hover:text-olive-800"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="eyebrow text-ink-muted mb-2.5">{label}</legend>
      {/* Чипы всегда переносятся, ничего не обрезаем */}
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function VillaFilters() {
  const router = useRouter();
  const params = useSearchParams();
  // На мобильном шесть групп фильтров отодвигают выдачу на пол-экрана вниз,
  // поэтому там панель свёрнута. На lg и выше она видна всегда.
  const [open, setOpen] = useState(false);

  const deal = params.get("deal") ?? "";
  const cluster = params.get("cluster") ?? "";
  const budget = params.get("budget") ?? "";
  const beds = params.get("beds") ?? "";
  const status = params.get("status") ?? "";
  const job = params.get("job") ?? "";

  const budgets = deal === "rent" ? RENT_BUDGETS : SALE_BUDGETS;

  /** Состояние фильтров живёт в URL: ссылку можно переслать, «назад» работает. */
  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (next.get(key) === value || value === "") next.delete(key);
      else next.set(key, value);

      // Бюджетные полосы у продажи и аренды разные — при смене типа сделки сбрасываем
      if (key === "deal") next.delete("budget");

      const qs = next.toString();
      router.replace(qs ? `/villas?${qs}` : "/villas", { scroll: false });
    },
    [params, router],
  );

  const results = useMemo(() => {
    return villas.filter((v) => {
      if (deal && v.dealType !== deal) return false;
      if (cluster && v.cluster !== cluster) return false;
      if (status && v.status !== status) return false;
      if (beds && v.bedrooms < Number(beds)) return false;
      if (job && !v.fitsJobs.includes(job as Villa["fitsJobs"][number])) return false;
      if (budget) {
        const band = [...SALE_BUDGETS, ...RENT_BUDGETS].find((b) => b.key === budget);
        if (band && !band.test(v.priceUSD)) return false;
      }
      return true;
    });
  }, [deal, cluster, status, beds, job, budget]);

  const activeCount = [deal, cluster, budget, beds, status, job].filter(Boolean).length;

  return (
    <>
      <div className="border-y border-rule bg-cream-100/60">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-7 sm:py-8">
          {/* Переключатель панели — только на мобильном */}
          <div className="lg:hidden mb-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="filter-panel"
              className="eyebrow inline-flex items-center gap-2.5 min-h-[44px] px-4 border border-olive-800 text-olive-800 cursor-pointer"
            >
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 5h14M6 10h8M8.5 15h3" strokeLinecap="round" />
              </svg>
              Фильтры
              {activeCount > 0 && (
                <span className="bg-olive-800 text-cream-100 px-1.5 py-0.5 text-[0.6875rem]">
                  {activeCount}
                </span>
              )}
            </button>
            <p className="text-sm text-ink-soft" aria-live="polite">
              {results.length} {plural(results.length)}
            </p>
          </div>

          <div
            id="filter-panel"
            className={`${open ? "grid" : "hidden"} lg:grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}
          >
            <FilterGroup label="Тип сделки">
              {DEALS.map((d) => (
                <Chip key={d.key} active={deal === d.key} onClick={() => setParam("deal", d.key)}>
                  {d.label}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label={deal === "rent" ? "Ставка в месяц" : "Бюджет"}>
              {budgets.map((b) => (
                <Chip
                  key={b.key}
                  active={budget === b.key}
                  onClick={() => setParam("budget", b.key)}
                >
                  {b.label}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Спальни">
              {BEDROOMS.map((b) => (
                <Chip key={b.key} active={beds === b.key} onClick={() => setParam("beds", b.key)}>
                  {b.label}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Статус">
              {STATUSES.map((s) => (
                <Chip
                  key={s.key}
                  active={status === s.key}
                  onClick={() => setParam("status", s.key)}
                >
                  {s.label}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Гео-кластер">
              {clusterNames.map((c) => (
                <Chip key={c} active={cluster === c} onClick={() => setParam("cluster", c)}>
                  {c}
                </Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Задача">
              {JOBS.map((j) => (
                <Chip key={j.key} active={job === j.key} onClick={() => setParam("job", j.key)}>
                  {j.label}
                </Chip>
              ))}
            </FilterGroup>
          </div>

          <div
            className={`${
              open ? "flex" : "hidden"
            } lg:flex mt-7 flex-wrap items-center justify-between gap-4 border-t border-rule pt-5`}
          >
            <p className="text-sm text-ink-soft" aria-live="polite">
              {results.length === 0
                ? "Под эти условия ничего нет"
                : `${results.length} ${plural(results.length)} в подборке`}
              {activeCount > 0 && (
                <span className="text-ink-muted"> · фильтров активно: {activeCount}</span>
              )}
            </p>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => router.replace("/villas", { scroll: false })}
                className="eyebrow text-gold-700 hover:text-gold-500 transition-colors duration-200 cursor-pointer min-h-[40px]"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-12 sm:py-16">
        {results.length > 0 ? (
          <div className="grid gap-10 sm:gap-x-8 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((v, i) => (
              <VillaCard key={v.id} villa={v} priority={i < 3} />
            ))}
          </div>
        ) : (
          /* Тупик недопустим: предлагаем следующий шаг, а не «0 результатов» */
          <div className="max-w-[52ch] py-8">
            <h2 className="text-2xl sm:text-3xl">В каталоге такого сейчас нет</h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
              В каталоге восемь объектов — то, что мы проверили сами. Часть предложения в этом
              сегменте вообще не публикуется: собственники в Layan и Cape Yamu нередко просят не
              выводить дом в рекламу. Скажите, что ищете, и мы посмотрим в непубличной части.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="solid">
                Описать задачу
              </Button>
              <button
                type="button"
                onClick={() => router.replace("/villas", { scroll: false })}
                className="eyebrow min-h-[48px] px-6 border border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-cream-100 transition-colors duration-200 cursor-pointer"
              >
                Показать все объекты
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function plural(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "объект";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "объекта";
  return "объектов";
}
