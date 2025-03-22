import { PropsWithChildren } from "react";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "./components/app-sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2  px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<section className="container">{children}</section>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
