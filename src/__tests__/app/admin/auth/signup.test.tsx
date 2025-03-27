import { toast } from "sonner";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SingUpPage from "@/app/admin/auth/signup/page";

import { PATHS } from "@/libs/paths";
import { mockPush } from "@/__mocks__/next/navigation";

const mockSinUp = jest.fn();

jest.mock("@/libs/supabase/client", () => ({
	__esModule: true,
	default: jest.fn(() => ({
		auth: {
			signUp: mockSinUp,
		},
	})),
}));

afterEach(() => {
	jest.clearAllMocks(); // clean up after every test
});

describe("Signup Page", () => {
	it("renders singup page", () => {
		render(<SingUpPage />);
		expect(
			screen.getByPlaceholderText(/okore@sonneteer.com/i)
		).toBeVisible();
		expect(screen.getByPlaceholderText(/Test@Password123/i)).toBeVisible();
	});

	it("accepts use inputs", () => {
		render(<SingUpPage />);
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
		render(<SingUpPage />);

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

	describe("shows error on invalid email and weak password strength", () => {
		it("displays errors when inputs are invalid", async () => {
			render(<SingUpPage />);

			const emailInput =
				screen.getByPlaceholderText(/okore@sonneteer.com/i);
			const passwordInput =
				screen.getByPlaceholderText(/Test@Password123/i);
			const submitBtn = screen.getByText(/continue/i);

			// Empty fields
			fireEvent.change(emailInput, { target: { value: "" } });
			fireEvent.change(passwordInput, { target: { value: "" } });
			fireEvent.click(submitBtn);

			await waitFor(() => {
				expect(screen.getByText("Email is required")).toBeVisible();
				expect(screen.getByText("Password is required")).toBeVisible();
			});
		});

		it("displays error when password is weak", async () => {
			render(<SingUpPage />);

			const passwordInput =
				screen.getByPlaceholderText(/Test@Password123/i);
			const submitBtn = screen.getByText(/continue/i);

			fireEvent.change(passwordInput, { target: { value: "123" } });
			fireEvent.click(submitBtn);

			await waitFor(() => {
				expect(
					screen.getByText("Provide a strong password")
				).toBeVisible();
			});
		});
	});

	it("submits form", async () => {
		mockSinUp.mockResolvedValueOnce({
			data: {
				user: { email: "okore@sonneteer.com" },
				session: "test-session",
			},
		});

		render(<SingUpPage />);
		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const submitBtn = screen.getByText(/Continue/i);

		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.change(passwordInput, {
			target: { value: "Test@Password123" },
		});

		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(mockSinUp).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "Test@Password123",
			});

			expect(toast.success).toHaveBeenCalledWith(
				"Hi okore@sonneteer.com welcome onboard!!!"
			);
			expect(mockPush).toHaveBeenCalledWith(
				PATHS.admin.dashboard.analytics
			);
		});
	});

	it("shows error toast on wrong credentials", async () => {
		mockSinUp.mockResolvedValueOnce({
			error: new Error("Invalid singup credentials"),
		});

		render(<SingUpPage />);
		const emailInput = screen.getByPlaceholderText(/okore@sonneteer.com/i);
		const passwordInput = screen.getByPlaceholderText(/Test@Password123/i);
		const submitBtn = screen.getByText(/continue/i);

		fireEvent.change(emailInput, {
			target: { value: "wrong@example.com" },
		});
		fireEvent.change(passwordInput, {
			target: { value: "Test@Password123" },
		});
		fireEvent.click(submitBtn);

		await waitFor(() => {
			expect(mockSinUp).toHaveBeenCalledWith({
				email: "wrong@example.com",
				password: "Test@Password123",
			});
			expect(toast.error).toHaveBeenCalledWith(
				"Invalid singup credentials"
			);
			expect(mockPush).not.toHaveBeenCalled();
		});
	});
});
