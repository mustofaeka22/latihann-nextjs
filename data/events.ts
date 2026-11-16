export type Event = {
  id: string | number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  lokasi: string;
  gambar?: string;
  kuota: number;
  terisi: number;
  kategori?: string;
  harga?: number;
};

// Fungsi format rupiah untuk kebutuhan tampilan & metadata
export function rupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export const events: Event[] = [
  {
    id: "1",
    judul: "Workshop Next.js Dasar",
    deskripsi: "Belajar membuat web modern dengan Next.js bersama expert industri secara langsung.",
    tanggal: "20 Desember 2026",
    lokasi: "Malang",
    gambar: "/img/event-1.png",
    kuota: 50,
    terisi: 12,
    kategori: "Teknologi",
    harga: 150000,
  },
  {
    id: "2",
    judul: "Pelatihan UI/UX Design Modern",
    deskripsi: "Memahami dasar-dasar desain antarmuka pengguna yang menarik dan ramah pengguna.",
    tanggal: "22 Desember 2026",
    lokasi: "Online",
    gambar: "/img/event-2.png",
    kuota: 40,
    terisi: 25,
    kategori: "Desain",
    harga: 100000,
  },
  {
    id: "3",
    judul: "Seminar Kewirausahaan Digital",
    deskripsi: "Strategi membangun bisnis rintisan di era digital dari nol hingga berkembang.",
    tanggal: "28 Desember 2026",
    lokasi: "Surabaya",
    gambar: "/img/event-3.png",
    kuota: 100,
    terisi: 45,
    kategori: "Bisnis",
    harga: 75000,
  },
  {
    id: "4",
    judul: "Coding Bootcamp Python & AI",
    deskripsi: "Pengenalan pemrograman Python untuk kecerdasan buatan dan pengolahan data.",
    tanggal: "5 Januari 2027",
    lokasi: "Malang",
    gambar: "/img/event-4.png",
    kuota: 30,
    terisi: 28,
    kategori: "Teknologi",
    harga: 200000,
  },
  {
    id: "5",
    judul: "Pameran Seni & Kreativitas Lokal",
    deskripsi: "Menampilkan karya seni rupa, kerajinan, dan inovasi dari kreator muda lokal.",
    tanggal: "10 Januari 2027",
    lokasi: "Batu",
    gambar: "/img/event-5.png",
    kuota: 150,
    terisi: 90,
    kategori: "Seni",
    harga: 50000,
  },
  {
    id: "6",
    judul: "Digital Marketing Masterclass",
    deskripsi: "Trik jitu optimasi media sosial dan iklan berbayar untuk meningkatkan penjualan produk.",
    tanggal: "15 Januari 2027",
    lokasi: "Online",
    gambar: "/img/event-6.png",
    kuota: 75,
    terisi: 50,
    kategori: "Bisnis",
    harga: 120000,
  },
];