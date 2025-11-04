import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Send, Instagram as InstagramIcon } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type Settings } from "@shared/schema";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: ContactFormData) => {
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 48 hours.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background" data-testid="section-hero">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="heading-hero">
              Get in <span className="text-[#D4A574] dark:text-[#E5C4A0]">Touch</span> <Mail className="inline-block w-10 h-10 md:w-12 md:h-12" />
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              Ready to connect? We'd love to hear from you and answer any questions about AMA SDSU.
            </p>
            <div className="inline-block">
              <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-2 border-[#D4A574] dark:border-[#E5C4A0]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5 text-[#D4A574] dark:text-[#E5C4A0]" />
                    <span className="font-bold text-foreground">48 Hour Response Time</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Reach Us */}
        <section className="py-12 md:py-16" data-testid="section-reach-us">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" data-testid="heading-reach-us">
                How to Reach Us
              </h2>
              <p className="text-muted-foreground">
                Choose your preferred way to connect
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Email Card */}
              <Card className="hover-elevate" data-testid="card-email">
                <CardContent className="p-8 text-center">
                  <Mail className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">Email Us</h3>
                  <a 
                    href="mailto:membership.sdsuama@gmail.com" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-email"
                  >
                    membership.sdsuama@gmail.com
                  </a>
                </CardContent>
              </Card>

              {/* Instagram DM Card */}
              <Card className="hover-elevate" data-testid="card-dm">
                <CardContent className="p-8 text-center">
                  <InstagramIcon className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">DM Us</h3>
                  <a 
                    href={settings?.instagramUrl || "https://instagram.com/sdsuama"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="link-instagram"
                  >
                    @sdsuama
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 md:py-16 bg-muted/30" data-testid="section-form">
          <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3" data-testid="heading-form">
                Send Us a Message
              </h2>
              <p className="text-muted-foreground">
                We'll get back to you within 48 hours
              </p>
            </div>

            <Card data-testid="card-form">
              <CardContent className="p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Fields */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Name <span className="text-muted-foreground">(required)</span>
                          </FormLabel>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm text-primary mb-2 block">First Name</label>
                              <FormControl>
                                <Input 
                                  {...field} 
                                  placeholder="" 
                                  data-testid="input-firstname"
                                  className="bg-background"
                                />
                              </FormControl>
                            </div>
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field: lastNameField }) => (
                                <div>
                                  <label className="text-sm text-primary mb-2 block">Last Name</label>
                                  <FormControl>
                                    <Input 
                                      {...lastNameField} 
                                      placeholder="" 
                                      data-testid="input-lastname"
                                      className="bg-background"
                                    />
                                  </FormControl>
                                </div>
                              )}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Email <span className="text-muted-foreground">(required)</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="" 
                              data-testid="input-email"
                              className="bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Subject <span className="text-muted-foreground">(required)</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="" 
                              data-testid="input-subject"
                              className="bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">
                            Message <span className="text-muted-foreground">(required)</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="" 
                              rows={6}
                              data-testid="input-message"
                              className="resize-none bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button 
                        type="submit" 
                        className="bg-[#D4A574] hover:bg-[#C49564] dark:bg-[#D4A574] dark:hover:bg-[#C49564] text-white dark:text-white px-8"
                        data-testid="button-submit"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="py-12 md:py-16 bg-[#1e3a5f] dark:bg-[#1a2f4a] text-white dark:text-white" data-testid="section-social">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white dark:text-white">
                Follow Our Journey
              </h2>
              <p className="text-white/80 dark:text-white/80">
                Stay connected with AMA SDSU and never miss an update
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Instagram */}
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid="link-social-instagram"
                >
                  <Card className="bg-[#2a4a6f] dark:bg-[#243f5e] border-0 hover-elevate transition-all">
                    <CardContent className="p-8 text-center">
                      <FaInstagram className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-white dark:text-white">Instagram</h3>
                      <p className="text-white/70 dark:text-white/70">@sdsuama</p>
                    </CardContent>
                  </Card>
                </a>
              )}

              {/* LinkedIn */}
              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid="link-social-linkedin"
                >
                  <Card className="bg-[#2a4a6f] dark:bg-[#243f5e] border-0 hover-elevate transition-all">
                    <CardContent className="p-8 text-center">
                      <FaLinkedin className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-white dark:text-white">LinkedIn</h3>
                      <p className="text-white/70 dark:text-white/70">AMA San Diego State</p>
                    </CardContent>
                  </Card>
                </a>
              )}

              {/* TikTok */}
              {settings?.tiktokUrl && (
                <a
                  href={settings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid="link-social-tiktok"
                >
                  <Card className="bg-[#2a4a6f] dark:bg-[#243f5e] border-0 hover-elevate transition-all">
                    <CardContent className="p-8 text-center">
                      <FaTiktok className="w-12 h-12 text-[#D4A574] dark:text-[#E5C4A0] mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2 text-white dark:text-white">TikTok</h3>
                      <p className="text-white/70 dark:text-white/70">@sdsuama</p>
                    </CardContent>
                  </Card>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
