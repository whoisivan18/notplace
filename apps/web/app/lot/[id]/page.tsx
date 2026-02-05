export function generateStaticParams() {
  return [{ id: 'demo' }];
}

export default function LotByIdPage({ params }: { params: { id: string } }) {
  return <div className="card">Лот {params.id}: условия, гарантия, предупреждения.</div>;
}
