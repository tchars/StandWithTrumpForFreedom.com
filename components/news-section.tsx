"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Calendar, User } from "lucide-react";

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

export function NewsSection() {
	const pathname = usePathname();
	const currentLocale = pathname.split("/")[1] || "pt";

	const translations = {
		title:
			currentLocale === "pt"
				? "Notícias"
				: currentLocale === "es"
				? "Noticias"
				: "Notícias",
		subtitle:
			currentLocale === "pt"
				? "Últimas notícias"
				: currentLocale === "es"
				? "Últimas noticias"
				: "Últimas notícias",
		loading:
			currentLocale === "pt"
				? "Carregando..."
				: currentLocale === "es"
				? "Cargando..."
				: "Carregando...",
		error:
			currentLocale === "pt"
				? "Erro ao carregar"
				: currentLocale === "es"
				? "Error al cargar"
				: "Error loading",
		noNews:
			currentLocale === "pt"
				? "Nenhuma notícia"
				: currentLocale === "es"
				? "No hay noticias"
				: "No news",
		readMore:
			currentLocale === "pt"
				? "Ler mais"
				: currentLocale === "es"
				? "Leer más"
				: "Read more",
	};

	const [articles, setArticles] = useState<NewsArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadNews = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch("/api/news");

				if (!response.ok) {
					const errorData = await response.json().catch(() => ({}));
					throw new Error(errorData.message || "Failed to fetch news");
				}

				const data = await response.json();

				if (data.error) {
					setError(
						currentLocale === "pt"
							? data.message || "Erro na API de notícias"
							: currentLocale === "es"
							? data.message || "Error en la API de noticias"
							: data.message || "News API error"
					);
					setArticles([]);
				} else if (!data.articles || data.articles.length === 0) {
					setError(
						currentLocale === "pt"
							? "Nenhuma notícia encontrada para os termos pesquisados. Tente novamente mais tarde."
							: currentLocale === "es"
							? "No se encontraron noticias para los términos buscados. Intente nuevamente más tarde."
							: "No news found for the searched terms. Please try again later."
					);
					setArticles([]);
				} else {
					setArticles(data.articles);
				}
			} catch (err) {
				console.error("Error fetching news:", err);
				const errorMessage =
					err instanceof Error ? err.message : "Unknown error occurred";

				setError(
					currentLocale === "pt"
						? `Erro ao carregar notícias: ${errorMessage}`
						: currentLocale === "es"
						? `Error al cargar noticias: ${errorMessage}`
						: `Error loading news: ${errorMessage}`
				);
				setArticles([]);
			} finally {
				setLoading(false);
			}
		};

		loadNews();
	}, [currentLocale]);

	const formatDate = (dateString: string) => {
		const localeMap = {
			pt: "pt-BR",
			es: "es-ES",
			en: "en-US",
		};

		return new Date(dateString).toLocaleDateString(
			localeMap[currentLocale as keyof typeof localeMap],
			{
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			}
		);
	};

	if (loading) {
		return (
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							{translations.title}
						</h2>
						<p className="text-xl text-gray-600">{translations.subtitle}</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<Card key={i}>
								<CardHeader>
									<Skeleton className="h-6 w-3/4" />
									<Skeleton className="h-4 w-1/2" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-20 w-full mb-4" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-2/3" />
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							{translations.title}
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							{translations.subtitle}
						</p>
						<div className="bg-red-100 border border-red-300 p-6 max-w-lg mx-auto">
							<p className="text-red-700">{translations.error}</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	if (articles.length === 0 && !loading) {
		return (
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">
							{translations.title}
						</h2>
						<p className="text-xl text-gray-600 mb-8">
							{translations.subtitle}
						</p>
						<div className="bg-blue-100 border border-blue-300 p-6 max-w-lg mx-auto">
							<p className="text-blue-700">{translations.noNews}</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						{translations.title}
					</h2>
					<p className="text-xl text-gray-600">{translations.subtitle}</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{articles.map((article, index) => (
						<Card
							key={index}
							className="hover:shadow-lg transition-shadow duration-300 bg-white"
						>
							{article.urlToImage && (
								<div
									className="aspect-video bg-gray-200 overflow-hidden bg-cover bg-center"
									style={{ backgroundImage: `url(${article.urlToImage})` }}
									role="img"
									aria-label={article.title}
								/>
							)}

							<CardHeader className="pb-3">
								<div className="flex items-center gap-2 mb-2">
									<Badge variant="outline" className="text-xs">
										{article.source.name}
									</Badge>
									<span className="text-xs text-gray-500 flex items-center gap-1">
										<Calendar className="w-3 h-3" />
										{formatDate(article.publishedAt)}
									</span>
								</div>
								<CardTitle className="text-lg leading-tight hover:text-red-600 transition-colors">
									<a
										href={article.url}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:underline"
									>
										{article.title}
									</a>
								</CardTitle>
								{article.author && (
									<CardDescription className="flex items-center gap-1 text-xs">
										<User className="w-3 h-3" />
										{article.author}
									</CardDescription>
								)}
							</CardHeader>

							<CardContent className="pt-0">
								<p className="text-gray-600 text-sm leading-relaxed mb-4">
									{article.description}
								</p>
								<a
									href={article.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
								>
									{translations.readMore}
									<ExternalLink className="w-3 h-3" />
								</a>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
