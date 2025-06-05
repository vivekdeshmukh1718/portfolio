
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";

interface Internship {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  logoUrl: string;
  logoHint: string;
}

const internshipsData: Internship[] = [
  {
    id: "1",
    role: "Software Engineer Intern",
    company: "Tech Solutions Inc.",
    duration: "Summer 2023 (May - Aug)",
    location: "Remote",
    description: [
      "Developed and maintained features for a client-facing web application using React and Node.js.",
      "Collaborated with a team of 5 engineers in an Agile environment.",
      "Contributed to API development and database design.",
      "Participated in code reviews and improved application performance by 15%."
    ],
    logoUrl: "https://placehold.co/100x100.png",
    logoHint: "company logo tech"
  },
  {
    id: "2",
    role: "Full-Stack Developer Intern",
    company: "Innovate Labs",
    duration: "Fall 2022 (Sep - Dec)",
    location: "San Francisco, CA",
    description: [
      "Worked on a greenfield project to build a prototype for a new SaaS product.",
      "Utilized Next.js for frontend and Firebase for backend and authentication.",
      "Implemented key user interface components and backend logic.",
      "Presented project progress to stakeholders weekly."
    ],
    logoUrl: "https://placehold.co/100x100.png",
    logoHint: "company logo startup"
  },
];

export function InternshipOverviewSection() {
  return (
    <section id="internships" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Internship Experience</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hands-on experience in dynamic tech environments, contributing to real-world projects.
          </p>
        </div>
        <div className="space-y-8 [perspective:1200px]">
          {internshipsData.map((internship) => (
            <Card key={internship.id} className="shadow-lg bg-card/80 dark:bg-card/70 backdrop-blur-sm transform-gpu transition-all duration-300 ease-out hover:shadow-xl hover:[transform:translateZ(25px)_rotateX(4deg)_rotateY(-2deg)]">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Briefcase className="h-6 w-6 text-primary" /> {internship.role}
                        </CardTitle>
                        <CardDescription className="text-lg">{internship.company}</CardDescription>
                    </div>
                    {/* Placeholder for logo - currently not used in Card visual
                    <Image src={internship.logoUrl} alt={`${internship.company} logo`} data-ai-hint={internship.logoHint} width={60} height={60} className="rounded-md object-contain hidden md:block"/>
                    */}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{internship.location}</span>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {internship.description.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
