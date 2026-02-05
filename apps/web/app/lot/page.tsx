import { Button } from '../../components/button';

export default function LotPage() {
  return (
    <section className="card">
      <h2>Лот: Подписка +30 дней</h2>
      <p>Гарантия: на срок. SLA: 1 час. Исполнение вручную.</p>
      <p className="meta">Предупреждение: при аккаунт-лотах возможны санкции со стороны игры.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button type="button">Купить</Button>
        <Button type="button">Задать вопрос</Button>
      </div>
    </section>
  );
}
