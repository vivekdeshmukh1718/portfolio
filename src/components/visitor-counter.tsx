
"use client";

import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    let initialCount = 0;
    try {
      const storedCount = localStorage.getItem('portfolioVisitorCount');
      if (storedCount) {
        initialCount = parseInt(storedCount, 10);
      } else {
        // Create a somewhat "realistic" starting number based on date
        // This is just for a fun effect, not real tracking.
        const today = new Date();
        initialCount = today.getFullYear() * 100 + (today.getMonth() + 1) * 50 + today.getDate() * 10 + Math.floor(Math.random() * 100);
      }
    } catch (error) {
        const today = new Date();
        initialCount = today.getFullYear() * 100 + (today.getMonth() + 1) * 50 + today.getDate() * 10 + Math.floor(Math.random() * 100);
    }
     setVisitorCount(initialCount);


    const interval = setInterval(() => {
      setVisitorCount(prevCount => {
        const newCount = prevCount + Math.floor(Math.random() * 3) + 1; // Increment by 1 to 3
        try {
            localStorage.setItem('portfolioVisitorCount', newCount.toString());
        } catch (error) {
            // Ignore localStorage errors (e.g. in private browsing)
        }
        return newCount;
      });
    }, 5000); // Increment every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (visitorCount === 0) {
    return (
        <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg shadow-md">
            <TrendingUp className="h-8 w-8 text-primary mr-3 animate-pulse" />
            <span className="text-2xl font-bold text-foreground">Calculating reach...</span>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl shadow-xl border border-border/50">
      <div className="flex items-center text-primary mb-2">
        <Users className="h-8 w-8 md:h-10 md:w-10 mr-3" />
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">Simulated Global Visitors</h3>
      </div>
      <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary py-1">
        {visitorCount.toLocaleString()}
      </div>
      <p className="text-sm text-muted-foreground mt-2">Engagement across the digital canvas</p>
    </div>
  );
};

export default VisitorCounter;
