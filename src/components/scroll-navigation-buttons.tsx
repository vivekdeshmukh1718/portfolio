
"use client";

import { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollNavigationButtons() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(true); // Start true to show initially if not at bottom

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Show scroll-to-top if scrolled down more than 200px
      setShowScrollToTop(scrollY > 200);

      // Show scroll-to-bottom if not near the bottom (e.g., more than 50px from bottom to avoid flickering)
      // And if the document is scrollable
      if (docHeight > windowHeight) {
        setShowScrollToBottom(scrollY + windowHeight < docHeight - 50);
      } else {
        setShowScrollToBottom(false); // Not scrollable
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call on mount to set initial state

    // Also re-check on resize as document height might change
    window.addEventListener('resize', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Do not render anything if neither button should be shown
  if (!showScrollToTop && !showScrollToBottom) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col space-y-3"> {/* z-40 to be below AI assistant if it's z-50 */}
      {showScrollToBottom && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg h-11 w-11 bg-background/70 hover:bg-muted backdrop-blur-sm border-border/70"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <ArrowDownCircle className="h-6 w-6 text-primary" />
        </Button>
      )}
      {showScrollToTop && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg h-11 w-11 bg-background/70 hover:bg-muted backdrop-blur-sm border-border/70"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpCircle className="h-6 w-6 text-primary" />
        </Button>
      )}
    </div>
  );
}
