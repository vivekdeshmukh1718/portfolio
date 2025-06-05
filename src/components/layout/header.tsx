
"use client"
import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; 
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Internships", href: "/#internships" },
  { label: "GitHub", href: "/#github-activity"},
  { label: "Achievements", href: "/#achievements" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/contact" },
];

interface TargetLocation {
  page: string; 
  id?: string;  
}

const sectionTargetMap: { [key: string]: TargetLocation } = {
  "hero": { page: "/", id: "hero" },
  "home": { page: "/", id: "hero" },
  "top": { page: "/", id: "hero" },
  "introduction": { page: "/", id: "hero" },
  "about": { page: "/", id: "about" },
  "about me": { page: "/", id: "about" },
  "background": { page: "/", id: "about" },
  "education": { page: "/", id: "about" }, 
  "skill": { page: "/", id: "skills" },
  "skills": { page: "/", id: "skills" },
  "technical skills": { page: "/", id: "skills" },
  "technologies": { page: "/", id: "skills" },
  "project": { page: "/", id: "projects" },
  "projects": { page: "/", id: "projects" },
  "my projects": { page: "/", id: "projects" },
  "work": { page: "/", id: "projects" },
  "portfolio": { page: "/", id: "projects" },
  "internship": { page: "/", id: "internships" },
  "internships": { page: "/", id: "internships" },
  "experience": { page: "/", id: "internships" },
  "github": { page: "/", id: "github-activity" },
  "github activity": { page: "/", id: "github-activity" },
  "contributions": { page: "/", id: "github-activity" },
  "achievement": { page: "/", id: "achievements" },
  "achievements": { page: "/", id: "achievements" },
  "milestones": { page: "/", id: "achievements" },
  "awards": { page: "/", id: "achievements" },
  "certification": { page: "/", id: "certifications" },
  "certifications": { page: "/", id: "certifications" },
  "credentials": { page: "/", id: "certifications" },
  "visitor": { page: "/", id: "visitor-stats" },
  "visitors": { page: "/", id: "visitor-stats" },
  "visitor stats": { page: "/", id: "visitor-stats" },
  "stats": { page: "/", id: "visitor-stats" },
  "global reach": { page: "/", id: "visitor-stats" },
  "buildwithdeshmukh": { page: "/", id: "buildwithdeshmukh" },
  "build with deshmukh": { page: "/", id: "buildwithdeshmukh" },
  "ai lab": { page: "/", id: "buildwithdeshmukh" }, // Keep old keywords mapping to new ID
  "idea generator": { page: "/", id: "buildwithdeshmukh" },
  "ai idea lab": { page: "/", id: "buildwithdeshmukh" },
  "project idea": { page: "/", id: "buildwithdeshmukh" },
  "contact": { page: "/contact" },
  "contact me": { page: "/contact" },
  "get in touch": { page: "/contact", id: "contact-form" },
  "message me": { page: "/contact", id: "contact-form" },
  "send message": { page: "/contact", id: "contact-form" },
  "contact form": { page: "/contact", id: "contact-form" },
};


export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTypingSound = React.useCallback(() => {
    if (!audioCtxRef.current) return;
    const audioCtx = audioCtxRef.current;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'triangle'; 
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); 
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 

    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.05);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.05);
  }, []);

  const handleLinkClick = (url?: string) => {
    setIsSheetOpen(false);
    if (url && url.startsWith("/#")) {
        const id = url.substring(2);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } else if (url) {
        router.push(url); 
    }
  };

  const clearSearch = () => {
    setSearchText("");
    searchInputRef.current?.focus();
  };

  const isTypingKey = (key: string) => {
    if (key.length === 1 && key.match(/^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]$/)) return true;
    return ['Backspace', 'Delete'].includes(key);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTypingKey(event.key)) {
      playTypingSound();
    }
    
    if (event.key === 'Enter') {
      event.preventDefault();
      const query = searchText.trim().toLowerCase();
      if (!query) return;

      let actionTaken = false;
      const target = sectionTargetMap[query];

      if (target) {
        if (pathname === target.page) {
          if (target.id) {
            const element = document.getElementById(target.id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              actionTaken = true;
            } else {
              console.warn(`Mapped ID '${target.id}' not found on page '${target.page}'.`);
            }
          } else { 
              actionTaken = true; 
          }
        } else {
          let navigationUrl = target.page;
          if (target.id) {
            navigationUrl += '#' + target.id;
          }
          router.push(navigationUrl);
          actionTaken = true;
        }
      } else {
        const element = document.getElementById(query);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          actionTaken = true;
        } else {
          if (pathname !== "/") {
            router.push("/#" + query);
            actionTaken = true;
          } else {
            console.warn(`Query '${query}' not found as ID on homepage or in map.`);
          }
        }
      }

      if (actionTaken) {
        clearSearch();
        setIsSheetOpen(false);
      }
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 flex-shrink-0 md:flex-none">
          <Link href="/" className="flex items-center mr-0 md:mr-2" onClick={() => handleLinkClick('/')}>
             <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 text-primary"
            >
              <rect x="3" y="3" width="14" height="10" rx="1"></rect>
              <line x1="10" y1="13" x2="10" y2="17"></line>
              <line x1="7" y1="17" x2="13" y2="17"></line>
              <circle cx="18" cy="8" r="2"></circle>
              <path d="M16 10c0 1.1.9 2 2 2s2-.9 2-2"></path>
              <rect x="14" y="13" width="8" height="3" rx="0.5"></rect>
            </svg>
          </Link>
        </div>
        
        <div className="relative flex-grow md:flex-1 min-w-0"> 
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search sections (e.g. 'skills', 'contact')..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-9 w-full search-input-animated-border pr-8" 
            />
            {searchText && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={clearSearch} 
                className="h-6 w-6 absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("/#")) {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  } else {
                    handleLinkClick(item.href); 
                  }
                }}
                className="font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 border border-transparent hover:border-border hover:bg-muted rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-0.5"> 
            <ThemeToggle />
          </div>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px] pt-10 flex flex-col">
              <nav className="flex flex-col gap-2 mt-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith("/#")) {
                        e.preventDefault();
                        handleLinkClick(item.href);
                      } else {
                        handleLinkClick(item.href); 
                      }
                    }}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors block px-3 py-2.5 border border-border/70 hover:bg-muted rounded-md"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t pt-4 space-y-4 flex flex-col items-center">
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
