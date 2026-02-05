import Link from 'next/link';

const topSellers = [
  { name: 'PixelRUB', rating: '4.9', deals: 1240 },
  { name: 'SteamMasterRU', rating: '4.8', deals: 860 },
  { name: 'SubPro', rating: '4.7', deals: 510 },
];

export default function HomePage() {
  return (
    <>
      <section className="card">
        <h2 className="heroTitle">Безопасные digital-сделки с escrow</h2>
        <p className="heroSub">
          Покупки в RUB, ручное исполнение, диспуты и модерация. Это статический интерфейс для Cloudflare Pages:
          всё кликается без backend.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          <Link href="/catalog" className="btn">Перейти в каталог</Link>
          <Link href="/lot" className="btn">Смотреть лот</Link>
          <Link href="/chat" className="btn">Открыть чат</Link>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h3>Категории</h3>
          <p className="meta">Игры • Подписки • Донаты • Сервисы</p>
        </article>
        <article className="card">
          <h3>Escrow</h3>
          <p className="meta">5 мин на данные, 2 часа на подтверждение, защищённые споры</p>
        </article>
        <article className="card">
          <h3>RUB-only</h3>
          <p className="meta">Единый кошелёк в рублях, прозрачные комиссии</p>
        </article>
      </section>

      <section className="card">
        <h3>Топ продавцы (mock)</h3>
        <div className="grid">
          {topSellers.map((seller) => (
            <div key={seller.name} className="kpi">
              <strong>{seller.name}</strong>
              <div className="meta">Рейтинг: {seller.rating}</div>
              <div className="meta">Сделок: {seller.deals}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
