import Navbar from "@/layouts/website/navbar";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	);
};

export default layout;
