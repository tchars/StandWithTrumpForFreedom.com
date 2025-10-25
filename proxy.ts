import { NextResponse, type NextRequest } from "next/server";

const locales = ["pt", "en", "es"] as const;

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

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
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
