import Link from "next/link";

import Logo from "@/components/logo";

import { cn } from "@/libs/utils";
import { NAVBAR_HEIGHT } from "@/libs/constants";

const Navbar = () => {
	return (
		<nav
			style={{ height: NAVBAR_HEIGHT }}
			className={cn("fixed w-screen left-0 top-0 shadow-sm")}
		>
			<section
				className={cn(
					"container !max-w-[1200px] flex items-center justify-between h-full"
				)}
			>
				<Logo />

				<div className="flex gap-3">
					<Link href="/">Home</Link>
				</div>
			</section>
		</nav>
	);
};

export default Navbar;
