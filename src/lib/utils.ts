// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind className merger
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// Format follower counts: 1200000 → "1.2M"
export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`
  }
  return count.toString()
}

// Format engagement rate: 0.0423 → "4.2%"
export function formatEngagement(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Truncate long strings
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

// Generate fallback avatar URL
export function getAvatarFallback(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&bold=true`
}

// Type guard for platform
export function isPlatform(
  value: string
): value is 'instagram' | 'youtube' | 'tiktok' {
  return ['instagram', 'youtube', 'tiktok'].includes(value)
}
