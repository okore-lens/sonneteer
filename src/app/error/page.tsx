"use client";

import Link from "next/link";
import { AlertOctagon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Page = () => {
	return (
		<main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
			<section className="space-y-6 max-w-md">
				<div className="flex justify-center">
					<div className="rounded-full bg-red-100 p-4">
						<AlertOctagon className="h-12 w-12 text-red-600" />
					</div>
				</div>
				<h4 className="tracking-tight">Something went wrong</h4>
				<p className="text-muted-foreground">
					We&apos;re sorry, but we encountered an error while loading
					this page.
				</p>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button>
						<Link href="/">Go back home</Link>
					</Button>
				</div>
			</section>
		</main>
	);
};

export default Page;
