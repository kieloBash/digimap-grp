// Import necessary modules and styles
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import necessary modules and styles
import Link from "next/link"; // Import Link component from Next.js

// Define Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the page
export const metadata: Metadata = {
  title: "DIGIMAP BLENDARY",
  description:
    "Digimap Blendary. is a website made by Calvin Coronado, Ghrazielle Reide Ramos, Michelle Martinez, Kielo Bash Mercado, and Valen Salig inaccordance to their project for DIGIMAP.",
};

// RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML document structure
    <html lang="en">
      <body className={`min-h-screen relative w-full ${inter.className}`}>
        {/* Header section */}
        <header className="w-screen h-16 fixed top-0 left-0 bg-main-500 z-100 backdrop-blur-md opacity-90">
          {/* Navigation */}
          <nav className="w-full h-full flex justify-between items-center px-8">
            {/* Logo */}
            <div className="flex gap-2">
              <Link href={"/"} className="text-lg font-bold uppercase">
                Digimap Blendary.
              </Link>
            </div>
          </nav>
        </header>
        {/* Main content section */}
        <main className="mt-20 py-4 px-8">{children}</main>
      </body>
    </html>
  );
}
