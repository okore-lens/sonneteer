import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
	className?: string;
};

const Logo = ({ className }: LogoProps) => {
	return (
		<Link href="/">
			<Image
				src="/logo.png"
				alt="Sonneteer"
				width={100}
				height={100}
				className={cn(className)}
			/>
		</Link>
	);
};

export default Logo;
