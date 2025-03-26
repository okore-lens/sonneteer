import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";
import { PATHS } from "@/libs/paths";

import { login } from "../action";

const LoginForm = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<"main">) => {
	return (
		<main
			className={cn("flex flex-col gap-6 md:w-sm", className)}
			{...props}
		>
			<Card>
				<CardHeader className="items-center flex flex-col">
					<Logo />

					<CardDescription>Login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="okore@sonneteer.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<section className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<Link
										href="#"
										className="ml-auto text-xs underline-offset-2 hover:underline"
									>
										Forgot your password?
									</Link>
								</section>
								<Input id="password" type="password" required />
							</div>

							<Button
								formAction={login}
								className="w-full"
								size="sm"
							>
								Login
							</Button>
						</div>
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
				</CardContent>
			</Card>
		</main>
	);
};

export default LoginForm;
