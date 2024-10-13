"use client";

import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("Missing env variables for Supabase");
}

export const createBrowserSupabaseClient = () => createBrowserClient(supabaseUrl!, supabaseAnonKey!);
