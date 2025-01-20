import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function isIOS() {
  const userAgent = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const platform = ['iPhone', 'iPad', 'iPod'].includes(navigator.platform);
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return userAgent || platform || iPadOS;
}

export function isIpad() {
  const { width, height } = window.screen;
  const isIpadSize = (width === height * 4 / 3) || (width >= 768 && width <= 1024 && height >= 1024 && height <= 1366) || (width / height > 0.64655172);
  const isIpadAgent = /iPad/.test(navigator.userAgent);

  return isIpadSize || isIpadAgent;
}

export function GetEnvUrl(path: string) {
  return new URL(path, process.env.NEXT_PUBLIC_CDN_URL).href;
}

export function GetV2ImageUrl(path: string) {
  return GetEnvUrl(`/swipooor/v2-images${path}`)
}

export function formatNumberWithUnit(value: number): string {
  const format = (num: number, suffix: string) => {
    const rounded = num.toFixed(1); // Retain one decimal place
    return rounded.endsWith('.0') ? Math.floor(num) + suffix : rounded + suffix; // If it's .0, remove the decimal part
  };

  if (value < 1000) {
    return value.toString(); // If the value is less than 1000, return the original value
  } else if (value >= 1000 && value < 1000000) {
    return format(value / 1000, 'K'); // For thousands, append 'K'
  } else if (value >= 1000000 && value < 1000000000) {
    return format(value / 1000000, 'M'); // For millions, append 'M'
  } else {
    return format(value / 1000000000, 'B'); // For billions, append 'B'
  }
}

export const getVwByPx = (px: number) => {
  return `${px / 375 * 100}vw`
}

export const getPosterUrl = (url: string | undefined) => {
  if (!url) {
    return
  }
  let arr = url.split('/')
  arr = arr.pop()?.split('.') || []
  const posterName = arr[0]
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/poster/${posterName}`
}