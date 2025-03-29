import { cookies } from "next/headers";
import { createServerClient as spCreateServerClient } from "@supabase/ssr";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config";

export const createServerClient = async () => {
	const cookieStore = await cookies();

	return spCreateServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options)
					);
				} catch {
					// The `setAll` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
		},
	});
};
