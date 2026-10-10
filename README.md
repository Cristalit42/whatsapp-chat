# WhatsApp Chat (GREEN-API)

Тестовое задание на позицию «Фронтенд разработчик React» в GREEN-API.

Чат для отправки и получения текстовых сообщений WhatsApp через [GREEN-API](https://green-api.com), внешний вид по мотивам web.whatsapp.com.

Сделал для WhatsApp, а не для MAX (задание это допускает): MAX рассчитан на российские номера, а я нахожусь в Кыргызстане.

**Демо:** https://whatsapp-chat-teal.vercel.app

## Что умеет

- вход по `idInstance` / `apiTokenInstance` с проверкой статуса инстанса
- новый чат по номеру телефона
- отправка — [SendMessage](https://green-api.com/docs/api/sending/SendMessage/)
- получение — [HTTP API](https://green-api.com/docs/api/receiving/technology-http-api/): `ReceiveNotification` + `DeleteNotification` в цикле
- статусы доставки (✓, ✓✓, прочитано), повторная отправка при ошибке
- сообщение с нового номера создаёт чат, счётчик непрочитанных
- переписка сохраняется в localStorage
- адаптив под мобильные

## Стек

React 19, TypeScript, Vite, Tailwind CSS 4. Без доп. библиотек — `fetch` и хуки.

## Запуск

```bash
git clone https://github.com/Cristalit42/whatsapp-chat.git
cd whatsapp-chat
npm install
npm run dev
```

Открыть http://localhost:5173 и ввести `apiUrl`, `idInstance`, `apiTokenInstance` из [личного кабинета](https://console.green-api.com).

В настройках инстанса поле webhookUrl должно быть пустым — уведомления читаются через HTTP API.

## Структура

```
src/
  api/greenApi.ts        запросы к API
  lib/notifications.ts   разбор уведомлений
  hooks/useIncoming.ts   цикл получения сообщений
  hooks/useChats.ts      чаты и сообщения
  components/            UI
  App.tsx
```

Ключи доступа в коде не хранятся — только в localStorage браузера, кнопка «Выйти» их удаляет.
