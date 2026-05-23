import type { LeadFormValues } from "@/lib/lead-form";

export type LeadSource = "booking" | "contacts" | "callback";

export interface SubmitLeadPayload extends LeadFormValues {
  source: LeadSource;
}

async function submitViaFormspree(payload: SubmitLeadPayload): Promise<void> {
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  if (!formId) return;

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      email: payload.email || "",
      program: payload.program,
      comment: payload.comment || "",
      source: payload.source,
      _subject: `Заявка с сайта Океана — ${payload.program}`,
    }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Не удалось отправить заявку");
  }
}

async function submitViaApi(payload: SubmitLeadPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return true;
    if (res.status === 503) return false;
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error || "Не удалось отправить заявку");
  } catch (err) {
    if (err instanceof Error && err.message !== "Failed to fetch") throw err;
    return false;
  }
}

/** Отправка заявки: API (Telegram) → Formspree → в dev — успех без сети */
export async function submitLead(payload: SubmitLeadPayload): Promise<void> {
  try {
    const sent = await submitViaApi(payload);
    if (sent) return;
  } catch (err) {
    if (import.meta.env.VITE_FORMSPREE_FORM_ID) {
      await submitViaFormspree(payload);
      return;
    }
    throw err;
  }

  if (import.meta.env.VITE_FORMSPREE_FORM_ID) {
    await submitViaFormspree(payload);
    return;
  }

  if (import.meta.env.DEV) {
    console.info("[lead]", payload);
    return;
  }

  throw new Error(
    "Форма не настроена для отправки. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID на Vercel или VITE_FORMSPREE_FORM_ID.",
  );
}
