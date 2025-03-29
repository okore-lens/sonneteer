import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import ErrorWithRetry from "@/components/error-with-retry";

import { mockRefresh } from "@/__mocks__/next/navigation";

describe("error-with-retry component", () => {
	it("renders title,description, retry conditionally", async () => {
		const { rerender } = render(
			<ErrorWithRetry description="Error Description" />
		);
		expect(screen.getByText("Error Description")).toBeVisible();
		expect(screen.getByText("Error")).toBeVisible();
		// retryBtn
		rerender(
			<ErrorWithRetry
				description="Error Description"
				title="Error Title"
				pageTitle="Page Title"
			/>
		);
		waitFor(() => {
			expect(screen.getByText("Error TItle")).toBeVisible();
		});

		// renders retry button when there is an error
		rerender(
			<ErrorWithRetry
				description="Error Description"
				title="Error Title"
				variant="destructive"
			/>
		);
		waitFor(() => {
			expect(screen.getByText("Retry")).toBeVisible();
		});
	});

	it("should refresh route when retry btn is clicked", async () => {
		render(
			<ErrorWithRetry
				description="Error Description"
				title="Error Title"
				variant="destructive"
			/>
		);

		const retryBtn = screen.getByText("Retry");

		fireEvent.click(retryBtn);

		waitFor(() => {
			expect(mockRefresh).toHaveBeenCalled();
		});
	});
});
