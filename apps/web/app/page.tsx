import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="card">
      <h2>Интерактивный mock фронт для Cloudflare Pages</h2>
      <p className="meta">Бэкенд не нужен: страницы и переходы работают в статике.</p>
      <div className="grid">
        <Link href="/catalog" className="card">Открыть каталог</Link>
        <Link href="/lot" className="card">Открыть лот</Link>
        <Link href="/chat" className="card">Открыть чат</Link>
      </div>
    </section>
  );
}
