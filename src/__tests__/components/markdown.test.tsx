import { render, screen } from "@testing-library/react";

import Markdown from "@/components/markdown";

import { mockArticles } from "@/tests/mocks/article";

describe("Markdown Component", () => {
  it("renders markdown", () => {
    render(<Markdown content={mockArticles[0].content} />);

    const markdownEl = screen.getByTestId("markdown");

    expect(markdownEl).toBeVisible();

    expect(markdownEl).toContainHTML(mockArticles[0].content);
  });
});
