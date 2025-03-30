import CornerPage from "@/app/admin/dashboard/corner/page";
import { render, screen, waitFor } from "@testing-library/react";

import { createServerClient } from "@/libs/supabase/server";
import { mockPosts } from "@/tests/mocks/post";

jest.mock("@/libs/supabase/server", () => ({
	createServerClient: jest.fn(),
}));

describe("Corner Page", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders posts when data is available", async () => {
		(createServerClient as jest.Mock).mockResolvedValue({
			from: jest.fn().mockReturnThis(),
			select: jest.fn().mockResolvedValue({
				data: mockPosts,
				error: null,
			}),
		});

		const { container } = render(await CornerPage());

		await waitFor(() => {
			expect(screen.getAllByTestId("post-card")).toHaveLength(5);
		});

		expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
		expect(screen.getByText(mockPosts[4].title)).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it("shows an error component when no posts are found", async () => {
		(createServerClient as jest.Mock).mockResolvedValue({
			from: jest.fn().mockReturnThis(),
			select: jest.fn().mockResolvedValue({ data: [], error: null }),
		});

		render(await CornerPage());

		await waitFor(() => {
			expect(
				screen.getByText("There are no posts available at the moment.")
			).toBeVisible();
		});
	});

	it("displays an error message when Supabase fails", async () => {
		(createServerClient as jest.Mock).mockResolvedValue({
			from: jest.fn().mockReturnThis(),
			select: jest.fn().mockResolvedValue({
				data: null,
				error: { message: "Supabase error" },
			}),
		});

		render(await CornerPage());

		await waitFor(() => {
			expect(
				screen.getByText(
					"There was a problem loading the posts. Please try again later."
				)
			).toBeVisible();
		});
	});
});
