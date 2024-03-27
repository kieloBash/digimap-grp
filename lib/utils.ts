import { type ClassValue, clsx } from "clsx"; // Import ClassValue type and clsx function from clsx library
import { twMerge } from "tailwind-merge"; // Import twMerge function from tailwind-merge library

// Function to merge class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  // Combine class names using clsx
  const combinedClassNames = clsx(inputs);
  // Merge tailwind classes using twMerge
  return twMerge(combinedClassNames);
}
