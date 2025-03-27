import { toast } from "sonner";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import LoginPage from "@/app/admin/auth/login/page";

import { PATHS } from "@/libs/paths";
import { mockPush } from "@/__mocks__/next/navigation";

const mockSignIn = jest.fn();

jest.mock("@/libs/supabase/client", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		auth: {
			signInWithPassword: mockSignIn,
		},
	})),
}));
afterEach(() => {
	jest.clearAllMocks(); // clean up after every test
});

describe("Login Page", () => {
	it("renders login page", () => {
		render(<LoginPage />);
		expect(
			screen.getByPlaceholderText(/okore@sonneteer.com/i)
		).toBeVisible();
		expect(screen.getByPlaceholderText(/Test@Password123/i)).toBeVisible();
	});

	it("accepts use inputs", () => {
		render(<LoginPage />);
		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, {
			target: { value: "Test@Password123" },
		});

		expect(emailInput).toHaveValue("test@example.com");
		expect(passwordInput).toHaveValue("Test@Password123");
	});

	it("password input can be toggled between text and password", () => {
		render(<LoginPage />);

		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const toggleButton = screen.getByRole("button", {
			name: /show password/i,
		});

		// Initially, input type is password
		expect(passwordInput).toHaveAttribute("type", "password");

		// Toggle to text
		fireEvent.click(toggleButton);
		expect(passwordInput).toHaveAttribute("type", "text");

		// Toggle back to password
		fireEvent.click(toggleButton);
		expect(passwordInput).toHaveAttribute("type", "password");
	});

	it("displays errors when inputs are invalid", async () => {
		render(<LoginPage />);

		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const submitBtn = screen.getByText(/login/i);

		// Empty fields
		fireEvent.change(emailInput, { target: { value: "" } });
		fireEvent.change(passwordInput, { target: { value: "" } });
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(screen.getByText("Email is required")).toBeVisible();
			expect(screen.getByText("Password is required")).toBeVisible();
		});
	});

	it("submits form", async () => {
		mockSignIn.mockResolvedValueOnce({
			data: { user: {}, session: "test-session" },
		});

		render(<LoginPage />);
		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const submitBtn = screen.getByText(/login/i);

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, {
			target: { value: "Test@Password123" },
		});

		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(mockSignIn).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "Test@Password123",
			});

			expect(toast.success).toHaveBeenCalledWith("Welcome Back!");
			expect(mockPush).toHaveBeenCalledWith(
				PATHS.admin.dashboard.analytics
			);
		});
	});

	it("shows error toast on wrong credentials", async () => {
		mockSignIn.mockResolvedValueOnce({
			error: new Error("Invalid login credentials"),
		});

		render(<LoginPage />);
		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const submitBtn = screen.getByText(/login/i);

		fireEvent.change(emailInput, {
			target: { value: "wrong@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "WrongPassword" },
		});
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(mockSignIn).toHaveBeenCalledWith({
				email: "wrong@example.com",
				password: "WrongPassword",
			});
			expect(toast.error).toHaveBeenCalledWith(
				"Invalid login credentials"
			);
			expect(mockPush).not.toHaveBeenCalled();
		});
	});
});
