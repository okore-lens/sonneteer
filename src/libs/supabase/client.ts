import { createBrowserClient as spCreateBrowserClient } from "@supabase/ssr";

const createBrowserClient = () => {
	return spCreateBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
};

export default createBrowserClient;
