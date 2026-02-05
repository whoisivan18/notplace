# NotPlace MVP (RU-only, RUB-only)

Монорепо с базовым production-ready каркасом: Next.js frontend + NestJS backend + Postgres + Redis + MinIO + Nginx.

## Структура

- `apps/web` — клиент (Next.js, App Router, dark purple тема, RU UX).
- `apps/api` — backend (NestJS): auth, RBAC, каталог, лоты, заказы+escrow/ledger, чат, диспуты, админка, Telegram link/signals.
- `packages/shared` — shared constants + feature flags (`instantDelivery: false`).
- `infra/nginx` — reverse proxy.
- `docs/vps-deploy-and-costs.md` — заметки по интеграциям и расходам.

## Быстрый запуск (Docker Compose)

1. Скопируйте `.env.example` в `.env`.
2. Запустите:
   ```bash
   docker compose up --build
   ```
3. Откройте:
   - Web: `http://localhost`
   - API docs: `http://localhost/api/docs`

## Ключевые API endpoints (MVP)

- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/refresh`
  - `GET /api/auth/sessions`
  - `POST /api/auth/logout-everywhere`
- Catalog/Listings:
  - `GET /api/catalog/games`
  - `GET /api/catalog/games/:slug`
  - `POST /api/catalog/categories` (Admin/Owner)
  - `POST /api/listings`
- Orders/Escrow:
  - `POST /api/orders/:id/events` (state machine events)
- Chat/Moderation:
  - `POST /api/chats/message/validate` (contact detector)
- Disputes:
  - `POST /api/disputes`
- Wallet:
  - `GET /api/wallet/health`
- Notifications:
  - `GET /api/notifications`
- Telegram:
  - `POST /api/telegram/link-code`
  - `POST /api/telegram/start`
- Admin panel API:
  - `GET /api/admin/chats`
  - `GET /api/admin/disputes`
  - `POST /api/admin/games`
  - `PATCH /api/admin/roles`

## Таймеры / джобы

- Реализованы через `@nestjs/schedule` (cron каждую минуту).
- Обрабатываются:
  - timeout 5m (buyer data)
  - timeout 2h (auto-confirm)
- Шаблон для 24h hold / 7d inactivity / 7d refund cooldown заложен в модели и архитектуре.

Проверка локально:
1. Создать заказ со статусом `PAID_WAITING_BUYER_DATA` и `buyerDataDeadline < now`.
2. Подождать cron (до 1 минуты).
3. Убедиться, что статус перешёл в `CANCELLED`.

## Что пока stub / расширяется потом

- 2FA: модель/интеграционная точка заложена, полноценный flow не активирован.
- Эквайринг/СБП/крипта: сейчас stub-схема (учёт RUB и ledger готовы).
- Full moderation pipeline (penalties + auto-ban на повторы): детектор контактов реализован, полная автоматизация санкций — следующий шаг.
- Видео хранилище для dispute evidence: закладывается через MinIO отдельным endpoint.
- Instant delivery: включён как feature flag, но не реализован в MVP.

## Безопасность

- Password hashing: Argon2.
- Rate limit для auth endpoints (in-memory guard).
- RBAC + Owner bootstrap (первый пользователь).
- Audit log для admin-действий (через `ModerationAction`).
<!-- redeploy -->
