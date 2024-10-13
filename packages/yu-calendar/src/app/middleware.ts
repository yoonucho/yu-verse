import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { CookieMethodsServer } from "@supabase/ssr/dist/main/types";

export const applyMiddlewareSupabaseClient = async (request: NextRequest) => {
	// Create an unmodified response
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
				response = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
			},
			remove(name: string, options: CookieOptions) {
				// If the cookie is removed, update the cookies for the request and response
				request.cookies.set({
					name,
					value: "",
					...options,
				});
				response = NextResponse.next({
					request: {
						headers: request.headers,
					},
				});
				response.cookies.set({
					name,
					value: "",
					...options,
				});
			},
		} as CookieMethodsServer,
	});

	// refreshing the auth token
	await supabase.auth.getUser();

	return response;
};

export async function middleware(request) {
	return await applyMiddlewareSupabaseClient(request);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
