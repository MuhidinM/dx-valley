import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (img: {
  small?: string;
  medium?: string;
  large?: string;
}): string => {
  if (img.large) return img.large;
  if (img.medium) return img.medium;
  if (img.small) return img.small;
  return '';
};