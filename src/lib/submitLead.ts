/**
 * ЕДИНСТВЕННАЯ ТОЧКА ПОДКЛЮЧЕНИЯ БЭКЕНДА.
 *
 * Сейчас заявка уходит через mailto — без сервера и базы, как и задумано на этом этапе.
 * Чтобы подключить обработчик, замените тело `submitLead` на реальный запрос:
 *
 *   const res = await fetch("/api/lead", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(lead),
 *   });
 *   if (!res.ok) return { ok: false, error: "Не удалось отправить. Напишите в WhatsApp." };
 *   return { ok: true };
 *
 * Форма и её состояния (ошибка/успех) менять при этом не нужно.
 */

import { contacts } from "@/data/agency";

export type Lead = {
  name: string;
  contact: string;
  channel: "whatsapp" | "telegram" | "email";
  goal: "relocate" | "invest" | "second-home" | "try-first";
  deal: "sale" | "rent" | "undecided";
  budget: string;
  timing: string;
  clusters: string[];
  villaId?: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

const GOALS: Record<Lead["goal"], string> = {
  relocate: "Переезд с семьёй",
  invest: "Доходная аренда",
  "second-home": "Второй дом",
  "try-first": "Сезон перед покупкой",
};

const DEALS: Record<Lead["deal"], string> = {
  sale: "Покупка",
  rent: "Длительная аренда",
  undecided: "Пока не решил",
};

const CHANNELS: Record<Lead["channel"], string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  email: "Email",
};

/** Читаемое письмо — чтобы менеджер видел квалификацию, а не JSON. */
export function formatLead(lead: Lead): string {
  return [
    `Имя: ${lead.name}`,
    `Связь: ${CHANNELS[lead.channel]} — ${lead.contact}`,
    "",
    `Задача: ${GOALS[lead.goal]}`,
    `Тип сделки: ${DEALS[lead.deal]}`,
    `Бюджет: ${lead.budget}`,
    `Сроки: ${lead.timing}`,
    `Районы: ${lead.clusters.length ? lead.clusters.join(", ") : "не выбраны"}`,
    lead.villaId ? `Объект из каталога: ${lead.villaId}` : "",
    "",
    "Комментарий:",
    lead.message || "—",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  try {
    const subject = `Заявка с сайта — ${GOALS[lead.goal]}, ${lead.budget}`;
    const href = `mailto:${contacts.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(formatLead(lead))}`;
    window.location.href = href;
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: `Почтовый клиент не открылся. Напишите в WhatsApp ${contacts.whatsappDisplay} — ответим так же быстро.`,
    };
  }
}
