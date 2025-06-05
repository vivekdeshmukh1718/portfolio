
import Image from 'next/image';
import VisitorCounter from '@/components/visitor-counter';
import { Globe } from 'lucide-react';

export function VisitorStatsSection() {
  return (
    <section id="visitor-stats" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Global Reach
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            Connecting with minds across the globe. This is a simulated visitor count for demonstration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="Stylized World Map"
              data-ai-hint="world map connections"
              layout="fill"
              objectFit="cover"
              className="opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          <div className="lg:col-span-2">
            <VisitorCounter />
          </div>
        </div>
      </div>
    </section>
  );
}
