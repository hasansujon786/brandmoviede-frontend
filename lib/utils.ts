import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isArrayEmpty<T>(value: T[] | null | undefined): value is [] {
  return !Array.isArray(value) || value.length === 0;
}
