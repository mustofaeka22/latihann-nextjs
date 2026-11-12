"use client";

import { useActionState } from "react";
import { pesanTiket, HasilPesan } from "@/app/actions";
import { Event, rupiah } from "@/data/events";

export default function FormPesan({
  event,
  namaAwal,
}: {
  event: Event;
  namaAwal: string;
}) {
  const awal: HasilPesan = {
    berhasil: false,
    pesan: "",
    galat: {},
    isian: { nama: namaAwal, email: "" },
  };

  const [state, formAction, isPending] = useActionState(pesanTiket, awal);

  const sisa = event.kuota - event.terisi;

  if (sisa <= 0) {
    return (
      <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded text-sm">
        Maaf, kuota tiket untuk event ini sudah habis.
      </div>
    );
  }

  return (
    <form action={formAction} className="border border-slate-300 rounded p-4 space-y-4">
      <h3 className="font-bold text-base">Pesan Tiket</h3>

      <input type="hidden" name="eventId" value={event.id} />

      {state.pesan && (
        <div
          className={`p-3 rounded text-sm ${
            state.berhasil
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {state.pesan}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
        <input
          type="text"
          name="nama"
          defaultValue={state.isian.nama}
          placeholder="Masukkan nama lengkap"
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
        />
        {state.galat.nama && (
          <p className="text-red-600 text-xs mt-1">{state.galat.nama}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={state.isian.email}
          placeholder="nama@email.com"
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
        />
        {state.galat.email && (
          <p className="text-red-600 text-xs mt-1">{state.galat.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jumlah Tiket</label>
        <input
          type="number"
          name="jumlah"
          min={1}
          max={sisa}
          defaultValue={1}
          className="w-full border border-slate-300 rounded px-3 py-2 text-sm"
        />
        {state.galat.jumlah && (
          <p className="text-red-600 text-xs mt-1">{state.galat.jumlah}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded text-sm transition"
      >
        {isPending ? "Memproses..." : "Pesan Tiket Sekarang"}
      </button>
    </form>
  );
}