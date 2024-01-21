"use client";

import Image from "next/image";
import HomeBG from "@/public/assets/home-bg-img.jpg";
import GithubSVG from "@/public/assets/GithubSVG";

export default function Home() {
	return (
		<main className="font-pixelify scroll-smooth">
			<div className="flex items-center justify-center h-screen ">
				<div className="absolute  inset-0 ">
					<Image src={HomeBG} alt="." fill style={{ objectFit: "cover" }} />
					<div className="absolute inset-0 bg-gradient-to-r from-slate-900"></div>
				</div>
				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 z-10">
					<div className="inline-block max-w-xl text-center justify-center">
						<h1 className="text-5xl font-bold ">
							Your&nbsp;
							<span className="bg-gradient-to-b from-rose-700 to-indigo-900 via-pink-700 bg-clip-text text-transparent text-5xl font-bold tracking-wider">
								GHO-To-Events&nbsp;{" "}
							</span>
						</h1>
						<h1 className="text-5xl font-bold">Management and RSVPing Dapp.</h1>
						<h4 className="mt-4 text-xl">
							Create, Participate and Attend Events.
						</h4>
					</div>

					<div className="flex gap-3"></div>
				</section>
			</div>
			<section className="w-full items-center justify-between bg-slate-950 text-sm flex">
				<div className="w-full p-24 min-w-min">
					<h3 className="text-4xl font-bold mb-5">
						About <span className="bg-gradient-to-b from-rose-700 to-indigo-900 via-pink-700 bg-clip-text text-transparent text-4xl font-bold tracking-wider">
							{" "}GHO-To-Events&nbsp;
						</span>
					</h3>
					<p className="font-normal text-gray-400 text-lg mb-5">
						{"A groundbreaking platform that revolutionizes event organization and participation through the power of GHO tokens. Empower your events with seamless integration of digital currency, allowing both organizers and participants to experience a new era in event management."}

						{"With GHOToEvents, event creation and participation are driven by the efficiency and innovation of GHO tokens. This tokenized events platform unites organizers and participants in a digital ecosystem where RSVPs are synchronized with GHO tokens. Now, event organizers can set maximum capacities for their gatherings, ensuring optimal planning and coordination."}

						{"Say goodbye to traditional RSVPs and welcome a future where attendees pay the price in GHO tokens, creating a streamlined and secure transaction process. By linking participants and events through GHO tokens, GHOToEvents provides a platform that not only enhances the overall event experience but also adds a layer of digital currency sophistication to the entire ecosystem. Join us in uniting events with the future of currency—GHOToEvents is where innovation meets celebration."}
					</p>
					
				</div>
			</section>
			<footer className="z-10 h-80 flex flex-col justify-center items-center gap-10 bg-gradient-to-b from-slate-950 to-black">
				<a href="https://github.com/0xmihirsahu/GHOToEvents" target="_blank">
					<GithubSVG className="hover:fill-white" />
				</a>
				<p className="font-medium">
					Made with ❤️ by{" "}
					<a
						className="font-semibold hover:underline underline-offset-4"
						target="_blank"
						rel="noreferrer"
						href={"https://twitter.com/0xmihirsahu"}
					>
						{" "}
						Mihir,
					</a>
					<a
						className="font-semibold hover:underline underline-offset-4"
						target="_blank"
						rel="noreferrer"
						href={"https://twitter.com/Hebx"}
					>
						{" "}
						Ihab,
					</a>{" "}
					<a
						className="font-semibold hover:underline underline-offset-4"
						target="_blank"
						rel="noreferrer"
						href={"https://github.com/skpkss"}
					>
						Saurabh{" "}
					</a>
					&{" "}
					<a
						className="font-semibold hover:underline underline-offset-4"
						target="_blank"
						rel="noreferrer"
						href={"https://twitter.com/Upendra-Jaiswal"}
					>
						{" "}
						Upendra
					</a>
				</p>
			</footer>
		</main>
	);
}
