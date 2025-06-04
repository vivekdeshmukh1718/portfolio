
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
    setIsSearchOpen(prev => {
      if (!prev && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
      return !prev;
    });
  };
  
  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center" onClick={handleLinkClick}>
          <SquareTerminal className="h-7 w-7 text-primary" />
        </Link>

        <div className="flex items-center gap-2">
          {/* Desktop Navigation & Search Input */}
          {!isMobile && (
            <nav className={cn(
              "flex items-center gap-1 text-sm transition-all duration-300 ease-in-out",
              isSearchOpen ? "opacity-0 pointer-events-none max-w-0" : "opacity-100 max-w-full"
            )}>
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
          )}
          
          {/* Search Input - Desktop (conditionally shown) */}
          {!isMobile && isSearchOpen && (
             <div className="relative flex items-center">
                <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="h-9 w-48 md:w-56 search-input-animated-border pr-8"
                    onBlur={() => setTimeout(() => {
                        if (document.activeElement !== searchInputRef.current) {
                            setIsSearchOpen(false)
                        }
                    } , 100)}
                />
                <Button variant="ghost" size="icon" onClick={toggleSearch} className="h-7 w-7 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4"/>
                    <span className="sr-only">Close search</span>
                </Button>
             </div>
          )}

          {/* Search Toggle & Theme Toggle - always visible before mobile menu */}
          <Button variant="ghost" size="icon" onClick={toggleSearch} className={cn("h-9 w-9", { "hidden": !isMobile && isSearchOpen })}>
            <Search className="h-5 w-5" />
            <span className="sr-only">{isSearchOpen ? "Close search" : "Open search"}</span>
          </Button>
          <ThemeToggle />

          {/* Mobile Menu Trigger */}
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
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
        <div className="container pb-3 px-4">
            <div className="relative flex items-center">
                <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-full search-input-animated-border pr-10" // Ensure padding for X button
                />
                 <Button variant="ghost" size="icon" onClick={toggleSearch} className="h-8 w-8 absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5"/>
                    <span className="sr-only">Close search</span>
                </Button>
            </div>
        </div>
      )}
    </header>
  );
}
