import Link from "next/link";

import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import ErrorWithRetry from "@/components/error-with-retry";

import { PATHS } from "@/libs/paths";
import { createServerClient } from "@/libs/supabase/server";

const page = async () => {
	const supabase = createServerClient();

	try {
		const { data, error } = await (await supabase)
			.from("posts")
			.select("*");

		if (error) {
			throw new Error(
				`Failed to fetch posts: ${error?.message || "supabase error"}`
			);
		}

		return (
			<main>
				<div className="flex flex-wrap justify-between gap-3">
					<h6>Posts</h6>
					<Button variant="outline">
						<Link href={PATHS.admin.dashboard.corner.curate}>
							Curate
						</Link>
					</Button>
				</div>
				{!data || data.length === 0 ? (
					<ErrorWithRetry
						title="No posts found"
						description="There are no posts available at the moment."
					/>
				) : (
					<section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
						{data?.map((post, idx) => (
							<PostCard post={post} key={idx} />
						))}
					</section>
				)}
			</main>
		);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return (
			<ErrorWithRetry
				pageTitle="Posts"
				description="There was a problem loading the posts. Please try again
						later."
				variant="destructive"
			/>
		);
	}
};

export default page;
