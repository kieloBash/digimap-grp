"use client";
import { Button } from "@/components/ui/button"; // Import Button component
import Image from "next/image"; // Import Image component from Next.js
import { useRouter } from "next/navigation"; // Import useRouter hook from Next.js
import React, { useEffect, useState } from "react"; // Import React and useEffect
import axios from "axios"; // Import axios for making HTTP requests


// ResultPage component
const ResultPage = (props: { params: { id: string }; searchParams: {} }) => {
  const router = useRouter(); // Initialize useRouter hook
  const [stitchedImage, setStitchedImage] = useState<string>("");

  // Function to fetch stitched image data from backend
  const fetchStitchedImage = async () => {
    try {
      // Make GET request to Flask backend
      const response = await axios.get("/get-stitched-image");

      // Set stitched image data in state
      setStitchedImage(response.data.stitched_image);
    } catch (error) {
      console.error("Error fetching stitched image:", error);
    }
  };

  // Fetch stitched image data when component mounts
  useEffect(() => {
    fetchStitchedImage();
  }, []);

  // Main content section
  return (
    <main className="w-full flex-1 flex flex-col px-8 gap-4">
      {/* Title */}
      <h1 className="font-black text-3xl">Here are the results...</h1>
      {/* Container for displaying stitched image */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl shadow">
        {/* Image component */}
        <Image src={stitchedImage} alt="stitched" layout="fill" />
      </div>
      {/* Button for navigating back to the homepage */}
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
