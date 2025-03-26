"use server";

import * as yup from "yup";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { PATHS } from "@/libs/paths";
import { createServerClient } from "@/libs/supabase/server";

const authSchema = yup.object({
	email: yup
		.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

export async function login(formData: FormData) {
	const supabase = await createServerClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	try {
		await authSchema.validate(data, { abortEarly: false });
	} catch (err) {
		if (err instanceof yup.ValidationError) {
			const errors = err.inner.reduce((acc, curr) => {
				acc[curr.path!] = curr.message;
				return acc;
			}, {} as Record<string, string>);
			console.error(errors);

			redirect("/error");
		}
	}

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect(PATHS.admin.dashboard);
}

export async function signup(formData: FormData) {
	const supabase = await createServerClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	console.log(data);

	try {
		await authSchema.validate(data, { abortEarly: false });
	} catch (err) {
		if (err instanceof yup.ValidationError) {
			const errors = err.inner.reduce((acc, curr) => {
				acc[curr.path!] = curr.message;
				return acc;
			}, {} as Record<string, string>);
			console.error(errors);

			redirect("/error");
		}
	}

	const { error, data: signupData } = await supabase.auth.signUp(data);

	console.log(signupData);

	if (error) {
		redirect("/error");
	}

	revalidatePath("/", "layout");
	redirect(PATHS.admin.dashboard);
}
