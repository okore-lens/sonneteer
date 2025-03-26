import React, { PropsWithChildren } from "react";

import AuthLayout from "@/layouts/auth";

const layout = ({ children }: PropsWithChildren) => {
	return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
