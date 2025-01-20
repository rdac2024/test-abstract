import "@/styles/common.scss";

import React from "react";
import { Metadata, Viewport } from "next";
import RootProviders from "@/app/providers";

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	userScalable: false,
	viewportFit: 'cover'
}

export const metadata: Metadata = {
	description: "Swipooor is a unique mini-game where you predict market price movements by swiping right or left. Accumulate gold Coins and Gems, advance on the leaderboard, enter raffles, and redeem points for a $RDAC airdrop. Engage with predictive markets and enjoy rewards as you play.",
	manifest: "/manifest.json",
	icons: { icon: "/icons/logo128.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-touch-fullscreen" content="yes" />
			</head>
			<body id="body-tag-id">
				<RootProviders>
					{children}
				</RootProviders>
			</body>
		</html>
	);
}
