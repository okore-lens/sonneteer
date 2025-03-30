import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				hostname: "firebasestorage.googleapis.com",
				protocol: "https",
			},
			{
				hostname: "wqidmoyprjqfupzhvnrp.supabase.co",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
