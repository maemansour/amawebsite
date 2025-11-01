import { Handshake, Users, Building, TrendingUp, ExternalLink } from "lucide-react";
import { SiRedbull } from "react-icons/si";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OurSponsors() {
  const sponsors = [
    {
      name: "Red Bull",
      type: "GBM Sponsor",
      logo: SiRedbull,
      description: "GBM #2 Sponsored by Redbull for our members!",
      partnership: "Red Bull partners with AMA SDSU to bring energy and excitement to our General Body Meetings, providing refreshments and sponsor our events.",
      website: "https://www.redbull.com",
      tier: "premier"
    }
  ];

  const partnershipBenefits = [
    {
      icon: Users,
      title: "Top Marketing Talent",
      description: "Access to 200+ ambitious marketing students eager to learn and contribute"
    },
    {
      icon: Building,
      title: "Brand Visibility",
      description: "Prominent placement at events, on our website, and across our social media channels"
    },
    {
      icon: TrendingUp,
      title: "Meaningful Engagement",
      description: "Direct interaction with future marketing professionals through workshops and events"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-sponsors-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Handshake className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-our-sponsors">
                Our Sponsors
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-sponsors-description">
                Meet the organizations that support our mission and help provide opportunities for our members.
              </p>
            </div>
          </div>
        </section>

        {/* Premier Sponsors */}
        <section className="py-16 md:py-20" data-testid="section-premier-sponsors">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="heading-partners">
              Our Partners & Collaborations
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto" data-testid="text-partners-intro">
              We're proud to collaborate with leading organizations who help provide exceptional experiences for our members.
            </p>
            
            <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
              {sponsors.map((sponsor, index) => (
                <Card key={index} className="p-8 md:p-12" data-testid={`card-sponsor-${index}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                      <sponsor.logo className="w-16 h-16 text-primary" />
                    </div>
                    
                    <h3 className="text-3xl font-bold mb-2" data-testid={`text-sponsor-name-${index}`}>
                      {sponsor.name}
                    </h3>
                    <div className="inline-block bg-primary/20 text-primary px-4 py-1 rounded-full mb-6 text-sm font-medium" data-testid={`text-sponsor-type-${index}`}>
                      {sponsor.type}
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-3" data-testid={`heading-partnership-${index}`}>
                        About Our Partnership
                      </h4>
                      <p className="text-muted-foreground" data-testid={`text-partnership-${index}`}>
                        {sponsor.partnership}
                      </p>
                    </div>
                    
                    <p className="text-lg font-medium text-primary mb-6" data-testid={`text-sponsor-desc-${index}`}>
                      {sponsor.description}
                    </p>
                    
                    <Button asChild data-testid={`button-website-${index}`}>
                      <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="gap-2">
                        Visit Website
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-why-partner">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="heading-why-partner">
              Why Companies Partner With Us
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto" data-testid="text-why-partner-intro">
              Our partners gain access to top marketing talent and meaningful engagement opportunities
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {partnershipBenefits.map((benefit, index) => (
                <Card key={index} className="p-8 text-center" data-testid={`card-benefit-${index}`}>
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
              ))}
            </div>
          </div>
        </section>

        {/* Become a Sponsor CTA */}
        <section className="py-16 md:py-20" data-testid="section-become-sponsor">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-become-sponsor">
              Interested in Partnering?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-become-sponsor-desc">
              Join Red Bull and other leading brands in supporting the next generation of marketing professionals. Contact us to learn about sponsorship opportunities.
            </p>
            <Button size="lg" asChild data-testid="button-contact-us">
              <a href="/contact">Contact Us About Partnerships</a>
            </Button>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
