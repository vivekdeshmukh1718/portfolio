
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
    title: "Hackit- Vice President",
    issuer: "Hackit- Ethical Hacking and cybersecurity Club",
    date: "Spring 2023",
    description: "Recognized for outstanding leadership and contributions to the club.",
  },
  {
    id: "2",
    title: " Winner - Electroquest Expedition",
    issuer: "Elite Club",
    date: "October 2023",
    description: "Led a team to victory by designing and implementing the complex circuit for the competition, showcasing advanced skills in electronics and problem-solving.",
  },
  {
    id: "3",
    title: "Hackfusion",
    issuer: "Swag Developers Club",
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
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            Milestones and recognitions that mark my journey.
          </p>        
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1200px]">
          {achievementsData.map((achievement) => (
            <Card key={achievement.id} className="shadow-lg flex flex-col bg-card/80 dark:bg-card/70 backdrop-blur-sm transform-gpu transition-all duration-300 ease-out hover:shadow-xl hover:[transform:translateZ(25px)_rotateX(4deg)_rotateY(-2deg)]">
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
