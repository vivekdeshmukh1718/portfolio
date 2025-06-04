
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import DigitalClock from "@/components/digital-clock";

// Simple SVG for WhatsApp
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.61 15.34 3.47 16.8L2 22L7.32 20.54C8.73 21.33 10.35 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.56 20.13 9.13 19.69 7.96 18.9L7.53 18.64L4.32 19.53L5.23 16.41L4.97 15.95C4.11 14.55 3.73 12.99 3.73 11.91C3.73 7.35 7.46 3.61 12.04 3.61C16.62 3.61 20.35 7.35 20.35 11.91C20.35 16.48 16.62 20.13 12.04 20.13ZM17.46 14.5C17.23 14.38 16.05 13.81 15.83 13.72C15.61 13.64 15.45 13.59 15.29 13.82C15.13 14.05 14.61 14.63 14.45 14.81C14.29 14.99 14.13 15.01 13.91 14.92C13.69 14.83 12.77 14.54 11.72 13.6C10.91 12.89 10.36 12.02 10.2 11.79C10.04 11.56 10.15 11.45 10.28 11.32C10.39 11.21 10.53 11.03 10.68 10.88C10.82 10.73 10.87 10.62 10.95 10.46C11.03 10.3 11 10.16 10.94 10.04C10.88 9.93 10.33 8.53 10.12 8.05C9.91 7.57 9.7 7.62 9.54 7.62C9.38 7.61 9.22 7.61 9.06 7.61C8.9 7.61 8.64 7.67 8.42 7.89C8.2 8.12 7.66 8.61 7.66 9.68C7.66 10.75 8.44 11.74 8.57 11.91C8.71 12.08 10.11 14.36 12.33 15.29C12.88 15.53 13.31 15.68 13.64 15.79C14.15 15.95 14.62 15.92 14.99 15.85C15.41 15.76 16.45 15.19 16.67 14.93C16.89 14.66 16.89 14.44 16.83 14.32C16.77 14.2 16.61 14.14 16.43 14.05L17.46 14.5Z" />
  </svg>
);

// Simple SVG for Telegram
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.58c-.21.92-.74 1.13-1.5.71l-4.31-3.15l-2.07 1.99c-.24.23-.44.41-.8.41z"/>
  </svg>
);


export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-2 px-8 text-center md:flex-row md:gap-2 md:px-0 md:text-left">
          <p className="text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} Vivek Kailash Deshmukh. All rights reserved.
          </p>
          <span className="hidden md:inline-block mx-1 text-muted-foreground">|</span>
          <DigitalClock />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/vivekdeshmukh" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/vivekkailashdeshmukh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com/vivekdeshmukh_" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:youremail@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://instagram.com/your_username" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <TelegramIcon />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
