
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          
          <div className="flex flex-col justify-center space-y-6 p-6 sm:p-8 rounded-lg shadow-xl bg-gray-900 dark:bg-gray-800 font-mono text-sm text-green-400">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Terminal className="h-4 w-4" />
              <span>portfolio_os@vivek:~$ ./initiate_intro.sh</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none text-green-300 terminal-cursor">
                Vivek Kailash Deshmukh
              </h1>
              <p className="max-w-[600px] text-green-400 md:text-lg">
                <span className="text-blue-400">const</span> role = <span className="text-yellow-300">"Full-Stack Developer"</span>;
                <br />
                <span className="text-blue-400">const passions</span> = [<span className="text-yellow-300">"Innovator"</span>, <span className="text-yellow-300">"Problem Solver"</span>];
              </p>
              <p className="max-w-[600px] text-green-400/90 md:text-base">
                <span className="text-gray-500">// Crafting seamless digital experiences with cutting-edge tech.</span><br/>
                <span className="text-gray-500">// Passionate about building scalable and user-centric web applications.</span>
                <span className="terminal-cursor"></span>
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
              <Button size="lg" variant="default" asChild className="font-sans">
                <a href="/resume.pdf" download="Vivek_Deshmukh_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="font-sans">
                <a href="/#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
             <div className="mt-auto text-xs text-gray-400">
              portfolio_os@vivek:~$ <span className="animate-pulse terminal-cursor">_</span>
            </div>
          </div>

          <div className="flex items-center justify-center [perspective:1000px]">
            <Image
              src="https://placehold.co/600x600.png"
              alt="Vivek Kailash Deshmukh"
              data-ai-hint="professional portrait developer matrix"
              width={600}
              height={600}
              className="mx-auto aspect-square rounded-xl object-cover transition-all duration-500 ease-out hover:[transform:rotateX(10deg)_rotateY(-10deg)_scale(1.05)] hover:shadow-2xl dark:hover:shadow-primary/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
