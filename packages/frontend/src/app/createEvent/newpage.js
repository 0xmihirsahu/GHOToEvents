"use client";

import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { parseEther } from "viem";
import GhoToken from "@/app/_constant/GhoTokenABI.json";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type TransferProps = {
  to: string;
  from: `0x${string}` | undefined;
  amount: string;
  setState: React.Dispatch<
    React.SetStateAction<"connect" | "transfer" | "success" | "error">
  >;
};

const Transfer = ({ amount, to, from, setState }: TransferProps) => {
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
    {
      toast({
        title: "Success",
        description: "Transaction confirmed",
      });
    }

    const { request } = await prepareWriteContract({
      address: GhoToken.address as `0x${string}`,
      abi: GhoToken.abi,
      functionName: "transfer",
      args: [to, parseEther(amount)],
    });
    const { hash: uploadyERC } = await writeContract(request);
    await waitForTransaction({ hash: uploadyERC })
      .then(() => {
        console.log("transaction confirmed");
        setState("success");
      })
      .catch((error) => {
        setState("error");
        console.log("error", error);
      });

    setTransfer(false);
  };

  return (
    <div className="flex flex-col space-y-4 justify-center items-center w-full text-[#DBD2EF]">
      <div className="w-20 h-20 rounded-full bg-[#C1A9FF]"></div>
      <h1 className="text-xl font-normal">You are Paying</h1>
      <h2 className="text-lg font-normal bg-white bg-opacity-10 backdrop-blur-md px-3 py-1.5 rounded-lg">
        chandrabose.eth
      </h2>
      <h2 className="text-xl font-medium pb-4">{amount} GHO</h2>
      <span className="w-full h-[1px] bg-[#ffffff60]"></span>
      <h2 className="pt-2 text-xl font-medium">
        {from?.substring(0, 5)}...
        {from?.substring(from?.length - 5, from?.length)}{" "}
      </h2>
      <h2 className="pb-4 text-lg font-regular">250 GHO</h2>
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
};

export default Transfer;