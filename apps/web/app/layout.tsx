import type { ReactNode } from 'react';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Nav } from '../components/nav';

const manrope = Manrope({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={manrope.className}>
        <div className="container">
          <header className="card header">
            <div>
              <h1>NotPlace</h1>
              <p>RU-only marketplace цифровых товаров и услуг (mock mode)</p>
            </div>
            <Nav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
