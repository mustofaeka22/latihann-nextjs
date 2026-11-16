import { events, type Event } from "@/data/events";

// Pura-pura mengambil data dari database yang agak lambat.
function jeda(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function ambilEvents() {
  await jeda(1500);
  return events;
}

export async function ambilEvent(id: string | number) {
  await jeda(800);
  // Menggunakan String() casting agar aman mencocokkan string dan number
  return events.find((e) => String(e.id) === String(id));
}

export async function ambilTerkait(event: Event) {
  await jeda(2000);
  return events.filter(
    (e) => e.kategori === event.kategori && String(e.id) !== String(event.id)
  );
}