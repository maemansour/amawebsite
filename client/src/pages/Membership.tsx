import { useQuery } from "@tanstack/react-query";
import { Award, Check, Users, Calendar, TrendingUp, Network, BookOpen } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Settings } from "@shared/schema";

export default function Membership() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const chapterBenefits = [
    "Access to all weekly meetings",
    "Networking events and mixers",
    "Professional development workshops",
    "Resume and interview preparation",
    "Leadership opportunities",
    "Social events and activities"
  ];

  const nationalBenefits = [
    "Access to AMA resources and publications",
    "National conference discounts",
    "Career center and job board",
    "Professional certifications",
    "Industry research and insights",
    "Alumni network access"
  ];

  const tiers = [
    {
      name: "One Semester",
      price: 49,
      period: "semester",
      features: [
        "All chapter benefits",
        "National AMA resources",
        "Conference discounts",
        "Career center access"
      ]
    },
    {
      name: "Two Semesters",
      price: 79,
      period: "year",
      features: [
        "All national benefits",
        "Premium resources",
        "Certification programs",
        "Exclusive webinars"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-membership-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Award className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-membership">
                Membership
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-membership-description">
                Join AMA SDSU and unlock exclusive opportunities for professional growth.
              </p>
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-16 md:py-20" data-testid="section-membership-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-benefits">
              Membership Benefits
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto" data-testid="text-benefits-description">
              Join AMA SDSU and unlock exclusive opportunities for professional growth.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Chapter Membership */}
              <Card className="p-8" data-testid="card-chapter-benefits">
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-chapter-membership">
                  Chapter Membership
                </h3>
                <ul className="space-y-3">
                  {chapterBenefits.map((benefit, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`chapter-benefit-${index}`}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* National AMA Benefits */}
              <Card className="p-8" data-testid="card-national-benefits">
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-national-benefits">
                  National AMA Benefits
                </h3>
                <ul className="space-y-3">
                  {nationalBenefits.map((benefit, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`national-benefit-${index}`}
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-membership-tiers">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-membership-tiers">
              Membership Tiers
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tiers.map((tier, index) => (
                <Card 
                  key={index}
                  className="p-8"
                  data-testid={`card-tier-${index}`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2" data-testid={`heading-tier-name-${index}`}>
                      {tier.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-primary" data-testid={`price-tier-${index}`}>
                        ${tier.price}
                      </span>
                      <span className="text-muted-foreground">/{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start gap-3"
                        data-testid={`tier-${index}-feature-${featureIndex}`}
                      >
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join */}
        <section className="py-16 md:py-20" data-testid="section-how-to-join">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Card className="p-8 md:p-12 max-w-3xl mx-auto bg-primary/5">
              <h2 className="text-3xl font-bold text-center mb-6" data-testid="heading-how-to-join">
                How to Join
              </h2>
              <p className="text-lg text-center mb-8" data-testid="text-join-description">
                Becoming a member is easy! Attend one of our weekly meetings or contact us directly to get started.
              </p>
              <div className="text-center">
                <Button size="lg" data-testid="button-join-now">
                  Join Now
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Questions Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-questions">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Card className="p-8 md:p-12 max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="heading-any-questions">
                Any Questions?
              </h2>
              <p className="text-lg mb-6" data-testid="text-questions-description">
                Contact us through our{" "}
                <a href="https://instagram.com/sdsuama" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" data-testid="link-instagram-contact">
                  Instagram @sdsuama
                </a>
                , or email at{" "}
                <a href="mailto:membership.sdsuama@gmail.com" className="text-primary hover:underline" data-testid="link-email-contact">
                  membership.sdsuama@gmail.com
                </a>
                .
              </p>
            </Card>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
