import { NextResponse } from "next/server";
import axios from "axios";

// Cache for 24 hours (86400 seconds)
export const revalidate = 86400;

interface NewsArticle {
	title: string;
	description: string;
	url: string;
	urlToImage?: string;
	source: {
		name: string;
	};
	publishedAt: string;
	author?: string;
}

export async function GET() {
	try {
		const API_KEY = process.env.API_NEWS_KEY;
		const BASE_URL = "https://newsapi.org/v2";

		if (!API_KEY) {
			return NextResponse.json(
				{
					error: "NewsAPI key not configured",
					message: "Please configure API_NEWS_KEY environment variable",
				},
				{ status: 500 }
			);
		}

		let response;
		try {
			response = await axios.get(`${BASE_URL}/everything`, {
				params: {
					q: "trump venezuela maduro democracy",
					language: "en",
					sortBy: "relevancy",
					apiKey: API_KEY,
					pageSize: 20,
				},
			});
		} catch {
			response = await axios.get(`${BASE_URL}/everything`, {
				params: {
					q: "trump venezuela maduro democracia libertad",
					language: "pt,es",
					sortBy: "relevancy",
					apiKey: API_KEY,
					pageSize: 20,
				},
			});
		}

		const articles = response.data.articles
			.filter((article: NewsArticle) => {
				if (article.title === "[Removed]" || !article.description) {
					return false;
				}
				return article.description.length >= 20;
			})
			.sort((a: NewsArticle, b: NewsArticle) => {
				const scoreA =
					a.title.toLowerCase().includes("trump") ||
					a.title.toLowerCase().includes("venezuela")
						? 1
						: 0;
				const scoreB =
					b.title.toLowerCase().includes("trump") ||
					b.title.toLowerCase().includes("venezuela")
						? 1
						: 0;

				if (scoreA !== scoreB) {
					return scoreB - scoreA;
				}

				return (
					new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
				);
			})
			.slice(0, 6);

		return NextResponse.json(
			{ articles },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=86400, stale-while-revalidate=172800, max-age=86400",
					"CDN-Cache-Control": "max-age=86400",
					"Vercel-CDN-Cache-Control": "max-age=86400",
					"Surrogate-Control": "max-age=86400",
				},
			}
		);
	} catch (error) {
		console.error("Error fetching news:", error);

		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				return NextResponse.json(
					{
						error: "API key error",
						message:
							"NewsAPI key is invalid or missing. Please configure API_NEWS_KEY in your environment variables.",
						articles: [],
					},
					{ status: 401 }
				);
			} else if (error.response?.status === 429) {
				return NextResponse.json(
					{
						error: "Rate limit exceeded",
						message:
							"Too many requests. Please try again later (free tier: 1000 requests/day).",
						articles: [],
					},
					{ status: 429 }
				);
			} else if (error.response?.status === 400) {
				return NextResponse.json(
					{
						error: "Invalid request",
						message:
							"The search query may be too specific. Try broader terms like 'trump' or 'venezuela'.",
						articles: [],
					},
					{ status: 400 }
				);
			} else if (error.response?.status === 426) {
				return NextResponse.json(
					{
						error: "API upgrade required",
						message:
							"This NewsAPI plan doesn't support this feature. Please upgrade your plan.",
						articles: [],
					},
					{ status: 426 }
				);
			} else {
				return NextResponse.json(
					{
						error: "NewsAPI service error",
						message:
							"Unable to fetch news. The service may be temporarily unavailable.",
						articles: [],
					},
					{ status: 502 }
				);
			}
		} else {
			return NextResponse.json(
				{
					error: "Connection error",
					message:
						"Failed to connect to NewsAPI. Please check your internet connection.",
					articles: [],
				},
				{ status: 500 }
			);
		}
	}
}
