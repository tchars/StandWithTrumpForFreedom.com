import { NextResponse, type NextRequest } from "next/server";

const locales = ["pt", "en", "es"] as const;

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for static assets and generated files
	if (
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/api/") ||
		pathname.includes(".") ||
		pathname === "/favicon.ico" ||
		pathname.startsWith("/public/") ||
		pathname === "/og-image.png" ||
		pathname === "/sitemap.xml" ||
		pathname === "/robots.txt" ||
		pathname === "/sitemap" ||
		pathname === "/robots"
	) {
		return NextResponse.next();
	}

	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	if (pathnameHasLocale) {
		return NextResponse.next();
	}

	if (pathname === "/") {
		return NextResponse.redirect(new URL("/pt", request.url));
	}

	return NextResponse.redirect(new URL(`/pt${pathname}`, request.url));
}

export const config = {
	matcher: ["/((?!api|_next|_vercel|favicon.ico|og-image|sitemap|robots).*)"],
};
