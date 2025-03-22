import { PropsWithChildren } from "react";

import DashboardLayout from "@/layouts/dashboard";

const layout = ({ children }: PropsWithChildren) => {
	return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
