const items = [
  { id: '1', title: 'Пополнение Steam РФ', price: '299 ₽' },
  { id: '2', title: 'Подписка сервис +30 дней', price: '549 ₽' },
  { id: '3', title: 'Донат в мобильную игру', price: '199 ₽' },
];

export default function CatalogPage() {
  return (
    <section className="card">
      <h2>Каталог (mock)</h2>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <strong>{item.title}</strong>
            <p className="meta">Цена: {item.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
