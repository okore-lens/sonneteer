import { PropsWithChildren } from "react";

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import AppSidebar from "./components/app-sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex sticky top-0 h-16 shrink-0 items-center gap-2  border-b bg-background  px-4">
					<SidebarTrigger className="-ml-1" />
				</header>
				<main className="flex-1 p-4">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default DashboardLayout;
