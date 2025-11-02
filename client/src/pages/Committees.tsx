import { Link } from "wouter";
import { Users, Lightbulb, TrendingUp, Heart, Award, Rocket } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useQuery } from "@tanstack/react-query";
import type { Settings } from "@shared/schema";

export default function Committees() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });
  const committees = [
    {
      id: "consulting",
      name: "Consulting Committee",
      description: "Unique and collaborative marketing consulting service for select companies and non-profit organizations in San Diego area.",
      whyJoin: [
        "Collaborate and network with local business owners and students at SDSU",
        "Hands on marketing and consulting experience",
        "Content creation and market strategy experience"
      ]
    },
    {
      id: "event-planning",
      name: "Event Planning Committee",
      description: "Organize and execute significant chapter events, including PNN and Regionals. Enhance leadership, project amangement, and teamwork skills.",
      whyJoin: [
        "Event planning",
        "Brainstorming ideas",
        "Logistics management"
      ]
    },
    {
      id: "podcast",
      name: "Podcast Committee",
      description: "Work on our podcast, 'The AMA Way'. Engage with thought-provoking discussions, gain invaluable industry insights, and broaden understanding of marketing's intricacies.",
      whyJoin: [
        "Collaborate and network with professionals, professors, influencers and students",
        "Create and Publish audio/video podcasts",
        "Content creation and market strategy experience"
      ]
    },
    {
      id: "adobe",
      name: "Adobe Committee",
      description: "Work directly with student ambassadors and professionals while unlocking creative skills and exploring new Adobe platforms",
      whyJoin: [
        "Interactive workshops with Adobe representatives",
        "Gain proficiency in Adobe applications",
        "Open to everyone at any skill level"
      ]
    },
    {
      id: "sales",
      name: "Sales Committee",
      description: "Drive chapter revenue through sponsorship acquisition and partnership development. Build professional sales and negotiation skills while connecting with local businesses.",
      whyJoin: [
        "Develop sales and negotiation skills",
        "Build relationships with local businesses and sponsors",
        "Learn about partnership development and B2B sales"
      ]
    },
    {
      id: "competitions",
      name: "Competitions Committee",
      description: "Represent AMA SDSU at regional and national marketing competitions. Collaborate with teammates to develop strategic marketing solutions and compete against other chapters.",
      whyJoin: [
        "Compete in regional and national AMA competitions",
        "Apply classroom knowledge to real-world case studies",
        "Build teamwork and strategic thinking skills"
      ]
    },
    {
      id: "multimedia",
      name: "Multimedia Committee",
      description: "Create engaging visual content for chapter social media, events, and marketing materials. Develop skills in photography, videography, graphic design, and content creation.",
      whyJoin: [
        "Photography and videography experience",
        "Content creation for social media platforms",
        "Build a creative portfolio with real projects"
      ]
    }
  ];

  const benefits = [
    {
      icon: Lightbulb,
      title: "Hands-on Experience",
      description: "Work on real projects that build your portfolio and skills"
    },
    {
      icon: TrendingUp,
      title: "Leadership Development",
      description: "Take on leadership roles and develop management skills"
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with industry professionals and like-minded peers"
    },
    {
      icon: Heart,
      title: "Resume Enhancement",
      description: "Add meaningful experience that stands out to employers"
    }
  ];

  const commitments = [
    "Attend weekly committee meetings",
    "Participate in chapter meetings",
    "Complete assigned projects and tasks",
    "Collaborate effectively with team members",
    "Represent AMA SDSU professionally",
    "Minimum one semester commitment"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-background" data-testid="section-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-main">
                  Join Our <span className="text-primary">Committees</span> <Users className="inline-block w-10 h-10 md:w-12 md:h-12 text-foreground" />
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-subtitle">
                  Get hands-on experience and develop leadership skills by joining one of our dynamic committees.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="max-w-2xl mx-auto">
                <Card className="bg-primary/10 border-primary/30 p-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Award className="w-6 h-6 text-primary" />
                    <p className="text-lg font-semibold text-primary" data-testid="text-cta-banner">
                      Build Your Portfolio & Network 🚀
                    </p>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Choose Your Path Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-committees">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-choose-path">
                  Choose Your Path
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-choose-subtitle">
                  Each committee offers unique opportunities for growth and impact
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {committees.slice(0, 6).map((committee, index) => (
                <ScrollReveal key={committee.id} delay={index * 0.1}>
                  <Card className="p-6 h-full flex flex-col" data-testid={`card-committee-${index}`}>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <h3 className="text-xl font-bold" data-testid={`text-committee-name-${index}`}>
                          {committee.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4" data-testid={`text-committee-desc-${index}`}>
                        {committee.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <h4 className="font-semibold text-primary">Why Join:</h4>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {committee.whyJoin.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`committee-benefit-${index}-${i}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      {committee.id === "consulting" ? (
                        <Link href="/committees/consulting">
                          <Button className="w-full" variant="default" data-testid={`button-learn-more-${index}`}>
                            Learn More
                          </Button>
                        </Link>
                      ) : (
                        <Button className="w-full" variant="default" data-testid={`button-learn-more-${index}`}>
                          Learn More
                        </Button>
                      )}
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            {/* Multimedia Committee with Image */}
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.6}>
                <Card className="p-6 h-full flex flex-col" data-testid="card-committee-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h3 className="text-xl font-bold" data-testid="text-committee-name-6">
                        {committees[6].name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4" data-testid="text-committee-desc-6">
                      {committees[6].description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <h4 className="font-semibold text-primary">Why Join:</h4>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {committees[6].whyJoin.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`committee-benefit-6-${i}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant="default" data-testid="button-learn-more-6">
                      Learn More
                    </Button>
                  </div>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={0.7}>
                <div className="rounded-lg overflow-hidden shadow-lg h-full" data-testid="img-committees">
                  <img 
                    src={settings?.committeesImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"} 
                    alt="Committee Activities"
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Why Join a Committee Section */}
        <section className="py-16 md:py-20 bg-background" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Left - Benefits */}
              <ScrollReveal direction="left">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="heading-why-join">
                    Why Join a Committee?
                  </h2>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4" data-testid={`benefit-${index}`}>
                        <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1" data-testid={`text-benefit-title-${index}`}>
                            {benefit.title}
                          </h3>
                          <p className="text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Right - Image */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="rounded-lg overflow-hidden shadow-lg h-full" data-testid="img-why-join">
                  <img 
                    src={settings?.committeesWhyJoinImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"} 
                    alt="Committee Members"
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Commitment Card - Full Width */}
            <ScrollReveal direction="up" delay={0.3}>
              <Card className="bg-primary text-primary-foreground p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary-foreground" data-testid="heading-commitment">
                  Your Commitment
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {commitments.map((commitment, index) => (
                    <div key={index} className="flex items-start gap-3 text-primary-foreground/90" data-testid={`commitment-${index}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-2 flex-shrink-0" />
                      <span>{commitment}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground" data-testid="heading-cta">
                Ready to Make an <span className="text-primary-foreground">Impact</span>?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
                Join a committee today and start building the skills, network, and experience that will set you apart in your career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" data-testid="button-apply-now">
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-learn-more-cta">
                  Learn More
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
