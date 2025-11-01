import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Settings } from "@shared/schema";

export default function WeeklyMeetings() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const meetingHighlights = [
    {
      icon: Users,
      title: "Networking Opportunities",
      description: "Connect with fellow members, executive board, and guest speakers from the industry"
    },
    {
      icon: CheckCircle,
      title: "Professional Development",
      description: "Learn about marketing trends, case studies, and career opportunities"
    },
    {
      icon: Users,
      title: "Guest Speakers",
      description: "Hear from marketing professionals and industry leaders about their experiences"
    },
    {
      icon: CheckCircle,
      title: "Chapter Updates",
      description: "Stay informed about upcoming events, committee activities, and opportunities"
    }
  ];

  const whatToBring = [
    "Your SDSU student ID",
    "Enthusiasm and curiosity",
    "Questions for our speakers",
    "Business cards (if you have them)"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-meetings-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Calendar className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-weekly-meetings">
                Weekly Meetings
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-meetings-description">
                Join us every {settings?.meetingDay || "Thursday"} at {settings?.meetingTime || "6:00 PM"} for professional development and networking.
              </p>
            </div>
          </div>
        </section>

        {/* Meeting Details */}
        <section className="py-16 md:py-20" data-testid="section-meeting-details">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-8 text-center" data-testid="card-when">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid="heading-when">
                  When
                </h3>
                <p className="text-muted-foreground" data-testid="text-when">
                  Every {settings?.meetingDay || "Thursday"}
                </p>
                <p className="text-lg font-medium text-primary mt-2" data-testid="text-time">
                  {settings?.meetingTime || "6:00 PM"}
                </p>
              </Card>

              <Card className="p-8 text-center" data-testid="card-where">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid="heading-where">
                  Where
                </h3>
                <p className="text-muted-foreground" data-testid="text-location">
                  {settings?.meetingLocation || "SDSU Campus"}
                </p>
              </Card>

              <Card className="p-8 text-center" data-testid="card-who">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2" data-testid="heading-who">
                  Who
                </h3>
                <p className="text-muted-foreground" data-testid="text-who">
                  All SDSU students welcome
                </p>
                <p className="text-sm text-muted-foreground mt-2" data-testid="text-who-detail">
                  Members & guests
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-what-to-expect">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-what-to-expect">
              What to Expect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {meetingHighlights.map((highlight, index) => (
                <Card key={index} className="p-8" data-testid={`card-highlight-${index}`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" data-testid={`text-highlight-title-${index}`}>
                        {highlight.title}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-highlight-desc-${index}`}>
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Typical Agenda */}
        <section className="py-16 md:py-20" data-testid="section-agenda">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-agenda">
              Typical Meeting Agenda
            </h2>
            
            <Card className="p-8" data-testid="card-agenda">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-primary" data-testid="text-time-1">
                    6:00 PM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" data-testid="heading-agenda-1">Welcome & Networking</h3>
                    <p className="text-muted-foreground" data-testid="text-agenda-desc-1">Arrive, check in, and network with fellow members</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-primary" data-testid="text-time-2">
                    6:15 PM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" data-testid="heading-agenda-2">Chapter Updates</h3>
                    <p className="text-muted-foreground" data-testid="text-agenda-desc-2">Announcements about upcoming events and opportunities</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-primary" data-testid="text-time-3">
                    6:30 PM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" data-testid="heading-agenda-3">Main Presentation</h3>
                    <p className="text-muted-foreground" data-testid="text-agenda-desc-3">Guest speaker, workshop, or case study discussion</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-medium text-primary" data-testid="text-time-4">
                    7:15 PM
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1" data-testid="heading-agenda-4">Q&A & Closing</h3>
                    <p className="text-muted-foreground" data-testid="text-agenda-desc-4">Questions, networking, and additional announcements</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* What to Bring */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-what-to-bring">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-what-to-bring">
              What to Bring
            </h2>
            
            <Card className="p-8" data-testid="card-what-to-bring">
              <ul className="space-y-3">
                {whatToBring.map((item, index) => (
                  <li key={index} className="flex items-center gap-3" data-testid={`text-bring-item-${index}`}>
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* First Time Visitor CTA */}
        <section className="py-16 md:py-20" data-testid="section-first-time-cta">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-first-time">
              First Time Visitor?
            </h2>
            <p className="text-lg text-muted-foreground mb-8" data-testid="text-first-time-desc">
              Everyone is welcome! You don't need to be a member to attend your first meeting. Come see what AMA SDSU is all about and meet our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild data-testid="button-join-membership">
                <a href="/membership">Learn About Membership</a>
              </Button>
              <Button size="lg" variant="outline" asChild data-testid="button-contact">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
