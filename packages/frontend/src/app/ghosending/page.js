"use client";
import React, { useState } from "react";
import { parseEther } from "viem"; // Assuming this is a valid library

import GhoToken from "./GhoTokenABI.json";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions"; // Assuming these are valid functions
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "../components/ui/use-toast";

// const Transfer = ({ amount, to, from, setState }) => {

export default function Transfer(amount, to, from, setState) {
  const [transfer, setTransfer] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    if (to === "" || amount === "0") {
      toast({
        title: "Error",
        description: "Please enter a valid address and amount",
      });
      return;
    }

    setTransfer(true);

    try {
      const { request } = await prepareWriteContract({
        address: GhoToken.address,
        abi: GhoToken.abi,
        functionName: "transfer",
        args: [to, parseEther(amount)],
      });

      const { hash: uploadyERC } = await writeContract(request);

      await waitForTransaction({ hash: uploadyERC });
      console.log("Transaction confirmed");
      setState("success");
    } catch (error) {
      setState("error");
      console.error("Error:", error);
    }

    setTransfer(false);
  };

  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-full text-[#DBD2EF]">
      {/* ... */}
      <button
        type="submit"
        className="border py-1.5 w-3/4 flex h-12 items-center justify-center bg-[#d0bdfa] text-black font-medium rounded-xl mt-5 shadow-xl"
        onClick={handleClick}
      >
        {transfer ? (
          <div className="flex space-x-2 repeat-infinite skew-y-10">
            <div
              className={`h-2.5 w-2.5 bg-[#fcfaff] rounded-full transition delay-100 animate-bounce translate-y-96  mr-1`}
            ></div>
            <div
              className={`h-2.5 w-2.5 bg-[#fcfaff] rounded-full transition delay-200 animate-bounce translate-y-96 mr-1`}
            ></div>
            <div
              className={`h-2.5 w-2.5 bg-[#fcfaff] rounded-full transition delay-300 animate-bounce translate-y-96`}
            ></div>
          </div>
        ) : (
          "Confirm"
        )}
      </button>
    </div>
  );
}
