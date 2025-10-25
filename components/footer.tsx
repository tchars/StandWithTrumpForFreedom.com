"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
	const pathname = usePathname();
	const currentLocale = pathname.split("/")[1] || "pt";

	const translations = {
		title:
			currentLocale === "pt"
				? "Stand With Trump For Freedom"
				: currentLocale === "es"
				? "Stand With Trump For Freedom"
				: "Stand With Trump For Freedom",
		subtitle:
			currentLocale === "pt"
				? "Américas unidas pela democracia e liberdade."
				: currentLocale === "es"
				? "Américas unidas por la democracia y libertad."
				: "Americas united for democracy and freedom.",
		disclaimer:
			currentLocale === "pt"
				? "Este site não é associado a qualquer instituição dos Estados Unidos, ao presidente Trump ou a qualquer entidade política oficial. Representa exclusivamente a opinião pessoal do criador do site."
				: currentLocale === "es"
				? "Este sitio web no está asociado a ninguna institución de los Estados Unidos, al presidente Trump ni a ninguna entidad política oficial. Representa exclusivamente la opinión personal del creador del sitio."
				: "This website is not affiliated with any United States institution, President Trump, or any official political organization. All content reflects solely the personal opinions of the site creator.",
		copyright:
			currentLocale === "pt"
				? "© 2025 Stand With Trump For Freedom. Todos os direitos reservados."
				: currentLocale === "es"
				? "© 2025 Stand With Trump For Freedom. Todos los derechos reservados."
				: "© 2025 Stand With Trump For Freedom. All rights reserved.",
		slogan:
			currentLocale === "pt"
				? "Make Americas Great Again"
				: currentLocale === "es"
				? "Make Americas Great Again"
				: "Make Americas Great Again",
	};

	return (
		<div className="w-full py-20 lg:py-32 bg-gray-900 text-white">
			<div className="container mx-auto px-4">
				<div className="text-center max-w-4xl mx-auto">
					<div className="mb-8">
						<h2 className="text-4xl md:text-6xl tracking-tighter font-bold mb-4">
							{translations.title}
						</h2>
						<p className="text-xl md:text-2xl leading-relaxed tracking-tight text-white/80 mb-6">
							{translations.subtitle}
						</p>

						<div className="bg-red-600 text-white px-6 py-3 font-bold text-lg inline-block">
							{translations.slogan}
						</div>
					</div>

					<div className="mb-8">
						<div className="text-white/75">
							<p className="text-lg">contact@standwithtrumpforfreedom.com</p>
						</div>
					</div>
				</div>

				<div className="border-t border-white/20 mt-12 pt-6 text-center">
					<div className="mb-6">
						<p className="text-sm text-white/50 italic max-w-3xl mx-auto">
							{translations.disclaimer}
						</p>
					</div>

					<div className="border-t border-white/10 pt-4">
						<div className="text-center text-sm text-white/60">
							<p>{translations.copyright}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
