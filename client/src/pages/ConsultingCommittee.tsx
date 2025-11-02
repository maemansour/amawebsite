import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Target, Users, TrendingUp, Lightbulb, Heart, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function ConsultingCommittee() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      title: "Networking",
      icon: Users,
      items: [
        "Local business owners",
        "SDSU students",
        "Industry professionals"
      ]
    },
    {
      title: "Experience",
      icon: TrendingUp,
      items: [
        "Hands-on marketing",
        "Consulting practice",
        "Real client work"
      ],
      highlighted: true
    },
    {
      title: "Skills",
      icon: Lightbulb,
      items: [
        "Content creation",
        "Market strategy",
        "Campaign development"
      ]
    }
  ];

  const portfolio = [
    {
      semester: "Spring 2025",
      clients: [
        { name: "FindGood.Tech", url: "#" },
        { name: "Romulus Media", url: "#" },
        { name: "SD360", url: "#" },
        { name: "Vervor shop", url: "#" },
        { name: "Cram", url: "#" }
      ]
    },
    {
      semester: "Fall 2024",
      clients: [
        { name: "FindGood.Tech", url: "#" },
        { name: "Romulus Media", url: "#" },
        { name: "SD360", url: "#" },
        { name: "Vervor shop", url: "#" }
      ]
    },
    {
      semester: "Spring 2024",
      clients: [
        { name: "FindGood.Tech", url: "#" },
        { name: "AKA", url: "#" },
        { name: "SD360", url: "#" }
      ]
    },
    {
      semester: "Fall 2023",
      clients: [
        { name: "619 Spirits North Park", url: "#" },
        { name: "619 IT", url: "#" },
        { name: "Unincorporated", url: "#" },
        { name: "Advestor", url: "#" }
      ]
    },
    {
      semester: "Spring 2023",
      clients: [
        { name: "Cloutr", url: "#" },
        { name: "The San Diego Dream Team", url: "#" }
      ]
    },
    {
      semester: "Fall 2022",
      clients: [
        { name: "Coach Heidi Wilson", url: "#" },
        { name: "Coach Mark Caplitte", url: "#" }
      ]
    }
  ];

  const howToJoinSteps = [
    "Attend AMA General Body meetings at the beginning of the semester and become a member.",
    "Look out for announcements during meetings and on our Slack channel.",
    "Speak to an Executive Member at AMA GBMs for more information or email partnerships.sdsuama@gmail.com"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Link href="/committees">
          <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors" data-testid="link-back-committees">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Committees</span>
          </a>
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
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-title">
                    Consulting <span className="text-[#D4A574] dark:text-[#E5C4A0]">Committee</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground mb-8" data-testid="text-tagline">
                    Real-world marketing consulting experience with <span className="font-semibold text-foreground">local businesses</span> in San Diego.
                  </p>

                  <Card className="bg-[#FFF8DC] dark:bg-[#3D3420] border-[#D4A574]/20 mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-md bg-[#D4A574]/20 dark:bg-[#D4A574]/30 flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-1 text-foreground">Hands-On Experience</h3>
                          <p className="text-sm text-muted-foreground">Work directly with business executives</p>
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
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                      alt="Consulting Committee Team"
                      className="w-full h-auto"
                      data-testid="img-team"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-muted px-6 py-3 rounded-md shadow-lg border border-border">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">Consulting Directors</span>
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
                      <Target className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                  </div>
                  
                  <div className="space-y-4 text-primary-foreground/90">
                    <p>
                      Here at SDSU AMA, we facilitate a unique and collaborative marketing consulting service for select companies and non-profit organizations in the San Diego area.
                    </p>
                    <p>
                      General body members will have the opportunity to put their marketing knowledge to use and work with businesses in need of social media advertising and content creation.
                    </p>
                    <p>
                      Not only will you be working directly with professionals and company executives, but Consulting Committee members will have the chance to network and build working relationships with AMA members and officers.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Right - Image */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop" 
                      alt="Collaborative Learning"
                      className="w-full h-auto"
                      data-testid="img-mission"
                    />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-[#FFF8DC] dark:bg-[#3D3420] px-6 py-4 rounded-md shadow-lg max-w-xs border border-[#D4A574]/20">
                    <h3 className="text-lg font-bold mb-1 text-foreground">Collaborative Learning</h3>
                    <p className="text-sm text-muted-foreground">Working together on real client projects</p>
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
                  Comprehensive benefits that shape your consulting career
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
                          : 'bg-[#D4A574]/20 dark:bg-[#D4A574]/30'
                      }`}>
                        <benefit.icon className={`w-8 h-8 ${
                          benefit.highlighted 
                            ? 'text-primary-foreground' 
                            : 'text-[#D4A574] dark:text-[#E5C4A0]'
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
                                : 'bg-[#D4A574] dark:bg-[#E5C4A0]'
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

      {/* Client Portfolio Section */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-portfolio">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-portfolio">
                  Our Client Portfolio
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-portfolio-subtitle">
                  Real projects with real impact
                </p>
              </div>
            </ScrollReveal>

            <Card className="bg-muted/30">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {portfolio.map((semester, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <div data-testid={`semester-${index}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-6 bg-[#D4A574] dark:bg-[#E5C4A0] rounded-full" />
                          <h3 className="text-lg font-bold text-foreground">{semester.semester}</h3>
                        </div>
                        <ul className="space-y-2">
                          {semester.clients.map((client, clientIndex) => (
                            <li key={clientIndex}>
                              <a 
                                href={client.url} 
                                className="text-[#D4A574] dark:text-[#E5C4A0] hover:underline"
                                data-testid={`link-client-${index}-${clientIndex}`}
                              >
                                {client.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
      </section>

      {/* How to Join & For Businesses Section */}
      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-join">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* How to Join */}
              <ScrollReveal direction="left">
                <Card className="bg-primary text-primary-foreground p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-md bg-primary-foreground/20 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold">How to Join</h2>
                  </div>
                  
                  <ul className="space-y-4">
                    {howToJoinSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-4" data-testid={`step-${index}`}>
                        <div className="w-8 h-8 rounded-full bg-[#D4A574] dark:bg-[#E5C4A0] flex items-center justify-center flex-shrink-0 text-white dark:text-black font-bold">
                          {index + 1}
                        </div>
                        <p className="text-primary-foreground/90 pt-1">{step}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>

              {/* For Businesses */}
              <ScrollReveal direction="right" delay={0.2}>
                <Card className="bg-[#FFF8DC] dark:bg-[#3D3420] border-[#D4A574]/20 p-8 h-full">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">For Businesses</h2>
                  <p className="text-muted-foreground mb-6">
                    Interested in our consulting services? We'd love to help your business grow!
                  </p>
                  <div className="bg-white/50 dark:bg-black/30 border border-[#D4A574]/20 rounded-md p-4">
                    <p className="text-sm font-semibold mb-2 text-foreground">Contact:</p>
                    <a 
                      href="mailto:partnerships.sdsuama@gmail.com" 
                      className="text-primary hover:underline font-medium"
                      data-testid="link-business-email"
                    >
                      partnerships.sdsuama@gmail.com
                    </a>
                  </div>
                </Card>
              </ScrollReveal>
            </div>

            {/* Ready to Start CTA */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-cta">
                  Ready to Start?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-cta-description">
                  Get hands-on consulting experience while helping local businesses grow their marketing efforts.
                </p>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-apply">
                  Apply to Consulting Committee
                </Button>
              </div>
            </ScrollReveal>
          </div>
      </section>

      <Footer />
    </div>
  );
}
