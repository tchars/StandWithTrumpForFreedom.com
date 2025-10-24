import { Hero } from "@/components/hero";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
	return (
		<div>
			<Navbar />
			<section>
				<Hero />
			</section>
			<Footer />
		</div>
	);
}
