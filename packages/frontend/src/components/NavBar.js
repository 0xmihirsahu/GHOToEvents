'use client'
import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
export default function NavBar() {
    return (
        <div className="absolute w-full text-white z-10 font-pixelify">
            <nav className="container relative flex flex-wrap justify-between z-10 items-center mx-auto p-4 rounded-xl">
                <Link href="/" className="font-black text-4xl bg-gradient-to-b from-rose-700 to-indigo-900 z-20 via-pink-700 bg-clip-text text-transparent">
                    GHOToEvents
                </Link>
                <div className="space-x-4 text-xl flex flex-row justify-center items-center">
                    <div className=""><Link href="/events" className="font-bold text-2xl text-zinc-200 hover:text-white">Events</Link></div>
                    <div className=""><Link href="/createEvent" className="font-bold text-2xl text-zinc-200 hover:text-white">Create Event</Link></div>
                    <div><ConnectKitButton /></div>
                </div>
            </nav>
        </div>
    );
}
