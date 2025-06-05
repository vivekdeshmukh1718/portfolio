
"use client"
import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react"; // Removed SquareTerminal
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// AnalogClock import was removed in a previous step, ensuring it's not re-added

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Internships", href: "/#internships" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  onSearchSubmit?: (query: string) => void;
}

export function Header({ onSearchSubmit }: HeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const clearSearch = () => {
    setSearchText("");
    searchInputRef.current?.focus();
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchText.trim() !== "") {
      onSearchSubmit?.(searchText.trim());
      // clearSearch(); // Optionally clear search after submit, or let AiAssistant handle it
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 flex-shrink min-w-0 md:flex-1">
          <Link href="/" className="flex items-center mr-0 md:mr-2 flex-shrink-0" onClick={handleLinkClick}>
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
          <div className="relative flex-grow"> 
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Ask AI Assistant..."
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
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
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
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors block px-3 py-2.5 border border-border/70 hover:bg-muted rounded-md"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t pt-4 space-y-4 flex flex-col items-center">
                 {/* AnalogClock for mobile sheet was removed in previous steps */}
                 {/* ThemeToggle could be here if needed, but currently in main header */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
