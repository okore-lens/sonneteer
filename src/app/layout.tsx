import type { Metadata } from "next";
import { Crimson_Text, Rubik } from "next/font/google";

import Providers from "./providers";

import "../styles/globals.css";

const crimsonText = Crimson_Text({
	variable: "--font-crimson-text",
	subsets: ["latin"],
	weight: "400",
});

const rubik = Rubik({
	variable: "--font-rubik",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sonneteer",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${rubik.className} ${crimsonText.variable}`}
		>
			<body className={`antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
