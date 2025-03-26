import { fireEvent, render, screen } from "@testing-library/react";

import ArticlePreview from "@/components/article-preview";

import { mockArticles } from "@/tests/mocks/article";

describe("Markdown Component", () => {
  it("renders content in a dialog for large screens(>768px)", () => {
    const { rerender } = render(
      <ArticlePreview
        content={mockArticles[0].content}
        publishArticle={jest.fn()}
        title={mockArticles[0].title}
      />,
    );

    // Large Devices (>= 768px)
    setMediaQuery("(min-width: 768px)", true);
    rerender(
      <ArticlePreview
        content={mockArticles[0].content}
        publishArticle={jest.fn()}
        title={mockArticles[0].title}
      />,
    );
    const dialogTriggerBtn = screen.getByRole("button", {
      name: "Preview",
    });

    fireEvent.click(dialogTriggerBtn);

    expect(screen.getByTestId("markdown")).toBeVisible();
  });

  it("renders the content in a drawer for small screens (<768px)", () => {
    const { rerender } = render(
      <ArticlePreview
        content={mockArticles[0].content}
        publishArticle={jest.fn()}
        title={mockArticles[0].title}
      />,
    );

    // Small Devices (<= 768px)
    setMediaQuery("(min-width: 768px)", false);
    rerender(
      <ArticlePreview
        content={mockArticles[0].content}
        publishArticle={jest.fn()}
        title={mockArticles[0].title}
      />,
    );

    const drawerTriggerBtn = screen.getByRole("button", {
      name: "Preview",
    });

    fireEvent.click(drawerTriggerBtn);

    expect(screen.getByTestId("markdown")).not.toBeVisible();
  });
});
