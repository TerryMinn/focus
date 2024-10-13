import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FocusTimeType } from "./store/useWorkStore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeMetricSuffix(value: string | undefined): number {
  if (value) {
    switch (value) {
      case "1h":
        return 3600;
      case "15m":
        return 900;
      case "30m":
        return 1800;
      default:
        return 0;
    }
  } else {
    return 0;
  }
}

export function setLocal(value: FocusTimeType[]) {
  localStorage.setItem("works", JSON.stringify(value));
}
