import { Handshake, Users, FileText, TrendingUp, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useQuery } from "@tanstack/react-query";
import { type Settings, type Sponsor } from "@shared/schema";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function OurSponsors() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: sponsors = [] } = useQuery<Sponsor[]>({
    queryKey: ["/api/sponsors"],
  });

  const partnershipBenefits = [
    {
      icon: Users,
      title: "Talent Pipeline",
      description: "Direct access to motivated marketing students and recent graduates"
    },
    {
      icon: FileText,
      title: "Brand Exposure",
      description: "Visibility among engaged students and marketing professionals"
    },
    {
      icon: Handshake,
      title: "Community Impact",
      description: "Support the next generation of marketing leaders and innovators"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16" data-testid="section-sponsors-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <ScrollReveal direction="left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-our-sponsors">
                  <Handshake className="inline-block w-10 h-10 md:w-12 md:h-12 text-primary mb-2" /> Our Partners & <span className="text-primary">Collaborations</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-sponsors-description">
                  We're proud to collaborate with these industry-leading organizations who help provide real-world experience and opportunities for our members.
                </p>
              </ScrollReveal>

              {/* Right Column */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={settings?.sponsorsHeroImage || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"} 
                      alt="Our Partners and Sponsors"
                      className="w-full h-[400px] object-cover"
                      data-testid="img-hero"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Sponsor Carousel Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-sponsors-carousel">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="heading-sponsors">
                Our Sponsors
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto" data-testid="text-sponsors-intro">
                Thank you to our incredible sponsors who make our events and initiatives possible
              </p>
            </ScrollReveal>

            {sponsors.length > 0 ? (
              <SponsorsCarousel sponsors={sponsors} />
            ) : (
              <Card className="py-12 text-center">
                <p className="text-muted-foreground">No sponsors to display at this time.</p>
              </Card>
            )}
          </div>
        </section>

        {/* Why Companies Partner With Us */}
        <section className="py-16 md:py-20" data-testid="section-why-partner">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="heading-why-partner">
                Why Companies Partner With Us
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto" data-testid="text-why-partner-intro">
                Our partners gain access to top marketing talent and meaningful engagement opportunities
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="p-8 text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3" data-testid={`text-benefit-title-${index}`}>
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-benefit-desc-${index}`}>
                      {benefit.description}
                    </p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground" data-testid="section-partnership-cta">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-partnership-cta">
                Interested in Partnering with AMA SDSU?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8" data-testid="text-partnership-cta-desc">
                Join our community of industry leaders and help shape the future of marketing education. We offer customizable partnership opportunities to meet your organization's goals.
              </p>
              <Button size="lg" variant="secondary" asChild data-testid="button-contact-partnership">
                <a href={`mailto:${settings?.email || 'finance.sdsuma@gmail.com'}`} className="gap-2">
                  <Mail className="w-5 h-5" />
                  Email: {settings?.email || 'finance.sdsuma@gmail.com'}
                </a>
              </Button>
            </ScrollReveal>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}

function SponsorsCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect(emblaApi);
    emblaApi.on("select", () => onSelect(emblaApi));
    emblaApi.on("reInit", () => onSelect(emblaApi));

    return () => {
      emblaApi.off("select", () => onSelect(emblaApi));
      emblaApi.off("reInit", () => onSelect(emblaApi));
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {sponsors.map((sponsor, index) => (
            <div 
              key={sponsor.id} 
              className="flex-[0_0_100%] min-w-0"
              aria-hidden={index !== selectedIndex}
              data-active={index === selectedIndex}
            >
              <div className="relative h-[500px] md:h-[600px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={sponsor.image || "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=600&fit=crop"}
                    alt={sponsor.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-sponsor-slide-${sponsor.id}`}
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex items-end">
                  <div className="w-full p-8 md:p-12 lg:p-16">
                    <div className="max-w-4xl">
                      <p className="text-primary-foreground/90 text-sm md:text-base mb-2 font-medium" data-testid={`text-sponsor-category-${sponsor.id}`}>
                        {sponsor.category}
                      </p>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4" data-testid={`text-sponsor-name-${sponsor.id}`}>
                        {sponsor.name}
                      </h3>
                      <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl" data-testid={`text-sponsor-description-${sponsor.id}`}>
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot Navigation */}
      {sponsors.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10" data-testid="carousel-dots">
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all hover-elevate active-elevate-2 ${
                index === selectedIndex 
                  ? 'bg-primary-foreground w-8' 
                  : 'bg-primary-foreground/40'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
              data-testid={`button-carousel-dot-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
