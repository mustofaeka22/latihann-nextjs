import type { Metadata } from "next";
import { events } from "@/data/events";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export const metadata: Metadata = { title: "Katalog Event" };

export default function HalamanEvent() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Katalog Event</h1>
      <KatalogInteraktif events={events} />
    </main>
  );
}