import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { GraduationCap, Briefcase, Calendar, Star, Network, Linkedin } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Settings, type AlumniSpotlight } from "@shared/schema";

export default function Alumni() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: alumniSpotlight = [], isLoading: isLoadingAlumni } = useQuery<AlumniSpotlight[]>({
    queryKey: ["/api/alumni-spotlight"],
  });

  const [email, setEmail] = useState("");

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've joined our alumni network.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join network. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleJoinNetwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20" data-testid="section-alumni-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div>
                <ScrollReveal direction="left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-alumni">
                    Alumni <span className="text-[#D4A574] dark:text-[#E5C4A0]">Relations</span> <GraduationCap className="inline-block w-10 h-10 md:w-12 md:h-12" />
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8" data-testid="text-alumni-description">
                    Stay connected with our <span className="font-semibold text-foreground">amazing alumni community</span> and learn about the incredible careers our former members have built.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.1}>
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-[#D4A574] dark:border-[#E5C4A0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <Star className="w-6 h-6 text-[#D4A574] dark:text-[#E5C4A0]" />
                        <span className="font-bold text-lg text-foreground">Lifelong Professional Network</span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <ScrollReveal direction="right">
                  <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-8 text-center">
                      <Network className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Join Our Network</h3>
                      <p className="text-primary-foreground/90">
                        Connect with 500+ successful alumni worldwide
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.1}>
                  <Card className="bg-card border-2 border-[#D4A574] dark:border-[#E5C4A0]">
                    <CardContent className="p-8 text-center">
                      <Star className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Award-Winning Alumni</h3>
                      <p className="text-muted-foreground">
                        Recognized leaders in marketing and business
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Alumni Benefits */}
        <section className="py-16 md:py-20" data-testid="section-alumni-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-alumni-benefits">
                  Alumni Benefits
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-lg text-muted-foreground">
                  Exclusive opportunities for our graduate community
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Mentorship Program */}
              <ScrollReveal direction="up" delay={0.1}>
                <Card className="bg-blue-50 dark:bg-blue-950/20 p-8 text-center" data-testid="card-mentorship">
                  <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="heading-mentorship">
                    Mentorship Program
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-mentorship">
                    Mentor current students and share your professional experience
                  </p>
                </Card>
              </ScrollReveal>

              {/* Career Network */}
              <ScrollReveal direction="up" delay={0.2}>
                <Card className="bg-green-50 dark:bg-green-950/20 p-8 text-center" data-testid="card-career-network">
                  <Briefcase className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="heading-career-network">
                    Career Network
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-career-network">
                    Connect with fellow alumni for career opportunities and advice
                  </p>
                </Card>
              </ScrollReveal>

              {/* Alumni Events */}
              <ScrollReveal direction="up" delay={0.3}>
                <Card className="bg-purple-50 dark:bg-purple-950/20 p-8 text-center" data-testid="card-alumni-events">
                  <Calendar className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground" data-testid="heading-alumni-events">
                    Alumni Events
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-alumni-events">
                    Attend exclusive alumni networking events and reunions
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Alumni Spotlight */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-alumni-spotlight">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-alumni-spotlight">
                  Alumni Spotlight
                </h2>
                <p className="text-lg text-muted-foreground mb-12">
                  Celebrating the success of our graduates
                </p>
              </div>
            </ScrollReveal>

            {isLoadingAlumni ? (
              <div className="max-w-md mx-auto text-center py-12">
                <div className="animate-pulse space-y-4">
                  <div className="h-12 w-12 bg-muted rounded-full mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            ) : alumniSpotlight.length === 0 ? (
              <ScrollReveal direction="up" delay={0.2}>
                <div className="max-w-md mx-auto text-center py-12">
                  <GraduationCap className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                  <p className="text-muted-foreground" data-testid="text-no-spotlight">
                    No alumni spotlight available at the moment.
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {alumniSpotlight.map((alumni, index) => (
                  <ScrollReveal key={alumni.id} direction="up" delay={index * 0.1}>
                    <Card className="h-full hover-elevate" data-testid={`alumni-card-${alumni.id}`}>
                      <CardContent className="p-6">
                        {alumni.imageUrl && (
                          <div className="mb-4 flex justify-center">
                            <Avatar className="w-32 h-32" data-testid={`alumni-image-${alumni.id}`}>
                              <AvatarImage src={alumni.imageUrl} alt={alumni.name} />
                              <AvatarFallback>{alumni.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1 text-foreground" data-testid={`alumni-name-${alumni.id}`}>
                              {alumni.name}
                            </h3>
                            <p className="text-sm text-muted-foreground" data-testid={`alumni-class-${alumni.id}`}>
                              {alumni.classYear}
                            </p>
                          </div>
                          {alumni.linkedinUrl && (
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              data-testid={`alumni-linkedin-${alumni.id}`}
                            >
                              <a
                                href={alumni.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${alumni.name} LinkedIn profile`}
                              >
                                <Linkedin className="h-5 w-5 text-[#0077B5]" />
                              </a>
                            </Button>
                          )}
                        </div>
                        <div className="mb-3">
                          <p className="font-semibold text-foreground" data-testid={`alumni-position-${alumni.id}`}>
                            {alumni.position}
                          </p>
                          <p className="text-sm text-[#D4A574] dark:text-[#E5C4A0]" data-testid={`alumni-company-${alumni.id}`}>
                            {alumni.company}
                          </p>
                        </div>
                        <p className="text-muted-foreground text-sm" data-testid={`alumni-description-${alumni.id}`}>
                          {alumni.description}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground" data-testid="section-cta">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                  Alumni? Get Involved.
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                  Join our exclusive alumni network and continue to benefit from the AMA SDSU community.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <form onSubmit={handleJoinNetwork} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-muted text-foreground border-none"
                  required
                  data-testid="input-alumni-email"
                />
                <Button 
                  type="submit"
                  className="bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A] whitespace-nowrap"
                  size="lg"
                  disabled={subscribeMutation.isPending}
                  data-testid="button-join-network"
                >
                  {subscribeMutation.isPending ? "Joining..." : "Join Network"}
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
