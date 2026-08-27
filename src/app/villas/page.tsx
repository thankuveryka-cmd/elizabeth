import { Suspense } from "react";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import { VillaFilters } from "@/components/VillaFilters";

export const metadata: Metadata = {
  title: "Каталог вилл Пхукета $1–2M",
  description:
    "Восемь проверенных объектов в Bang Tao, Laguna, Layan, Kamala/Surin, Cape Yamu, Nai Thon и Nai Harn. Фильтры по типу сделки, бюджету, спальням, статусу и структуре владения.",
};

export default function VillasPage() {
  return (
    <>
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pt-14 pb-10 sm:pt-20 sm:pb-14">
        <Eyebrow>Каталог</Eyebrow>
        <h1 className="mt-5 text-[2.25rem] sm:text-6xl leading-[1.04] max-w-[18ch]">
          Восемь объектов, которые мы проверили
        </h1>
        <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Не агрегатор. Каждый объект здесь прошёл проверку титула и структуры сделки, и по
          каждому написано, что с ним не так — про склон в сорок ступеней, узкую дорогу или
          отсутствие лицензии на краткосрочную аренду. Если по объекту нечего написать в блоке
          «что мы проверили», его нет в каталоге.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-16 text-sm text-ink-muted">
            Загружаем подборку…
          </div>
        }
      >
        <VillaFilters />
      </Suspense>
    </>
  );
}
