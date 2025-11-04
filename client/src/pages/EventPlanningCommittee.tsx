import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Users, TrendingUp, Lightbulb, Heart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { CommitteeConfig } from "@shared/schema";

export default function EventPlanningCommittee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: committeeConfig } = useQuery<CommitteeConfig>({
    queryKey: ["/api/committees/event-planning"],
  });

  const benefits = [
    {
      title: "Leadership",
      icon: Users,
      items: [
        "Lead event teams",
        "Manage budgets & timelines",
        "Coordinate with vendors"
      ]
    },
    {
      title: "Experience",
      icon: TrendingUp,
      items: [
        "Plan major events",
        "Project management",
        "Event execution"
      ],
      highlighted: true
    },
    {
      title: "Skills",
      icon: Lightbulb,
      items: [
        "Logistics planning",
        "Team coordination",
        "Problem solving"
      ]
    }
  ];

  const howToJoinSteps = [
    "Attend AMA General Body meetings at the beginning of the semester and become a member.",
    "Look out for announcements during meetings and on our Slack channel.",
    "Speak to an Executive Member at AMA GBMs for more information."
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link href="/committees" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" data-testid="link-back-committees">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Committees</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-background" data-testid="section-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <ScrollReveal direction="left">
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-primary/10 mb-6">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-title">
                    Event Planning <span className="text-primary">Committee</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground mb-8" data-testid="text-tagline">
                    Organize and execute <span className="font-semibold text-foreground">signature chapter events</span> including PNN and Regionals.
                  </p>

                  <Card className="bg-primary/10 border-primary/20 mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1 text-foreground">Leadership Development</h3>
                          <p className="text-sm text-muted-foreground">Lead teams and manage major events from start to finish</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <p className="text-sm text-muted-foreground" data-testid="text-social">
                    Follow our <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#D4A574] dark:text-[#E5C4A0] hover:underline font-medium">Instagram</a> for updates!
                  </p>
                </div>
              </ScrollReveal>

              {/* Right - Team Photo */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src={committeeConfig?.heroImage || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop"} 
                      alt="Consulting Committee Team"
                      className="w-full h-auto"
                      data-testid="img-team"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-muted px-6 py-3 rounded-md shadow-lg border border-border">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Event Planning Team</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-mission">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Mission Card */}
              <ScrollReveal direction="left">
                <Card className="bg-primary text-primary-foreground p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-md bg-primary-foreground/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                  </div>
                  
                  <div className="space-y-4 text-primary-foreground/90">
                    <p>
                      The Event Planning Committee organizes and executes AMA SDSU's signature chapter events, including PNN (Professionals Night Networking) and Regional competitions.
                    </p>
                    <p>
                      Committee members gain hands-on experience in event management, logistics coordination, and team leadership while creating memorable experiences for our chapter.
                    </p>
                    <p>
                      From venue selection to day-of coordination, you'll develop project management skills and work alongside dedicated AMA members to bring our biggest events to life.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Right - Image */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={committeeConfig?.missionImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"} 
                      alt="Collaborative Learning"
                      className="w-full h-auto"
                      data-testid="img-mission"
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-card px-6 py-4 rounded-md shadow-lg max-w-xs border border-border">
                    <h3 className="text-lg font-bold mb-1 text-foreground">Teamwork in Action</h3>
                    <p className="text-sm text-muted-foreground">Bringing events to life together</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-why-join">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-join">
                  Why Join Our Committee?
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-why-join-subtitle">
                  Comprehensive benefits that develop your event management skills
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card 
                    className={`h-full ${
                      benefit.highlighted 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-card'
                    }`}
                    data-testid={`card-benefit-${index}`}
                  >
                    <CardContent className="p-8 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-md mb-6 ${
                        benefit.highlighted 
                          ? 'bg-primary-foreground/20' 
                          : 'bg-primary/20'
                      }`}>
                        <benefit.icon className={`w-8 h-8 ${
                          benefit.highlighted 
                            ? 'text-primary-foreground' 
                            : 'text-primary'
                        }`} />
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-6 ${
                        benefit.highlighted 
                          ? 'text-primary-foreground' 
                          : 'text-foreground'
                      }`} data-testid={`text-benefit-title-${index}`}>
                        {benefit.title}
                      </h3>
                      
                      <ul className="space-y-3">
                        {benefit.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex} 
                            className={`flex items-center gap-2 ${
                              benefit.highlighted 
                                ? 'text-primary-foreground/90' 
                                : 'text-foreground'
                            }`}
                            data-testid={`text-benefit-item-${index}-${itemIndex}`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              benefit.highlighted 
                                ? 'bg-primary-foreground' 
                                : 'bg-primary'
                            }`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-join">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <Card className="bg-primary text-primary-foreground p-8 md:p-12 max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8 justify-center">
                  <div className="w-12 h-12 rounded-md bg-primary-foreground/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">How to Join</h2>
                </div>
                
                <ul className="space-y-4">
                  {howToJoinSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4" data-testid={`step-${index}`}>
                      <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center flex-shrink-0 text-primary font-bold">
                        {index + 1}
                      </div>
                      <p className="text-primary-foreground/90 pt-1">{step}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>

            {/* Ready to Start CTA */}
            <ScrollReveal direction="up" delay={0.2} className="mt-12">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-cta">
                  Ready to Start?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
                  Join the team bringing AMA SDSU's biggest events to life and develop your event management skills.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-apply">
                  Apply to Event Planning Committee
                </Button>
              </div>
            </ScrollReveal>
          </div>
      </section>

      <Footer />
    </div>
  );
}
