import { Button } from '../../components/button';

const messages = [
  'Buyer: Добрый день, данные отправил.',
  'Seller: Принял, выполняю заказ.',
  'System: Таймер подтверждения 2 часа после «Исполнено».',
];

export default function ChatPage() {
  return (
    <section className="card">
      <h2>Чат buyer ↔ seller (mock)</h2>
      {messages.map((m) => (
        <p key={m} className="card">{m}</p>
      ))}
      <Button type="button">Отправить тестовое сообщение</Button>
    </section>
  );
}
