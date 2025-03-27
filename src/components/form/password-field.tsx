import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useTogglePassword from "@/hooks/use-toggle-password";
import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
	name: string;
	label?: string;
} & React.ComponentProps<"input">;

const PasswordField = ({ name, label, ...props }: PasswordFieldProps) => {
	const { control } = useFormContext();
	const { showPassword, togglePassword } = useTogglePassword();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<div className="grid gap-2">
					{label && <Label htmlFor={name}>{label}</Label>}
					<section className="relative">
						<Input
							type={showPassword ? "text" : "password"}
							aria-invalid={!!error}
							{...props}
							{...field}
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={togglePassword}
							className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:bg-transparent"
							tabIndex={-1}
						>
							{showPassword ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</Button>
					</section>
					{!!error && (
						<p className="error text-end">
							{error?.message || "Field is invalid"}
						</p>
					)}
				</div>
			)}
		/>
	);
};

export default PasswordField;
