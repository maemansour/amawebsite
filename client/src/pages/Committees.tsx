import { Link } from "wouter";
import { Users, Mic, Palette, TrendingUp, ArrowRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Committees() {
  const committees = [
    {
      id: "consulting",
      name: "Consulting Committee",
      icon: TrendingUp,
      shortDescription: "Work with local businesses on real marketing projects and develop strategic recommendations.",
      color: "from-blue-500/10 to-blue-500/5",
      accentColor: "text-blue-600"
    },
    {
      id: "event-planning",
      name: "Event Planning Committee",
      icon: Users,
      shortDescription: "Plan and execute professional events, workshops, and networking opportunities for our members.",
      color: "from-purple-500/10 to-purple-500/5",
      accentColor: "text-purple-600"
    },
    {
      id: "podcast",
      name: "Podcast Committee",
      icon: Mic,
      shortDescription: "Produce engaging podcast content featuring industry professionals and marketing insights.",
      color: "from-green-500/10 to-green-500/5",
      accentColor: "text-green-600"
    },
    {
      id: "adobe-creative",
      name: "Adobe Creative Committee",
      icon: Palette,
      shortDescription: "Create visual content and marketing materials while mastering Adobe Creative Suite.",
      color: "from-orange-500/10 to-orange-500/5",
      accentColor: "text-orange-600"
    }
  ];

  const benefits = [
    {
      title: "Hands-On Experience",
      description: "Work on real projects that build your portfolio and resume"
    },
    {
      title: "Skill Development",
      description: "Learn industry tools and best practices from experienced members"
    },
    {
      title: "Leadership Opportunities",
      description: "Take on leadership roles and develop management skills"
    },
    {
      title: "Networking",
      description: "Connect with professionals and fellow students in your area of interest"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-committees-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Users className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-committees">
                Committees
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-committees-description">
                Get hands-on experience in marketing, events, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20" data-testid="section-intro">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-intro">
              Choose Your Path
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-intro">
              AMA SDSU offers four specialized committees where you can gain hands-on experience, build your skills, and contribute to real marketing projects. Whether you're interested in consulting, events, media production, or design, there's a committee for you.
            </p>
          </div>
        </section>

        {/* Committees Grid */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-committees-grid">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {committees.map((committee, index) => (
                <Card key={committee.id} className={`p-8 bg-gradient-to-br ${committee.color}`} data-testid={`card-committee-${index}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-md bg-white/50 flex items-center justify-center flex-shrink-0`}>
                      <committee.icon className={`w-8 h-8 ${committee.accentColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" data-testid={`text-committee-name-${index}`}>
                        {committee.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6" data-testid={`text-committee-desc-${index}`}>
                    {committee.shortDescription}
                  </p>
                  
                  <Button variant="outline" asChild data-testid={`button-learn-more-${index}`}>
                    <Link href={`/committees/${committee.id}`} className="gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits of Joining */}
        <section className="py-16 md:py-20" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-benefits">
              Benefits of Joining a Committee
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 text-center" data-testid={`card-benefit-${index}`}>
                  <h3 className="text-lg font-bold mb-2" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-how-to-join">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-how-to-join">
              Ready to Get Involved?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-how-to-join">
              Committee recruitment happens at the beginning of each semester. Attend our weekly meetings to learn more about each committee and express your interest. Members can join multiple committees!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-weekly-meetings">
                <a href="/weekly-meetings">Attend Weekly Meetings</a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-membership">
                <a href="/membership">Learn About Membership</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
