# Deploy + интеграции + примерные расходы

## Минимальный VPS
- 4 vCPU / 8 GB RAM / 80 GB SSD (Postgres + Redis + Next + Nest + MinIO)
- ОС: Ubuntu 22.04 LTS
- Примерная стоимость: 2 500–5 000 ₽ / месяц.

## Интеграции
- Платежи (stub): YooKassa/CloudPayments + СБП провайдер.
- Telegram bot: токен в `TELEGRAM_BOT_TOKEN`, webhook на `/api/telegram/webhook`.
- TLS: certbot/managed LB.

## Важное
- Всё хранится и учитывается в RUB.
- RU-only контент и локаль.
- Видео для диспутов загружать отдельным endpoint в MinIO (не в обычный чат).
