export default function AdminPage() {
  return (
    <section className="card">
      <h2>Админка (mock)</h2>
      <p className="meta">Read-only предпросмотр разделов для модерации и контроля.</p>
      <div className="kpis">
        <div className="kpi"><strong>Открытых диспутов</strong><div className="meta">12</div></div>
        <div className="kpi"><strong>Новых жалоб</strong><div className="meta">7</div></div>
        <div className="kpi"><strong>Лотов на проверке</strong><div className="meta">19</div></div>
      </div>
    </section>
  );
}
