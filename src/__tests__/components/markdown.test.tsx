import { render, screen } from "@testing-library/react";

import Markdown from "@/components/markdown";

import { mockPosts } from "@/tests/mocks/post";

describe("Markdown Component", () => {
	it("renders markdown", () => {
		render(<Markdown content={mockPosts[0].content} />);

		const markdownEl = screen.getByTestId("markdown");

		expect(markdownEl).toBeVisible();

		expect(markdownEl).toContainHTML(mockPosts[0].content);
	});
});
