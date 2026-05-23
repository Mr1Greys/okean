interface LeadBody {
  name?: string;
  phone?: string;
  email?: string;
  program?: string;
  comment?: string;
  source?: string;
}

interface VercelRequest {
  method?: string;
  body?: LeadBody;
}

interface VercelResponse {
  status(code: number): { json(body: unknown): void };
}

function escapeTelegram(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(503).json({ error: "Telegram not configured" });
  }

  const { name, phone, email, program, comment, source } = req.body ?? {};

  if (!name?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "Name and phone are required" });
  }

  const lines = [
    "<b>Новая заявка с сайта Океана</b>",
    "",
    `<b>Имя:</b> ${escapeTelegram(name.trim())}`,
    `<b>Телефон:</b> ${escapeTelegram(phone.trim())}`,
    program ? `<b>Программа:</b> ${escapeTelegram(program)}` : null,
    email?.trim() ? `<b>Email:</b> ${escapeTelegram(email.trim())}` : null,
    comment?.trim() ? `<b>Комментарий:</b> ${escapeTelegram(comment.trim())}` : null,
    source ? `<b>Источник:</b> ${escapeTelegram(source)}` : null,
  ].filter(Boolean);

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
    }),
  });

  if (!tgRes.ok) {
    console.error("Telegram API error", await tgRes.text());
    return res.status(502).json({ error: "Failed to send notification" });
  }

  return res.status(200).json({ ok: true });
}
