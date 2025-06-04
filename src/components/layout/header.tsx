
"use client"
import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, SquareTerminal, Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };
  
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Delay focus slightly to ensure the input is rendered and visible
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center mr-6" onClick={handleLinkClick}>
          <SquareTerminal className="h-7 w-7 text-primary" />
        </Link>

        {/* Desktop Search and Navigation */}
        <div className="hidden md:flex flex-1 items-center gap-4">
          {isSearchOpen ? (
            <div className="relative flex-grow max-w-sm lg:max-w-md">
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search..."
                className="h-9 w-full search-input-animated-border pr-10" // Padding for X button
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSearch} 
                className="h-7 w-7 absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="h-9 w-9"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          <nav className="flex items-center gap-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-1.5 border border-border hover:bg-muted rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Toggles & Theme Toggle */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="h-9 w-9 md:hidden"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
            >
              {/* On mobile, the X to close the search bar is part of the bar itself, so Search icon is fine here */}
              <Search className="h-5 w-5" />
            </Button>
          )}
          <ThemeToggle />
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px] pt-10">
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
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
      {/* Mobile Search Input - shown below header when active */}
      {isMobile && isSearchOpen && (
        <div className="container pb-3 px-4 md:hidden"> {/* Ensure it's hidden on md+ */}
            <div className="relative flex items-center">
                <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-full search-input-animated-border pr-10"
                />
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleSearch} // This will close the search bar
                    className="h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5"/>
                </Button>
            </div>
        </div>
      )}
    </header>
  );
}
