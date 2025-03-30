"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
			<section className="space-y-6 max-w-md">
				<div className="flex justify-center">
					<section className="rounded-full bg-red-100 p-4">
						<AlertCircle className="h-12 w-12 text-red-600" />
					</section>
				</div>
				<h1 className="text-4xl font-bold tracking-tight">
					Page not found
				</h1>
				<p className="text-muted-foreground">
					Sorry, we couldn&apos;t find the page you&apos;re looking
					for. The page might have been removed or the URL might be
					incorrect.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button variant="default">
						<Link href="/">Go back home</Link>
					</Button>
					<Button
						variant="outline"
						onClick={() => window.history.back()}
					>
						Go back
					</Button>
				</div>
			</section>
		</main>
	);
}
