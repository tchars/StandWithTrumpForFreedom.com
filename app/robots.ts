import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const baseUrl = "https://standwithtrumpforfreedom.com";

	return {
		rules: {
			userAgent: "*",
			allow: [
				"/",
				"/pt/",
				"/en/",
				"/es/",
				"/pt/news",
				"/en/news",
				"/es/news",
				"/pt/about",
				"/en/about",
				"/es/about",
				"/pt/contact",
				"/en/contact",
				"/es/contact",
			],
			disallow: ["/api/", "/_next/", "/admin/", "/private/"],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
