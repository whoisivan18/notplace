export function generateStaticParams() {
  return [{ slug: 'mock-game' }];
}

export default function GamePage({ params }: { params: { slug: string } }) {
  return <div className="card">Игра/сервис: {params.slug}. Баннер, FAQ, top lots, подсказки.</div>;
}
