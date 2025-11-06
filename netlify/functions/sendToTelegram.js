export async function handler(event, context) {
  const TELEGRAM_TOKEN = "7623687903:AAHKCDJKU1S3NwpgijsgegK0GNk_dglYKGI";
  const CHAT_ID = "-1002485012284";

  const data = JSON.parse(event.body || "{}");

  const text =
    `🏡 <b>Новая заявка с сайта</b>\n\n` +
    `👤 Имя: ${data["Имя"]}\n` +
    `📞 Контакт: ${data["Контакт"]}\n` +
    `📝 Пожелания: ${data["Пожелания"] || "—"}\n\n` +
    `🏠 Тип дома: ${data["Тип дома"]}\n` +
    `🏗 Этажность: ${data["Этажность"]}\n` +
    `🛖 Тип крыши: ${data["Тип крыши"]}\n` +
    `🎨 Цвет фасада: ${data["Цвет фасада"] || "—"}`;

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  const json = await res.json();
  console.log("[NETLIFY] Ответ Telegram:", json);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: json.ok, result: json.result }),
  };
}
