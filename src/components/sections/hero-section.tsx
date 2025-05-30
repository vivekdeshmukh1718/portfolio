
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                Vivek Kailash Deshmukh
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Full-Stack Developer | Innovator | Problem Solver
              </p>
              <p className="max-w-[600px] text-foreground/80 md:text-lg">
                Crafting seamless digital experiences with cutting-edge technologies. Passionate about building scalable and user-centric web applications.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <a href="/resume.pdf" download="Vivek_Deshmukh_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <Image
            src="https://placehold.co/600x600.png"
            alt="Vivek Kailash Deshmukh"
            data-ai-hint="professional portrait developer"
            width={600}
            height={600}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
}
