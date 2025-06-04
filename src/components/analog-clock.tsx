
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"; // Added this import

interface AnalogClockProps {
  clockSize?: number;
  className?: string;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ clockSize: initialClockSize = 280, className }) => {
  const [time, setTime] = useState<Date | null>(null);
  const clockSize = initialClockSize; // Use the prop or default

  useEffect(() => {
    setTime(new Date());
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const center = clockSize / 2;
  const handBaseOffsetY = clockSize * 0.053; // Relative offset
  const baseStrokeWidth = Math.max(1, clockSize / 140); // Ensure stroke width is at least 1

  if (time === null) {
    return (
      <Card className={cn("w-fit shadow-xl border-2 border-border p-2", className)} style={{ width: `${clockSize}px`, height: `${clockSize}px` }}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <Skeleton className="rounded-full mb-1" style={{height: `${clockSize * 0.2}px`, width: `${clockSize * 0.2}px`}} />
            <Skeleton style={{height: `${clockSize * 0.05}px`, width: `${clockSize * 0.5}px`}}/>
          </div>
        </CardContent>
      </Card>
    );
  }

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

  const hourMarkLength = clockSize * 0.035;
  const minuteMarkLength = clockSize * 0.018;
  const markDistanceFromEdge = clockSize * 0.035;

  const hourHandLength = center * 0.5;
  const minuteHandLength = center * 0.7;
  const secondHandLength = center * 0.8;


  return (
    <Card className={cn("w-fit shadow-xl border-2 border-border p-1 md:p-2", className)} style={{ width: `${clockSize}px`, height: `${clockSize}px` }}>
      <CardContent className="p-0">
        <svg
          width={clockSize}
          height={clockSize}
          viewBox={`0 0 ${clockSize} ${clockSize}`}
          className="drop-shadow-lg"
        >
          <circle
            cx={center}
            cy={center}
            r={center - baseStrokeWidth}
            fill="hsl(var(--card))"
            stroke="hsl(var(--foreground))"
            strokeWidth={baseStrokeWidth * 1.5}
          />
          
          <circle cx={center} cy={center} r={baseStrokeWidth * 2} fill="hsl(var(--accent))" />

          {/* Hour Marks */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`hour-mark-${i}`}
              x1={center + (center - markDistanceFromEdge) * Math.cos(Math.PI / 6 * i - Math.PI / 2)}
              y1={center + (center - markDistanceFromEdge) * Math.sin(Math.PI / 6 * i - Math.PI / 2)}
              x2={center + (center - markDistanceFromEdge - hourMarkLength) * Math.cos(Math.PI / 6 * i - Math.PI / 2)}
              y2={center + (center - markDistanceFromEdge - hourMarkLength) * Math.sin(Math.PI / 6 * i - Math.PI / 2)}
              stroke="hsl(var(--foreground))"
              strokeWidth={baseStrokeWidth * 1.2}
              strokeLinecap="round"
            />
          ))}

           {/* Minute Marks (only if clock is large enough) */}
           {clockSize > 50 && Array.from({ length: 60 }).map((_, i) => {
            if (i % 5 !== 0) { 
              return (
                <line
                  key={`minute-mark-${i}`}
                  x1={center + (center - markDistanceFromEdge) * Math.cos(Math.PI / 30 * i - Math.PI / 2)}
                  y1={center + (center - markDistanceFromEdge) * Math.sin(Math.PI / 30 * i - Math.PI / 2)}
                  x2={center + (center - markDistanceFromEdge - minuteMarkLength) * Math.cos(Math.PI / 30 * i - Math.PI / 2)}
                  y2={center + (center - markDistanceFromEdge - minuteMarkLength) * Math.sin(Math.PI / 30 * i - Math.PI / 2)}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={Math.max(1, baseStrokeWidth * 0.5)}
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
            y2={center - hourHandLength + handBaseOffsetY}
            stroke="hsl(var(--foreground))"
            strokeWidth={baseStrokeWidth * 2.5}
            strokeLinecap="round"
            transform={`rotate(${getRotation('hours')} ${center} ${center})`}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          />

          {/* Minute Hand */}
          <line
            x1={center}
            y1={center + handBaseOffsetY}
            x2={center}
            y2={center - minuteHandLength + handBaseOffsetY}
            stroke="hsl(var(--foreground))"
            strokeWidth={baseStrokeWidth * 1.8}
            strokeLinecap="round"
            transform={`rotate(${getRotation('minutes')} ${center} ${center})`}
            style={{ transition: 'transform 0.5s ease-in-out' }}
          />

          {/* Second Hand */}
          <line
            x1={center}
            y1={center + handBaseOffsetY + (clockSize * 0.035)} 
            x2={center}
            y2={center - secondHandLength + handBaseOffsetY}
            stroke="hsl(var(--accent))"
            strokeWidth={baseStrokeWidth}
            strokeLinecap="round"
            transform={`rotate(${getRotation('seconds')} ${center} ${center})`}
            style={{ transition: 'transform 0.2s linear' }}
          />
          <circle cx={center} cy={center} r={baseStrokeWidth * 1.8} fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth={baseStrokeWidth * 0.5}/>
        </svg>
      </CardContent>
    </Card>
  );
};

export default AnalogClock;
