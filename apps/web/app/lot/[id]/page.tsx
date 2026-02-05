export default function LotPage({ params }: { params: { id: string } }) {
  return <div className="card">Лот {params.id}: условия, гарантия, предупреждения, кнопка Купить.</div>;
}
