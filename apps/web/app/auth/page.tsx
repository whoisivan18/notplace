export default function AuthPage() {
  return (
    <section className="card">
      <h2>Вход в NotPlace</h2>
      <p className="meta">Preview-режим: формы работают как UI-заглушка для Pages.</p>
      <div className="grid">
        <label className="card">Email или username<br /><input style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid #5c3d9c', background: '#170d2f', color: '#fff' }} placeholder="user@example.ru" /></label>
        <label className="card">Пароль<br /><input type="password" style={{ width: '100%', marginTop: 8, padding: 10, borderRadius: 10, border: '1px solid #5c3d9c', background: '#170d2f', color: '#fff' }} placeholder="••••••••" /></label>
      </div>
      <button className="btn" type="button">Войти</button>
    </section>
  );
}
