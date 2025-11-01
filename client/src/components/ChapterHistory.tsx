import { Trophy, Users, Calendar, Award } from "lucide-react";

export function ChapterHistory() {
  const achievements = [
    {
      icon: Trophy,
      stat: "#2",
      label: "Top 10 Chapter Nationally",
      description: "Recognized as one of the nation's leading AMA collegiate chapters"
    },
    {
      icon: Users,
      stat: "300+",
      label: "Active Members",
      description: "A diverse community of passionate marketing students"
    },
    {
      icon: Calendar,
      stat: "50+",
      label: "Annual Events",
      description: "Workshops, networking sessions, and professional development opportunities"
    },
    {
      icon: Award,
      stat: "100%",
      label: "Career Success",
      description: "Our members secure internships and careers at top companies"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30" data-testid="section-chapter-history">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-chapter-history">
            Chapter History & Impact
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-history-description">
            Since our founding, AMA SDSU has been committed to excellence in marketing education, 
            professional development, and community building. Our track record speaks for itself.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={index} 
                className="text-center" 
                data-testid={`achievement-${index}`}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2" data-testid={`stat-${index}`}>
                  {achievement.stat}
                </div>
                <div className="text-lg font-semibold mb-2" data-testid={`label-${index}`}>
                  {achievement.label}
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`description-${index}`}>
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
