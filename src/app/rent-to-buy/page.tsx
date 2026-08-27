import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { VillaCard } from "@/components/VillaCard";
import { Button, Caution, Eyebrow, Metric, Section } from "@/components/ui";
import { villas } from "@/data/villas";

export const metadata: Metadata = {
  title: "Аренда → покупка: зачем сначала прожить сезон",
  description:
    "Почему на Пхукете разумно снять дом на 6–12 месяцев до покупки: что видно только в муссон, как считать разницу в деньгах и как аренда засчитывается в работу по сделке.",
};

const STEPS = [
  {
    n: "01",
    title: "Сезон в аренде, 6–12 месяцев",
    body: "Выбираем район под задачу, а не под картинку. Договор от 30 дней — легальная форма, лицензии не требует. Смотрим дом в муссон: течёт ли крыша, как ведёт себя дренаж на склоне, сколько на самом деле идти до магазина под дождём.",
  },
  {
    n: "02",
    title: "Полевая проверка гипотез",
    body: "Дорога до школы в 7:40 в феврале. Соседи. Шум с прибрежной дороги в хай-сизон. Интернет в грозу. Ни один из этих факторов не виден за неделю просмотров — а именно они определяют, продадите вы дом через три года или нет.",
  },
  {
    n: "03",
    title: "Подбор на основе прожитого",
    body: "К этому моменту вы знаете, что вам нужно, конкретнее любого агента. Мы подключаем непубличную часть предложения: собственники в Layan и Cape Yamu часто не выводят дом в рекламу и говорят только с теми, кого знают.",
  },
  {
    n: "04",
    title: "Сделка и проверка структуры",
    body: "Титул, обременения, разрешение на строительство, что именно регистрируется в Земельном департаменте. Письменное заключение до задатка. Если объект не проходит — снимаем его с показа, даже когда решение уже принято эмоционально.",
  },
];

export default function RentToBuyPage() {
  const rentals = villas.filter((v) => v.dealType === "rent");

  return (
    <>
      {/* ================= ШАПКА ================= */}
      <section className="relative bg-olive-900 text-cream-100 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Photo name="terrace" caption="" aspect="auto" className="h-full w-full opacity-40" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/75 to-olive-900/45"
        />
        <div className="relative mx-auto max-w-[86rem] px-5 sm:px-8 py-16 sm:py-28">
          <Eyebrow tone="light">Аренда → покупка</Eyebrow>
          <h1 className="mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.03] max-w-[16ch]">
            Сначала прожить.
            <span className="block accent text-gold-400 text-[2.75rem] sm:text-[4rem] lg:text-[4.5rem] leading-[1.05] mt-2">
              Потом купить
            </span>
          </h1>
          <p className="mt-7 max-w-[56ch] text-[1.0625rem] sm:text-lg leading-relaxed text-cream-200/85">
            Самая дорогая ошибка на этом рынке — купить дом в районе, в котором вы никогда не
            жили. Она стоит не комиссии агента, а разницы между ценой покупки и ценой срочной
            перепродажи через два года.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button href="/villas?deal=rent" variant="light">
              Виллы в длительную аренду
            </Button>
            <Button href="/contact" variant="ghost">
              Обсудить сезон
            </Button>
          </div>
        </div>
      </section>

      {/* ================= АРГУМЕНТ ================= */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Почему так</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06] max-w-[18ch]">
              Неделя просмотров показывает витрину
            </h2>
            <div className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[58ch]">
              <p>
                Покупатели приезжают в феврале. Февраль на Пхукете — это идеальная погода, полные
                рестораны и ощущение, что так будет всегда. В мае начинается муссон: половина
                заведений закрывается на ремонт, море на западном побережье поднимает флаги, а
                дорога с холма, которая казалась живописной, становится инженерной задачей.
              </p>
              <p>
                Сезон в аренде стоит от $40 000 до $90 000 за шесть месяцев в этом сегменте.
                Ошибка в выборе района стоит дороже: неликвидный дом продаётся на Пхукете год и
                дольше, а дисконт при срочной продаже в этом слое доходит до 15–20%{" "}
                <span className="text-ink-muted">
                  [ДОПУЩЕНИЕ — подтвердить по своей статистике сделок]
                </span>
                .
              </p>
              <p>
                Поэтому мы не считаем аренду «мелким бизнесом рядом с продажей». Это первый этап
                той же работы — и по нашей практике примерно каждая третья сделка начинается
                именно так.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Photo
              name="pool"
              caption="Дом в аренде на сезон — тот же уровень объекта, что и в продаже"
              aspect="4/5"
            />
          </div>
        </div>
      </Section>

      {/* ================= ЧЕТЫРЕ ШАГА ================= */}
      <Section tone="dark">
        <Eyebrow tone="light">Как это устроено</Eyebrow>
        <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06] max-w-[20ch]">
          Четыре шага вместо одного прыжка
        </h2>

        <ol className="mt-14 grid gap-px bg-cream-200/12 border border-cream-200/12 sm:grid-cols-2">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-olive-800 p-7 sm:p-9">
              <p className="font-[family-name:var(--font-display)] text-4xl text-gold-400/80">
                {s.n}
              </p>
              <h3 className="mt-4 text-xl sm:text-2xl">{s.title}</h3>
              <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-cream-200/80">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
          <Metric
            tone="light"
            value="9 из 31"
            label="сделок начались с аренды"
            note="клиент прожил сезон и купил осознанно"
            sample
          />
          <Metric
            tone="light"
            value="6–12"
            label="месяцев — типичный срок"
            note="меньше 30 дней — это уже гостиничная деятельность"
          />
          <Metric
            tone="light"
            value="−30–40%"
            label="ставка в лоу-сизон"
            note="май–октябрь, честное время смотреть остров"
          />
          <Metric
            tone="light"
            value="1 менеджер"
            label="ведёт вас от аренды до сделки"
            note="аренда и продажа у нас — один отдел и одна база"
          />
        </div>
      </Section>

      {/* ================= УСЛОВИЕ ================= */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>Наше условие</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.75rem] leading-[1.08] max-w-[20ch]">
              Аренда засчитывается в работу по сделке
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[56ch]">
              Если вы арендуете через нас и в течение 18 месяцев покупаете тоже через нас, наша
              работа по подбору аренды не тарифицируется отдельно — мы считаем её частью сделки.
              Это не скидка и не акция: нам выгодно, чтобы вы прожили сезон, потому что после
              сезона сделка закрывается быстрее и почти не разваливается на финальной стадии.
            </p>
            <p className="mt-4 text-sm text-ink-muted max-w-[56ch]">
              Условия фиксируются письменно до подписания договора аренды. Комиссия покупателя в
              сделках продажи не взимается — наше вознаграждение платит продавец.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/villas?deal=rent" variant="solid">
                Смотреть аренду
              </Button>
              <Button href="/legal" variant="outline">
                Что важно в договоре аренды
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Caution title="Про краткосрочную аренду — сразу">
              <p>
                Сдача жилья на срок менее 30 дней в Таиланде приравнивается к гостиничной
                деятельности и требует лицензии по Hotel Act. Это касается и вас как будущего
                владельца, и любого «инвестиционного» сценария, который вам покажут.
              </p>
              <p>
                Мы строим все расчёты на аренде от 30 дней. Краткосрочный сценарий обсуждаем
                только по объектам, у которых лицензия есть и подтверждена документом.
              </p>
            </Caution>
          </div>
        </div>
      </Section>

      {/* ================= ОБЪЕКТЫ ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Eyebrow>Доступно сейчас</Eyebrow>
        <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">
          Дома в длительную аренду
        </h2>
        <div className="mt-10 grid gap-10 sm:gap-x-8 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rentals.map((v, i) => (
            <VillaCard key={v.id} villa={v} priority={i === 0} />
          ))}
        </div>
      </div>
    </>
  );
}
