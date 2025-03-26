import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/libs/utils";
import { PATHS } from "@/libs/paths";

import { signup } from "../action";

const SignupForm = ({
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

					<CardDescription>Let&apos;s get started</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="okore@sonneteer.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									required
								/>
							</div>

							<Button
								formAction={signup}
								className="w-full"
								size="sm"
							>
								Continue
							</Button>
						</div>
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
				</CardContent>

				<CardFooter className="text-center">
					<small>
						By clicking continue, you agree to our&nbsp;
						<Link href="#">Terms of Service</Link> and&nbsp;
						<Link href="#">Privacy Policy</Link>.
					</small>
				</CardFooter>
			</Card>
		</main>
	);
};

export default SignupForm;
