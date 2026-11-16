"use client";

import { useState } from "react";
import { type Event } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [pencarian, setPencarian] = useState("");
  const [kategoriPilihan, setKategoriPilihan] = useState("Semua");

  // Ambil daftar kategori unik dengan aman (filter undefined/null)
  const daftarKategori = [
    "Semua",
    ...Array.from(new Set(events.map((e) => e.kategori).filter(Boolean))),
  ] as string[];

  // Filter event berdasarkan pencarian dan kategori
  const eventFiltered = events.filter((event) => {
    const sesuaiCari =
      event.judul.toLowerCase().includes(pencarian.toLowerCase()) ||
      event.lokasi.toLowerCase().includes(pencarian.toLowerCase());
    
    const sesuaiKategori =
      kategoriPilihan === "Semua" || event.kategori === kategoriPilihan;

    return sesuaiCari && sesuaiKategori;
  });

  return (
    <div>
      {/* Bagian Filter & Pencarian */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Cari event atau lokasi..."
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-800"
        />

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {daftarKategori.map((kat) => (
            <button
              key={kat}
              onClick={() => setKategoriPilihan(kat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                kategoriPilihan === kat
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Kartu Event */}
      {eventFiltered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventFiltered.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg font-medium">Event tidak ditemukan.</p>
          <p className="text-sm">Coba kata kunci atau kategori lain.</p>
        </div>
      )}
    </div>
  );
}