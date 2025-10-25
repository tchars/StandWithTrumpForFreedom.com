"use client";

import { usePathname } from "next/navigation";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MobileNav } from "./mobile-nav";
import { LanguageSelector } from "./language-selector";
import Link from "next/link";

export default function Navbar() {
	const pathname = usePathname();
	const currentLocale = pathname.split("/")[1] || "pt";

	const navigationLinks = [
		{
			name: "Menu",
			items: [
				{
					href: "#home",
					label:
						currentLocale === "pt"
							? "Início"
							: currentLocale === "es"
							? "Inicio"
							: "Home",
					active: true,
				},
				{
					href: "#news",
					label:
						currentLocale === "pt"
							? "Notícias"
							: currentLocale === "es"
							? "Noticias"
							: "News",
				},
			],
		},
	];

	return (
		<header className="w-full flex h-16 items-center justify-between gap-4 bg-white border-b border-gray-200 shadow-sm px-4 lg:px-8">
			<div className="flex flex-1 items-center justify-start max-md:hidden">
				<NavigationMenu>
					<NavigationMenuList>
						{navigationLinks[0].items.map((link, index) => (
							<NavigationMenuItem key={index}>
								<NavigationMenuLink
									asChild
									href={link.href}
									data-active={link.active}
									className="px-3 py-1.5 font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
								>
									<Link href={link.href}>{link.label}</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			<div className="flex items-center justify-center gap-2">
				<MobileNav nav={navigationLinks} />

				<Link
					href="#"
					className="flex items-center gap-2 font-bold text-xl text-red-600 hover:text-red-700 transition-colors"
				>
					<div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white font-bold text-sm">
						T
					</div>
					<span className="hidden sm:inline">Stand With Trump For Freedom</span>
				</Link>
			</div>

			<div className="flex flex-1 items-center justify-end gap-2">
				<LanguageSelector />
			</div>
		</header>
	);
}
