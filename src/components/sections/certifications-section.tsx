
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CalendarDays, ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  dateObtained: string;
  description?: string;
  credentialUrl?: string;
}

const certificationsData: Certification[] = [
  {
    id: "1",
    name: "Applying AI principles with Google Cloud",
    issuingOrganization: "Google Cloud",
    dateObtained: "December 2024",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/a649d6ff-36e0-475a-bb49-198a9bda085e/badges/13246992",
  },
  {
    id: "2",
    name: "Introduction to large language models",
    issuingOrganization: "OnlineDegree Corp",
    dateObtained: "December 2023",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/a649d6ff-36e0-475a-bb49-198a9bda085e/badges/13247172",
  },
  {
    id: "3",
    name: "Introduction to genereative AI",
    issuingOrganization: "Dev University",
    dateObtained: "November 2023",
    credentialUrl: "https://www.cloudskillsboost.google/public_profiles/a649d6ff-36e0-475a-bb49-198a9bda085e/badges/12704036",
  },
  {
    id: "4",
    name: "Goldman Sachs operations job simulation",
    issuingOrganization: "Amazon Web Services",
    dateObtained: "December 2024",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/MBA4MnZTNFEoJZGnk/wNge9cjzNTXD2acrv_MBA4MnZTNFEoJZGnk_5nQS9H7L8RBgCR87E_1734077908313_completion_certificate.pdf",
  },
  {
    id: "5",
    name: "Figma",
    issuingOrganization: "Udemy",
    dateObtained: "December 2024",
    credentialUrl: "https://www.udemy.com/certificate/UC-e4faefdf-754a-4695-b8dd-09f353e02e32/",
  },
  {
    id: "6",
    name: "Full stack web development",
    issuingOrganization: "Acmegrade",
    dateObtained: "March 2023",
    credentialUrl: "https://www.linkedin.com/posts/vivekdeshmukhsoftwaredeveloper_completed-my-successful-web-development-internship-activity-7131513086343086080-JM4C?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD65LP0B_SZk6FXwzayRGFRUouIIOP2bdHI",
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="w-full bg-secondary/30 dark:bg-secondary/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Certifications</h2>
          <p className="max-w-[900px] text-muted-foreground text-base sm:text-lg md:text-xl/relaxed">
            Validating my skills and knowledge with industry-recognized credentials.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 [perspective:1200px]">
          {certificationsData.map((cert) => (
            <Card key={cert.id} className="shadow-lg flex flex-col bg-card/80 dark:bg-card/70 backdrop-blur-sm transform-gpu transition-all duration-300 ease-out hover:shadow-xl hover:[transform:translateZ(25px)_rotateX(4deg)_rotateY(-2deg)]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <CardTitle className="text-xl">{cert.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">{cert.issuingOrganization}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                {cert.description && (
                    <p className="text-muted-foreground">{cert.description}</p>
                )}
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                  <span>Obtained: {cert.dateObtained}</span>
                </div>
              </CardContent>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="mt-auto">
                    <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      View Credential <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
