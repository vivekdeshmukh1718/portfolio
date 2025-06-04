
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CalendarDays, ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  dateObtained: string;
  credentialUrl?: string;
}

const certificationsData: Certification[] = [
  {
    id: "1",
    name: "Google Cloud Certified - Associate Cloud Engineer",
    issuingOrganization: "Google Cloud",
    dateObtained: "January 2024",
    credentialUrl: "#", // Replace with actual URL
  },
  {
    id: "2",
    name: "Certified JavaScript Developer",
    issuingOrganization: "OnlineDegree Corp",
    dateObtained: "June 2023",
    // credentialUrl: "#", // Example without URL
  },
  {
    id: "3",
    name: "Advanced React Patterns",
    issuingOrganization: "Dev University",
    dateObtained: "December 2023",
    credentialUrl: "#", // Replace with actual URL
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Certifications</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Validating my skills and knowledge with industry-recognized credentials.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certificationsData.map((cert) => (
            <Card key={cert.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-start gap-3 mb-1">
                    <FileText className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">{cert.issuingOrganization}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  <span>Obtained: {cert.dateObtained}</span>
                </div>
              </CardContent>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <CardContent className="pt-0">
                  <Button variant="outline" size="sm" asChild className="mt-2">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      View Credential <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
