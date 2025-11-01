import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@shared/schema";

interface UpcomingEventsProps {
  events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Sort events by date and take first 4
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

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
    <section className="py-16 md:py-20" id="events">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl" data-testid="text-upcoming-events-title">
            Upcoming Events
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these exciting opportunities to learn, network, and grow.
          </p>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No upcoming events at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="flex flex-col hover-elevate transition-all" data-testid={`card-event-${event.id}`}>
                  <CardHeader className="space-y-3 pb-4">
                    <Badge 
                      variant={getCategoryVariant(event.category)}
                      className="w-fit text-xs"
                      data-testid={`badge-event-category-${event.id}`}
                    >
                      {event.category}
                    </Badge>
                    <h3 className="font-heading font-semibold text-lg leading-tight" data-testid={`text-event-title-${event.id}`}>
                      {event.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-3 text-sm">
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span data-testid={`text-event-date-${event.id}`}>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span data-testid={`text-event-time-${event.id}`}>{event.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span data-testid={`text-event-location-${event.id}`}>{event.location}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      asChild
                      data-testid={`button-event-details-${event.id}`}
                    >
                      <a href={`/calendar#event-${event.id}`}>View Details</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="default" 
                size="lg"
                asChild
                data-testid="button-view-all-events"
              >
                <a href="/calendar">
                  View All Events
                  <span className="ml-2">→</span>
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
