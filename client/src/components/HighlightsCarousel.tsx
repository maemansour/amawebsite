import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Highlight } from "@shared/schema";

interface HighlightsCarouselProps {
  highlights: Highlight[];
}

export function HighlightsCarousel({ highlights }: HighlightsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || highlights.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, highlights.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  };

  if (highlights.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h2 className="font-heading font-bold text-3xl md:text-4xl" data-testid="text-highlights-title">
              Featured Highlights
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay up-to-date with the latest news, events, and achievements from AMA SDSU.
            </p>
            <div className="py-12 text-muted-foreground">
              No highlights available at the moment. Check back soon!
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentHighlight = highlights[currentIndex];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl" data-testid="text-highlights-title">
            Featured Highlights
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay up-to-date with the latest news, events, and achievements from AMA SDSU.
          </p>
        </div>

        <div 
          className="relative rounded-lg overflow-hidden bg-card shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-96 md:h-[500px] lg:h-[600px]">
            <img
              src={currentHighlight.imageUrl}
              alt={currentHighlight.title}
              className="w-full h-full object-cover"
              data-testid={`img-highlight-${currentIndex}`}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white">
              <Badge 
                className="bg-accent text-accent-foreground mb-4"
                data-testid={`badge-highlight-category-${currentIndex}`}
              >
                {currentHighlight.category}
              </Badge>
              <h3 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl mb-3" data-testid={`text-highlight-title-${currentIndex}`}>
                {currentHighlight.title}
              </h3>
              <p className="text-base md:text-lg text-white/90 max-w-3xl" data-testid={`text-highlight-description-${currentIndex}`}>
                {currentHighlight.description}
              </p>
            </div>

            {/* Navigation Arrows */}
            {highlights.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                  onClick={goToPrevious}
                  data-testid="button-highlight-prev"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                  onClick={goToNext}
                  data-testid="button-highlight-next"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Dot Indicators */}
            {highlights.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {highlights.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "bg-white w-8" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    data-testid={`button-highlight-dot-${index}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
