import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <h1>NotPlace</h1>
          <p>RU-only маркетплейс цифровых товаров (RUB + escrow)</p>
          {children}
        </div>
      </body>
    </html>
  );
}
