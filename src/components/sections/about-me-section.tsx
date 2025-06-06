
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

export function AboutMeSection() {
  return (
    <section id="about" className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            A passionate and driven full-stack developer with a knack for creating elegant solutions to complex problems.
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-1 md:gap-12 lg:max-w-5xl lg:grid-cols-2">
          <div className="grid gap-4">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                  My Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>
                  Hello! I'm Vivek, a full-stack developer with a strong foundation in modern web technologies. My journey into tech started with a fascination for how software can transform ideas into reality. I thrive in dynamic environments, continuously learning and adapting to new challenges.
                </p>
                <p>
                  I specialize in building responsive and efficient web applications using frameworks like React.js, Next.js, and Node.js. My experience also extends to backend development, database management with Firebase, and leveraging AI tools like Genkit to build intelligent applications.
                </p>
              </CardContent>
            </Card>
             <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <GraduationCap className="h-7 w-7 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Bachelor of Engineering in Computer Science</strong>
                  <br />
                  XYZ University, City, State (Year of Graduation)
                </p>
                <p>
                  Relevant Coursework: Data Structures and Algorithms, Web Development, Database Systems, Software Engineering, Artificial Intelligence.
                </p>
                <p>
                  Actively involved in coding clubs and hackathons, consistently seeking opportunities to apply theoretical knowledge to practical projects.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/600x800.png"
              alt="Vivek Deshmukh holding an award in front of an engineering department building"
              data-ai-hint="student award building"
              width={600}
              height={800}
              className="mx-auto overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
