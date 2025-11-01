import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ScrollReveal } from "@/components/ScrollReveal";

interface NewsletterProps {
  onSubscribe?: (email: string) => Promise<void>;
}

export function Newsletter({ onSubscribe }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (onSubscribe) {
        await onSubscribe(email);
      }
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive AMA news and updates.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-muted/30">
      <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="font-heading font-bold text-3xl md:text-4xl" data-testid="text-newsletter-title">
            Get AMA News & Updates
          </h2>
          
          <p className="text-muted-foreground text-base md:text-lg">
            Sign up with your email address to receive AMA news and updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={isLoading}
              data-testid="input-newsletter-email"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              data-testid="button-newsletter-subscribe"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
