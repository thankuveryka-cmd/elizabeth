import Link from "next/link";
import { BrandIntro } from "@/components/BrandIntro";
import { HeroLockup } from "@/components/HeroLockup";
import { Photo } from "@/components/Photo";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VillaCard } from "@/components/VillaCard";
import { Button, Caution, Eyebrow, Metric, Section } from "@/components/ui";
import { metrics } from "@/data/agency";
import { clusters } from "@/data/clusters";
import { villas } from "@/data/villas";

/** Три пути читателя. Не «сегменты аудитории», а задачи, с которыми приходят. */
const PATHS = [
  {
    key: "live",
    kicker: "Ищу дом для жизни",
    title: "Переезжаем семьёй",
    lead: "Вопрос не «какая вилла», а «выдержит ли это наша жизнь через год».",
    points: [
      "Дорога до школы в феврале, а не в мае: до BISP из Layan — 25 минут, из Nai Harn — час.",
      "Сколько ступеней от парковки до входа. На склонах Layan это 40 ступеней и уклон 12%.",
      "Что происходит с участком перед домом: вид на холм через два года может стать видом на стройку.",
    ],
    cta: { href: "/villas?job=relocate", label: "Объекты под переезд" },
    second: { href: "/areas", label: "Сравнить районы" },
    photo: "living",
    caption: "Семейная гостиная, утренний свет — съёмка в жилом доме, не в шоуруме",
  },
  {
    key: "invest",
    kicker: "Инвестирую",
    title: "Считаю деньги, а не картинку",
    lead: "Gross yield из презентации застройщика — это не доход. Доход — то, что осталось после расходов.",
    points: [
      "Есть ли у проекта гостиничная лицензия: без неё сдача менее чем на 30 дней — нарушение Hotel Act.",
      "Расходы на содержание: бассейн, сад, охрана, взнос УК, ремонтный резерв. По вилле 680 м² это десятки тысяч в год.",
      "Кто управляет и какая реальная загрузка по месяцам — отчётами, а не словами.",
    ],
    cta: { href: "/villas?job=invest", label: "Объекты под доход" },
    second: { href: "/legal", label: "Что говорит закон об аренде" },
    photo: "infinity",
    caption: "Бассейн управляемой виллы в проекте с лицензией",
  },
  {
    key: "try",
    kicker: "Хочу арендовать перед покупкой",
    title: "Проживу сезон, потом решу",
    lead: "Самое дорогое решение на этом рынке — купить дом в районе, в котором вы не жили.",
    points: [
      "Аренда от 30 дней легальна и не требует лицензии — это база, с которой стоит начинать.",
      "Ставка в лоу-сизон ниже на 30–40%: май–октябрь — честное время увидеть остров без витрины.",
      "Всё, что вы поймёте за сезон, невозможно понять за неделю просмотров.",
    ],
    cta: { href: "/villas?deal=rent", label: "Виллы в аренду" },
    second: { href: "/rent-to-buy", label: "Как работает переход к покупке" },
    photo: "terrace",
    caption: "Терраса дома, снятого на сезон",
  },
];

export default function HomePage() {
  const featured = villas.filter((v) => ["layan-hillside-04", "bangtao-garden-residence-11", "kamala-ridge-02"].includes(v.id));

  return (
    <>
      <BrandIntro />

      {/* ================= HERO ================= */}
      {/* Отрицательный отступ подтягивает первый экран под шапку: она sticky,
          то есть занимает место в потоке, и без этого фото начиналось бы под ней. */}
      <section className="relative -mt-14 sm:-mt-16 min-h-[100svh] flex flex-col bg-olive-900 text-cream-100 overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <Photo name="hero" caption="" aspect="auto" className="h-full w-full opacity-50 slow-pan" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-olive-900/85 via-olive-900/55 to-olive-900/95"
        />

        <div className="relative flex-1 flex flex-col items-center justify-center px-5 pt-24 pb-14 sm:pt-28">
          <HeroLockup />

          <ScrollReveal delay={500} className="mt-10 sm:mt-12 text-center">
            <p className="mx-auto max-w-[30ch] text-[1.0625rem] sm:text-xl leading-snug text-cream-200/90">
              Виллы $1–2M. Проверка структуры сделки — до просмотра, а не после задатка.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/villas" variant="ghost">
                Смотреть каталог
              </Button>
              <Button href="#paths" variant="ghost">
                С чего начать
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Стрелка вниз: обещает, что под первым экраном что-то есть */}
        <a
          href="#paths"
          className="relative z-10 mx-auto mb-8 flex h-11 w-11 items-center justify-center text-cream-200/60 hover:text-gold-400 transition-colors duration-200"
          aria-label="К содержанию страницы"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 hero-chevron" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      {/* ================= ДОВЕРИЕ ================= */}
      <section className="bg-olive-800 text-cream-100">
        <div className="mx-auto max-w-[110rem] px-5 sm:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 80}>
                <Metric {...m} tone="light" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ТРИ ПУТИ ================= */}
      <Section id="paths">
        <div className="max-w-[62ch]">
          <Eyebrow>Развилка</Eyebrow>
          <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06]">
            Один и тот же дом продаётся тремя разными разговорами
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            Релоканту с детьми и инвестору важны противоположные вещи в одном объекте: первому —
            дорога до школы в час пик, второму — статус лицензии на аренду. Универсальная
            презентация не отвечает ни одному из них. Выберите, с чем пришли вы.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 flex flex-col gap-16 sm:gap-24">
          {PATHS.map((path, i) => (
            <article
              key={path.key}
              className="grid gap-8 lg:grid-cols-12 lg:gap-14 items-center"
            >
              <div
                className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Photo name={path.photo} caption={path.caption} aspect="5/4" />
              </div>

              <div className="lg:col-span-7">
                <Eyebrow>{path.kicker}</Eyebrow>
                <h3 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight">{path.title}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[52ch]">
                  {path.lead}
                </p>

                <ul className="mt-7 space-y-4">
                  {path.points.map((p) => (
                    <li key={p} className="flex gap-4 max-w-[58ch]">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-6 shrink-0 bg-gold-500"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button href={path.cta.href} variant="solid">
                    {path.cta.label}
                  </Button>
                  <Button href={path.second.href} variant="outline">
                    {path.second.label}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ================= ЮРИДИЧЕСКАЯ ПРЯМОТА ================= */}
      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow tone="light">Позиция</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-[2.75rem] leading-[1.08]">
              Мы не продаём «90 лет владения»
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[1.0625rem] leading-relaxed text-cream-200/85">
            <p>
              Формула «30+30+30» встречается почти в каждой презентации на острове. Юридически
              это два договорных обещания продлить аренду, а не девяностолетнее право. Решение
              Верховного суда Таиланда от марта 2025 года поставило такие конструкции под
              сомнение: суд, как правило, признаёт гарантированным только первый
              зарегистрированный тридцатилетний срок.
            </p>
            <p>
              Из этого не следует, что leasehold — плохая структура. Из этого следует, что
              покупать её нужно, понимая, что именно зарегистрировано в Земельном департаменте, а
              что осталось обещанием на бумаге между вами и продавцом. Разница проявляется через
              двадцать лет, когда исправить уже нельзя.
            </p>
            <p className="text-cream-300/70">
              То же касается законопроекта о 99-летней аренде и повышения квоты по кондоминиумам
              до 75%: на середину 2026 года это законопроекты, а не действующее право. Любой, кто
              продаёт их вам как факт, либо не читал, либо рассчитывает, что не прочитаете вы.
            </p>
            <div className="pt-2">
              <Button href="/legal" variant="ghost">
                Юридический гид целиком
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ================= ИЗБРАННЫЕ ОБЪЕКТЫ ================= */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[46ch]">
            <Eyebrow>Из каталога</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06]">Три разных решения</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              Частный дом без управляющей компании, проект off-plan с гостиничной лицензией и
              управляемая вилла на гряде. Три разные экономики владения в одном ценовом слое.
            </p>
          </div>
          <Button href="/villas" variant="outline">
            Все {villas.length} объектов
          </Button>
        </div>

        <div className="mt-12 sm:mt-16 grid gap-10 sm:gap-x-8 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <VillaCard key={v.id} villa={v} priority={i === 0} />
          ))}
        </div>
      </Section>

      {/* ================= КЛАСТЕРЫ ================= */}
      <Section tone="cream">
        <div className="max-w-[56ch]">
          <Eyebrow>География</Eyebrow>
          <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06]">
            Мы работаем в пяти кластерах, а не «по всему Пхукету»
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            Локация здесь — не адрес, а образ жизни на ближайшие годы: трафик, школы, шум в
            хай-сизон, направление муссона. По каждому району мы пишем и то, кому он не подходит.
          </p>
        </div>

        <ul className="mt-12 grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3 border border-rule">
          {clusters.map((c) => (
            <li key={c.slug} className="bg-cream-100">
              <Link
                href={`/areas/${c.slug}`}
                className="group flex h-full flex-col p-6 sm:p-7 transition-colors duration-200 hover:bg-paper"
              >
                <p className="eyebrow text-ink-muted">{c.coast}</p>
                <h3 className="mt-2.5 text-2xl transition-colors duration-200 group-hover:text-gold-700">
                  {c.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft flex-1">
                  {c.positioning}
                </p>
                <p className="mt-5 eyebrow text-gold-700">Смотреть район →</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ================= ФИНАЛЬНЫЙ ЭКРАН ================= */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Eyebrow>Следующий шаг</Eyebrow>
            <h2 className="mt-5 text-[2rem] sm:text-5xl leading-[1.06] max-w-[16ch]">
              Начнём с вашей задачи, а не с подборки
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[54ch]">
              Заполните короткую форму: бюджет, цель, сроки. В ответ вы получите не тридцать
              ссылок, а три-четыре объекта с указанием того, что в каждом из них не так — и
              разбор структуры сделки по тому, который вам подойдёт.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/contact" variant="solid">
                Оставить заявку
              </Button>
              <Button href="/about" variant="outline">
                Как мы проверяем объекты
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Caution title="Честно о цикле сделки">
              <p>
                Средний цикл от первого разговора до сделки в этом сегменте — от трёх до девяти
                месяцев. Если вам обещают «подберём за неделю», это про скорость показов, а не про
                качество решения.
              </p>
              <p>
                Мы отвечаем на заявку в течение рабочего дня и не звоним повторно, если вы
                написали, что пока думаете.
              </p>
            </Caution>
          </div>
        </div>
      </Section>
    </>
  );
}
