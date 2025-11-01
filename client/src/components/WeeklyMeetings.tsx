import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { type Settings } from "@shared/schema";

interface WeeklyMeetingsProps {
  settings?: Settings;
}

export function WeeklyMeetings({ settings }: WeeklyMeetingsProps) {
  const meetingDetails = [
    {
      icon: Calendar,
      label: "When",
      value: settings?.meetingDay || "Every Thursday",
      description: settings?.meetingTime || "6:00 PM - 7:30 PM"
    },
    {
      icon: MapPin,
      label: "Where",
      value: settings?.meetingLocation || "SDSU Campus",
      description: "Check weekly updates for specific room"
    },
    {
      icon: Users,
      label: "Who",
      value: "All Members Welcome",
      description: "Bring friends interested in marketing!"
    },
    {
      icon: Clock,
      label: "What to Expect",
      value: "Professional Development",
      description: "Guest speakers, workshops, networking"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30" data-testid="section-weekly-meetings">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-weekly-meetings">
            Weekly Meetings
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-meetings-description">
            Join us every week for professional development, networking, and community building. 
            Our meetings feature industry speakers, interactive workshops, and valuable career insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meetingDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover-elevate" 
                data-testid={`card-meeting-detail-${index}`}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-sm font-medium text-muted-foreground mb-1" data-testid={`label-${index}`}>
                  {detail.label}
                </div>
                <div className="text-lg font-bold mb-2" data-testid={`value-${index}`}>
                  {detail.value}
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`description-${index}`}>
                  {detail.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-primary/5">
            <p className="text-lg font-medium mb-2" data-testid="text-first-meeting">
              <span className="font-bold text-primary">First meeting is FREE!</span> Come see what AMA is all about.
            </p>
            <p className="text-muted-foreground" data-testid="text-no-commitment">
              No commitment required - just show up and meet the team!
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
