"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorWithRetryProps {
	description: string;
	pageTitle?: string;
	variant?: "default" | "destructive";
	title?: string;
}

export default function ErrorWithRetry({
	pageTitle,
	description,
	variant,
	title,
}: ErrorWithRetryProps) {
	const router = useRouter();

	const handleRetry = () => {
		router.refresh();
	};

	return (
		<main>
			{pageTitle && <h6>{pageTitle}</h6>}
			<Alert className="w-max my-4" variant={variant}>
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>{title || "Error"}</AlertTitle>
				<AlertDescription>{description}</AlertDescription>
			</Alert>
			{variant === "destructive" && (
				<Button
					onClick={handleRetry}
					variant="outline"
					className="flex items-center gap-2"
				>
					<RefreshCw className="h-4 w-4" />
					Retry
				</Button>
			)}
		</main>
	);
}
