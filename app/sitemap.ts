import { MetadataRoute } from "next";

const locales = ["pt", "en", "es"] as const;
const baseUrl = "https://standwithtrumpforfreedom.com";

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date();

	const pages = [
		// Main pages
		"",
		"news",
		"about",
		"contact",
	];

	const sitemapEntries: MetadataRoute.Sitemap = [];

	// Add root page
	sitemapEntries.push({
		url: baseUrl,
		lastModified: currentDate,
		changeFrequency: "weekly",
		priority: 1,
	});

	// Add all locale versions of each page
	locales.forEach((locale) => {
		pages.forEach((page) => {
			const url = page
				? `${baseUrl}/${locale}/${page}`
				: `${baseUrl}/${locale}`;

			sitemapEntries.push({
				url,
				lastModified: currentDate,
				changeFrequency: page === "news" ? "hourly" : "weekly",
				priority: page === "" ? 0.9 : page === "news" ? 0.8 : 0.7,
			});
		});
	});

	return sitemapEntries;
}
