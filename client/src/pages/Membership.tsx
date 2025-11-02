import { useQuery } from "@tanstack/react-query";
import { Users, TrendingUp, Trophy, Heart, Target, Award, User, CheckCircle2, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Settings } from "@shared/schema";
import { Link } from "wouter";

export default function Membership() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const benefitCategories = [
    {
      title: "Chapter Benefits",
      icon: Users,
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      items: [
        "Chapter meetings",
        "Networking events",
        "Alumni network access",
        "Resume prep"
      ]
    },
    {
      title: "Professional Growth",
      icon: TrendingUp,
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconBgColor: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      items: [
        "Industry workshops",
        "Skill building",
        "Leadership opportunities",
        "Career development"
      ]
    },
    {
      title: "National AMA",
      icon: Trophy,
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      items: [
        "Conference discounts",
        "Job board access",
        "Professional certifications",
        "Industry research"
      ]
    },
    {
      title: "Community",
      icon: Heart,
      bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
      iconBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      items: [
        "Social events",
        "Committee participation",
        "Peer relationships",
        "Mentorship"
      ]
    }
  ];

  const engagementBenefits = [
    {
      title: "Professional Events",
      description: "Connect with industry professionals at career fairs, networking mixers, and company visits.",
      icon: Target,
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      title: "Award Recognition",
      description: "Be part of a TOP 10 chapter with national recognition and prestigious awards.",
      icon: Trophy,
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      title: "Leadership Development",
      description: "Take on leadership roles in committees and executive positions to build your resume.",
      icon: User,
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      title: "Career Advancement",
      description: "Access exclusive job opportunities and internships through our extensive network.",
      icon: TrendingUp,
      iconColor: "text-yellow-600 dark:text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-background" data-testid="section-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-title">
                  Join <span className="text-[#D4A574] dark:text-[#E5C4A0]">AMA SDSU</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8" data-testid="text-tagline">
                  Unlock exclusive opportunities for <span className="font-semibold text-foreground">professional growth</span> and join our community of future marketing leaders.
                </p>

                {/* Achievement Badges */}
                <div className="space-y-4 mb-8">
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800" data-testid="card-achievement-1">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                          <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <span className="font-semibold text-foreground">TOP 10 Chapter Recognition</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" data-testid="card-achievement-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-semibold text-foreground">#1 Registered Student Organization</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right - Image */}
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={settings?.membershipHeroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"} 
                    alt="AMA SDSU Team"
                    className="w-full h-auto"
                    data-testid="img-hero"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-muted px-6 py-3 rounded-md shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Finance Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Benefits Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-benefits">
                Membership Benefits
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-benefits-subtitle">
                Comprehensive experiences that shape future marketing leaders
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefitCategories.map((category, index) => (
                <Card 
                  key={index}
                  className={category.bgColor}
                  data-testid={`card-benefit-category-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-md mb-4 ${category.iconBgColor}`}>
                        <category.icon className={`w-8 h-8 ${category.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground" data-testid={`text-benefit-category-${index}`}>
                        {category.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex} 
                          className="flex items-start gap-2 text-sm text-foreground"
                          data-testid={`benefit-item-${index}-${itemIndex}`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Get Engaged & Network Section */}
        <section className="py-16 md:py-20 bg-background" data-testid="section-engagement">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Image */}
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={settings?.membershipEngagementImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"} 
                  alt="Get Engaged"
                  className="w-full h-auto"
                  data-testid="img-engagement"
                />
              </div>

              {/* Right - Benefits */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8" data-testid="heading-engagement">
                  Get Engaged & Network
                </h2>
                
                <div className="space-y-6">
                  {engagementBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4" data-testid={`engagement-benefit-${index}`}>
                      <div className="w-12 h-12 rounded-md bg-yellow-50 dark:bg-yellow-950/20 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Tiers Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-tiers">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-tiers">
                Membership Tiers
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-tiers-subtitle">
                Choose the plan that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* One Semester - Popular */}
              <Card 
                className="relative p-8 bg-yellow-50 dark:bg-yellow-950/20 border-2 border-[#D4A574] dark:border-[#E5C4A0]"
                data-testid="card-tier-semester"
              >
                <Badge 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black font-bold px-4 py-1"
                  data-testid="badge-popular"
                >
                  POPULAR
                </Badge>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid="heading-tier-semester">
                    One Semester
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-[#D4A574] dark:text-[#E5C4A0]" data-testid="price-semester">
                      ${settings?.semesterPrice || "49"}
                    </span>
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    size="lg"
                    data-testid="button-choose-semester"
                  >
                    Choose One Semester →
                  </Button>
                </div>
              </Card>

              {/* Annual Membership */}
              <Card className="p-8" data-testid="card-tier-year">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid="heading-tier-year">
                    Annual Membership
                  </h3>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-primary" data-testid="price-year">
                      ${settings?.yearPrice || "49"}
                    </span>
                    <span className="text-xl text-muted-foreground">/year</span>
                  </div>
                  <p className="text-muted-foreground mb-6" data-testid="text-tier-description">
                    Access to all chapter benefits for the full academic year
                  </p>
                  <Button 
                    className="w-full" 
                    variant="default"
                    size="lg"
                    data-testid="button-choose-year"
                  >
                    Choose Annual Membership →
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Ready to Join Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground" data-testid="section-cta">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-cta">
                Ready to Join?
              </h2>
              <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto" data-testid="text-cta-subtitle">
                Take the first step towards your marketing career and join our community of future leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Get Started */}
              <Card className="bg-white dark:bg-muted p-8" data-testid="card-get-started">
                <CardContent className="p-0 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Get Started</h3>
                  <p className="text-muted-foreground mb-6">
                    Attend one of our chapter meetings or contact us directly to begin your membership journey.
                  </p>
                  {settings?.joinNowLink ? (
                    <Button 
                      className="w-full bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A]"
                      size="lg"
                      asChild
                      data-testid="button-join-now"
                    >
                      <a href={settings.joinNowLink} target="_blank" rel="noopener noreferrer">
                        Join Now
                      </a>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A]"
                      size="lg"
                      data-testid="button-join-now"
                    >
                      Join Now
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Questions */}
              <Card className="bg-white dark:bg-muted p-8" data-testid="card-questions">
                <CardContent className="p-0 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Questions?</h3>
                  <p className="text-muted-foreground mb-6">
                    Contact us through Instagram <a href={settings?.instagramLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold" data-testid="link-instagram">@{settings?.instagramUsername || "sdsuama"}</a> or email at <a href={`mailto:${settings?.email}`} className="text-primary hover:underline font-semibold" data-testid="link-email">{settings?.email || "membership.sdsuama@gmail.com"}</a>
                  </p>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    size="lg"
                    asChild
                    data-testid="button-contact-us"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
