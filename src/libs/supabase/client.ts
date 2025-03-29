import { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient as spCreateBrowserClient } from "@supabase/ssr";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config";

const createBrowserClient = (): SupabaseClient => {
	return spCreateBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
};

export default createBrowserClient;
