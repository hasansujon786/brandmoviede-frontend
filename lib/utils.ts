import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isArrayEmpty<T>(
  value: T[] | null | undefined,
): value is null | undefined | [] {
  return !Array.isArray(value) || value.length === 0;
}

export function getFormatedDate(iso?: string | Date | null): string {
  if (!iso) return "";

  return dayjs(iso).format("DD-MM-YYYY");
}
