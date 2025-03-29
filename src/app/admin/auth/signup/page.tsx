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
	password: yup
		.string()
		.required("Password is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})/,
			"Provide a strong password"
		),
});

type FormType = yup.InferType<typeof formValidation>;

const SingUpPage = () => {
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

			const { data, error } = await supabase.auth.signUp({
				...formData,
			});
			if (error) {
				throw error;
			}

			const user = data.user;

			toast.success(`Hi ${user?.email} welcome onboard!!!`);

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

					<Button
						className="w-full"
						size="sm"
						type="submit"
						loading={isSubmitting}
					>
						Continue
					</Button>
				</section>
			</form>
			<p className="mt-4 text-center text-sm">
				Have an account?&nbsp;
				<Link
					href={PATHS.admin.auth.login}
					className="underline underline-offset-4"
				>
					Login
				</Link>
			</p>
		</FormProvider>
	);
};

export default SingUpPage;
