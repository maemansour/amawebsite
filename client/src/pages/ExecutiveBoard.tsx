import { Users, Mail, Linkedin, Trophy, Award } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useQuery } from "@tanstack/react-query";
import { type Settings, type ExecutiveMember } from "@shared/schema";

export default function ExecutiveBoard() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: members = [], isLoading } = useQuery<ExecutiveMember[]>({
    queryKey: ["/api/executive-members"],
  });

  // Group members by team
  const groupedMembers = members.reduce((acc, member) => {
    if (!acc[member.team]) {
      acc[member.team] = [];
    }
    acc[member.team].push(member);
    return acc;
  }, {} as Record<string, ExecutiveMember[]>);

  // Sort members within each team by displayOrder
  Object.keys(groupedMembers).forEach((team) => {
    groupedMembers[team].sort((a, b) => a.displayOrder - b.displayOrder);
  });

  // Derive team order from the order members appear in (not alphabetically)
  // This ensures the public page matches the admin panel's drag-and-drop order
  const seenTeams = new Set<string>();
  const teams: string[] = [];
  
  // Sort all members by displayOrder first
  const sortedMembers = [...members].sort((a, b) => a.displayOrder - b.displayOrder);
  
  sortedMembers.forEach((member) => {
    if (!seenTeams.has(member.team)) {
      seenTeams.add(member.team);
      teams.push(member.team);
    }
  });

  const getGridCols = (count: number) => {
    if (count === 1) return "lg:grid-cols-1 max-w-md mx-auto";
    if (count === 2) return "lg:grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "lg:grid-cols-3";
    if (count === 4) return "lg:grid-cols-4";
    return "lg:grid-cols-3";
  };

  const getMemberScale = (count: number) => {
    if (count === 1) return "scale-110";
    if (count === 2) return "scale-105";
    return "";
  };

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

        {/* Executive Team by Teams */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-executive-team">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12" data-testid="loading-members">
                <p className="text-muted-foreground">Loading executive board members...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12" data-testid="no-members">
                <p className="text-muted-foreground">No executive board members found.</p>
              </div>
            ) : (
              <div className="space-y-16">
                {teams.map((team, teamIndex) => {
                  const teamMembers = groupedMembers[team];
                  const gridClass = getGridCols(teamMembers.length);
                  const scaleClass = getMemberScale(teamMembers.length);
                  
                  return (
                    <div key={team} data-testid={`section-team-${team.toLowerCase().replace(/\s+/g, '-')}`}>
                      <ScrollReveal direction="up">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid={`heading-team-${team.toLowerCase().replace(/\s+/g, '-')}`}>
                          {team}
                        </h2>
                      </ScrollReveal>
                      
                      <div className={`grid md:grid-cols-2 ${gridClass} gap-8`}>
                        {teamMembers.map((member, index) => (
                          <ScrollReveal key={member.id} delay={index * 0.1}>
                            <Card className={`p-6 ${scaleClass}`} data-testid={`card-executive-${member.id}`}>
                              <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-muted">
                                  <img 
                                    src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} 
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    data-testid={`img-executive-${member.id}`}
                                  />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-1" data-testid={`text-name-${member.id}`}>
                                  {member.name}
                                </h3>
                                <p className="text-primary font-medium mb-2" data-testid={`text-title-${member.id}`}>
                                  {member.title}
                                </p>
                                <p className="text-sm text-muted-foreground mb-1" data-testid={`text-major-${member.id}`}>
                                  {member.major} • {member.year}
                                </p>
                                
                                {member.bio && (
                                  <p className="text-sm text-muted-foreground my-4" data-testid={`text-bio-${member.id}`}>
                                    {member.bio}
                                  </p>
                                )}
                                
                                <div className="flex gap-2 mt-auto">
                                  {member.email && (
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      asChild 
                                      data-testid={`button-email-${member.id}`}
                                    >
                                      <a href={`mailto:${member.email}`}>
                                        <Mail className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  )}
                                  {member.linkedin && (
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      asChild 
                                      data-testid={`button-linkedin-${member.id}`}
                                    >
                                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                        <Linkedin className="w-4 h-4" />
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </ScrollReveal>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
