import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/login",
				permanent: true
			}
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
				port: "",
				// Required so string is not null
				pathname: "**",
				search: ""
			}
		]
	}
};

export default nextConfig;
