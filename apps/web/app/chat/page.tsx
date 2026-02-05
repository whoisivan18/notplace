const messages = [
  { from: 'Buyer', text: 'Добрый день, отправил UID и сервер.' },
  { from: 'Seller', text: 'Принял, выполняю заказ. Ориентир 20 минут.' },
  { from: 'System', text: 'Событие: после «Исполнено» у покупателя 2 часа на подтверждение.' },
];

export default function ChatPage() {
  return (
    <section className="card">
      <h2>Чат buyer ↔ seller</h2>
      <p className="meta">Signal/messaging mock. Контакты вне площадки запрещены.</p>
      <div>
        {messages.map((m, i) => (
          <div key={`${m.from}-${i}`} className="card" style={{ marginBottom: 8 }}>
            <strong>{m.from}:</strong> {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" className="btn">Отправить сообщение</button>
        <button type="button" className="btn">Открыть диспут</button>
      </div>
    </section>
  );
}
