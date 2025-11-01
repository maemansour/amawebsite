import { Award, Target, Users, Heart, TrendingUp } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function OurChapter() {
  const values = [
    {
      icon: Target,
      title: "Professional Excellence",
      description: "We strive for the highest standards in everything we do, from events to member development."
    },
    {
      icon: Heart,
      title: "Community First",
      description: "Building a supportive network where members grow together and lift each other up."
    },
    {
      icon: Users,
      title: "Inclusive Environment",
      description: "Welcoming students from all backgrounds and majors to explore marketing careers."
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Encouraging personal and professional development through hands-on experiences."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-chapter-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 font-medium">
                <Award className="w-5 h-5" />
                <span data-testid="text-top-ten-badge">TOP 10 Chapter</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-our-chapter">
                Our Chapter
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-chapter-description">
                Learn about our TOP 10 chapter and discover what makes AMA SDSU a leader in professional development.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-20" data-testid="section-mission">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <Card className="p-8 md:p-10 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary" data-testid="heading-mission">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-mission-statement">
                The American Marketing Association at San Diego State University is dedicated to providing students with professional development opportunities, networking experiences, and real-world marketing knowledge. We strive to bridge the gap between academic learning and industry practice, preparing our members for successful careers in marketing and business.
              </p>
            </Card>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-accent/10 to-primary/5" data-testid="section-what-we-offer">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary" data-testid="heading-what-we-offer">
              What We Offer
            </h2>
            <div className="text-center mb-12">
              <div className="inline-block h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl mx-auto">
              <ul className="space-y-3">
                <li className="flex items-start gap-3" data-testid="offer-0">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Weekly professional development meetings</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-1">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Networking events with industry professionals</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Marketing competitions and case study challenges</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Agency tours and company visits</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start gap-3" data-testid="offer-4">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Resume workshops and interview preparation</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-5">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Social events and team building activities</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-6">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Leadership development opportunities</span>
                </li>
                <li className="flex items-start gap-3" data-testid="offer-7">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-lg">Access to exclusive job postings</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-20" data-testid="section-values">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary" data-testid="heading-values">
              Our Values
            </h2>
            <div className="text-center mb-12">
              <div className="inline-block h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const colors = [
                  'bg-blue-500/10 text-blue-600',
                  'bg-rose-500/10 text-rose-600', 
                  'bg-amber-500/10 text-amber-600',
                  'bg-emerald-500/10 text-emerald-600'
                ];
                const borderColors = [
                  'hover:border-blue-500/20',
                  'hover:border-rose-500/20',
                  'hover:border-amber-500/20',
                  'hover:border-emerald-500/20'
                ];
                return (
                  <Card key={index} className={`p-8 hover-elevate transition-all border-2 border-transparent ${borderColors[index]}`} data-testid={`card-value-${index}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-md ${colors[index]} flex items-center justify-center flex-shrink-0`}>
                        <value.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-primary" data-testid={`text-value-title-${index}`}>
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`text-value-desc-${index}`}>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chapter History & Impact */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10" data-testid="section-history">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary" data-testid="heading-history">
              Chapter History &amp; Impact
            </h2>
            <div className="text-center mb-12">
              <div className="inline-block h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Why Choose Us? */}
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-2 hover-elevate transition-all">
                <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2" data-testid="heading-why-choose-us">
                  <Award className="w-6 h-6 text-accent" />
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3" data-testid="why-choose-0">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Creativity Unleashed:</span> Creativity is our core, driving fresh, impactful campaigns that stand out.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-1">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Tailored Solutions:</span> We craft personalized strategies that match each client's unique needs.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-2">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Stay Ahead of the Curve:</span> We track trends and technologies to keep clients ahead in a fast-moving market.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-3">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Collaboration and Teamwork:</span> We thrive on teamwork, welcoming clients into our supportive community.
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Our Services */}
              <Card className="p-8 bg-white/50 backdrop-blur-sm border-2 hover-elevate transition-all">
                <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2" data-testid="heading-our-services">
                  <Target className="w-6 h-6 text-accent" />
                  Our Services:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3" data-testid="service-0">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Social Media Management:</span> Let us elevate your online presence through engaging social media content that pulls your audience in and makes you sales.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="service-1">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Content Creation:</span> Our skilled content creators can craft compelling videos and content tailored to members.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="service-2">
                    <span className="text-accent font-bold mt-1 text-xl">•</span>
                    <div>
                      <span className="font-semibold text-primary">Digital Advertising:</span> Ready to take your business to the next level? Allow us to create captivating ads to ensure your investment yields maximum returns.
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
