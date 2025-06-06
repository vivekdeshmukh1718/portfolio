
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";

const phrasesToType = [
  "Vivek Kailash Deshmukh",
  "A Full-Stack Developer",
  "Explore his amazing portfolio",
];
const TYPING_SPEED = 100; 
const DELETING_SPEED = 50; 
const DELAY_AFTER_TYPING = 2000; 
const DELAY_AFTER_DELETING = 500; 
const SHELL_COMMAND_TYPING_SPEED = 75;
const initialShellCommand = "./initiate_intro.sh";

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [typedShellCommand, setTypedShellCommand] = useState("");
  const shellCommandTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  const playTypingSound = useCallback(() => {
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


  useEffect(() => {
    const currentPhrase = phrasesToType[phraseIndex];

    const handleType = () => {
      if (isDeleting) {
        if (typedText.length > 0) {
          setTypedText((prev) => prev.substring(0, prev.length - 1));
          timerRef.current = setTimeout(handleType, DELETING_SPEED);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrasesToType.length);
        }
      } else {
        if (typedText.length < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, typedText.length + 1));
          timerRef.current = setTimeout(handleType, TYPING_SPEED);
        } else {
          timerRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, DELAY_AFTER_TYPING);
        }
      }
    };
    
    if (isDeleting && typedText.length > 0) {
      timerRef.current = setTimeout(handleType, DELETING_SPEED);
    } else if (!isDeleting && typedText.length < currentPhrase.length) {
      timerRef.current = setTimeout(handleType, TYPING_SPEED);
    } else if (!isDeleting && typedText.length === currentPhrase.length) { 
      timerRef.current = setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
    } else if (isDeleting && typedText.length === 0) { 
       timerRef.current = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrasesToType.length);
      }, DELAY_AFTER_DELETING);
    }


    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [typedText, isDeleting, phraseIndex]);

  useEffect(() => {
    if (typedShellCommand.length < initialShellCommand.length) {
      shellCommandTimerRef.current = setTimeout(() => {
        if (audioCtxRef.current) playTypingSound(); 
        setTypedShellCommand(initialShellCommand.substring(0, typedShellCommand.length + 1));
      }, SHELL_COMMAND_TYPING_SPEED);
    }
    return () => {
      if (shellCommandTimerRef.current) {
        clearTimeout(shellCommandTimerRef.current);
      }
    };
  }, [typedShellCommand, playTypingSound]);


  return (
    <section id="hero" className="w-full pt-6 pb-12 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10">
      <div className="container px-4 md:px-6 lg:pr-[100px]">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          
          <div className="flex flex-col justify-center space-y-6 px-3 py-6 sm:px-6 sm:py-8 rounded-lg shadow-xl bg-gray-900 dark:bg-black font-mono text-sm text-green-300 animate-terminal-glow">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <Terminal className="h-4 w-4" />
              <span>portfolio_os@vivek:~$ </span>
              <span className={`text-green-300 ${typedShellCommand.length === initialShellCommand.length ? '' : 'terminal-cursor'}`}>{typedShellCommand}</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl/none text-accent min-h-[3rem] md:min-h-[4rem] break-words">
                <span className="terminal-cursor">{typedText}</span>
              </h1>
              <p className="max-w-[600px] text-green-300 md:text-lg break-words">
                <span className="text-sky-400">const</span> passions = [<span className="text-yellow-300">"Innovator"</span>, <span className="text-yellow-300">"Problem Solver"</span>];
              </p>
              <p className="max-w-[600px] text-gray-400 md:text-base break-words">
                <span className="text-gray-500">// Crafting seamless digital experiences with cutting-edge tech.</span><br/>
                <span className="text-gray-500">// Passionate about building scalable and user-centric web applications.</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row pt-4 mt-2 border-2 border-solid border-green-500 p-4 rounded-md bg-white">
              <Button 
                size="lg" 
                asChild 
                className="font-sans bg-blue-500 hover:bg-blue-600 text-white dark:text-white" 
              >
                <a href="https://drive.google.com/file/d/1fPqq2Vrwr1B9P4XZjTb_crdcOitKu1-D/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="font-sans text-green-600 border-green-500 dark:text-green-400 dark:border-green-400 hover:bg-green-500/10 dark:hover:bg-green-400/10"
              >
                <a href="/#projects">
                  Dive into the Codeverse
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
             <div className="mt-auto text-xs text-gray-400">
              portfolio_os@vivek:~$ <span className="terminal-cursor"></span>
            </div>
          </div>

          <div className="flex items-center justify-center [perspective:1000px]">
            <Image
              src="/images/vikkie.jpg"
              alt="Vivek Kailash Deshmukh"
              data-ai-hint="professional portrait developer matrix"
              width={450}
              height={600}
              className="mx-auto rounded-xl object-cover transition-all duration-500 ease-out hover:[transform:rotateX(10deg)_rotateY(-10deg)_scale(1.05)] hover:shadow-2xl dark:hover:shadow-accent/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
