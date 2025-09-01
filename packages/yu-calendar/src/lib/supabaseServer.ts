"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Database } from "../../types_db";
import type { CookieMethodsServer } from "@supabase/ssr/dist/main/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRole = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE || "";

const createServerSupabaseClient = (
	cookieStore: ReturnType<typeof cookies> = cookies(),
	admin: boolean = false
): SupabaseClient<Database> => {
	return createServerClient<Database>(supabaseUrl!, admin ? supabaseServiceRole! : supabaseAnonKey!, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
				} catch (error) {
					console.error("Failed to set cookies", error);
				}
			},
			delete(name: string, options?: CookieOptions) {
				try {
					cookieStore.set({ name, value: "", ...options });
				} catch (error) {
					console.error("Failed to remove cookie", error);
				}
			},
		} as CookieMethodsServer, // CookieMethodsServer로 명시적으로 타입 설정
	}) as unknown as SupabaseClient<Database>;
};

export default createServerSupabaseClient;
