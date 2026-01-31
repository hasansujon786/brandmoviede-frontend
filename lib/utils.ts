import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isArrayEmpty<T>(
  value: T[] | null | undefined,
): value is null | undefined | [] {
  return !Array.isArray(value) || value.length === 0;
}

export function getFormatedDate(
  iso?: string | Date | null,
  formatString: string = "DD-MM-YYYY",
): string {
  if (!iso) return "";

  return dayjs(iso).format(formatString);
}

export const getErrorMessage = (
  error: unknown,
  defaultMessage = "Something went wrong",
): string => {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as FetchBaseQueryError).data;

    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof (data as any).message === "string"
    ) {
      return (data as any).message;
    }
  }

  return defaultMessage;
};
