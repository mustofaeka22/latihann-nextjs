import Link from "next/link";
import { events, rupiah } from "@/data/events";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailEventPage({ params }: Props) {
  const resolvedParams = await params;
  
  const event = events.find((e) => String(e.id) === String(resolvedParams.id));
  if (!event) notFound();

  // Mencari event terkait: kategori sama DAN bukan event itu sendiri
  const eventTerkait = events.filter(
    (e) => e.kategori === event.kategori && String(e.id) !== String(event.id)
  );

  return (
    <div className="mx-auto max-w-3xl p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-2xl font-bold">{event.judul}</h1>
      <p className="text-slate-500">{event.tanggal} · {event.lokasi}</p>
      
      <div className="my-4 font-medium">{rupiah(event.harga)}</div>

      {/* Bagian Event Terkait (Langkah 8) */}
      <div className="mt-8 border-t pt-6">
        <h2 className="mb-4 text-lg font-semibold">Event terkait</h2>
        {eventTerkait.length === 0 ? (
          <p className="text-slate-500">Belum ada event terkait.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {eventTerkait.map((item) => (
              <div key={item.id} className="rounded border p-3 shadow-sm">
                <span className="text-xs text-blue-600">{item.kategori}</span>
                <h3 className="font-semibold">
                  <Link href={`/event/${item.id}`} className="hover:underline text-blue-700">
                    {item.judul}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500">{item.tanggal}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}