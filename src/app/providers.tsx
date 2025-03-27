import { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Toaster richColors />
			{children}
		</>
	);
};

export default Providers;
