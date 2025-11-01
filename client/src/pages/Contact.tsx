import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTiktok, FaSpotify } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  const faqs = [
    {
      question: "How do I join AMA SDSU?",
      answer: "Attend one of our weekly meetings and speak with an executive board member. You can also visit our website and fill out the membership form."
    },
    {
      question: "When are your meetings?",
      answer: settings?.meetingDay && settings?.meetingTime && settings?.meetingLocation 
        ? `We meet ${settings.meetingDay}s at ${settings.meetingTime} in ${settings.meetingLocation}.`
        : "Please check our website or contact us for meeting times and locations."
    },
    {
      question: "How much does membership cost?",
      answer: "We offer two membership tiers: $49 for one semester and $79 for two semesters (annual). Both include access to all chapter benefits and events."
    },
    {
      question: "Can I join a committee without being a member?",
      answer: "We welcome guests to attend meetings and learn more about our committees before joining! However, active participation in committee projects requires membership."
    },
    {
      question: "Do you offer scholarships?",
      answer: "Yes! We offer financial assistance for students in need. Contact us at membership.sdsuama@gmail.com to learn more about our scholarship program."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20" data-testid="section-contact">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-contact">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-contact-description">
                Get in touch with us! We're here to answer your questions and help you get involved.
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="contact" className="max-w-7xl mx-auto" data-testid="tabs-contact">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger value="contact" data-testid="tab-contact-information">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Information
                </TabsTrigger>
                <TabsTrigger value="faqs" data-testid="tab-faqs">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  FAQs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact" data-testid="content-contact">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <Card className="p-6 md:p-8" data-testid="card-contact-form">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2" data-testid="heading-get-in-touch">
                      Get in Touch
                    </h2>
                    <p className="text-muted-foreground mb-6" data-testid="text-form-description">
                      Send us a message and we'll get back to you as soon as possible.
                    </p>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your first name"
                                    {...field}
                                    data-testid="input-first-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your last name"
                                    {...field}
                                    data-testid="input-last-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@sdsu.edu"
                                  {...field}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="What's this about?"
                                  {...field}
                                  data-testid="input-subject"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us more about your question or how we can help..."
                                  rows={5}
                                  {...field}
                                  data-testid="input-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full" size="lg" data-testid="button-send-message">
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </Card>

                  {/* Contact Info Sidebar */}
                  <div className="space-y-6">
                    {/* Email Us */}
                    <Card className="p-6" data-testid="card-email-us">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1" data-testid="heading-email-us">
                            Email Us
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4" data-testid="text-email-description">
                        For general inquiries, membership questions, or event information:
                      </p>
                      {settings?.email && (
                        <a 
                          href={`mailto:${settings.email}`} 
                          className="text-primary hover:underline font-medium"
                          data-testid="link-email"
                        >
                          {settings.email}
                        </a>
                      )}
                    </Card>

                    {/* Follow Us */}
                    <Card className="p-6" data-testid="card-follow-us">
                      <h3 className="text-xl font-bold mb-2" data-testid="heading-follow-us">
                        Follow Us
                      </h3>
                      <p className="text-muted-foreground mb-4" data-testid="text-follow-description">
                        Stay connected with us on social media for the latest updates and events.
                      </p>
                      
                      <div className="space-y-3">
                        {settings?.instagramUsername && (
                          <a
                            href={settings.instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-md hover-elevate"
                            data-testid="link-instagram"
                          >
                            <FaInstagram className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{settings.instagramUsername}</p>
                              {settings.instagramFollowers && (
                                <p className="text-sm text-muted-foreground">{settings.instagramFollowers} followers</p>
                              )}
                            </div>
                          </a>
                        )}

                        {settings?.linkedinUsername && (
                          <a
                            href={settings.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-md hover-elevate"
                            data-testid="link-linkedin"
                          >
                            <FaLinkedin className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{settings.linkedinUsername}</p>
                              <p className="text-sm text-muted-foreground">Professional networking</p>
                            </div>
                          </a>
                        )}

                        {settings?.tiktokUsername && (
                          <a
                            href={settings.tiktokLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-md hover-elevate"
                            data-testid="link-tiktok"
                          >
                            <FaTiktok className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{settings.tiktokUsername}</p>
                              <p className="text-sm text-muted-foreground">Behind the scenes content</p>
                            </div>
                          </a>
                        )}

                        {settings?.spotifyLink && (
                          <a
                            href={settings.spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-md hover-elevate"
                            data-testid="link-spotify"
                          >
                            <FaSpotify className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{settings.spotifyUsername || "@sdsuama"}</p>
                              <p className="text-sm text-muted-foreground">Listen to our podcast</p>
                            </div>
                          </a>
                        )}
                      </div>
                    </Card>

                    {/* Visit Us */}
                    <Card className="p-6 bg-muted/30" data-testid="card-visit-us">
                      <h3 className="text-xl font-bold mb-2" data-testid="heading-visit-us">
                        Visit Us
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium mb-1">Weekly Meetings:</p>
                          <p className="text-muted-foreground" data-testid="text-meeting-time">
                            {settings?.meetingDay}s at {settings?.meetingTime}
                          </p>
                          <p className="text-muted-foreground" data-testid="text-meeting-location">
                            {settings?.meetingLocation}, {settings?.meetingRoom}
                          </p>
                        </div>
                        <Button variant="outline" className="w-full" data-testid="button-get-directions">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="faqs" data-testid="content-faqs">
                <div className="max-w-3xl mx-auto space-y-6">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="p-6" data-testid={`card-faq-${index}`}>
                      <h3 className="text-lg font-bold mb-2" data-testid={`heading-faq-question-${index}`}>
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground" data-testid={`text-faq-answer-${index}`}>
                        {faq.answer}
                      </p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>

      <Footer settings={settings} />
    </div>
  );
}
