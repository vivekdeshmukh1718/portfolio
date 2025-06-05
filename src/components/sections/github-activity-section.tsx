
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, LineChart } from "lucide-react";

export function GitHubActivitySection() {
  return (
    <section id="github-activity" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-3">
            <LineChart className="h-8 w-8 text-primary" />
            My GitHub Activity
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A glimpse into my coding contributions and consistency.
          </p>
        </div>
        <Card className="w-full max-w-4xl mx-auto bg-card/80 dark:bg-card/70 backdrop-blur-sm transform-gpu transition-all duration-300 ease-out hover:shadow-2xl hover:[transform:translateZ(20px)_rotateX(2deg)_rotateY(-1deg)] [perspective:1200px]">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Contribution Graph</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-full overflow-x-auto p-1">
              <Image
                src="https://placehold.co/960x240.png" // Replace with your actual GitHub contribution graph image URL
                alt="GitHub Contribution Graph"
                data-ai-hint="github contribution graph" // For future AI image replacement
                width={960}
                height={240}
                className="rounded-md shadow-md mx-auto"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Replace the placeholder above with an image of your GitHub contribution graph. You can use services like{" "}
              <a href="https://ghchart.rshah.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                ghchart.rshah.org
              </a>{" "}
              or take a screenshot from your GitHub profile.
            </p>
            <Button asChild variant="outline">
              <Link href="https://github.com/vivekdeshmukh1718" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View My GitHub Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
