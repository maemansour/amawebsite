import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Globe, Award, Calendar, Briefcase, BookOpen, Users, TrendingUp } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { type Settings } from "@shared/schema";

export default function Resources() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20" data-testid="section-resources-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8">
              <ScrollReveal direction="up">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-resources">
                  Official <span className="text-[#D4A574] dark:text-[#E5C4A0]">AMA</span> Resources <Globe className="inline-block w-10 h-10 md:w-12 md:h-12" />
                </h1>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-resources-description">
                  Connect with the <span className="font-semibold text-foreground">national American Marketing Association</span> for additional resources and opportunities.
                </p>
              </ScrollReveal>
              
              {/* Benefits Banner */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="inline-block">
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-[#D4A574] dark:border-[#E5C4A0]">
                    <CardContent className="p-4 px-8">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                        <span className="font-semibold text-foreground">National AMA Member Benefits</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Resource Cards Grid */}
        <section className="py-16 md:py-20" data-testid="section-resource-cards">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* National Website - Left Column */}
              <ScrollReveal direction="left">
                <Card className="bg-primary text-primary-foreground h-full" data-testid="card-national-website">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <ExternalLink className="w-6 h-6" />
                        <h3 className="text-2xl font-bold">National Website</h3>
                      </div>
                      <p className="text-primary-foreground/90 mb-6">Your gateway to professional marketing resources</p>
                    </div>
                    <p className="text-primary-foreground/90 mb-6">
                      Visit the official AMA website for industry insights, career resources, and professional development tools that will accelerate your marketing career.
                    </p>
                    <ul className="space-y-2 mb-6 text-primary-foreground/90">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                        <span>Industry insights & trends</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                        <span>Career development resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                        <span>Professional networking tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                        <span>Marketing research & data</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-white dark:bg-muted text-primary dark:text-foreground hover:bg-white/90 dark:hover:bg-muted/90"
                      size="lg"
                      asChild
                      data-testid="button-visit-ama"
                    >
                      <a href="https://www.ama.org" target="_blank" rel="noopener noreferrer">
                        Visit AMA.org <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Right Column - Stacked Cards */}
              <div className="flex flex-col gap-6">
                {/* Knowledge Hub */}
                <ScrollReveal direction="right" delay={0.1}>
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20" data-testid="card-knowledge-hub">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                        <h3 className="text-xl font-bold text-foreground">Knowledge Hub</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Access exclusive marketing research, whitepapers, and industry reports.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Professional Network */}
                <ScrollReveal direction="right" delay={0.2}>
                  <Card className="bg-blue-50 dark:bg-blue-950/20" data-testid="card-professional-network">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold text-foreground">Professional Network</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Connect with 30,000+ marketing professionals worldwide.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                {/* Career Advancement */}
                <ScrollReveal direction="right" delay={0.3}>
                  <Card className="bg-green-50 dark:bg-green-950/20" data-testid="card-career-advancement">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h3 className="text-xl font-bold text-foreground">Career Advancement</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Job board, career coaching, and professional development programs.
                      </p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* National Programs */}
        <section className="py-16 md:py-20" data-testid="section-national-programs">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-national-programs">
                  National Programs
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-lg text-muted-foreground">
                  Exclusive opportunities for professional growth
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* AMA Conferences */}
              <ScrollReveal direction="up" delay={0.1}>
                <Card className="bg-yellow-50 dark:bg-yellow-950/20 p-8" data-testid="card-conferences">
                <div className="text-center mb-6">
                  <Calendar className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">AMA Conferences</h3>
                  <p className="text-muted-foreground mt-2">Annual marketing conferences with industry leaders</p>
                </div>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                    <span>Keynote speakers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                    <span>Networking sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                    <span>Workshop tracks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4A574] dark:text-[#E5C4A0]">•</span>
                    <span>Industry insights</span>
                  </li>
                </ul>
                </Card>
              </ScrollReveal>

              {/* Certifications */}
              <ScrollReveal direction="up" delay={0.2}>
                <Card className="bg-blue-50 dark:bg-blue-950/20 p-8" data-testid="card-certifications">
                <div className="text-center mb-6">
                  <Briefcase className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
                  <p className="text-muted-foreground mt-2">Professional marketing certifications and credentials</p>
                </div>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>PCM Certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Digital Marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Content Marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400">•</span>
                    <span>Analytics</span>
                  </li>
                </ul>
                </Card>
              </ScrollReveal>

              {/* Research */}
              <ScrollReveal direction="up" delay={0.3}>
                <Card className="bg-green-50 dark:bg-green-950/20 p-8" data-testid="card-research">
                <div className="text-center mb-6">
                  <BookOpen className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">Research</h3>
                  <p className="text-muted-foreground mt-2">Industry research, trends, and market insights</p>
                </div>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">•</span>
                    <span>Market research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">•</span>
                    <span>Consumer insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">•</span>
                    <span>Trend analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">•</span>
                    <span>Best practices</span>
                  </li>
                </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground" data-testid="section-cta">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <ScrollReveal direction="up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                  Ready to Connect with National AMA?
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
                  Join thousands of marketing professionals and take your career to the next level with official AMA resources and programs.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A]"
                  size="lg"
                  asChild
                  data-testid="button-explore-ama"
                >
                  <a href="https://www.ama.org" target="_blank" rel="noopener noreferrer">
                    Explore AMA.org <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  size="lg"
                  asChild
                  data-testid="button-join-chapter"
                >
                  <Link href="/membership">Join Our Chapter</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
