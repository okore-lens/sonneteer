import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Editor from "@/components/editor";

import { mockPosts } from "@/tests/mocks/post";

describe("Editor Compoment", () => {
	it("renders editor", () => {
		render(<Editor />);
		const titleInput = screen.getByPlaceholderText(/Give it a title.../i);
		const editorField = screen.getByTestId("editor-content");
		expect(titleInput).toBeVisible();
		expect(editorField).toBeVisible();
	});

	it("updates the title input value when changed", () => {
		render(<Editor />);
		const titleInput = screen.getByPlaceholderText(/Give it a title.../i);

		fireEvent.change(titleInput, {
			target: { value: mockPosts[0].title },
		});
		expect(titleInput).toHaveValue(mockPosts[0].title);
	});

	describe("Toolbar Section", () => {
		it("calls togglebold when bold btn is clicked", () => {
			render(<Editor />);
			const boldButton = screen.getByTestId("editor-toolbar-bold");
			fireEvent.click(boldButton);
			expect(boldButton).toHaveClass("bg-muted");
		});
	});

	describe("Action Buttons", () => {
		it("should not render when editor has no values", () => {
			render(<Editor />);
			const actionBtns = screen.queryByTestId("editor-action-btns");
			expect(actionBtns).not.toBeInTheDocument();
		});

		it("renders when editor has been filled", () => {
			render(<Editor post={mockPosts[0]} />);
			const actionBtns = screen.queryByTestId("editor-action-btns");
			expect(actionBtns).toBeInTheDocument();
		});

		it("publishes post", async () => {
			const { debug } = render(<Editor post={mockPosts[0]} />);
			const publishBtn = screen.getByText("Publish");
			fireEvent.click(publishBtn);

			waitFor(() => {
				console.log(debug());
			});
		});
	});
});
