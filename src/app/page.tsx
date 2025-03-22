import Image from "next/image";

import Navbar from "@/layouts/navbar";

import notebookIllustration from "../assets/illustrations/notebook.svg";

const page = () => {
	return (
		<main>
			<Navbar />
			<section className="h-vh flex items-center justify-center">
				<div className="grid md:grid-cols-2 items-center py-32  container w-full">
					<section>
						<h1>Sonneteer</h1>
						<p>
							<i>by</i>&nbsp;
							<span className="font-medium">Okore Lens</span>
						</p>
					</section>

					<Image
						src={notebookIllustration}
						alt="Notebook illustration"
					/>
				</div>
			</section>
		</main>
	);
};

export default page;
