import { rupiah } from "@/data/events";
import { useState } from "react";

export default function FormPesan({ harga }: { eventId: string; harga: number }) {
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPesan(`Berhasil memesan ${jumlah} tiket! Total: ${rupiah(harga * jumlah)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Pesan Tiket Event</h2>
      
      <div>
        <label className="block text-sm font-medium text-slate-700">Jumlah Tiket</label>
        <input
          type="number"
          min={1}
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <p className="text-sm font-medium text-slate-600">
        Total Harga: {rupiah(harga * jumlah)}
      </p>

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Konfirmasi Pesanan
      </button>

      {pesan && <p className="text-sm text-green-600">{pesan}</p>}
    </form>
  );
}