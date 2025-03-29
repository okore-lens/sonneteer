import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

import { PATHS } from "@/libs/paths";
import { createServerClient } from "@/libs/supabase/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const token_hash = searchParams.get("token_hash");
	const type = searchParams.get("type") as EmailOtpType | null;
	const next = searchParams.get("next") ?? PATHS.admin.dashboard.analytics;

	if (token_hash && type) {
		const supabase = await createServerClient();

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		if (!error) {
			redirect(next);
		}
	}

	redirect("/error");
}
