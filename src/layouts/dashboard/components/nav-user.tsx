"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, Loader2, LogOut } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { PATHS } from "@/libs/paths";
import { displayErrors } from "@/libs/utils";
import createBrowserClient from "@/libs/supabase/client";

export function NavUser() {
	const router = useRouter();
	const { isMobile } = useSidebar();
	const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

	const supabase = createBrowserClient();

	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);
			await supabase.auth.signOut({ scope: "local" });
			router.push(PATHS.admin.auth.login);
		} catch (error) {
			displayErrors(error);
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
								// src={user.avatar}
								// alt={user.name}
								/>
								<AvatarFallback className="rounded-lg">
									OL
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								{/* <span className="truncate font-semibold">
									{user.name}
								</span>
								<span className="truncate text-xs">
									{user.email}
								</span> */}
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{/* <AvatarImage
										src={user.avatar}
										alt={user.name}
									/> */}
									<AvatarFallback className="rounded-lg">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									{/* <span className="truncate font-semibold">
										{user.name}
									</span>
									<span className="truncate text-xs">
										{user.email}
									</span> */}
								</div>
							</div>
						</DropdownMenuLabel>

						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={handleSignOut}
							disabled={isSigningOut}
						>
							{isSigningOut ? (
								<Loader2 className="animate-spin size-4" />
							) : (
								<LogOut />
							)}
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
