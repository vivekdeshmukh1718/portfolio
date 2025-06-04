
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const getRotation = (unit: 'hours' | 'minutes' | 'seconds') => {
    const now = time;
    let rotation = 0;
    switch (unit) {
      case 'hours':
        rotation = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
        break;
      case 'minutes':
        rotation = now.getMinutes() * 6 + now.getSeconds() * 0.1;
        break;
      case 'seconds':
        rotation = now.getSeconds() * 6;
        break;
    }
    return rotation;
  };

  const clockSize = 280; // For a "large" clock
  const center = clockSize / 2;
  const strokeWidth = 2;
  const handBaseOffsetY = 15; // To make hands pivot slightly above true center

  return (
    <Card className="w-fit shadow-xl border-2 border-border p-4">
      <CardContent className="p-0">
        <svg
          width={clockSize}
          height={clockSize}
          viewBox={`0 0 ${clockSize} ${clockSize}`}
          className="drop-shadow-lg"
        >
          {/* Clock Face */}
          <circle
            cx={center}
            cy={center}
            r={center - strokeWidth}
            fill="hsl(var(--card))"
            stroke="hsl(var(--foreground))"
            strokeWidth={strokeWidth * 2}
          />
          
          {/* Center Dot */}
          <circle cx={center} cy={center} r={strokeWidth * 2.5} fill="hsl(var(--accent))" />

          {/* Hour Marks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`hour-mark-${i}`}
              x1={center + (center - 10) * Math.cos(Math.PI / 6 * i - Math.PI / 2)}
              y1={center + (center - 10) * Math.sin(Math.PI / 6 * i - Math.PI / 2)}
              x2={center + (center - 20) * Math.cos(Math.PI / 6 * i - Math.PI / 2)}
              y2={center + (center - 20) * Math.sin(Math.PI / 6 * i - Math.PI / 2)}
              stroke="hsl(var(--foreground))"
              strokeWidth={strokeWidth + 1}
              strokeLinecap="round"
            />
          ))}

           {/* Minute Marks */}
           {Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 !== 0) { // Don't draw over hour marks
              return (
                <line
                  key={`minute-mark-${i}`}
                  x1={center + (center - 10) * Math.cos(Math.PI / 30 * i - Math.PI / 2)}
                  y1={center + (center - 10) * Math.sin(Math.PI / 30 * i - Math.PI / 2)}
                  x2={center + (center - 15) * Math.cos(Math.PI / 30 * i - Math.PI / 2)}
                  y2={center + (center - 15) * Math.sin(Math.PI / 30 * i - Math.PI / 2)}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={strokeWidth / 2}
                  strokeLinecap="round"
                />
              );
            }
            return null;
          })}


          {/* Hour Hand */}
          <line
            x1={center}
            y1={center + handBaseOffsetY}
            x2={center}
            y2={center - center * 0.45}
            stroke="hsl(var(--foreground))"
            strokeWidth={strokeWidth * 3}
            strokeLinecap="round"
            transform={`rotate(${getRotation('hours')} ${center} ${center})`}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          />

          {/* Minute Hand */}
          <line
            x1={center}
            y1={center + handBaseOffsetY}
            x2={center}
            y2={center - center * 0.65}
            stroke="hsl(var(--foreground))"
            strokeWidth={strokeWidth * 2}
            strokeLinecap="round"
            transform={`rotate(${getRotation('minutes')} ${center} ${center})`}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          />

          {/* Second Hand */}
          <line
            x1={center}
            y1={center + handBaseOffsetY + 10} // Extend a bit below center
            x2={center}
            y2={center - center * 0.75}
            stroke="hsl(var(--accent))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(${getRotation('seconds')} ${center} ${center})`}
            style={{ transition: 'transform 0.2s linear' }} // Faster, linear transition for seconds
          />
           {/* Center Dot (on top of hands) */}
          <circle cx={center} cy={center} r={strokeWidth * 2} fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth={strokeWidth/2}/>
        </svg>
      </CardContent>
    </Card>
  );
};

export default AnalogClock;
