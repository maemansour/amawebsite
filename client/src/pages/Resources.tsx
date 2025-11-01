import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Globe, GraduationCap, Trophy, TrendingUp, FileText } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Settings } from "@shared/schema";

export default function Resources() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const resources = [
    {
      icon: Globe,
      title: "National Website",
      description: "Visit the official AMA website for industry insights, career resources, and professional development tools.",
      buttonText: "Visit AMA.org",
      buttonLink: "https://www.ama.org",
      testId: "national-website"
    },
    {
      icon: GraduationCap,
      title: "Student Resources",
      description: "Access student-specific resources, scholarships, and career development opportunities.",
      buttonText: "Student Portal",
      buttonLink: "https://www.ama.org/students",
      testId: "student-resources"
    }
  ];

  const programs = [
    {
      icon: Trophy,
      title: "AMA Conferences",
      description: "Annual marketing conferences with industry leaders",
      testId: "conferences"
    },
    {
      icon: TrendingUp,
      title: "Certifications",
      description: "Professional marketing certifications and credentials",
      testId: "certifications"
    },
    {
      icon: FileText,
      title: "Research",
      description: "Industry research, trends, and market insights",
      testId: "research"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-resources-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Globe className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-resources">
                Official AMA Resources
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-resources-description">
                Connect with the national American Marketing Association for additional resources and opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Official Resources */}
        <section className="py-16 md:py-20" data-testid="section-official-resources">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-official-resources">
              Official AMA Resources
            </h2>
            <p className="text-lg text-muted-foreground mb-12" data-testid="text-official-description">
              Connect with the national American Marketing Association for additional resources and opportunities.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card 
                    key={index}
                    className="p-8 hover-elevate"
                    data-testid={`card-${resource.testId}`}
                  >
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" data-testid={`heading-${resource.testId}`}>
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground mb-6" data-testid={`text-${resource.testId}`}>
                      {resource.description}
                    </p>
                    <Button 
                      variant="default"
                      asChild
                      data-testid={`button-${resource.testId}`}
                    >
                      <a href={resource.buttonLink} target="_blank" rel="noopener noreferrer">
                        {resource.buttonText}
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* National Programs */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-national-programs">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12" data-testid="heading-national-programs">
              National Programs
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {programs.map((program, index) => {
                const Icon = program.icon;
                return (
                  <Card 
                    key={index}
                    className="p-6 text-center hover-elevate"
                    data-testid={`card-program-${program.testId}`}
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2" data-testid={`heading-program-${program.testId}`}>
                      {program.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-program-${program.testId}`}>
                      {program.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
