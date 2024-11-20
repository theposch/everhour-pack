// src/utils/formatters.ts

export function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
  
  export function secondsToHours(seconds: number): number {
    return Number((seconds / 3600).toFixed(2));
  }
  
  export function formatPercentage(value: number): string {
    return (value * 100).toFixed(2) + '%';
  }