
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, CalendarDays } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "Dean's List Honoree",
    issuer: "XYZ University",
    date: "Spring 2022",
    description: "Recognized for outstanding academic performance, achieving a GPA of 3.8+ during the semester.",
  },
  {
    id: "2",
    title: "Hackathon Winner - Best UI/UX",
    issuer: "TechSpark Hackathon",
    date: "October 2023",
    description: "Led a team to victory by designing and implementing the most intuitive and visually appealing user interface for a social good application.",
  },
  {
    id: "3",
    title: "Top Coder - Coding Club Challenge",
    issuer: "XYZ University Coding Club",
    date: "March 2023",
    description: "Achieved the highest score in a competitive programming challenge focused on algorithms and data structures.",
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Achievements</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Milestones and recognitions that mark my journey.
          </p>        
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {achievementsData.map((achievement) => (
            <Card key={achievement.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">{achievement.issuer}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="text-muted-foreground">{achievement.description}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  <span>{achievement.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
