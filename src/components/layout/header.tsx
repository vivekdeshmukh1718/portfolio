
"use client"
import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, SquareTerminal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// Removed AnalogClock import as it's no longer used in the header

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Internships", href: "/#internships" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
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
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between gap-2 md:gap-4">
        {/* Left Group: Logo and Search (Always Visible) */}
        <div className="flex items-center gap-2 flex-shrink min-w-0 md:flex-1">
          <Link href="/" className="flex items-center mr-0 md:mr-2 flex-shrink-0" onClick={handleLinkClick}>
            <SquareTerminal className="h-7 w-7 text-primary" />
          </Link>
          <div className="relative flex-grow max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="h-9 w-full search-input-animated-border pr-8" // Padding for X button
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

        {/* Right Group: Desktop Nav, Theme Toggle, Mobile Menu Trigger */}
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
          
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {/* AnalogClock removed from here */}
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
              <div className="mt-auto border-t pt-4 space-y-4">
                <div className="flex justify-between items-center px-2">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                </div>
                {/* AnalogClock removed from here */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
