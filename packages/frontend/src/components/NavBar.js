'use client'
import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
export default function NavBar() {
    return (
        <div className="absolute w-full text-black z-10">
            <nav className="container relative flex flex-wrap justify-between items-center mx-auto p-4 bg-gradient-to-b from-neutral-500">
                <Link href="/" className="font-bold text-3xl">
                    EventsGHO
                </Link>
                <div className="space-x-4 text-xl flex flex-row justify-center items-center">
                    <div className=""><Link href="/events" className="font-bold  hover:text-neutral-700">Events</Link></div>
                    <div className=""><Link href="/createEvent" className="font-bold  hover:text-neutral-700">Create Event</Link></div>
                    <div><ConnectKitButton /></div>
                </div>
            </nav>
        </div>
    );
}
