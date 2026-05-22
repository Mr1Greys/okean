# Океана — Семейный клуб детского плавания

Сайт клуба на React + Vite (монорепозиторий pnpm).

## Локальный запуск

```bash
pnpm install
PORT=19289 BASE_PATH=/ pnpm --filter @workspace/okeana run dev
```

Сайт: http://localhost:19289/

## Сборка

```bash
pnpm install
pnpm run build:site
```

Результат: `artifacts/okeana/dist/public`

## Деплой на Vercel

1. Импортируйте репозиторий [github.com/Mr1Greys/okean](https://github.com/Mr1Greys/okean) в [Vercel](https://vercel.com).
2. Vercel подхватит настройки из `vercel.json` (pnpm, сборка, SPA-роутинг).
3. В **Settings → Environment Variables** при необходимости добавьте:
   - `PORT` = `4173`
   - `BASE_PATH` = `/`
4. После деплоя подключите бесплатный домен: **Settings → Domains** → `*.vercel.app` или свой домен.

Переменные `PORT` и `BASE_PATH` нужны для конфигурации Vite при сборке.
