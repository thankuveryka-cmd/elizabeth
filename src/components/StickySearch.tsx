"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clusters } from "@/data/clusters";

/**
 * Полоса подбора, которая выезжает снизу после первого экрана и остаётся
 * до конца страницы.
 *
 * Отличие от референса: там поля «даты» и «гости» — логика бронирования отеля.
 * Для покупки виллы за $1.5M даты не значат ничего, поэтому третье поле —
 * бюджет, а срок появляется только при выборе аренды, где он осмыслен.
 *
 * Не показываем в каталоге (там свои фильтры, полоса дублировала бы их)
 * и на странице заявки, где идёт заполнение формы.
 */

const HIDE_ON = ["/villas", "/contact"];

const SALE_BUDGETS = [
  { v: "lt12", label: "до $1.2M" },
  { v: "12-16", label: "$1.2–1.6M" },
  { v: "gt16", label: "от $1.6M" },
];

const RENT_BUDGETS = [
  { v: "lt7", label: "до $7k / мес" },
  { v: "7-10", label: "$7–10k / мес" },
  { v: "gt10", label: "от $10k / мес" },
];

export function StickySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  const [deal, setDeal] = useState("");
  const [cluster, setCluster] = useState("");
  const [beds, setBeds] = useState("");
  const [budget, setBudget] = useState("");

  const hidden = HIDE_ON.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (hidden) {
      setShown(false);
      return;
    }
    const onScroll = () => {
      // Выезжает, когда первый экран уже уходит, но задолго до конца страницы
      setShown(window.scrollY > Math.min(420, window.innerHeight * 0.55));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden]);

  // Чтобы полоса не перекрывала низ страницы — резервируем место под неё
  useEffect(() => {
    document.body.classList.toggle("has-sticky-search", shown);
    return () => document.body.classList.remove("has-sticky-search");
  }, [shown]);

  // Бюджетные полосы у продажи и аренды разные — при смене типа сбрасываем
  useEffect(() => setBudget(""), [deal]);

  if (hidden) return null;

  const budgets = deal === "rent" ? RENT_BUDGETS : SALE_BUDGETS;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (cluster) q.set("cluster", cluster);
    if (deal) q.set("deal", deal);
    if (beds) q.set("beds", beds);
    if (budget) q.set("budget", budget);
    const qs = q.toString();
    router.push(qs ? `/villas?${qs}` : "/villas");
  };

  return (
    <form
      onSubmit={submit}
      className={`sticky-search ${shown ? "is-shown" : ""}`}
      aria-label="Быстрый подбор объекта"
      aria-hidden={!shown}
    >
      <div className="mx-auto max-w-[72rem] px-3 sm:px-5">
        <div className="sticky-search-inner">
          <Field label="Район" value={cluster} onChange={setCluster} placeholder="Любой">
            {clusters.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </Field>

          <Field label="Сделка" value={deal} onChange={setDeal} placeholder="Любая">
            <option value="sale">Покупка</option>
            <option value="rent">Аренда</option>
          </Field>

          <Field label="Спальни" value={beds} onChange={setBeds} placeholder="Любое">
            <option value="3">от 3</option>
            <option value="4">от 4</option>
            <option value="5">от 5</option>
          </Field>

          <Field
            label={deal === "rent" ? "Ставка" : "Бюджет"}
            value={budget}
            onChange={setBudget}
            placeholder="Любой"
            className="hidden sm:block"
          >
            {budgets.map((b) => (
              <option key={b.v} value={b.v}>
                {b.label}
              </option>
            ))}
          </Field>

          <button type="submit" className="sticky-search-go" tabIndex={shown ? 0 : -1}>
            Подобрать
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  children,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`sticky-search-field ${className}`}>
      <span className="eyebrow text-ink-muted">{label}</span>
      {/* Нативный select: на телефоне даёт системный выбор, который удобнее
          любого самописного выпадающего списка */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sticky-search-select"
      >
        <option value="">{placeholder}</option>
        {children}
      </select>
    </label>
  );
}
