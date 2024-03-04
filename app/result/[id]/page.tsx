"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ResultPage = (props: { params: { id: string }; searchParams: {} }) => {
  const router = useRouter();
  return (
    <main className="w-full flex-1 flex flex-col px-8 gap-4">
      <h1 className="font-black text-3xl">Here are the results...</h1>
      <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow">
        <Image src={""} alt="stitched" fill />
      </div>
      <Button
        className="w-full text-xl font-bold h-16"
        type="button"
        onClick={() => router.push("/")}
      >
        Stitch some more!
      </Button>
    </main>
  );
};

export default ResultPage;
