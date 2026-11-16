import Link from "next/link";
import Image from "next/image";
import { type Event } from "@/data/events";

export default function KartuEvent({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;

  return (
    <div className="rounded-xl border p-4 shadow-sm bg-white flex flex-col justify-between hover:shadow-md transition">
      <div>
        {/* Gambar Poster yang dioptimalkan dengan next/image */}
        <div className="relative w-full h-[210px] mb-3 rounded-lg overflow-hidden bg-slate-100">
          <Image
            src={event.gambar ?? "/img/default.png"}
            alt={event.judul}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-slate-800 line-clamp-1">{event.judul}</h3>
        <p className="text-slate-600 text-sm mb-3 line-clamp-2">{event.deskripsi}</p>
        
        <div className="text-xs text-slate-500 space-y-1 mb-4">
          <p>📅 {event.tanggal}</p>
          <p>📍 {event.lokasi}</p>
          <p>🎟️ Sisa Kuota: {sisa} kursi</p>
        </div>
      </div>

      <Link
        href={`/event/${event.id}`}
        className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
      >
        Lihat Detail
      </Link>
    </div>
  );
}