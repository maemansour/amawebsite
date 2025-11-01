import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Users, Briefcase, Calendar } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Settings } from "@shared/schema";

export default function Alumni() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const stayConnectedOptions = [
    {
      icon: GraduationCap,
      title: "Mentorship Program",
      description: "Mentor current students and share your professional experience",
      testId: "mentorship"
    },
    {
      icon: Briefcase,
      title: "Career Network",
      description: "Connect with fellow alumni for career opportunities and advice",
      testId: "career-network"
    },
    {
      icon: Calendar,
      title: "Alumni Events",
      description: "Attend exclusive alumni networking events and reunions",
      testId: "alumni-events"
    }
  ];

  const featuredAlumni = [
    {
      name: "Jennifer Park",
      class: "Class of 2020",
      position: "Senior Brand Manager at Coca-Cola",
      company: "The Coca-Cola Company",
      description: "Jennifer credits her time in AMA SDSU for developing her leadership skills and professional network. She now mentors current students and regularly speaks at our events.",
      testId: "jennifer-park"
    },
    {
      name: "Michael Torres",
      class: "Class of 2019",
      position: "Digital Marketing Director",
      company: "Airbnb",
      description: "Michael started as a committee member and worked his way up to President. His experience in AMA helped him land internships that led to his current role at Airbnb.",
      testId: "michael-torres"
    },
    {
      name: "Rachel Kim",
      class: "Class of 2021",
      position: "Marketing Analytics Manager",
      company: "Netflix",
      description: "Rachel discovered her passion for data-driven marketing through AMA workshops. She now uses those skills to optimize marketing campaigns for Netflix originals.",
      testId: "rachel-kim"
    }
  ];

  const careerAchievements = [
    "500+ alumni working in marketing roles nationwide",
    "Alumni at Fortune 500 companies including Google, Apple, Nike",
    "50+ alumni in senior leadership positions",
    "25+ alumni who started their own marketing agencies",
    "Alumni network spans across all major industries"
  ];

  const givingBack = [
    "$50,000+ in scholarships provided by alumni",
    "100+ alumni serving as mentors",
    "Monthly guest speaker series featuring alumni",
    "Alumni-sponsored internship programs",
    "Annual alumni networking mixer"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-alumni-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <GraduationCap className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-alumni">
                Alumni Relations
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-alumni-description">
                Stay connected with our amazing alumni community and learn about the incredible careers our former members have built.
              </p>
            </div>
          </div>
        </section>

        {/* Stay Connected */}
        <section className="py-16 md:py-20" data-testid="section-stay-connected">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-stay-connected">
              Stay Connected
            </h2>
            <p className="text-lg text-muted-foreground mb-12" data-testid="text-stay-connected-description">
              Join our alumni network and continue to benefit from the AMA SDSU community.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {stayConnectedOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card 
                    key={index}
                    className="p-8 text-center hover-elevate"
                    data-testid={`card-${option.testId}`}
                  >
                    <div className="mb-4 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3" data-testid={`heading-${option.testId}`}>
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`text-${option.testId}`}>
                      {option.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            <div className="text-center space-x-4">
              <Button size="lg" data-testid="button-join-alumni-network">
                Join Alumni Network
              </Button>
              <Button variant="outline" size="lg" data-testid="button-update-info">
                Update Your Info
              </Button>
            </div>
          </div>
        </section>

        {/* Alumni Spotlight */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-alumni-spotlight">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-alumni-spotlight">
              Alumni Spotlight
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredAlumni.map((alumni, index) => (
                <Card 
                  key={index}
                  className="p-6 hover-elevate"
                  data-testid={`card-alumni-${alumni.testId}`}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-1" data-testid={`heading-alumni-name-${alumni.testId}`}>
                      {alumni.name}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-alumni-class-${alumni.testId}`}>
                      {alumni.class}
                    </p>
                  </div>

                  <div className="text-center mb-4">
                    <p className="font-medium text-primary mb-1" data-testid={`text-alumni-position-${alumni.testId}`}>
                      {alumni.position}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid={`text-alumni-company-${alumni.testId}`}>
                      {alumni.company}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground text-center mb-4" data-testid={`text-alumni-description-${alumni.testId}`}>
                    {alumni.description}
                  </p>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid={`button-connect-${alumni.testId}`}
                  >
                    Connect on LinkedIn
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Alumni Success Stories */}
        <section className="py-16 md:py-20" data-testid="section-alumni-success">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-alumni-success">
              Alumni Success Stories
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Career Achievements */}
              <Card className="p-8" data-testid="card-career-achievements">
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-career-achievements">
                  Career Achievements
                </h3>
                <ul className="space-y-3">
                  {careerAchievements.map((achievement, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`achievement-${index}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Giving Back */}
              <Card className="p-8" data-testid="card-giving-back">
                <h3 className="text-2xl font-bold mb-6" data-testid="heading-giving-back">
                  Giving Back
                </h3>
                <ul className="space-y-3">
                  {givingBack.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`giving-back-${index}`}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
