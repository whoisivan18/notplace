export default function GamePage({ params }: { params: { slug: string } }) {
  return <div className="card">Игра/сервис: {params.slug}. Баннер, FAQ, top lots, required data hints.</div>;
}
