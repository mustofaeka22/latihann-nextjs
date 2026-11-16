import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { events, rupiah } from "@/data/events";
import { ambilEvent } from "@/data/ambil";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

type PageProps = {
  params: Promise<{ id: string }>;
};

// Fungsi generateMetadata sesuai Langkah 9
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id) || String(e.id) === String(id));
  if (!event) return { title: "Event tidak ditemukan" };
  return {
    title: event.judul,
    description: `${event.kategori} di ${event.lokasi}, ${event.tanggal}. ${rupiah ? rupiah(event.harga ?? 0) : ''}`,
  };
}

export default async function HalamanDetailEvent({ params }: PageProps) {
  const resolvedParams = await params;
  const event = await ambilEvent(resolvedParams.id);

  if (!event) {
    notFound();
  }

  const sisa = event.kuota - event.terisi;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article className="bg-white rounded-2xl border shadow-sm overflow-hidden p-6 md:p-8">
        <div className="relative mb-4 aspect-[40/21] w-full">
          <Image
            src={event.gambar ?? "/img/default.png"}
            alt={event.judul}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            preload
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            {event.judul}
          </h1>
          <TombolFavorit id={Number(event.id)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border">
          <div>
            <p className="font-semibold text-slate-700">📅 Tanggal</p>
            <p>{event.tanggal}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">📍 Lokasi</p>
            <p>{event.lokasi}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700">🎟️ Ketersediaan</p>
            <p>{sisa} kursi tersisa dari {event.kuota} kuota</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Deskripsi Event</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">
            {event.deskripsi}
          </p>
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4">Pendaftaran Event</h2>
          <FormPesan event={event} namaAwal="" />
        </div>
      </article>
    </main>
  );
}