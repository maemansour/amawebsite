import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Star, Users, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { type Event, type Settings } from "@shared/schema";

export default function EventCalendar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleSubscribeCalendar = () => {
    if (settings?.calendarSubscribeUrl) {
      window.open(settings.calendarSubscribeUrl, '_blank');
    } else {
      console.log("Calendar subscription URL not configured");
    }
  };

  const handleBecomeMember = () => {
    if (settings?.joinLink) {
      window.open(settings.joinLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-20" data-testid="section-calendar-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column */}
              <div className="space-y-6">
                <ScrollReveal direction="left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" data-testid="heading-event-calendar">
                    Event <span className="text-[#D4A574] dark:text-[#E5C4A0]">Calendar</span> <Calendar className="inline-block w-10 h-10 md:w-12 md:h-12" />
                  </h1>
                  <p className="text-lg text-muted-foreground mt-4">
                    Stay up-to-date with all our <span className="font-semibold text-foreground">upcoming events</span>, meetings, and professional development opportunities.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.1}>
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-[#D4A574] dark:border-[#E5C4A0]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <Star className="w-6 h-6 text-[#D4A574] dark:text-[#E5C4A0]" />
                        <span className="font-bold text-lg text-foreground">Never Miss an Event</span>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>

              {/* Right Column - Community Card */}
              <ScrollReveal direction="right">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <Users className="w-12 h-12 mx-auto" />
                      <h3 className="text-2xl font-bold">Join Our Community</h3>
                      <p className="text-primary-foreground/90">
                        Connect with industry professionals and fellow students
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-primary-foreground/10 rounded-lg p-4">
                          <div className="text-3xl font-bold text-[#D4A574] dark:text-[#E5C4A0]">
                            {sortedEvents.length}+
                          </div>
                          <div className="text-sm text-primary-foreground/80 mt-1">
                            Upcoming Events
                          </div>
                        </div>
                        <div className="bg-primary-foreground/10 rounded-lg p-4">
                          <div className="text-3xl font-bold text-[#D4A574] dark:text-[#E5C4A0]">
                            {settings?.memberCount || 500}+
                          </div>
                          <div className="text-sm text-primary-foreground/80 mt-1">
                            Active Members
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stay Connected Section */}
        <section className="py-12 md:py-16 bg-muted/30" data-testid="section-stay-connected">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <Card className="bg-primary text-primary-foreground border-none">
                <CardContent className="p-8 md:p-12 text-center">
                  <Zap className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Stay Connected
                  </h2>
                  <p className="text-lg text-primary-foreground/90 mb-6">
                    Subscribe to our calendar and never miss an important event or meeting
                  </p>
                  <Button 
                    onClick={handleSubscribeCalendar}
                    className="bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A] border-[#D4A574] dark:border-[#E5C4A0]"
                    size="lg"
                    data-testid="button-subscribe-calendar"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Subscribe to Events Calendar
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 md:py-20" data-testid="section-upcoming-events">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-upcoming-events">
                  Upcoming Events
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join us for these exciting opportunities
                </p>
              </div>
            </ScrollReveal>

            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            ) : sortedEvents.length === 0 ? (
              <ScrollReveal direction="up" delay={0.2}>
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2" data-testid="text-no-events">No events scheduled</h3>
                  <p className="text-muted-foreground">
                    Check back soon for upcoming events and activities!
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <div className="space-y-6">
                {sortedEvents.map((event, index) => (
                  <ScrollReveal key={event.id} direction="up" delay={index * 0.1}>
                    <Card className="overflow-hidden hover-elevate" data-testid={`event-card-${event.id}`}>
                      <div className="grid md:grid-cols-[300px_1fr] gap-0">
                        {/* Left Side - Dark Blue Section */}
                        <div className="bg-primary text-primary-foreground p-6 md:p-8 flex flex-col justify-center space-y-4">
                          <Badge 
                            className="w-fit bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A] border-none"
                            data-testid={`badge-event-category-${event.id}`}
                          >
                            {event.category}
                          </Badge>
                          
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                            <span className="text-primary-foreground" data-testid={`text-event-date-${event.id}`}>
                              {formatDate(event.date)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                            <span className="text-primary-foreground" data-testid={`text-event-time-${event.id}`}>
                              {event.time}
                            </span>
                          </div>
                        </div>

                        {/* Right Side - Event Details */}
                        <div className="p-6 md:p-8 flex flex-col justify-between">
                          <div className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground" data-testid={`text-event-title-${event.id}`}>
                              {event.title}
                            </h3>
                            
                            {event.description && (
                              <p className="text-muted-foreground" data-testid={`text-event-description-${event.id}`}>
                                {event.description}
                              </p>
                            )}
                            
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm" data-testid={`text-event-location-${event.id}`}>
                                {event.location}
                              </span>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Button 
                              className="bg-[#D4A574] dark:bg-[#E5C4A0] text-white dark:text-black hover:bg-[#C49464] dark:hover:bg-[#D4B48A] border-[#D4A574] dark:border-[#E5C4A0]"
                              data-testid={`button-add-calendar-${event.id}`}
                            >
                              Add to Google Calendar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-cta">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-cta">
                  Ready to Get Involved?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join AMA SDSU and be part of our vibrant community of future marketing leaders
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={handleBecomeMember}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                    data-testid="button-become-member"
                  >
                    Become a Member
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    asChild
                    data-testid="button-learn-more"
                  >
                    <a href="/membership">
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
