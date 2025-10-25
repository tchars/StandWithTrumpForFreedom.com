import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { NewsSection } from "@/components/news-section";

export const revalidate = 86400;

export default function Home() {
	return (
		<div>
			<Navbar />
			<main>
				<Hero />
				<NewsSection />
			</main>
			<Footer />
		</div>
	);
}
