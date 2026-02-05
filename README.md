# NotPlace MVP (RU-only, RUB-only)

Монорепо: Next.js frontend + NestJS backend + инфраструктура для VPS.

## Структура

- `apps/web` — фронт для Cloudflare Pages (статический export + mock API режим).
- `apps/api` — backend для VPS/Docker Compose.
- `packages/shared` — shared constants/feature flags.
- `public` — служебная статика (не используется как Pages output).
- `dist` — итоговый каталог, который публикует Cloudflare Pages.

## Cloudflare Pages (рекомендуемая конфигурация)

- **Root directory**: `/`
- **Build command**: `corepack enable && pnpm install --frozen-lockfile && pnpm pages:build`
- **Build output directory**: `dist`
- **Node version**: из `.nvmrc` (`20`)

### Env vars (опционально)

- `NEXT_PUBLIC_API_BASE` — адрес API (если не задан, UI работает в mock режиме).
- `NEXT_PUBLIC_BASE_PATH` — base path для статики (по умолчанию пусто).

## Почему теперь не будет 404 на Pages

1. `pages:build` всегда формирует `/dist` из `apps/web/out`.
2. Тихого fallback из `/public` больше нет: если export не удался — build падает с ошибкой.
3. Скрипт проверяет наличие `dist/index.html` и `dist/_redirects` (иначе `exit 1`).
4. Для роутов SPA/Pages добавляется `dist/_redirects` с правилом `/* /index.html 200`.

## Локальная проверка Pages-пайплайна

```bash
pnpm pages:build
# затем открыть dist/index.html
```

После выполнения в `dist/` всегда есть `index.html`.

## Локальная разработка фронта

```bash
pnpm dev:web
```

Доступны страницы для “потыкать”: `/`, `/catalog`, `/lot`, `/chat`, `/admin`.

## Важно про Workers Builds

NotPlace использует **Cloudflare Pages build output**, а не Workers deploy.

- В scripts нет `wrangler deploy`.
- В репо не нужен `wrangler.jsonc` для этого сценария.
- Если в интерфейсе Cloudflare видите Workers Builds, отключите интеграцию Workers и оставьте только Pages (Build + Output directory).

## VPS запуск backend (как и раньше)

```bash
docker compose up --build
```

- Web: `http://localhost`
- API docs: `http://localhost/api/docs`
