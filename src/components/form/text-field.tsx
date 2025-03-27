import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Label } from "../ui/label";
import { Input } from "../ui/input";

type TextFieldProps = {
	name: string;
	label?: string;
} & React.ComponentProps<"input">;

const TextField = ({ name, label, ...props }: TextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => (
				<div className="grid gap-2">
					{label && <Label htmlFor={name}>{label}</Label>}
					<Input aria-invalid={!!error} {...props} {...field} />
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

export default TextField;
