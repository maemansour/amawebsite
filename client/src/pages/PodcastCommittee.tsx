import { Link } from "wouter";
import { ArrowLeft, Mic2, Users, Lightbulb, TrendingUp, Heart, Headphones, Target, Music, Instagram, Youtube } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useQuery } from "@tanstack/react-query";
import type { Settings, FeaturedSpeaker } from "@shared/schema";
import { useEffect } from "react";

export default function PodcastCommittee() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const { data: featuredSpeakers = [] } = useQuery<FeaturedSpeaker[]>({
    queryKey: ["/api/featured-speakers"],
  });

  const recentSpeakers = featuredSpeakers.filter(s => s.category === "recent");
  const pastSpeakers = featuredSpeakers.filter(s => s.category === "past");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    {
      icon: Users,
      title: "Networking",
      color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      items: [
        "Industry professionals",
        "Thought leaders",
        "Peer connections"
      ]
    },
    {
      icon: Mic2,
      title: "Production Skills",
      color: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
      items: [
        "Podcast editing",
        "Interview techniques",
        "Audio/video creation"
      ]
    },
    {
      icon: TrendingUp,
      title: "Marketing Experience",
      color: "bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
      items: [
        "Content strategy",
        "Brand development",
        "Audience engagement"
      ]
    },
    {
      icon: Heart,
      title: "Community Impact",
      color: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      items: [
        "Educational content",
        "Knowledge sharing",
        "Professional development"
      ]
    }
  ];

  const platforms = [
    {
      name: "Spotify",
      icon: Music,
      description: "Listen to all episodes on Spotify and other podcast platforms",
      buttonText: "Listen on Spotify",
      buttonColor: "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white",
      url: settings?.podcastSpotifyUrl || ""
    },
    {
      name: "Instagram",
      icon: Instagram,
      description: "Follow us on Instagram for behind-the-scenes content and updates",
      buttonText: "Follow on Instagram",
      buttonColor: "bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 text-white",
      url: settings?.podcastInstagramUrl || ""
    },
    {
      name: "YouTube",
      icon: Youtube,
      description: "Subscribe and watch video episodes on YouTube",
      buttonText: "Subscribe on YouTube",
      buttonColor: "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white",
      url: settings?.podcastYoutubeUrl || ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <Link href="/committees">
            <Button variant="ghost" className="gap-2" data-testid="button-back-committees">
              <ArrowLeft className="h-4 w-4" />
              Back to Committees
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="pb-16 bg-background" data-testid="section-hero">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text */}
              <ScrollReveal direction="left">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="heading-main">
                    The <span className="text-[#D4A574]">AMA Way</span> <Mic2 className="inline-block w-10 h-10 md:w-12 md:h-12" />
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-subtitle">
                    Join our <span className="font-semibold text-foreground">podcast committee</span> and create compelling content that educates and inspires.
                  </p>
                  
                  <Card className="bg-[#FEF9C3] dark:bg-[#854D0E] border-[#FDE047] dark:border-[#A16207] p-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Headphones className="w-6 h-6 text-[#854D0E] dark:text-[#FEF9C3]" />
                      <p className="text-sm md:text-base font-semibold text-[#854D0E] dark:text-[#FEF9C3]" data-testid="text-listen-banner">
                        Listen on Spotify, YouTube & More
                      </p>
                    </div>
                  </Card>
                </div>
              </ScrollReveal>

              {/* Right Side - Image */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="rounded-lg overflow-hidden shadow-lg" data-testid="img-podcast-hero">
                  <img 
                    src={settings?.podcastHeroImage || "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=600&fit=crop"} 
                    alt="The AMA Way Podcast"
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-mission">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left - Mission Card (spans 2 columns) */}
              <ScrollReveal direction="up" className="lg:col-span-2">
                <Card className="bg-[#1E3A5F] dark:bg-[#0F172A] text-white h-full p-8" data-testid="card-mission">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-8 h-8 text-[#D4A574]" />
                    <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                  </div>
                  <div className="space-y-4 text-white/90">
                    <p>
                      Work on our podcast, 'The AMA Way', where we engage with thought-provoking discussions, gain invaluable industry insights, and broaden understanding of marketing's intricacies.
                    </p>
                    <p>
                      Podcast Committee members collaborate with professionals, professors, influencers, and students to create compelling audio and video content that educates and inspires our community.
                    </p>
                    <p>
                      Through interviews, panel discussions, and educational content, we provide a platform for marketing knowledge sharing and professional development within the AMA community and beyond.
                    </p>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Right - Images */}
              <div className="space-y-6">
                <ScrollReveal direction="up" delay={0.1}>
                  <Card className="overflow-hidden h-full" data-testid="card-industry-image">
                    <div className="relative h-48">
                      <img 
                        src={settings?.podcastIndustryImage || "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"} 
                        alt="Industry Connections"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Industry Connections</h3>
                          </div>
                          <p className="text-sm text-white/90">Network with professionals and thought leaders</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={0.2}>
                  <Card className="overflow-hidden h-full" data-testid="card-creative-image">
                    <div className="relative h-48">
                      <img 
                        src={settings?.podcastCreativeImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"} 
                        alt="Creative Skills"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                        <div className="text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <Lightbulb className="w-5 h-5" />
                            <h3 className="text-lg font-bold">Creative Skills</h3>
                          </div>
                          <p className="text-sm text-white/90">Develop content creation expertise</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Our Committee Section */}
        <section className="py-16 md:py-20 bg-background" data-testid="section-benefits">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-why-join">
                  Why Join Our Committee?
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-benefits-subtitle">
                  Comprehensive benefits that shape future content creators
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className={`p-6 h-full ${benefit.color}`} data-testid={`card-benefit-${index}`}>
                    <div className="flex flex-col h-full">
                      <div className={`w-12 h-12 rounded-md bg-white dark:bg-background flex items-center justify-center mb-4`}>
                        <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-4" data-testid={`text-benefit-title-${index}`}>
                        {benefit.title}
                      </h3>
                      <ul className="space-y-2">
                        {benefit.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground" data-testid={`benefit-item-${index}-${i}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Speakers Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-featured-speakers">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-featured-speakers">
                  Featured Speakers
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-speakers-subtitle">
                  Industry professionals sharing their expertise
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              {/* Recent Featured Speakers */}
              <ScrollReveal direction="left">
                <Card className="p-6" data-testid="card-recent-speakers">
                  <CardHeader className="px-0 pt-0">
                    <div className="flex items-center gap-2 mb-4">
                      <Mic2 className="w-5 h-5 text-[#D4A574]" />
                      <CardTitle className="text-2xl" data-testid="heading-recent-speakers">Recent Featured Speakers</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-6">
                      {recentSpeakers.length > 0 ? (
                        recentSpeakers.map((speaker, index) => (
                          <div key={speaker.id} className="border-l-4 border-[#D4A574] pl-4" data-testid={`speaker-recent-${index}`}>
                            <h4 className="font-bold text-lg mb-1" data-testid={`text-speaker-name-recent-${index}`}>{speaker.name}</h4>
                            <p className="text-[#D4A574] dark:text-[#D4A574] font-semibold text-sm mb-2" data-testid={`text-speaker-topic-recent-${index}`}>{speaker.topic}</p>
                            <p className="text-sm text-muted-foreground" data-testid={`text-speaker-desc-recent-${index}`}>{speaker.description}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-8" data-testid="text-no-recent-speakers">
                          No recent speakers yet. Check back soon!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Listen & Follow Section */}
        <section className="py-16 md:py-20 bg-background" data-testid="section-platforms">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-listen-follow">
                  Listen & Follow
                </h2>
                <p className="text-lg text-muted-foreground" data-testid="text-platforms-subtitle">
                  Connect with us across all platforms
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {platforms.map((platform, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <Card className="p-6 text-center h-full flex flex-col" data-testid={`card-platform-${index}`}>
                    <div className="mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                        <platform.icon className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-bold mb-3" data-testid={`text-platform-name-${index}`}>{platform.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6" data-testid={`text-platform-desc-${index}`}>
                        {platform.description}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Button
                        className={`w-full ${platform.buttonColor}`}
                        asChild
                        data-testid={`button-platform-${index}`}
                      >
                        <a href={platform.url || "#"} target={platform.url ? "_blank" : undefined} rel={platform.url ? "noopener noreferrer" : undefined}>
                          {platform.buttonText}
                        </a>
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Join Section */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-join">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left - Call to Action */}
              <ScrollReveal direction="left">
                <Card className="bg-[#1E3A5F] dark:bg-[#0F172A] text-white p-8 h-full flex flex-col" data-testid="card-ready-join">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-8 h-8 text-[#D4A574]" />
                    <h2 className="text-2xl md:text-3xl font-bold">Ready to Join?</h2>
                  </div>
                  <p className="text-white/90 mb-8 flex-grow">
                    Gain hands-on experience in podcast production while networking with industry professionals and thought leaders.
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#D4A574] hover:bg-[#C39564] dark:bg-[#D4A574] dark:hover:bg-[#C39564] text-white w-full md:w-auto"
                    asChild
                    data-testid="button-apply-podcast"
                  >
                    <a href={settings?.podcastApplyLink || "#"} target={settings?.podcastApplyLink ? "_blank" : undefined} rel={settings?.podcastApplyLink ? "noopener noreferrer" : undefined}>
                      Apply to Podcast Committee
                    </a>
                  </Button>
                </Card>
              </ScrollReveal>

              {/* Right - How to Join & Guest Info */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="space-y-6">
                  <Card className="p-6" data-testid="card-how-to-join">
                    <h3 className="text-xl font-bold mb-4" data-testid="heading-how-to-join">How to Join</h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex gap-3" data-testid="step-1">
                        <span className="font-bold text-[#D4A574]">1.</span>
                        <span>Attend AMA General Body meetings at the beginning of the semester and become a member.</span>
                      </li>
                      <li className="flex gap-3" data-testid="step-2">
                        <span className="font-bold text-[#D4A574]">2.</span>
                        <span>Look out for announcements during meetings and on our Slack channel.</span>
                      </li>
                      <li className="flex gap-3" data-testid="step-3">
                        <span className="font-bold text-[#D4A574]">3.</span>
                        <span>Speak to an Executive Member at AMA GBMs for more information or email <span className="font-semibold text-primary">{settings?.podcastEmail || "podcast.sdsuama@gmail.com"}</span></span>
                      </li>
                    </ol>
                  </Card>

                  <Card className="p-6 bg-muted/50" data-testid="card-guest-info">
                    <h3 className="text-lg font-bold mb-3" data-testid="heading-guest-info">Interested in being a guest?</h3>
                    <p className="text-sm text-muted-foreground">
                      Contact <span className="font-semibold text-foreground">{settings?.podcastEmail || "podcast.sdsuama@gmail.com"}</span> to share your expertise with our audience!
                    </p>
                  </Card>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
