import { Users, Mail, Linkedin, Trophy, Target, Award } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useQuery } from "@tanstack/react-query";
import { type Settings } from "@shared/schema";

export default function ExecutiveBoard() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });
  const executiveMembers = [
    {
      name: "Sarah Johnson",
      title: "President",
      major: "Marketing",
      year: "Senior",
      bio: "Leading our chapter to maintain our TOP 10 status and create impactful experiences for all members.",
      email: "president@sdsuama.com",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      title: "Vice President",
      major: "Business Administration",
      year: "Junior",
      bio: "Supporting chapter operations and member engagement initiatives across all committees.",
      email: "vp@sdsuama.com",
      linkedin: "https://linkedin.com/in/michaelchen",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      name: "Emily Rodriguez",
      title: "Secretary",
      major: "Communications",
      year: "Junior",
      bio: "Managing chapter communications and maintaining organizational records for seamless operations.",
      email: "secretary@sdsuama.com",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
    },
    {
      name: "David Kim",
      title: "Treasurer",
      major: "Finance",
      year: "Senior",
      bio: "Overseeing chapter finances and ensuring sustainable funding for all member activities.",
      email: "treasurer@sdsuama.com",
      linkedin: "https://linkedin.com/in/davidkim",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
      name: "Jessica Martinez",
      title: "Director of Events",
      major: "Marketing",
      year: "Junior",
      bio: "Planning and executing engaging events that bring value to our members and partners.",
      email: "events@sdsuama.com",
      linkedin: "https://linkedin.com/in/jessicamartinez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
    },
    {
      name: "Alex Thompson",
      title: "Director of Membership",
      major: "Public Relations",
      year: "Sophomore",
      bio: "Growing our member base and ensuring every member has a meaningful AMA experience.",
      email: "membership@sdsuama.com",
      linkedin: "https://linkedin.com/in/alexthompson",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16" data-testid="section-executive-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <ScrollReveal direction="left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-executive-board">
                  Executive <span className="text-primary">Board</span> <Users className="inline-block w-10 h-10 md:w-12 md:h-12 text-primary" />
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-executive-description">
                  Meet the dedicated leaders driving our chapter's success and maintaining our national recognition.
                </p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-lg border-2 border-primary/30 font-semibold">
                  <Award className="w-5 h-5" />
                  <span data-testid="text-leadership-badge">Award-Winning Leadership</span>
                  <Award className="w-5 h-5" />
                </div>
              </ScrollReveal>

              {/* Right Column */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={settings?.executiveBoardHeroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"} 
                      alt="Executive Board Team"
                      className="w-full h-[400px] object-cover"
                      data-testid="img-hero"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-6 py-3 rounded-lg shadow-lg border-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span data-testid="text-hero-caption">2024-2025 Leadership Team</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Executive Team Grid */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-executive-team">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-team-members">
                Our Team
              </h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executiveMembers.map((member, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="p-6" data-testid={`card-executive-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-executive-${index}`}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1" data-testid={`text-name-${index}`}>
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-2" data-testid={`text-title-${index}`}>
                      {member.title}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1" data-testid={`text-major-${index}`}>
                      {member.major} • {member.year}
                    </p>
                    
                    <p className="text-sm text-muted-foreground my-4" data-testid={`text-bio-${index}`}>
                      {member.bio}
                    </p>
                    
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild 
                        data-testid={`button-email-${index}`}
                      >
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild 
                        data-testid={`button-linkedin-${index}`}
                      >
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="py-16 md:py-20" data-testid="section-join-cta">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-join-team">
              Interested in Leadership?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-join-description">
              Executive board positions are available each year. Get involved with committees to develop your leadership skills and prepare for future board roles.
            </p>
            <Button size="lg" asChild data-testid="button-get-involved">
              <a href="/membership">Learn About Membership</a>
            </Button>
            </ScrollReveal>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
