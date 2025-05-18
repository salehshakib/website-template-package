import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(
  num: number | string | undefined,
  showFraction = false,
  decimals = 2
): string {
  if (isNaN(Number(num))) {
    if (showFraction) {
      return "0.00";
    }
    return "0";
  }

  const [integerPart, decimalPart] = Number(num)
    .toFixed(showFraction ? decimals : 0)
    .split(".");

  return showFraction && decimalPart
    ? `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decimalPart}`
    : integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatToFixed(num: number | string, decimals = 2): string {
  return isNaN(Number(num)) ? "0.00" : Number(num).toFixed(decimals);
}
