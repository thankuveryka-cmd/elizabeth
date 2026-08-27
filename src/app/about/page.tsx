import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { Button, Caution, Eyebrow, Metric, SampleTag, Section } from "@/components/ui";
import {
  competences,
  contacts,
  differentiators,
  dueDiligenceSteps,
  metrics,
  PLACEHOLDER,
} from "@/data/agency";

export const metadata: Metadata = {
  title: "Об агентстве: сделки, процедура проверки, чем отличаемся",
  description:
    "Сколько сделок закрыто и в каких кластерах, как устроена процедура due diligence в шести шагах и чем мы отличаемся от агентств, продающих те же листинги.",
};

export default function AboutPage() {
  return (
    <>
      {/* ================= ШАПКА ================= */}
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pt-14 pb-12 sm:pt-20 sm:pb-16">
        <Eyebrow>Об агентстве</Eyebrow>
        <h1 className="mt-5 text-[2.25rem] sm:text-6xl leading-[1.04] max-w-[19ch]">
          Тот же дом продают ещё двадцать агентств
        </h1>
        <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Листинги на Пхукете почти всегда неэксклюзивны: объект, который вы увидели у нас, есть у
          конкурентов, часто по той же цене. Поэтому вопрос не «у кого больше объектов», а «кому
          вы доверите структурировать сделку на полтора миллиона долларов в чужой юрисдикции».
          Ниже — то, чем мы на этот вопрос отвечаем.
        </p>
      </div>

      {/* ================= ЦИФРЫ ================= */}
      <section className="bg-olive-900 text-cream-100">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {metrics.map((m) => (
              <Metric key={m.label} {...m} tone="light" />
            ))}
          </div>
          <p className="mt-10 text-sm text-cream-300/60 max-w-[70ch]">
            Все показатели на этой странице помечены как примерные и подлежат замене на
            фактические данные агентства перед публикацией сайта. Мы не публикуем цифры, которые
            не можем подтвердить выгрузкой из CRM или реестром сделок.
          </p>
        </div>
      </section>

      {/* ================= ГЕО-КОМПЕТЕНЦИИ ================= */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Где мы работали</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.75rem] leading-[1.08]">
              Пять кластеров вместо «всего Пхукета»
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[46ch]">
              По Самуи, Пангану и Паттайе мы не консультируем и передаём коллегам — не из
              скромности, а потому что там мы не знаем, что происходит с соседним участком.
            </p>
            <div className="mt-8">
              <Photo
                name="view"
                caption="Место под съёмку команды на объекте — люди с именами, а не стоковый офис"
                aspect="4/3"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-rule border-y border-rule">
              {competences.map((c) => (
                <li key={c.cluster} className="py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl">{c.cluster}</h3>
                    <p className="font-[family-name:var(--font-display)] text-lg text-gold-700">
                      {c.deals} <SampleTag />
                    </p>
                  </div>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft max-w-[56ch]">
                    {c.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= ПРОЦЕДУРА DUE DILIGENCE ================= */}
      <Section tone="cream">
        <Eyebrow>Процедура</Eyebrow>
        <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06] max-w-[22ch]">
          Форма due diligence: шесть шагов, одинаковых для всех объектов
        </h2>
        <p className="mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-soft">
          Это не список услуг, а форма, по которой мы проходим каждый объект перед тем, как
          показать его вам. Заключение по шагу 06 передаётся письменно.
        </p>

        <ol className="mt-14 grid gap-px bg-rule border border-rule sm:grid-cols-2 lg:grid-cols-3">
          {dueDiligenceSteps.map((s) => (
            <li key={s.step} className="bg-cream-100 p-6 sm:p-8">
              <p className="font-[family-name:var(--font-display)] text-3xl text-gold-700">
                {s.step}
              </p>
              <h3 className="mt-3.5 text-xl">{s.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ================= ЧЕМ ОТЛИЧАЕМСЯ ================= */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow tone="light">Отличия</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.75rem] leading-[1.08]">
              Что конкурент не сможет скопировать завтра
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-cream-200/80">
              Проверка простая: если отличие можно без правок вписать на сайт другого агентства —
              это не отличие, а вежливость.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-cream-200/12 border-y border-cream-200/12">
              {differentiators.map((d) => (
                <li key={d.title} className="py-6">
                  <h3 className="text-xl sm:text-2xl">{d.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-cream-200/80 max-w-[58ch]">
                    {d.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================= ЧЕГО МЫ НЕ ДЕЛАЕМ ================= */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>Границы</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.75rem] leading-[1.08] max-w-[18ch]">
              Чего мы сознательно не делаем
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                "Не берём комиссию с покупателя — наше вознаграждение платит продавец, и мы говорим об этом до, а не после.",
                "Не показываем объекты, не прошедшие проверку структуры сделки. Семь объектов за время работы были сняты с показа — по каждому есть письменная причина.",
                "Не называем цифру доходности без раскрытой модели расходов. «Yield 10%» без структуры — это выручка, а не доход.",
                "Не работаем за пределами пяти кластеров. Остров большой, знать его целиком с нужной глубиной невозможно.",
                "Не звоним повторно, если вы написали, что думаете. Цикл сделки здесь — от трёх до девяти месяцев, и давление его не сокращает.",
              ].map((x) => (
                <li key={x} className="flex gap-4 max-w-[60ch]">
                  <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-gold-500" />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Caution title="Реквизиты и лицензия">
              <p>
                {contacts.office}
                <br />
                {contacts.officeNote}
              </p>
              <p className="text-ink-muted">
                Юридическое лицо, номер регистрации и данные лицензированного юридического
                партнёра публикуются здесь после верификации. {PLACEHOLDER}
              </p>
            </Caution>

            <div className="border border-rule p-6 sm:p-7">
              <p className="eyebrow text-gold-700">Кейсы</p>
              <h3 className="mt-3 text-xl">Разборы закрытых сделок</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                Каждый кейс — объект, задача клиента, что нашли на проверке, чем закончилось.
                Публикуем только с письменного согласия клиента, поэтому их меньше, чем сделок.
              </p>
              <p className="mt-4 text-sm text-ink-muted">
                {PLACEHOLDER} — раздел наполняется реальными кейсами после согласования.
              </p>
              <div className="mt-6">
                <Button href="/contact" variant="outline">
                  Запросить кейс по вашему сценарию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
