import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function that merges Tailwind CSS classes with clsx.
 * @param inputs - Class values to merge
 * @returns Merged Tailwind class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
