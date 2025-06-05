
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
    title: "E-commerce Platform",
    description: "A full-featured e-commerce website with product listings, cart functionality, and user authentication. Built with Next.js and Firebase.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online store shopping",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "React"],
    category: "Web",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates, drag-and-drop interface, and notification system. Using React and Node.js.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "task list productivity",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "Web",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "3",
    title: "AI Powered Chatbot",
    description: "An intelligent chatbot integrated into a customer service portal, capable of understanding natural language and providing instant support. Powered by Genkit.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "chatbot artificial intelligence",
    tags: ["Genkit", "Next.js", "AI", "NLP"],
    category: "AI",
    githubUrl: "#", 
    liveUrl: "#",
  },
   {
    id: "4",
    title: "Mobile Recipe Finder",
    description: "A React Native application that helps users discover recipes based on ingredients they have. Includes API integration for recipe data.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile app food",
    tags: ["React Native", "API", "Mobile"],
    category: "Mobile",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "5",
    title: "Interactive Data Dashboard",
    description: "A web-based dashboard for visualizing complex datasets with interactive charts and filters. Built with React and a charting library like Recharts.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "data charts analytics",
    tags: ["React", "Recharts", "TypeScript", "Data Visualization"],
    category: "Web",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "AI Image Caption Generator",
    description: "An AI model that automatically generates descriptive captions for images. Implemented using Genkit and a vision model.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "artificial intelligence image recognition",
    tags: ["Genkit", "Python", "AI", "Computer Vision"],
    category: "AI",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const categories = ["All", "Web", "Mobile", "AI"];

const ProjectCard: FC<Project> = ({ title, description, imageUrl, imageHint, tags, githubUrl, liveUrl }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card/80 dark:bg-card/70 backdrop-blur-sm">
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
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
