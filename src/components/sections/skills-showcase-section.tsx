
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Code, Database, Brain } from "lucide-react";

const skillsData = {
  frontend: ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "Firebase Functions"],
  database: ["Firebase Firestore", "MongoDB", "SQL", "PostgreSQL"],
  toolsAi: ["Git & GitHub", "Genkit", "Docker", "Vercel", "REST APIs", "GraphQL"]
};

interface SkillCategoryProps {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

function SkillCategory({ title, skills, icon }: SkillCategoryProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 dark:bg-card/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-accent text-accent-foreground hover:bg-accent/90 dark:hover:bg-accent/80">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}

export function SkillsShowcaseSection() {
  return (
    <section id="skills" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Technical Skills</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A diverse toolkit to build robust and innovative solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <SkillCategory title="Frontend Development" skills={skillsData.frontend} icon={<Zap className="h-5 w-5 text-primary" />} />
          <SkillCategory title="Backend Development" skills={skillsData.backend} icon={<Code className="h-5 w-5 text-primary" />} />
          <SkillCategory title="Databases" skills={skillsData.database} icon={<Database className="h-5 w-5 text-primary" />} />
          <SkillCategory title="Tools & AI" skills={skillsData.toolsAi} icon={<Brain className="h-5 w-5 text-primary" />} />
        </div>
      </div>
    </section>
  );
}
