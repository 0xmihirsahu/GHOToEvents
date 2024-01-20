"use client";

import Search from "@/components/Search";

export default function Events() {
  return (
    <div className="h-full p-28 bg-zinc-900 font-pixelify text-white">
      <div className="flex flex-row w-full justify-between mb-8">
        <h1 className="text-4xl font-bold">Browse Events</h1>
        <div className="w-80 mr-1">
          <Search />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-16 place-content-around items-center justify-center ">

        {/* Below is the card component map it with events and show the events*/}

        <div class="card w-96 bg-base-100 shadow-xl hover:scale-105 border-zinc-900 border hover:shadow-xl hover:shadow-black transition ">
          <div class="card-body">
            <h2 class="card-title text-2xl">
              {"Event Title"}
              <div className="badge badge-secondary">
                {"Date"}
              </div>
            </h2>
            <p className="text-zinc-400 break-words whitespace-normal">
              {"Description"}
            </p>
            <p className="text-lg mt-[2px]">
              {"Price" + " $GHO"}
            </p>
            <div class="card-actions justify-end items-center mt-1">
              <a
                className="badge badge-outline text-blue-700"
                target="_blank"
                href="https://ethglobal.com/"
              >
                {"Website"}
              </a>
              <p className="badge badge-outline">
                {"Location"}
              </p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <p className="text-sm">
                {"Max Capacity: " + "maxCapacity"}
              </p>
              <button
                type="submit"
                className="bg-rose-600 justify-self-end text-white px-4 py-1 w-fit rounded-lg mt-2 border-black border-2 hover:shadow-md hover:shadow-black transition duration-75 active:bg-rose-800 active:translate-x-0.5 active:translate-y-0.5"
              >
                RSVP Now
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
