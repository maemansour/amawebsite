import { Handshake, Users, FileText, TrendingUp, Mail, ChevronLeft, ChevronRight } from "lucide-react";
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
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex-[0_0_100%] min-w-0">
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

      {/* Navigation Arrows */}
      {sponsors.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            data-testid="button-carousel-prev"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            data-testid="button-carousel-next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
