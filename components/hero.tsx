"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

export const Hero = () => {
	const pathname = usePathname();
	const currentLocale = pathname.split("/")[1] || "pt";

	const translations = {
		mainTitle:
			currentLocale === "pt"
				? "América Latina"
				: currentLocale === "es"
				? "América Latina"
				: "Latin America",
		rotatingWords:
			currentLocale === "pt"
				? ["livre", "democrática", "próspera", "unida", "forte"]
				: currentLocale === "es"
				? ["libre", "democrática", "próspera", "unida", "fuerte"]
				: ["free", "democratic", "prosperous", "united", "strong"],
		subtitle:
			currentLocale === "pt"
				? "Todo apoio a remoção de regimes autoritários, liberdade de expressão e democracia."
				: currentLocale === "es"
				? "Todo apoio a la eliminación de regímenes autoritarios, la libertad de expresión y la democracia."
				: "Full support for the removal of authoritarian regimes, freedom of speech, and democracy.",
		maga: "Make Americas Great Again",
	};
	const [titleNumber, setTitleNumber] = useState(0);
	const titles = useMemo(
		() => translations.rotatingWords,
		[translations.rotatingWords]
	);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (titleNumber === titles.length - 1) {
				setTitleNumber(0);
			} else {
				setTitleNumber(titleNumber + 1);
			}
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, [titleNumber, titles]);

	return (
		<div className="w-full bg-white">
			<div className="w-full px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-900">
				<div className="flex gap-8 py-16 lg:py-32 xl:py-40 items-center justify-center flex-col max-w-full overflow-visible">
					<div className="flex gap-4 flex-col w-full gap-y-8">
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl max-w-full tracking-tighter text-center font-regular hyphens-auto">
							<span className="text-white font-bold">
								{translations.mainTitle}
							</span>
							<span className="relative flex w-full justify-center text-center md:pb-4 md:pt-1">
								&nbsp;
								{titles.map((title, index) => (
									<motion.span
										key={index}
										className="absolute font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-10xl text-white bg-red-600 hyphens-auto px-4 "
										initial={{ opacity: 0, y: "-100" }}
										transition={{ type: "spring", stiffness: 50 }}
										animate={
											titleNumber === index
												? {
														y: 0,
														opacity: 1,
												  }
												: {
														y: titleNumber > index ? -150 : 150,
														opacity: 0,
												  }
										}
									>
										{title}
									</motion.span>
								))}
							</span>
						</h1>

						<div className="text-center space-y-4">
							<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-tight max-w-full mx-auto">
								<span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/50">
									{translations.subtitle}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
