import { events } from "@/data/events";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  // Await params sesuai petunjuk di Next.js App Router terbaru
  const { id } = await context.params;

  // Mencari event berdasarkan id
  const event = events.find((e) => String(e.id) === String(id));

  // Jika event tidak ditemukan, kembalikan status 404 dan pesan JSON
  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 }
    );
  }

  // Jika ditemukan, kembalikan data event dalam format JSON
  return NextResponse.json(event);
}