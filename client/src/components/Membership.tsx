import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function Membership() {
  const tiers = [
    {
      name: "Standard",
      price: 49,
      period: "per semester",
      description: "Perfect for students looking to explore marketing and build their network",
      features: [
        "Access to all weekly meetings",
        "Networking events",
        "Resume workshops",
        "Company tours",
        "Social events",
        "Member-only newsletter",
        "AMA National resources"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: 79,
      period: "per semester",
      description: "For dedicated members seeking maximum value and exclusive opportunities",
      features: [
        "Everything in Standard, plus:",
        "Priority event registration",
        "1-on-1 mentorship matching",
        "Exclusive industry workshops",
        "Leadership opportunities",
        "Professional headshots",
        "AMA National membership",
        "Career coaching sessions"
      ],
      popular: true
    }
  ];

  const benefits = [
    "Build your professional network with 300+ members and industry partners",
    "Gain hands-on experience through committees and real-world projects",
    "Access exclusive recruiting events and career opportunities",
    "Develop leadership skills by organizing events and leading initiatives",
    "Connect with alumni working at top marketing and tech companies",
    "Earn professional development hours and certificates"
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30" data-testid="section-membership">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-membership">
            Join The Family
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-membership-description">
            Become part of the #2 ranked AMA chapter in the nation. Choose the membership tier 
            that fits your goals and start building your marketing career today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`p-8 relative ${tier.popular ? 'border-2 border-primary shadow-lg' : ''}`}
              data-testid={`card-membership-${index}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold" data-testid="badge-popular">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2" data-testid={`heading-tier-${index}`}>
                  {tier.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold" data-testid={`price-${index}`}>${tier.price}</span>
                  <span className="text-muted-foreground">/{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`description-${index}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-start gap-3"
                    data-testid={`feature-${index}-${featureIndex}`}
                  >
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className={feature.endsWith(':') ? 'font-semibold' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={tier.popular ? "default" : "outline"}
                size="lg"
                data-testid={`button-join-${index}`}
              >
                Join {tier.name}
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8" data-testid="heading-benefits">
            Why Join AMA SDSU?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3"
                data-testid={`benefit-${index}`}
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-primary/5 max-w-2xl">
            <p className="text-lg font-medium mb-2" data-testid="text-scholarship">
              <span className="font-bold text-primary">Scholarships Available!</span>
            </p>
            <p className="text-muted-foreground" data-testid="text-scholarship-description">
              Financial assistance is available for students in need. Contact us to learn more about our scholarship program.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
