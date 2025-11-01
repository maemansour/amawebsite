import { Award, Target, Users, TrendingUp, Calendar, Heart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function OurChapter() {
  const achievements = [
    {
      icon: Award,
      title: "TOP 10 Chapter",
      description: "Recognized nationally for excellence in chapter operations and member engagement",
      year: "2024-2025"
    },
    {
      icon: Users,
      title: "200+ Active Members",
      description: "One of the largest and most engaged AMA chapters in the country",
      stat: "200+"
    },
    {
      icon: Calendar,
      title: "50+ Annual Events",
      description: "Professional development workshops, networking events, and social activities",
      stat: "50+"
    },
    {
      icon: TrendingUp,
      title: "95% Job Placement",
      description: "Our members secure internships and full-time positions in top marketing firms",
      stat: "95%"
    }
  ];

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
                Learn about our TOP 10 chapter and what we offer.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-20" data-testid="section-mission">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-mission">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-mission-statement">
                To provide SDSU students with premier opportunities for professional development, networking, and hands-on marketing experience while fostering a vibrant community of future marketing leaders.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-vision">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground" data-testid="text-vision-statement">
                To be the premier collegiate marketing organization at SDSU, recognized for developing tomorrow's marketing innovators and maintaining our status as a national TOP 10 chapter.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-achievements">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-achievements">
              Chapter Achievements
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 text-center" data-testid={`card-achievement-${index}`}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-primary" />
                  </div>
                  {achievement.stat && (
                    <div className="text-4xl font-bold text-primary mb-2" data-testid={`text-stat-${index}`}>
                      {achievement.stat}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2" data-testid={`text-achievement-title-${index}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-achievement-desc-${index}`}>
                    {achievement.description}
                  </p>
                  {achievement.year && (
                    <p className="text-xs text-muted-foreground mt-2" data-testid={`text-year-${index}`}>
                      {achievement.year}
                    </p>
                  )}
                </Card>
              ))}
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

        {/* Chapter History */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-history">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-history">
              Chapter History
            </h2>
            
            <div className="space-y-8">
              <div className="text-center">
                <p className="text-lg text-muted-foreground mb-4" data-testid="text-history-intro">
                  Founded at San Diego State University, AMA SDSU has grown to become one of the most prestigious collegiate marketing chapters in the nation.
                </p>
                <p className="text-lg text-muted-foreground" data-testid="text-history-achievement">
                  Through years of dedication, innovation, and commitment to excellence, we've earned our place as a <span className="font-bold text-primary">TOP 10 Chapter</span>, recognized by the American Marketing Association for outstanding chapter operations and member impact.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
