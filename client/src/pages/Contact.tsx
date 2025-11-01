import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTiktok, FaSpotify } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Settings } from "@shared/schema";

export default function Contact() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl md:text-5xl" data-testid="text-contact-title">
                Contact Us
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Get in touch with AMA SDSU.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Email */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Have questions or want to learn more? Send us an email.
                  </p>
                  {settings?.email && (
                    <Button variant="outline" asChild data-testid="button-contact-email">
                      <a href={`mailto:${settings.email}`}>
                        {settings.email}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Visit Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {settings?.meetingLocation && (
                    <div>
                      <p className="font-medium" data-testid="text-contact-location">
                        {settings.meetingLocation}
                      </p>
                      {settings.meetingRoom && (
                        <p className="text-muted-foreground" data-testid="text-contact-room">
                          {settings.meetingRoom}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Meeting Times */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Meeting Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {settings?.meetingDay && settings?.meetingTime && (
                    <div>
                      <p className="font-medium" data-testid="text-contact-meeting-time">
                        {settings.meetingDay}s at {settings.meetingTime}
                      </p>
                      {settings.meetingSemester && (
                        <p className="text-muted-foreground" data-testid="text-contact-semester">
                          {settings.meetingSemester}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <FaInstagram className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Stay connected with us on social media for the latest updates.
                  </p>
                  <div className="flex gap-3">
                    {settings?.instagramLink && (
                      <Button variant="outline" size="icon" asChild data-testid="button-contact-instagram">
                        <a href={settings.instagramLink} target="_blank" rel="noopener noreferrer">
                          <FaInstagram className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {settings?.linkedinLink && (
                      <Button variant="outline" size="icon" asChild data-testid="button-contact-linkedin">
                        <a href={settings.linkedinLink} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {settings?.tiktokLink && (
                      <Button variant="outline" size="icon" asChild data-testid="button-contact-tiktok">
                        <a href={settings.tiktokLink} target="_blank" rel="noopener noreferrer">
                          <FaTiktok className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                    {settings?.spotifyLink && (
                      <Button variant="outline" size="icon" asChild data-testid="button-contact-spotify">
                        <a href={settings.spotifyLink} target="_blank" rel="noopener noreferrer">
                          <FaSpotify className="h-5 w-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Join Section */}
            {settings?.joinLink && (
              <div className="mt-12 text-center">
                <Card className="border-2 border-primary">
                  <CardContent className="py-12 space-y-6">
                    <h2 className="font-heading font-bold text-3xl" data-testid="text-contact-join-title">
                      Ready to Join AMA SDSU?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                      Become part of our community and start your journey in marketing excellence.
                    </p>
                    <Button size="lg" asChild data-testid="button-contact-join">
                      <a href={settings.joinLink} target="_blank" rel="noopener noreferrer">
                        Join The Family
                        <ExternalLink className="h-5 w-5 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
