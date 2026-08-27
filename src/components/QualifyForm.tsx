"use client";

import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { clusters } from "@/data/clusters";
import { getVilla } from "@/data/villas";
import { submitLead, type Lead } from "@/lib/submitLead";
import { contacts } from "@/data/agency";

const GOALS: { key: Lead["goal"]; label: string; hint: string }[] = [
  { key: "relocate", label: "Переезд с семьёй", hint: "школы, виза, дорога, комьюнити" },
  { key: "invest", label: "Доходная аренда", hint: "NOI, лицензия, управление" },
  { key: "second-home", label: "Второй дом", hint: "2–3 месяца в году, удалённое управление" },
  { key: "try-first", label: "Сезон перед покупкой", hint: "аренда на 6–12 месяцев" },
];

const DEALS: { key: Lead["deal"]; label: string }[] = [
  { key: "sale", label: "Покупка" },
  { key: "rent", label: "Аренда" },
  { key: "undecided", label: "Пока не решил" },
];

const BUDGETS = [
  "до $1M",
  "$1–1.5M",
  "$1.5–2M",
  "от $2M",
  "аренда до $8k / мес",
  "аренда от $8k / мес",
];

const TIMINGS = [
  "Ближайшие 3 месяца",
  "3–6 месяцев",
  "6–12 месяцев",
  "Изучаю рынок, сроков нет",
];

const CHANNELS: { key: Lead["channel"]; label: string; placeholder: string }[] = [
  { key: "whatsapp", label: "WhatsApp", placeholder: "+66 00 000 0000" },
  { key: "telegram", label: "Telegram", placeholder: "@username" },
  { key: "email", label: "Email", placeholder: "you@example.com" },
];

type Errors = Partial<Record<"name" | "contact" | "budget" | "timing", string>>;

export function QualifyForm() {
  const params = useSearchParams();
  const villaId = params.get("villa") ?? undefined;
  const villa = villaId ? getVilla(villaId) : undefined;
  const formId = useId();

  const [goal, setGoal] = useState<Lead["goal"]>("relocate");
  const [deal, setDeal] = useState<Lead["deal"]>("undecided");
  const [channel, setChannel] = useState<Lead["channel"]>("whatsapp");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [budget, setBudget] = useState("");
  const [timing, setTiming] = useState("");
  const [picked, setPicked] = useState<string[]>(villa ? [villa.cluster] : []);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const channelMeta = CHANNELS.find((c) => c.key === channel)!;

  function validate(): Errors {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Как к вам обращаться?";
    if (contact.trim().length < 3) e.contact = `Укажите ${channelMeta.label} для ответа`;
    else if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim()))
      e.contact = "Проверьте адрес — похоже, есть опечатка";
    if (!budget) e.budget = "Выберите диапазон — без него подборка будет наугад";
    if (!timing) e.timing = "Сроки влияют на то, что мы вообще будем смотреть";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      // Фокус на первое поле с ошибкой — иначе на мобильном её просто не видно
      document.getElementById(`${formId}-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    setState("sending");
    const result = await submitLead({
      name,
      contact,
      channel,
      goal,
      deal,
      budget,
      timing,
      clusters: picked,
      villaId,
      message,
    });

    if (result.ok) setState("sent");
    else {
      setServerError(result.error);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-rule bg-cream-100 p-8 sm:p-12">
        <p className="eyebrow text-gold-700">Заявка сформирована</p>
        <h2 className="mt-4 text-[1.75rem] sm:text-4xl leading-tight max-w-[20ch]">
          Должен был открыться почтовый клиент с готовым письмом
        </h2>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft max-w-[54ch]">
          Отправьте его — и мы ответим в течение рабочего дня. Если клиент не открылся, напишите
          напрямую: так даже быстрее.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${contacts.whatsapp.replace(/[^\d]/g, "")}`}
            className="eyebrow inline-flex items-center justify-center min-h-[48px] px-6 bg-olive-800 text-cream-100 hover:bg-olive-900 transition-colors duration-200"
          >
            WhatsApp {contacts.whatsappDisplay}
          </a>
          <a
            href={`https://t.me/${contacts.telegram}`}
            className="eyebrow inline-flex items-center justify-center min-h-[48px] px-6 border border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-cream-100 transition-colors duration-200"
          >
            Telegram @{contacts.telegram}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-7 eyebrow text-ink-muted hover:text-gold-700 transition-colors duration-200 cursor-pointer"
        >
          ← Вернуться к форме
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-rule bg-cream-100">
      {villa && (
        <div className="border-b border-rule bg-olive-800 text-cream-100 px-6 py-4 sm:px-8">
          <p className="eyebrow text-gold-400/85">Заявка по объекту</p>
          <p className="mt-1.5 text-lg">{villa.title}</p>
        </div>
      )}

      <div className="p-6 sm:p-8 lg:p-10 space-y-10">
        {/* --- Шаг 1: задача --- */}
        <fieldset>
          <legend className="eyebrow text-gold-700">01 · С чем пришли</legend>
          <p className="mt-2.5 text-sm text-ink-muted">
            От этого зависит, о чём мы будем говорить: о дороге до школы или о структуре расходов.
          </p>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {GOALS.map((g) => (
              <label
                key={g.key}
                className={`flex cursor-pointer flex-col border px-4 py-3.5 transition-colors duration-200 ${
                  goal === g.key
                    ? "border-olive-800 bg-olive-800 text-cream-100"
                    : "border-rule bg-paper hover:border-olive-600"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="goal"
                    value={g.key}
                    checked={goal === g.key}
                    onChange={() => setGoal(g.key)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${
                      goal === g.key ? "bg-gold-400" : "bg-rule"
                    }`}
                  />
                  <span className="text-[0.9375rem]">{g.label}</span>
                </span>
                <span
                  className={`mt-1 pl-[1.125rem] text-[0.8125rem] ${
                    goal === g.key ? "text-cream-200/70" : "text-ink-muted"
                  }`}
                >
                  {g.hint}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* --- Шаг 2: параметры --- */}
        <fieldset>
          <legend className="eyebrow text-gold-700">02 · Параметры</legend>

          <div className="mt-5 space-y-6">
            <div>
              <p className="text-sm text-ink mb-2.5">Тип сделки</p>
              <div className="flex flex-wrap gap-2">
                {DEALS.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setDeal(d.key)}
                    aria-pressed={deal === d.key}
                    className={`eyebrow min-h-[44px] px-4 border transition-colors duration-200 cursor-pointer ${
                      deal === d.key
                        ? "bg-olive-800 text-cream-100 border-olive-800"
                        : "border-rule text-ink-soft hover:border-olive-600"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor={`${formId}-budget`}
                className="block text-sm text-ink mb-2.5"
              >
                Бюджет
              </label>
              <div className="flex flex-wrap gap-2" id={`${formId}-budget`} tabIndex={-1}>
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setBudget(b);
                      setErrors((e) => ({ ...e, budget: undefined }));
                    }}
                    aria-pressed={budget === b}
                    className={`eyebrow min-h-[44px] px-4 border transition-colors duration-200 cursor-pointer ${
                      budget === b
                        ? "bg-olive-800 text-cream-100 border-olive-800"
                        : "border-rule text-ink-soft hover:border-olive-600"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              {errors.budget && <FieldError>{errors.budget}</FieldError>}
            </div>

            <div>
              <label htmlFor={`${formId}-timing`} className="block text-sm text-ink mb-2.5">
                Сроки
              </label>
              <div className="flex flex-wrap gap-2" id={`${formId}-timing`} tabIndex={-1}>
                {TIMINGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setTiming(t);
                      setErrors((e) => ({ ...e, timing: undefined }));
                    }}
                    aria-pressed={timing === t}
                    className={`eyebrow min-h-[44px] px-4 border transition-colors duration-200 cursor-pointer ${
                      timing === t
                        ? "bg-olive-800 text-cream-100 border-olive-800"
                        : "border-rule text-ink-soft hover:border-olive-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.timing && <FieldError>{errors.timing}</FieldError>}
            </div>

            <div>
              <p className="text-sm text-ink mb-1">Районы, если уже смотрели</p>
              <p className="text-[0.8125rem] text-ink-muted mb-2.5">
                Не обязательно. Если не знаете — мы предложим сами исходя из задачи.
              </p>
              <div className="flex flex-wrap gap-2">
                {clusters.map((c) => {
                  const on = picked.includes(c.name);
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() =>
                        setPicked((p) =>
                          on ? p.filter((x) => x !== c.name) : [...p, c.name],
                        )
                      }
                      aria-pressed={on}
                      className={`eyebrow min-h-[44px] px-4 border transition-colors duration-200 cursor-pointer ${
                        on
                          ? "bg-olive-800 text-cream-100 border-olive-800"
                          : "border-rule text-ink-soft hover:border-olive-600"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </fieldset>

        {/* --- Шаг 3: контакты --- */}
        <fieldset>
          <legend className="eyebrow text-gold-700">03 · Как с вами связаться</legend>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="text-sm text-ink mb-2.5">Удобный канал</p>
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setChannel(c.key)}
                    aria-pressed={channel === c.key}
                    className={`eyebrow min-h-[44px] px-4 border transition-colors duration-200 cursor-pointer ${
                      channel === c.key
                        ? "bg-olive-800 text-cream-100 border-olive-800"
                        : "border-rule text-ink-soft hover:border-olive-600"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <Field
              id={`${formId}-name`}
              label="Имя"
              value={name}
              onChange={(v) => {
                setName(v);
                setErrors((e) => ({ ...e, name: undefined }));
              }}
              error={errors.name}
              autoComplete="name"
              placeholder="Как к вам обращаться"
            />

            <Field
              id={`${formId}-contact`}
              label={channelMeta.label}
              value={contact}
              onChange={(v) => {
                setContact(v);
                setErrors((e) => ({ ...e, contact: undefined }));
              }}
              error={errors.contact}
              placeholder={channelMeta.placeholder}
              type={channel === "email" ? "email" : "text"}
              inputMode={channel === "whatsapp" ? "tel" : channel === "email" ? "email" : "text"}
              autoComplete={
                channel === "email" ? "email" : channel === "whatsapp" ? "tel" : "off"
              }
            />

            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-message`} className="block text-sm text-ink mb-2">
                Что важно знать заранее
              </label>
              <p className="text-[0.8125rem] text-ink-muted mb-2.5">
                Дети и школа, лодка, требования к планировке, ограничения по здоровью — то, что
                отсеет половину объектов ещё до подборки.
              </p>
              <textarea
                id={`${formId}-message`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full border border-rule bg-paper px-4 py-3 text-[0.9375rem] leading-relaxed focus:border-olive-600 outline-none transition-colors duration-200 resize-y"
                placeholder="Например: двое детей в BISP с сентября, нужен дом без ступеней и с рабочим кабинетом"
              />
            </div>
          </div>
        </fieldset>

        {/* --- Отправка --- */}
        <div className="border-t border-rule pt-7">
          {state === "error" && (
            <p
              role="alert"
              className="mb-5 border-l-2 border-gold-500 pl-4 text-[0.9375rem] text-ink-soft"
            >
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "sending"}
            className="eyebrow w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] px-8 bg-olive-800 text-cream-100 hover:bg-olive-900 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
          >
            {state === "sending" ? "Отправляем…" : "Отправить заявку"}
          </button>

          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-muted max-w-[56ch]">
            Отвечаем в течение рабочего дня. Не звоним повторно, если вы написали, что пока
            думаете, и не передаём контакты третьим лицам — включая собственников, до вашего
            согласия.
          </p>
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
}) {
  return (
    <div>
      {/* Лейбл всегда видим — плейсхолдер не заменяет подпись */}
      <label htmlFor={id} className="block text-sm text-ink mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border bg-paper px-4 py-3 text-[0.9375rem] outline-none transition-colors duration-200 ${
          error ? "border-gold-700" : "border-rule focus:border-olive-600"
        }`}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

/** Ошибка рядом с полем, а не общим списком наверху страницы. */
function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-gold-700">
      {children}
    </p>
  );
}
