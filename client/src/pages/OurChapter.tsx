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
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-mission">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-mission-statement">
                The American Marketing Association at San Diego State University is dedicated to providing students with professional development opportunities, networking experiences, and real-world marketing knowledge. We strive to bridge the gap between academic learning and industry practice, preparing our members for successful careers in marketing and business.
              </p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-what-we-offer">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-what-we-offer">
              What We Offer
            </h2>
            
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-values">
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="p-8" data-testid={`card-value-${index}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" data-testid={`text-value-title-${index}`}>
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-value-desc-${index}`}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter History & Impact */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-history">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-history">
              Chapter History &amp; Impact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Why Choose Us? */}
              <div>
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-why-choose-us">
                  Why Choose Us?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3" data-testid="why-choose-0">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Creativity Unleashed:</span> Creativity is our core, driving fresh, impactful campaigns that stand out.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-1">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Tailored Solutions:</span> We craft personalized strategies that match each client's unique needs.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Stay Ahead of the Curve:</span> We track trends and technologies to keep clients ahead in a fast-moving market.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="why-choose-3">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Collaboration and Teamwork:</span> We thrive on teamwork, welcoming clients into our supportive community.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-our-services">
                  Our Services:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3" data-testid="service-0">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Social Media Management:</span> Let us elevate your online presence through engaging social media content that pulls your audience in and makes you sales.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="service-1">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Content Creation:</span> Our skilled content creators can craft compelling videos and content tailored to members.
                    </div>
                  </li>
                  <li className="flex items-start gap-3" data-testid="service-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <span className="font-semibold">Digital Advertising:</span> Ready to take your business to the next level? Allow us to create captivating ads to ensure your investment yields maximum returns.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
