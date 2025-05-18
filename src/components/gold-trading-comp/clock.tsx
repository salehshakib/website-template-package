'use client'

import { useEffect, useState } from 'react';

export function Clock() {
  const [time, setTime] = useState<Date | null>(null); // Use Date or null type

  useEffect(() => {
    setTime(new Date()); // Set the initial time after the component mounts
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  if (!time) {
    // Avoid rendering mismatched content during SSR hydration
    return null;
  }

  return (
    <div className="flex items-center gap-6">
      <div className="text-white/80">
        {time.toLocaleDateString('en-US', { weekday: 'long' })}{' '}
        {time.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
      </div>
      <div className="bg-[#12132d] rounded-md p-[1px] overflow-hidden border border-white/20">
        <div className="text-lg font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent min-w-[140px] text-center px-2">
          {time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
}