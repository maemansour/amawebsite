import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Mic, Palette, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function Committees() {
  const committees = [
    {
      id: "consulting",
      icon: Briefcase,
      name: "Consulting",
      description: "Work on real business challenges with local companies. Develop analytical and strategic thinking skills through hands-on projects.",
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      id: "events",
      icon: Calendar,
      name: "Event Planning",
      description: "Plan and execute professional events, networking sessions, and social gatherings. Build project management and coordination skills.",
      color: "from-purple-500/10 to-purple-600/10"
    },
    {
      id: "podcast",
      icon: Mic,
      name: "Podcast",
      description: "Produce and host the AMA SDSU podcast, interviewing industry professionals and sharing marketing insights with the community.",
      color: "from-green-500/10 to-green-600/10"
    },
    {
      id: "adobe",
      icon: Palette,
      name: "Adobe Creative",
      description: "Master Adobe Creative Suite through workshops and projects. Create marketing materials, social media content, and brand assets.",
      color: "from-red-500/10 to-red-600/10"
    }
  ];

  return (
    <section className="py-16 md:py-20" data-testid="section-committees">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-committees">
            Our Committees
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-committees-description">
            Join one of our specialized committees to gain hands-on experience, develop new skills, 
            and make a meaningful impact. Each committee offers unique opportunities for growth and leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {committees.map((committee, index) => {
            const Icon = committee.icon;
            return (
              <Card 
                key={committee.id}
                className={`p-8 bg-gradient-to-br ${committee.color} hover-elevate`}
                data-testid={`card-committee-${index}`}
              >
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3" data-testid={`heading-committee-${index}`}>
                  {committee.name}
                </h3>
                <p className="text-muted-foreground mb-6 min-h-[4rem]" data-testid={`text-committee-${index}`}>
                  {committee.description}
                </p>
                <Link 
                  href={`/committees/${committee.id}`}
                  data-testid={`link-committee-${committee.id}`}
                >
                  <Button 
                    variant="outline" 
                    className="group"
                    data-testid={`button-learn-more-${index}`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4" data-testid="text-committees-cta">
            Not sure which committee is right for you? Join us at a weekly meeting to learn more!
          </p>
        </div>
      </div>
    </section>
  );
}
