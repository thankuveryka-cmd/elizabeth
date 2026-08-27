import type { Metadata } from "next";
import { Suspense } from "react";
import { Eyebrow } from "@/components/ui";
import { QualifyForm } from "@/components/QualifyForm";
import { contacts, legalDisclaimer } from "@/data/agency";

export const metadata: Metadata = {
  title: "Заявка: бюджет, задача, сроки",
  description:
    "Короткая форма квалификации: с чем пришли, бюджет, сроки, районы. В ответ — три-четыре объекта с указанием того, что в каждом из них не так.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[86rem] px-5 sm:px-8 pt-14 pb-8 sm:pt-20">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* --- Левая колонка: зачем эта форма --- */}
        <div className="lg:col-span-5 xl:col-span-4">
          <Eyebrow>Заявка</Eyebrow>
          <h1 className="mt-5 text-[2.25rem] sm:text-5xl leading-[1.05]">
            Четыре вопроса вместо тридцати ссылок
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            Форма выглядит длиннее, чем «имя и телефон», намеренно. Ответы на эти вопросы решают,
            будем ли мы говорить о дороге до школы в час пик или о структуре расходов по объекту —
            это два разных разговора, и совместить их в одной подборке нельзя.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="eyebrow text-gold-700">Что вы получите</p>
              <ul className="mt-3.5 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                <li>Три-четыре объекта под задачу, а не выгрузку каталога</li>
                <li>По каждому — что с ним не так, до просмотра</li>
                <li>Схему структуры сделки по тому, который подойдёт</li>
              </ul>
            </div>

            <div className="hairline pt-6">
              <p className="eyebrow text-gold-700">Быстрее письма</p>
              <ul className="mt-3.5 space-y-2.5 text-[0.9375rem]">
                <li>
                  <a
                    href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
                    className="text-ink hover:text-gold-700 transition-colors duration-200 underline underline-offset-4 decoration-rule"
                  >
                    WhatsApp {contacts.whatsappDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${contacts.telegram}`}
                    className="text-ink hover:text-gold-700 transition-colors duration-200 underline underline-offset-4 decoration-rule"
                  >
                    Telegram @{contacts.telegram}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-ink hover:text-gold-700 transition-colors duration-200 underline underline-offset-4 decoration-rule"
                  >
                    {contacts.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-[0.8125rem] text-ink-muted">
                {contacts.office}
                <br />
                {contacts.hours}
              </p>
            </div>

            <p className="hairline pt-6 text-[0.8125rem] leading-relaxed text-ink-muted">
              {legalDisclaimer}
            </p>
          </div>
        </div>

        {/* --- Правая колонка: форма --- */}
        <div className="lg:col-span-7 xl:col-span-8">
          <Suspense
            fallback={
              <div className="border border-rule bg-cream-100 p-10 text-sm text-ink-muted">
                Загружаем форму…
              </div>
            }
          >
            <QualifyForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
