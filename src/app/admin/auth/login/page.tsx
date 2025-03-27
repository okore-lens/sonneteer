"use client";

import * as yup from "yup";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { PasswordField, TextField } from "@/components/form";

import { PATHS } from "@/libs/paths";
import { displayErrors } from "@/libs/utils";
import createBrowserClient from "@/libs/supabase/client";

const formValidation = yup.object().shape({
	email: yup
		.string()
		.email("Provide a valid email address")
		.required("Email is required"),
	password: yup.string().required("Password is required"),
});

type FormType = yup.InferType<typeof formValidation>;

const LoginPage = () => {
	const router = useRouter();

	const methods = useForm<FormType>({
		resolver: yupResolver(formValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		formState: { isSubmitting },
		handleSubmit,
	} = methods;

	const handleLoginForm = async (formData: FormType) => {
		try {
			const supabase = createBrowserClient();

			const { error } = await supabase.auth.signInWithPassword(formData);
			if (error) {
				throw error;
			}

			toast.success(`Welcome Back!`);

			router.push(PATHS.admin.dashboard.analytics);
		} catch (error) {
			displayErrors(error);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(handleLoginForm)}>
				<section className="flex flex-col gap-4">
					<TextField
						label="Email"
						name="email"
						type="email"
						placeholder="okore@sonneteer.com"
					/>

					<PasswordField
						placeholder="Test@Password123"
						name="password"
						label="Password"
					/>
					<Link
						href="#"
						className="text-xs underline-offset-2 hover:underline"
					>
						Forgot your password?
					</Link>
					<Button
						className="w-full"
						size="sm"
						type="submit"
						loading={isSubmitting}
					>
						Login
					</Button>
				</section>
			</form>
			<p className="mt-4 text-center text-sm">
				Don&apos;t have an account?&nbsp;
				<Link
					href={PATHS.admin.auth.signup}
					className="underline underline-offset-4"
				>
					Sign up
				</Link>
			</p>
		</FormProvider>
	);
};

export default LoginPage;
