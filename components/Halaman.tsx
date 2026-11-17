import Link from "next/link";
import { alamatHalaman, type Saringan } from "@/data/saring";

export default function Halaman({ s, hal, jumlah }: { s: Saringan; hal: number; jumlah: number }) {
  if (jumlah <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-6">
      {hal > 1 && (
        <Link
          href={alamatHalaman(s, hal - 1)}
          className="px-3 py-1 rounded border bg-white hover:bg-slate-100 text-sm"
        >
          « Sebelumnya
        </Link>
      )}

      {Array.from({ length: jumlah }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          className={`px-3 py-1 rounded border text-sm font-medium ${
            n === hal
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
        >
          {n}
        </Link>
      ))}

      {hal < jumlah && (
        <Link
          href={alamatHalaman(s, hal + 1)}
          className="px-3 py-1 rounded border bg-white hover:bg-slate-100 text-sm"
        >
          Berikutnya »
        </Link>
      )}
    </div>
  );
}