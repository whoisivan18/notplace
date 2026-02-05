import Link from 'next/link';

const items = [
  { id: 'lot-1', title: 'Пополнение Steam РФ', price: '299 ₽', sla: '15 минут' },
  { id: 'lot-2', title: 'Подписка сервис +30 дней', price: '549 ₽', sla: '1 час' },
  { id: 'lot-3', title: 'Донат в мобильную игру', price: '199 ₽', sla: '15 минут' },
];

export default function CatalogPage() {
  return (
    <section className="card">
      <h2>Каталог</h2>
      <p className="meta">Live mock-витрина без backend.</p>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <strong>{item.title}</strong>
            <p className="meta">Цена: {item.price}</p>
            <p className="meta">SLA: {item.sla}</p>
            <Link href="/lot" className="btn">Открыть лот</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
