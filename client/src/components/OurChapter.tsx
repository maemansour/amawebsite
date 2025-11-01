import { Users, TrendingUp, Award, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export function OurChapter() {
  const offerings = [
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with industry leaders, alumni, and peers to build lasting professional relationships."
    },
    {
      icon: TrendingUp,
      title: "Career Development",
      description: "Gain hands-on experience through workshops, case competitions, and real-world consulting projects."
    },
    {
      icon: Award,
      title: "Leadership Opportunities",
      description: "Develop your skills by leading committees, organizing events, and mentoring fellow members."
    },
    {
      icon: Target,
      title: "Industry Exposure",
      description: "Access exclusive recruiting events, company tours, and networking sessions with top employers."
    }
  ];

  return (
    <section className="py-16 md:py-20" data-testid="section-our-chapter">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-our-chapter">
            Our Chapter
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-chapter-mission">
            The American Marketing Association at San Diego State University is the premier 
            pre-professional organization dedicated to connecting students with the marketing industry. 
            We empower future marketers through professional development, networking, and hands-on experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offering, index) => {
            const Icon = offering.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover-elevate" 
                data-testid={`card-offering-${index}`}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" data-testid={`heading-offering-${index}`}>
                  {offering.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-offering-${index}`}>
                  {offering.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
