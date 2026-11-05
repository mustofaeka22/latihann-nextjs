"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");
  const [jumlahTampil, setJumlahTampil] = useState(4);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  // Logika Filter Data
  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    
    const sisa = e.kuota - e.terisi;
    const cocokTiket = !hanyaAdaTiket || sisa > 0;
    const cocokHarga = hargaMaksimal === "" || e.harga <= Number(hargaMaksimal);

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const dataTampil = tersusun.slice(0, jumlahTampil);

  // Perhitungan statistik
  const totalHarga = tersusun.reduce((sum, e) => sum + e.harga, 0);
  const rataRataHarga = tersusun.length > 0 ? totalHarga / tersusun.length : 0;
  const totalSisaTiket = tersusun.reduce((sum, e) => sum + (e.kuota - e.terisi), 0);

  return (
    <div>
      {/* Memanggil Komponen KontrolKatalog dan mengirim state lewat props */}
      <KontrolKatalog
        cari={cari}
        setCari={setCari}
        kategori={kategori}
        setKategori={setKategori}
        urut={urut}
        setUrut={setUrut}
        hanyaAdaTiket={hanyaAdaTiket}
        setHanyaAdaTiket={setHanyaAdaTiket}
        hargaMaksimal={hargaMaksimal}
        setHargaMaksimal={setHargaMaksimal}
        daftarKategori={daftarKategori}
        setJumlahTampil={setJumlahTampil}
      />

      <p className="text-sm text-slate-500">{tersusun.length} event ditemukan</p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket {totalSisaTiket}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataTampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahTampil < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setJumlahTampil((prev) => prev + 4)}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Tampilkan lagi
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}