import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Settings } from "@shared/schema";

interface HeroProps {
  settings?: Settings;
}

export function Hero({ settings }: HeroProps) {
  const heroDescription = settings?.heroDescription || 
    "Aiming to educate and empower young professionals looking to break into the marketing, sales, and advertising industries. At SDSU AMA we accomplish this through weekly meetings with industry professional guest speakers and elite marketing company and agency tours. We promote growth and learning through case studies, workshops, and events. Open to SDSU students of all majors and invites you to connect with our fAMAly!";

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge 
              className="bg-gold text-primary-foreground border-none font-semibold text-sm px-4 py-1"
              data-testid="badge-top-chapter"
            >
              TOP 10 Chapter
            </Badge>

            <div className="space-y-4">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight" data-testid="text-hero-title">
                American Marketing Association
              </h1>
              <h2 className="font-heading font-semibold text-2xl md:text-3xl lg:text-4xl" data-testid="text-hero-subtitle">
                San Diego State University
              </h2>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-primary-foreground/90 max-w-xl" data-testid="text-hero-description">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base font-medium"
                asChild
                data-testid="button-join-family"
              >
                <a href="#join">Join The Family</a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base font-medium bg-transparent border-2 border-primary-foreground text-primary-foreground"
                asChild
                data-testid="button-learn-more"
              >
                <a href="#about">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right Content - AMA Logo Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="relative w-full h-full rounded-full bg-primary-foreground/10 backdrop-blur-sm border-4 border-primary-foreground/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-7xl lg:text-8xl font-heading font-bold">
                    AM&gt;
                  </div>
                  <div className="text-xl lg:text-2xl font-semibold tracking-wider">
                    SAN DIEGO STATE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
