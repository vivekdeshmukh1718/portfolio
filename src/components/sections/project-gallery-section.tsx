
"use client"
import type { FC } from 'react';
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "S8-Market - Web auction platform",
    description: "A web-based auction platform for selling properties and assets. Built with React.js, Node.js, MongoDB, SQL, and Figma. Integrated APIs and fully deployed on Render. ",
    imageUrl: "/images/s8market.png",
    imageHint: "Web auction platform",
    tags: ["React.Js", "Node.Js", "MongoDB", "Render"],
    category: "Web",
    githubUrl: "https://github.com/S8market/s8.market",
    liveUrl: "https://s8market.com/",
  },
  {
    id: "2",
    title: " Engiversee –  Empowering Students",
    description: "Engiversee helps engineering students grow with free workshops, tutorials, and career guidance.  to support personal and professional success..",
    imageUrl: "/images/engiveerse.png",
    imageHint: "Technology education platform",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web",
    githubUrl: "https://github.com/vivekdeshmukh1718/eng_code-main-main",
    liveUrl: "https://eng-code.vercel.app/",
  },
   {
    id: "3",
    title: "Skillup-Platoform",
    description: "SkillUp Platform offers expert courses and personalized sessions to help you learn new skills and advance your career. Grow at your own pace with flexible learning options designed just for you..",
    imageUrl: "/images/skillup.png",
    imageHint: "skillup platform education",
    tags: ["React Native", "API", "Figma"],
    category: "Web",
    githubUrl: "https://github.com/vivekdeshmukh1718/Skillup-HUbnex",
    liveUrl: "https://skillup-h-ubnex.vercel.app/",
  },
  {
    id: "4",
    title: "RTSP- Real-Time Streaming Protocol",
    description: "An intelligent chatbot integrated into a customer service portal, capable of understanding natural language and providing instant support. Powered by Genkit.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "chatbot artificial intelligence",
    tags: ["Genkit", "Next.js", "AI", "NLP"],
    category: "AI",
    githubUrl: "#", 
    liveUrl: "#",
  },
  
  {
    id: "5",
    title: "E-Tyre ",
    description: "A clear and reliable platform that brings together all key stakeholders, making things possible .",
    imageUrl: "/images/etyre.png",
    imageHint: "Connectong tyre recycling eco-system",
    tags: ["React", "Recharts", "TypeScript", "Data Visualization"],
    category: "Web",
    githubUrl: "https://github.com/ShripalMetals/E-tyre-server",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "Augmen-io ",
    description: "An AI-driven platform that simplifies vehicle loans by automatically collecting and managing all owner details for a smooth, personalized process.",
    imageUrl: "/images/augmen.png",
    imageHint: "artificial intelligence image recognition",
    tags: ["Genkit", "Python", "AI", "Computer Vision"],
    category: "AI",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const categories = ["All", "Web", "Mobile", "AI"];

const ProjectCard: FC<Project> = ({ title, description, imageUrl, imageHint, tags, githubUrl, liveUrl }) => (
  <Card className="overflow-hidden shadow-lg flex flex-col h-full bg-card/80 dark:bg-card/70 backdrop-blur-sm transform-gpu transition-all duration-300 ease-out hover:shadow-2xl hover:[transform:translateZ(25px)_rotateX(4deg)_rotateY(-2deg)]">
    <Image src={imageUrl} alt={title} data-ai-hint={imageHint} width={600} height={400} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="h-20 overflow-y-auto">{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      {githubUrl && (
        <Button variant="outline" size="sm" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </a>
        </Button>
      )}
      {liveUrl && (
        <Button size="sm" asChild>
          <a href={liveUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
          </a>
        </Button>
      )}
    </CardFooter>
  </Card>
);

export function ProjectGallerySection() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projectsData.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <section id="projects" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">My Projects</h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            A selection of my work showcasing my skills and passion for development.
          </p>
        </div>
        <div className="mb-8 flex justify-center gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1200px]">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">No projects found for this category.</p>
        )}
      </div>
    </section>
  );
}
