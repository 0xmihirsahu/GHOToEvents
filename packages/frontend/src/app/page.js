'use client'

import Image from "next/image";
import HomeBG from "../../public/assets/home-bg-img.jpg"

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen font-pixelify">
		<div className="absolute -z-10 inset-0 ">
                <Image
                    src={HomeBG}
					alt="."
                    fill
                    style={{objectFit:'cover'}}
                />
<div className="absolute inset-0 bg-gradient-to-r from-slate-900"></div>
            </div>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="inline-block max-w-xl text-center justify-center">
					<h1 className="text-5xl font-bold ">Your&nbsp;
					<span className="bg-gradient-to-b from-rose-700 to-indigo-900 via-pink-700 bg-clip-text text-transparent text-5xl font-bold tracking-wider">GHO-To-Events&nbsp; </span>
          </h1>
					<h1 className="text-5xl font-bold">
						Management and RSVPing Dapp.
					</h1>
					<h4 className="mt-4 text-xl">
						Create, Participate and Attend Events.
					</h4>
				</div>

				<div className="flex gap-3">
					
				</div>
			</section>
    </div>
  )
}
