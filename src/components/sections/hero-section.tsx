
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";

const phrasesToType = [
  "Vivek Kailash Deshmukh",
  "A Full-Stack Developer",
  "Explore his amazing portfolio",
];
const TYPING_SPEED = 120; // Was 150
const DELETING_SPEED = 60; // Was 75
const DELAY_AFTER_TYPING = 2000; // ms to wait after a phrase is fully typed
const DELAY_AFTER_DELETING = 500; // ms to wait after a phrase is fully deleted

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPhrase = phrasesToType[phraseIndex];

    const handleType = () => {
      if (isDeleting) {
        // Deleting
        if (typedText.length > 0) {
          setTypedText((prev) => prev.substring(0, prev.length - 1));
          timerRef.current = setTimeout(handleType, DELETING_SPEED);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrasesToType.length);
          timerRef.current = setTimeout(handleType, DELAY_AFTER_DELETING);
        }
      } else {
        // Typing
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
          timerRef.current = setTimeout(handleType, TYPING_SPEED);
        } else {
          // Finished typing current phrase
          timerRef.current = setTimeout(() => {
            setIsDeleting(true);
            handleType(); // Start deleting
          }, DELAY_AFTER_TYPING);
        }
      }
    };

    // Initial start or continue
    // Add a small delay for the very first character to appear
    const initialDelay = typedText === "" && !isDeleting && phraseIndex === 0 ? 500 : 0;
    timerRef.current = setTimeout(handleType, initialDelay + (isDeleting ? DELETING_SPEED : TYPING_SPEED) );


    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [typedText, isDeleting, phraseIndex]);


  return (
    <section id="hero" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          
          <div className="flex flex-col justify-center space-y-6 p-6 sm:p-8 rounded-lg shadow-xl bg-gray-900 dark:bg-black font-mono text-sm text-green-300">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Terminal className="h-4 w-4" />
              <span>portfolio_os@vivek:~$ ./initiate_intro.sh</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none text-accent min-h-[3rem] md:min-h-[4rem]">
                <span className="terminal-cursor">{typedText}</span>
              </h1>
              <p className="max-w-[600px] text-green-300 md:text-lg">
                <span className="text-sky-400">const</span> passions = [<span className="text-yellow-300">"Innovator"</span>, <span className="text-yellow-300">"Problem Solver"</span>];
              </p>
              <p className="max-w-[600px] text-gray-400 md:text-base">
                <span className="text-gray-500">// Crafting seamless digital experiences with cutting-edge tech.</span><br/>
                <span className="text-gray-500">// Passionate about building scalable and user-centric web applications.</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4 mt-2 border-2 border-solid border-green-500 p-4 rounded-md bg-white">
              <Button 
                size="lg" 
                asChild 
                className="font-sans bg-blue-500 hover:bg-blue-600 text-gray-900 dark:text-white" 
              >
                <a href="/resume.pdf" download="Vivek_Deshmukh_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="font-sans text-green-600 border-green-500 hover:bg-green-500/10 hover:text-green-700 hover:border-green-600 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400/10 dark:hover:text-green-300 dark:hover:border-green-300"
              >
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
              className="mx-auto aspect-square rounded-xl object-cover transition-all duration-500 ease-out hover:[transform:rotateX(10deg)_rotateY(-10deg)_scale(1.05)] hover:shadow-2xl dark:hover:shadow-accent/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

