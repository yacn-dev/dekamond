import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Storage utilities
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  clear: () => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};