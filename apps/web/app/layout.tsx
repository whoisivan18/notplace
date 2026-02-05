import type { ReactNode } from 'react';
import './globals.css';
import { Nav } from '../components/nav';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <header className="card header">
            <div>
              <h1 style={{ margin: 0 }}>NotPlace</h1>
              <p className="meta" style={{ margin: '6px 0 0' }}>
                RU-only маркетплейс цифровых товаров и услуг с escrow (mock preview для Pages)
              </p>
            </div>
            <Nav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
