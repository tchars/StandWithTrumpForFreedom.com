import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Stand With Trump For Freedom",
	description: "América Latina unida pela democracia e liberdade.",
	keywords: ["Trump", "América Latina", "Democracia", "Liberdade"],
	authors: [{ name: "Stand With Trump For Freedom" }],
	creator: "Stand With Trump For Freedom",
	metadataBase: new URL("https://standwithtrumpforfreedom.com"),
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: "https://standwithtrumpforfreedom.com",
		title: "Stand With Trump For Freedom",
		description: "América Latina unida pela democracia e liberdade.",
		siteName: "Stand With Trump For Freedom",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Stand With Trump For Freedom",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Stand With Trump For Freedom",
		description: "América Latina unida pela democracia e liberdade.",
		images: ["/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// Disclaimer: This website is not associated with any United States institution, President Trump, or any official political entity. It represents exclusively the personal opinion of the site creator.
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt" className="scroll-smooth">
			<body className={`${inter.className} bg-white text-gray-900 antialiased`}>
				{children}
			</body>
		</html>
	);
}
