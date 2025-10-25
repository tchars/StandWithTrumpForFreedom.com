"use client";

import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const locales = ["pt", "en", "es"] as const;
type Locale = (typeof locales)[number];

const languageNames: Record<Locale, string> = {
	pt: "Português",
	en: "English",
	es: "Español",
};

export function LanguageSelector() {
	const router = useRouter();
	const pathname = usePathname();
	const currentLocale = (pathname.split("/")[1] || "pt") as Locale;

	const switchLocale = (newLocale: Locale) => {
		const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
		router.push(newPathname || `/${newLocale}`);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 border-gray-300 hover:border-red-300"
				>
					<Globe className="h-4 w-4" />
					<span className="hidden sm:inline">
						{languageNames[currentLocale]}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="bg-white border border-gray-200 shadow-lg z-50"
			>
				{locales.map((localeOption) => (
					<DropdownMenuItem
						key={localeOption}
						onClick={() => switchLocale(localeOption)}
						className={cn(
							"cursor-pointer hover:bg-red-50 hover:text-red-600",
							currentLocale === localeOption ? "bg-red-50 text-red-600" : ""
						)}
					>
						{languageNames[localeOption]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
