import { PropsWithChildren } from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import Logo from "@/components/logo";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<Card className="md:w-sm">
				<CardHeader className="items-center flex flex-col">
					<Logo />

					<CardDescription>Let&apos;s get started</CardDescription>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</main>
	);
};

export default AuthLayout;
