import Link from "next/link";
import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan"; // Sesuaikan jalur lokasi FormPesan

export default async function DetailEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="p-8 text-center">
        <p>Event tidak ditemukan.</p>
        <Link href="/event" className="text-blue-600 underline text-sm mt-2 inline-block">
          ← Kembali ke katalog
        </Link>
      </div>
    );
  }

  const sisa = event.kuota - event.terisi;

  // Filter event terkait (kategori sama, kecuali event ini sendiri)
  const eventTerkait = events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id
  );

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-4">
      {/* 1. Tombol Kembali */}
      <Link href="/event" className="text-blue-600 hover:underline text-sm font-medium">
        ← Kembali ke katalog
      </Link>

      {/* Header Event */}
      <div className="space-y-2">
        <div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            {event.kategori}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{event.judul}</h1>
        <p className="text-sm text-slate-500">
          {event.tanggal} · {event.lokasi}
        </p>
      </div>

      {/* Harga & Informasi Sisa Tiket */}
      <div className="space-y-1">
        <p className="text-lg font-bold">
          {event.harga === 0 ? "Gratis" : rupiah(event.harga)}
        </p>
        <p className="text-sm text-slate-600">
          Sisa {sisa} dari {event.kuota} tiket
        </p>
      </div>

      {/* Tombol Favorit */}
      <div>
        <button className="border border-slate-300 rounded px-3 py-1 text-sm font-normal hover:bg-slate-50">
          ♡ Tambah favorit
        </button>
      </div>

      {/* Form Pemesanan Tiket */}
      <FormPesan event={event} />

      <hr className="my-6 border-slate-300" />

      {/* Event Terkait */}
      <div className="space-y-3">
        <h3 className="text-base font-bold">Event Terkait</h3>
        {eventTerkait.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eventTerkait.map((item) => (
              <Link
                key={item.id}
                href={`/event/${item.id}`}
                className="border border-slate-300 rounded p-3 block hover:border-blue-500 transition"
              >
                <span className="text-[11px] text-blue-600">{item.kategori}</span>
                <h4 className="font-semibold text-blue-600 text-sm mt-0.5">
                  {item.judul}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{item.tanggal}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Belum ada event terkait.</p>
        )}
      </div>
    </div>
  );
}