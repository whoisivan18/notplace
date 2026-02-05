import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid">
      {[
        ['Авторизация', '/auth'],
        ['Каталог', '/catalog'],
        ['Кошелёк', '/profile/wallet'],
        ['Покупки/Продажи + чат', '/orders/chats'],
        ['Диспуты', '/disputes'],
        ['Админка', '/admin'],
      ].map(([title, href]) => (
        <Link key={href} href={href} className="card">
          <strong>{title}</strong>
        </Link>
      ))}
    </div>
  );
}
