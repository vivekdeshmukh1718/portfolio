
"use client";

import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    // Set initial time immediately on mount for client-side only
    setCurrentTime(new Date().toLocaleTimeString());

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  if (currentTime === null) {
    // Render placeholder or null during SSR and initial client render before effect runs
    return <span className="text-sm text-muted-foreground">Loading time...</span>;
  }

  return (
    <span className="text-sm font-mono text-foreground">
      {currentTime}
    </span>
  );
};

export default DigitalClock;
