import Link from 'next/link';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/lot', label: 'Лот' },
  { href: '/chat', label: 'Чат' },
  { href: '/admin', label: 'Админка' },
];

export function Nav() {
  return (
    <nav className="nav">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="navLink">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
