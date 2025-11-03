import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Briefcase, Calendar, Star, Network } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/ScrollReveal";
import { type Settings } from "@shared/schema";

export default function Alumni() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const [email, setEmail] = useState("");

  const handleJoinNetwork = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Join network with email:", email);
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

            <ScrollReveal direction="up" delay={0.2}>
              <div className="max-w-md mx-auto text-center py-12">
                <GraduationCap className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-muted-foreground" data-testid="text-no-spotlight">
                  No alumni spotlight available at the moment.
                </p>
              </div>
            </ScrollReveal>
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
                  data-testid="button-join-network"
                >
                  Join Network
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
