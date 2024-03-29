"use client";
import { useState } from "react";
import Lottie from "lottie-react";

import { ethers } from "ethers";
import EventContractConfig from "./EventContractConfig";
import creatingAnimation from "@/public/assets/creatingAnimation.json";


export default function CreateEvent() {
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("online");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [colAmount, setColAmount] = useState("0");

  const [isCreating, setIsCreating] = useState(false);

  const createEvent = async (event) => {
    event.preventDefault();
    setIsCreating(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        EventContractConfig.eventContractAddress,
        EventContractConfig.eventContractAbi,
        signer
      );

      // Convert the price, maxCapacity, and colAmount to BigNumber if needed
      const priceBN = ethers.utils.parseUnits(price, "wei");
      const maxCapacityBN = ethers.BigNumber.from(maxCapacity);
      const colAmountBN = ethers.utils.parseUnits(colAmount, "wei");

      // Convert date to Unix timestamp in seconds
      const dateUnix = Date.parse(date) / 1000;

      await contract.createEvent(
        eventTitle,
        description,
        priceBN,
        dateUnix,
        maxCapacityBN,
        location,
        websiteLink,
        colAmountBN
      );

      console.log("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsCreating(false);
    }
  };
  const borrowGHO = async (event) => {
    event.preventDefault();
    // Implement borrowing GHO logic here
    console.log({
      colAmount,
    });
  };

  return (
    <div className="flex h-screen">
      <form className="w-full mx-60 mt-24 font-pixelify p-8 bg-zinc-900 h-fit rounded-2xl">
        <h1 className="font-extrabold text-4xl mb-6 text-rose-100">
          Create Your Own Events
        </h1>
        <div className="mb-3">
          <label
            htmlFor="eventTitle"
            className="block text-lg font-medium mb-2"
          >
            Event Title
          </label>
          <input
            type="text"
            id="eventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="border border-rose-400 bg-zinc-800 rounded-md px-2 py-2 w-96"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-rose-400 bg-zinc-800 rounded-md px-4 py-2 w-full"
          />
        </div>

        <div className="mb-3 flex flex-row gap-16">
          <div>
            <label htmlFor="price" className="block text-lg font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-rose-400 bg-zinc-800 rounded-md px-2 py-1 w-60"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-rose-400 bg-zinc-800 rounded-md px-2 py-1 w-60"
            />
          </div>
          <div className="">
            <label
              htmlFor="maxCapacity"
              className="block text-lg font-medium mb-2"
            >
              Max Capacity
            </label>
            <input
              type="number"
              id="maxCapacity"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              className="border  border-rose-400 bg-zinc-800 rounded-md px-2 py-1 w-60"
            />
          </div>
        </div>

        <div className="mb-3 flex flex-row gap-14">
          <div className="mb-3">
            <label
              htmlFor="location"
              className="block text-lg font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-rose-400 bg-zinc-800 rounded-md px-2 py-1 w-96"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="websiteLink"
              className="block text-lg font-medium mb-2"
            >
              Website Link
            </label>
            <input
              type="url"
              id="websiteLink"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="border  border-rose-400 rounded-md px-2 py-1 w-96 bg-zinc-800"
            />
          </div>
        </div>

        <div className="flex flex-row gap-10 mb-4 items-center">
          <div>
            <label
              htmlFor="colAmount"
              className="block text-lg font-medium mb-2"
            >
              Collateral Amount
            </label>
            <input
              type="number"
              id="colAmount"
              value={colAmount}
              onChange={(e) => setColAmount(e.target.value)}
              className="border border-purple-600 bg-zinc-800 rounded-md px-2 py-2 w-60"
            />
          </div>
          <button
            type="submit"
            onClick={borrowGHO}
            className="bg-purple-800 self-end text-white px-4 py-2 rounded-md mt-4 border-black border-2 hover:shadow-md hover:shadow-black transition duration-75 active:translate-x-0.5 active:translate-y-0.5"
          >
            Deposit Collateral & Borrow GHO
          </button>
          <p className="self-end p-3 justify-self-center align-baseline tracking-wide">
            {"Optional"}
          </p>
        </div>

        <button
          type="submit"
          onClick={createEvent}
          className="bg-rose-600 text-white px-4 py-2 rounded-md mt-4 border-black border-2 hover:shadow-md hover:shadow-black transition duration-75 active:translate-x-0.5 active:translate-y-0.5"
        >
          Create Event
        </button>
      </form>
      {isCreating && (
        <div className="font-pixelify w-full h-full flex items-center justify-center z-10 backdrop-blur-[2px] brightness-75 fixed top-0 left-0">
          <div className="bg-zinc-800 rounded-3xl p-2">
            <Lottie animationData={creatingAnimation} className="px-12" />
            <p className="text-4xl p-6 text-rose-400 text-center">
              Creating Event
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
