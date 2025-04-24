// src/app/api/keep-alive/route.ts
import { keepAliveToSupabase } from "@/actions/supabaseEventsActions";

export async function GET() {
  await keepAliveToSupabase();
  return Response.json({ message: "Supabase keep-alive success" });
}
