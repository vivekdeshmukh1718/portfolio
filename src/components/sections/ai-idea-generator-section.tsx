
"use client";

import { useState, type FormEvent } from "react";
import { generateProjectIdea, type ProjectIdeaInput, type ProjectIdeaOutput } from "@/ai/flows/project-idea-generator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Lightbulb, Loader2, AlertTriangle, Wrench } from "lucide-react";

export function AiIdeaGeneratorSection() {
  const [keywords, setKeywords] = useState("");
  const [generatedIdea, setGeneratedIdea] = useState<ProjectIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keywords.trim()) {
      toast({
        title: "Keywords Required",
        description: "Please enter some keywords to generate an idea.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedIdea(null);

    try {
      const input: ProjectIdeaInput = { keywords };
      const idea = await generateProjectIdea(input);
      setGeneratedIdea(idea);
    } catch (err: any) {
      console.error("Error generating project idea:", err);
      const errorMessage = err.message || "Failed to generate an idea. Please try again.";
      setError(errorMessage);
      toast({
        title: "Idea Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="buildwithdeshmukh" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-2">
            <Wrench className="h-8 w-8 text-primary" /> BuildWithDeshmukh <Lightbulb className="h-8 w-8 text-primary" />
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            Got an idea? Enter some keywords and let AI help you flesh out a unique project concept!
          </p>
        </div>

        <Card className="w-full max-w-2xl mx-auto shadow-xl transform-gpu transition-all duration-300 ease-out hover:shadow-2xl hover:[transform:translateZ(20px)_rotateX(2deg)_rotateY(-1deg)] [perspective:1000px]">
          <CardHeader>
            <CardTitle>Project Idea Generator</CardTitle>
            <CardDescription>
              Tell me your interests, a tech you love, or a problem you want to solve.
              <br />
              (e.g., "community garden app", "learn python data", "futuristic music visualizer")
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords like 'space exploration, web game, educational'"
                disabled={isLoading}
                className="text-base md:text-sm"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" /> Generate Idea
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="mt-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-2">The AI is thinking, please wait...</p>
          </div>
        )}

        {error && !isLoading && (
          <Card className="w-full max-w-2xl mx-auto mt-8 shadow-lg border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-6 w-6" /> Error Generating Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground">{error}</p>
              <p className="text-sm text-muted-foreground mt-2">Please try refining your keywords or try again later.</p>
            </CardContent>
          </Card>
        )}

        {generatedIdea && !isLoading && !error && (
          <Card className="w-full max-w-2xl mx-auto mt-8 shadow-2xl bg-gradient-to-br from-card to-secondary/20 dark:to-secondary/5 transform-gpu transition-all duration-300 ease-out hover:shadow-2xl hover:[transform:translateZ(20px)_rotateX(2deg)_rotateY(-1deg)] [perspective:1000px]">
            <CardHeader className="pb-2">
              <p className="text-sm text-primary font-semibold tracking-wider uppercase">Your AI-Generated Project Idea:</p>
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary py-1">
                {generatedIdea.projectName}
              </CardTitle>
              <CardDescription className="text-lg italic">
                &quot;{generatedIdea.tagline}&quot;
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-foreground/90 text-base">{generatedIdea.projectDescription}</p>
              <div>
                <h4 className="font-semibold mb-1.5 text-foreground">Suggested Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedIdea.suggestedTech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 bg-accent/20 text-accent-foreground hover:bg-accent/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">Remember, this is an AI-generated idea. Use it as inspiration!</p>
            </CardFooter>
          </Card>
        )}
      </div>
    </section>
  );
}
