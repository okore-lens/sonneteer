import Editor from "@/components/editor";
import ErrorWithRetry from "@/components/error-with-retry";

import { BUCKET_URL } from "@/config";
import { createServerClient } from "@/libs/supabase/server";

const CraftPage = async ({ params }: { params: { slug: string } }) => {
	const supabase = createServerClient();

	const slug = params.slug;

	try {
		const { data, error } = await (await supabase)
			.from("posts")
			.select("*")
			.eq("slug", slug)
			.single();
		if (error || !data) {
			throw new Error(
				`Failed to fetch post: ${error?.message || "single post error"}`
			);
		}

		return (
			<Editor
				post={{
					...data,
					thumbnail_url: data?.thumbnail_url?.startsWith("http")
						? data?.thumbnail_url
						: `${BUCKET_URL}${data?.thumbnail_url}`,
				}}
			/>
		);
	} catch (error) {
		console.error("Error fetching post:", error);
		return (
			<ErrorWithRetry
				pageTitle="Craft Post"
				description="There was a problem loading the post. Please try again
                                later."
				variant="destructive"
			/>
		);
	}
};

export default CraftPage;
