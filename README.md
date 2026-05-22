# Океана — Семейный клуб детского плавания

Статический сайт на React + Vite в pnpm-монорепозитории. Продакшен-артефакт: `artifacts/okeana` (см. `.replit-artifact/artifact.toml`).

## Локальный запуск

```bash
pnpm install
PORT=19289 BASE_PATH=/ pnpm --filter @workspace/okeana run dev
```

Открыть: http://localhost:19289/

## Сборка

```bash
pnpm install
pnpm run build:site
```

Результат: `artifacts/okeana/dist/` (`index.html` + `assets/`).

## Деплой на Vercel

### 1. Настройки проекта (обязательно)

В [Vercel Dashboard](https://vercel.com) → проект **okean** → **Settings** → **General**:

| Поле | Значение |
|------|----------|
| **Root Directory** | `artifacts/okeana` |
| **Framework Preset** | Other |
| **Build Command** | *(оставить пустым — берётся из `artifacts/okeana/vercel.json`)* |
| **Output Directory** | *(оставить пустым — берётся из `vercel.json`)* |
| **Install Command** | *(оставить пустым)* |

### 2. Убрать Production Overrides

Если сборка ищет папку `public` или `dist` не там:

1. **Settings** → **General** → **Framework Settings**
2. Если есть жёлтое предупреждение **Production Overrides** — откройте и **сбросьте** переопределения Output Directory / Root Directory
3. Сохраните и сделайте **Redeploy**

### 3. Переменные окружения (опционально)

Для dev на Replit: `PORT`, `BASE_PATH`. Для Vercel-сборки значения по умолчанию в `vite.config.ts` (`4173`, `/`). Добавлять в Vercel не обязательно.

### 4. Домен

После успешного деплоя: **Settings** → **Domains** → бесплатный `*.vercel.app` или свой домен.

### Почему Root Directory = `artifacts/okeana`

- Монорепозиторий: `pnpm install` должен выполняться из корня репозитория (`installCommand` в `artifacts/okeana/vercel.json`: `cd ../.. && pnpm install`)
- Сборка: `pnpm --filter @workspace/okeana run build`
- Статика: `artifacts/okeana/dist` относительно Root Directory → в UI это просто **`dist`**

Конфиг в корне репозитория (`/vercel.json`) — запасной вариант, если Root Directory оставить пустым (корень репо).
