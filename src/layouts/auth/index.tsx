import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			{children}
		</main>
	);
};

export default AuthLayout;
