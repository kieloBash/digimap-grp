"use client";
import React, { FormEvent, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2, PlusCircle, ShipWheelIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { stitchImage } from "./stitch";
import axios from "axios";

  // State for image sources, loading status
const InputForm = () => {
  const [imageSrc1, setImageSrc1] = useState<string | undefined>();
  const [imageSrc2, setImageSrc2] = useState<string | undefined>();
  const [stitchedImage, setStitchedImage] = useState<string | undefined>();


  // Refs for file inputs
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [isLoading, setisLoading] = useState(false);

  // Function to trigger file input click
  const handleButtonClick1 = () => {
    fileInputRef1.current?.click();
  };

  const handleButtonClick2 = () => {
    fileInputRef2.current?.click();
  };

  // Function to handle file selection
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageSrc: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          ?.toString()
          .replace("data:", "")
          .replace(/^.+,/, "");
        setImageSrc(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Router instance
  const router = useRouter();

 // Function to handle image stitching
const handleStitch = async (e: FormEvent) => {
  e.preventDefault();
  try {
    // Make POST request to Flask backend
    const response = await axios.post('/stitch', {
      image1: imageSrc1,
      image2: imageSrc2
    });

    // Update state with stitched image data
    setStitchedImage(response.data.stitched_image);
    
  } catch (error) {
    console.error('Error stitching images:', error);
  }
};

  // If loading, display loading message
  if (isLoading) {
    return (
      <main className="w-full flex-1 h-[20rem] flex justify-center items-center">
        <h1 className="">Stitching Up your Images, Please Wait!</h1>
        <Loader2 className="w-6 h-6 animate-spin ml-2" />
      </main>
    );
  }

  // Form for uploading images and other inputs
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Stitching</CardTitle>
        <CardDescription>
          Upload two images here that you wish to stitch/combine.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="w-full grid grid-cols-3" onSubmit={handleStitch}>
          {/* IMAGE UPLOAD */}
          <div className="col-span-2 flex justify-center items-center gap-12">
            <div className="relative w-72 h-72 overflow-hidden">
              {/* Display image or show button to upload */}
              {imageSrc1 ? (
                <Image
                  src={`data:image/jpeg;base64,${imageSrc1}`}
                  alt="uploaded"
                  className="w-full h-full"
                  fill
                />
              ) : (
                <>
                  <button
                    onClick={handleButtonClick1}
                    type="button"
                    className="hover:bg-slate-100 transition-colors w-full h-full rounded-lg border-dashed border-2 flex justify-center items-center"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                  <input
                    ref={fileInputRef1}
                    className="hidden"
                    type="file"
                    onChange={(e) => handleFileChange(e, setImageSrc1)}
                  />
                </>
              )}
            </div>
            <span className="font-black text-6xl text-main-600">+</span>
            <div className="relative w-72 h-72 overflow-hidden">
              {/* Display image or show button to upload */}
              {imageSrc2 ? (
                <Image
                  src={`data:image/jpeg;base64,${imageSrc2}`}
                  alt="uploaded"
                  className="w-full h-full"
                  fill
                />
              ) : (
                <>
                  <button
                    onClick={handleButtonClick2}
                    type="button"
                    className="hover:bg-slate-100 transition-colors w-full h-full rounded-lg border-dashed border-2 flex justify-center items-center"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                  <input
                    ref={fileInputRef2}
                    className="hidden"
                    type="file"
                    onChange={(e) => handleFileChange(e, setImageSrc2)}
                  />
                </>
              )}
            </div>
          </div>

          {/* FORM - Additional Input Fields */}
          <div className="mb-4 flex flex-col justify-evenly items-center gap-4">
            {/* Example input field */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Label</Label>
              <Input type="text" placeholder="Enter here..." />
            </div>
            {/* More input fields */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Label</Label>
              <Input type="text" placeholder="Enter here..." />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Label</Label>
              <Input type="text" placeholder="Enter here..." />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Label</Label>
              <Input type="text" placeholder="Enter here..." />
            </div>
          </div>
          {/* Button to trigger stitching */}
          <Button
            className="w-full text-xl font-bold h-16 col-span-3"
            type="submit"
            size={"lg"}
            disabled={isLoading || !imageSrc1 || !imageSrc2}
          >
            Stitch Me Up! <ShipWheelIcon className="w-6 h-6 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InputForm;
