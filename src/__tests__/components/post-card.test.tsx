import { render, screen } from "@testing-library/react";

import PostCard from "@/components/post-card";

import { mockPosts } from "@/tests/mocks/post";

describe("Post Card Component", () => {
	it("renders card", async () => {
		render(<PostCard post={mockPosts[0]} />);

		expect(screen.getByText(mockPosts[0].title)).toBeVisible();
	});
});
