import { Award, Target, Users, Heart, TrendingUp, Building2, Lightbulb, Users as UsersIcon, Trophy } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function OurChapter() {
  const offerings = [
    {
      icon: UsersIcon,
      title: "Professional Development",
      items: ["Chapter meetings", "Industry workshops", "Skill building"]
    },
    {
      icon: TrendingUp,
      title: "Networking",
      items: ["Industry professionals", "Alumni connections", "Peer relationships"]
    },
    {
      icon: Trophy,
      title: "Competitions",
      items: ["Case studies", "Marketing challenges", "National contests"]
    },
    {
      icon: Heart,
      title: "Community",
      items: ["Social events", "Committees", "Leadership roles"]
    }
  ];

  const whyChooseUs = [
    {
      icon: Lightbulb,
      title: "Creativity Unleashed",
      description: "Creativity is our core, driving fresh, impactful campaigns that stand out."
    },
    {
      icon: Target,
      title: "Tailored Solutions",
      description: "We craft personalized strategies that match each client's unique needs."
    },
    {
      icon: TrendingUp,
      title: "Stay Ahead",
      description: "We track trends and technologies to keep clients ahead in a fast-moving market."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We thrive on teamwork, welcoming clients into our supportive community."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16" data-testid="section-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-our-chapter">
                  Our <span className="text-primary">Chapter</span> <Building2 className="inline-block w-10 h-10 md:w-12 md:h-12 text-primary" />
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-chapter-description">
                  Discover what makes AMA SDSU a <span className="font-bold text-foreground">TOP 10</span> chapter and leader in professional development.
                </p>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-lg border-2 border-primary/30 font-semibold">
                  <Trophy className="w-5 h-5" />
                  <span data-testid="text-top-ten-badge">TOP 10 Chapter Recognition</span>
                  <Trophy className="w-5 h-5" />
                </div>
              </div>

              {/* Right Column */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" 
                    alt="GBM with Industry Professionals"
                    className="w-full h-[400px] object-cover"
                    data-testid="img-hero"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-card px-6 py-3 rounded-lg shadow-lg border-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Users className="w-4 h-4 text-primary" />
                    <span data-testid="text-hero-caption">GBM w/ Industry Professionals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-20" data-testid="section-mission">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Mission Card */}
              <Card className="bg-primary text-primary-foreground p-8 md:p-10 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8" />
                  <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-mission">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg leading-relaxed mb-4 text-primary-foreground/90" data-testid="text-mission-statement">
                  The American Marketing Association at San Diego State University is dedicated to providing students with professional development opportunities, networking experiences, and real-world marketing knowledge.
                </p>
                <p className="text-lg leading-relaxed text-primary-foreground/90" data-testid="text-mission-statement-2">
                  We strive to bridge the gap between academic learning and industry practice, preparing our members for successful careers in marketing and business.
                </p>
              </Card>

              {/* Images */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop" 
                    alt="AMA SDSU Team"
                    className="w-full h-[280px] object-cover"
                    data-testid="img-mission"
                  />
                </div>
                <Card className="bg-primary/5 border-primary/20 p-4">
                  <p className="font-bold text-lg text-primary" data-testid="text-community-first">Community First</p>
                  <p className="text-sm text-muted-foreground">Building lasting connections and friendships</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-what-we-offer">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary" data-testid="heading-what-we-offer">
                What We Offer
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-what-we-offer-subtitle">
                Comprehensive experiences that shape future marketing leaders
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerings.map((offering, index) => (
                <Card key={index} className="p-6 text-center hover-elevate transition-all" data-testid={`card-offering-${index}`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <offering.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary" data-testid={`text-offering-title-${index}`}>
                    {offering.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {offering.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2" data-testid={`offering-item-${index}-${itemIndex}`}>
                        <span className="text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-20" data-testid="section-why-choose-us">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                  alt="Students collaborating"
                  className="w-full h-[500px] object-cover"
                  data-testid="img-why-choose-us"
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary" data-testid="heading-why-choose-us">
                  Why Choose Us?
                </h2>
                <div className="space-y-6">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-4" data-testid={`why-choose-${index}`}>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-primary" data-testid={`text-why-title-${index}`}>
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-why-desc-${index}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Other Orgs: Our Services */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-services">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary" data-testid="heading-our-services">
                  For Other Orgs: Our Services
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6" data-testid="service-0">
                    <h3 className="text-xl font-bold mb-2 text-primary">Social Media Management</h3>
                    <p className="text-muted-foreground">
                      Elevate your online presence through engaging content that pulls your audience in and drives sales.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6" data-testid="service-1">
                    <h3 className="text-xl font-bold mb-2 text-primary">Content Creation</h3>
                    <p className="text-muted-foreground">
                      Our skilled creators craft compelling videos and content tailored to your audience.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-6" data-testid="service-2">
                    <h3 className="text-xl font-bold mb-2 text-primary">Digital Advertising</h3>
                    <p className="text-muted-foreground">
                      Captivating ads designed to ensure your investment yields maximum returns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop" 
                    alt="Professional Leadership Development"
                    className="w-full h-[500px] object-cover"
                    data-testid="img-services"
                  />
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border-2">
                  <p className="font-bold text-lg text-primary" data-testid="text-services-caption">Professional Leadership Development</p>
                  <p className="text-sm text-muted-foreground">Building tomorrow's marketing leaders</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
