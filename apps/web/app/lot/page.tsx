import Link from 'next/link';

export default function LotPage() {
  return (
    <section className="card">
      <h2>Лот: Подписка +30 дней</h2>
      <p>Продавец: SubPro • SLA: 1 час • Гарантия: на срок подписки</p>
      <p className="meta">Условия: ручное исполнение через официальный канал оплаты.</p>
      <p className="meta">Предупреждение: при аккаунт-лотах возможны санкции со стороны игры.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn" type="button">Купить за 549 ₽</button>
        <Link href="/chat" className="btn">Задать вопрос продавцу</Link>
      </div>
    </section>
  );
}
