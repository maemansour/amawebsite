import { Card } from "@/components/ui/card";
import { Handshake, Target, Megaphone } from "lucide-react";

export function PartnersCollaborations() {
  const benefits = [
    {
      icon: Handshake,
      title: "Exclusive Access",
      description: "Partner companies gain direct access to our talented member base for recruiting and brand building."
    },
    {
      icon: Target,
      title: "Targeted Engagement",
      description: "Reach marketing-focused students through co-branded events, workshops, and sponsorship opportunities."
    },
    {
      icon: Megaphone,
      title: "Brand Visibility",
      description: "Showcase your company through our events, social media, and newsletter reaching 300+ members."
    }
  ];

  return (
    <section className="py-16 md:py-20" data-testid="section-partners">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-partners">
            Partners & Collaborations
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-partners-description">
            We partner with industry-leading companies to provide our members with 
            unparalleled opportunities for growth, networking, and career advancement.
          </p>
        </div>

        <div className="mb-16">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10" data-testid="card-featured-partner">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4" data-testid="badge-featured">
                  Featured Partner
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-redbull">
                  Red Bull
                </h3>
                <p className="text-lg text-muted-foreground mb-6" data-testid="text-redbull-description">
                  Our collaboration with Red Bull brings exciting events, exclusive workshops, 
                  and unique marketing insights to our members. From campus activations to 
                  professional development sessions, this partnership exemplifies our commitment 
                  to providing real-world marketing experiences.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-lg bg-background flex items-center justify-center border-2 border-primary/20">
                  <span className="text-6xl font-bold text-primary" data-testid="logo-redbull">RB</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8" data-testid="heading-partnership-benefits">
            Partnership Benefits
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="p-6 hover-elevate" 
                  data-testid={`card-benefit-${index}`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2" data-testid={`heading-benefit-${index}`}>
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground" data-testid={`text-benefit-${index}`}>
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
