"use client";
import { useActionState, useState } from "react";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({ event }: { event: Event }) {
  const awal: HasilPesan = { berhasil: false, pesan: "", galat: {}, isian: { nama: "", email: "" } };
  const [hasil, kirim, sedangKirim] = useActionState(pesanTiket, awal);
  const [jumlah, setJumlah] = useState(1);
  const sisa = event.kuota - event.terisi;

  if (sisa === 0) {
    return <p className="mt-4 font-medium text-red-600">Tiket sudah habis.</p>;
  }

  return (
    <form action={kirim} className="space-y-4 pt-2">
      <input type="hidden" name="eventId" value={event.id} />

      {/* Label & Input Nama Pemesan */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Nama Pemesan</label>
        <input
          name="nama"
          defaultValue={hasil.isian.nama}
          className="block w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
        {hasil.galat.nama && <p className="text-sm text-red-600 mt-1">{hasil.galat.nama}</p>}
      </div>

      {/* Label & Input Alamat Email */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Alamat Email</label>
        <input
          name="email"
          defaultValue={hasil.isian.email}
          className="block w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
        {hasil.galat.email && <p className="text-sm text-red-600 mt-1">{hasil.galat.email}</p>}
      </div>

      {/* Label & Input Jumlah Tiket */}
      <div>
        <label className="block text-sm text-slate-700 mb-1">Jumlah Tiket</label>
        <input
          name="jumlah"
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="block w-28 rounded border border-slate-300 px-3 py-2 text-sm"
        />
        {hasil.galat.jumlah && <p className="text-sm text-red-600 mt-1">{hasil.galat.jumlah}</p>}
      </div>

      {/* Total Harga */}
      <p className="text-sm font-medium pt-1">
        Total: <b>{rupiah(event.harga * jumlah)}</b>
      </p>

      {/* Pesan Sukses / Gagal dari Server */}
      {hasil.pesan && (
        <p className={`text-sm ${hasil.berhasil ? "text-green-700" : "text-red-600"}`}>
          {hasil.pesan}
        </p>
      )}

      {/* Tombol Pesan */}
      <div>
        <button
          disabled={sedangKirim}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {sedangKirim ? "Memproses..." : "Pesan"}
        </button>
      </div>
    </form>
  );
}