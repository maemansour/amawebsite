import { useQuery, useMutation } from "@tanstack/react-query";
import { Hero } from "@/components/Hero";
import { HighlightsCarousel } from "@/components/HighlightsCarousel";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { type Settings, type Highlight, type Event } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: highlights = [], isLoading: highlightsLoading } = useQuery<Highlight[]>({
    queryKey: ["/api/highlights"],
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest("POST", "/api/newsletter/subscribe", { email });
    },
  });

  const handleNewsletterSubscribe = async (email: string) => {
    await newsletterMutation.mutateAsync(email);
  };

  return (
    <div className="min-h-screen">
      <Hero settings={settings} />
      
      {highlightsLoading ? (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Skeleton className="h-96 md:h-[500px] w-full rounded-lg" />
          </div>
        </section>
      ) : (
        <HighlightsCarousel highlights={highlights} />
      )}

      {/* Meet Our fAMAily */}
      <section className="py-16 md:py-20" data-testid="section-family">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-8 md:mb-12" data-testid="heading-family">
              Meet Our fAMAily
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={settings?.familyImage || "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop"} 
                alt="Meet Our fAMAily - AMA SDSU Board Members"
                className="w-full h-[400px] md:h-[600px] object-cover"
                data-testid="img-family"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {eventsLoading ? (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <UpcomingEvents events={events} />
      )}

      <Newsletter onSubscribe={handleNewsletterSubscribe} />
      <Footer settings={settings} />
    </div>
  );
}
