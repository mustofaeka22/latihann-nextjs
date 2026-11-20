"use client";

import { useState } from "react";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({
  event,
  namaAwal = "",
}: {
  event: Event;
  namaAwal?: string;
}) {
  const [nama, setNama] = useState(namaAwal);
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const sisa = event.kuota - event.terisi;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    try {
      const res = await fetch("/api/pesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          nama,
          email,
          jumlah,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPesan(data.error ?? "Gagal mengirim pesanan.");
      } else {
        setPesan("Pesanan berhasil dikirim!");
        setEmail("");
        setJumlah(1);
      }
    } catch {
      setPesan("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t pt-6">
      <h2 className="text-lg font-semibold">Pesan Tiket</h2>

      <div>
        <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
        <input
          type="text"
          required
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="Masukkan nama lengkap"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
          placeholder="nama@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Jumlah Tiket</label>
        <input
          type="number"
          min={1}
          max={sisa}
          required
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>

      <p className="text-sm text-slate-600">
        Total: <span className="font-semibold">{rupiah((event.harga ?? 0 * jumlah))}</span>
      </p>

      <button
        type="submit"
        disabled={loading || sisa <= 0}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Pesan Sekarang"}
      </button>

      {pesan && <p className="text-sm text-slate-700">{pesan}</p>}
    </form>
  );
}