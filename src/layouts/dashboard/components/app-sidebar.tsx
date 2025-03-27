"use client";

import * as React from "react";
import { Command, LayoutDashboard, NotebookPen } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PATHS } from "@/libs/paths";

import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

const data = {
	user: {
		name: "okore",
		email: "lensokore@gmail.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Dashboard",
			url: PATHS.admin.dashboard.analytics,
			icon: LayoutDashboard,
		},
		{
			title: "Corner",
			url: PATHS.admin.dashboard.corner.list,
			icon: NotebookPen,
			items: [
				{
					title: "Curate",
					url: PATHS.admin.dashboard.corner.curate,
				},
			],
		},
	],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">
										Sonneteer
									</span>
									<span className="truncate text-xs">
										Okore Lens
									</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
