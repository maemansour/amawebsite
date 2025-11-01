import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, MapPin, Plus } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type Event, type Settings } from "@shared/schema";

export default function EventCalendar() {
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

  const getCategoryVariant = (category: string): "default" | "secondary" | "outline" => {
    if (category === "Weekly Meeting") return "default";
    if (category === "Professional Development") return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl md:text-5xl" data-testid="text-calendar-title">
                Event Calendar
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Stay up-to-date with networking events, workshops, and professional development opportunities.
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                className="mt-6"
                asChild
                data-testid="button-subscribe-calendar"
              >
                <a href="#subscribe">
                  <Plus className="h-5 w-5 mr-2" />
                  Subscribe to Events Calendar
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="space-y-6">
              {isLoading ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-lg" />
                  ))}
                </>
              ) : sortedEvents.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl mb-2">No events scheduled</h3>
                  <p className="text-muted-foreground">
                    Check back soon for upcoming events and activities!
                  </p>
                </div>
              ) : (
                sortedEvents.map((event) => (
                  <Card 
                    key={event.id} 
                    id={`event-${event.id}`}
                    className="hover-elevate transition-all"
                    data-testid={`card-calendar-event-${event.id}`}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <Badge 
                            variant={getCategoryVariant(event.category)}
                            className="w-fit"
                            data-testid={`badge-calendar-category-${event.id}`}
                          >
                            {event.category}
                          </Badge>
                          <h3 className="font-heading font-bold text-2xl" data-testid={`text-calendar-event-title-${event.id}`}>
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-base leading-relaxed" data-testid={`text-calendar-event-description-${event.id}`}>
                        {event.description}
                      </p>
                      
                      <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Date</div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-calendar-event-date-${event.id}`}>
                              {formatDate(event.date)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Time</div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-calendar-event-time-${event.id}`}>
                              {event.time}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Location</div>
                            <div className="text-sm text-muted-foreground" data-testid={`text-calendar-event-location-${event.id}`}>
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button 
                          variant="outline"
                          size="sm"
                          data-testid={`button-add-to-calendar-${event.id}`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Google Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
