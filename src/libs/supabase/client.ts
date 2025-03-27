import { createBrowserClient as spCreateBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

const createBrowserClient = (): SupabaseClient => {
	return spCreateBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
};

export default createBrowserClient;
