import { useRoute, Link } from "wouter";
import { ArrowLeft, Check, Users, Target, Trophy, Briefcase, Calendar, Mic, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { type Settings } from "@shared/schema";
import { type LucideIcon } from "lucide-react";

interface CommitteeData {
  id: string;
  name: string;
  mission: string;
  icon: LucideIcon;
  benefits: string[];
  pastWork: {
    title: string;
    description: string;
  }[];
  featuredItems: {
    title: string;
    description: string;
  }[];
  howToJoin: string[];
}

const committeesData: Record<string, CommitteeData> = {
  consulting: {
    id: "consulting",
    name: "Consulting Committee",
    mission: "The Consulting Committee provides members with hands-on experience tackling real business challenges for local companies. We develop analytical, strategic, and presentation skills through consulting projects that create tangible value for San Diego businesses while building your professional portfolio.",
    icon: Briefcase,
    benefits: [
      "Work on real consulting projects with local businesses",
      "Develop analytical and problem-solving skills",
      "Build your professional portfolio with case studies",
      "Learn strategic thinking and business analysis",
      "Network with business owners and industry professionals",
      "Gain experience in client communication and project management"
    ],
    pastWork: [
      {
        title: "Local Coffee Shop Market Analysis",
        description: "Conducted comprehensive market analysis and developed growth strategy for an independent coffee shop, resulting in 30% increase in customer retention."
      },
      {
        title: "E-commerce Brand Optimization",
        description: "Analyzed online presence and customer journey for a local e-commerce brand, providing actionable recommendations that improved conversion rates."
      },
      {
        title: "Startup Go-to-Market Strategy",
        description: "Developed complete go-to-market strategy for a tech startup launching in San Diego, including pricing analysis and customer segmentation."
      }
    ],
    featuredItems: [
      {
        title: "Industry Workshops",
        description: "Regular sessions with consulting professionals from top firms like Deloitte, McKinsey, and local agencies"
      },
      {
        title: "Case Competitions",
        description: "Participate in regional and national marketing case competitions to test your skills"
      }
    ],
    howToJoin: [
      "Attend a weekly AMA meeting to learn more about the committee",
      "Express interest in consulting during new member orientation",
      "Complete a brief application highlighting your interests and skills",
      "Attend the consulting committee kickoff meeting",
      "Get matched to a project team based on your interests and availability"
    ]
  },
  events: {
    id: "events",
    name: "Event Planning Committee",
    mission: "The Event Planning Committee orchestrates all AMA SDSU events, from professional networking sessions to social gatherings. We develop project management, coordination, and creative skills while creating memorable experiences that connect members with industry professionals and each other.",
    icon: Calendar,
    benefits: [
      "Plan and execute 50+ events per year",
      "Develop project management and organizational skills",
      "Build vendor and sponsor relationships",
      "Gain experience in budget management and logistics",
      "Network with industry professionals and company representatives",
      "Create memorable experiences for 300+ members"
    ],
    pastWork: [
      {
        title: "Annual Marketing Summit",
        description: "Organized our flagship event featuring 10+ speakers from Fortune 500 companies, attended by 200+ students and professionals."
      },
      {
        title: "Industry Networking Nights",
        description: "Coordinated monthly networking events connecting members with marketing professionals from diverse industries."
      },
      {
        title: "Professional Development Workshops",
        description: "Planned hands-on workshops covering resume building, LinkedIn optimization, and interview preparation."
      }
    ],
    featuredItems: [
      {
        title: "Red Bull Partnership Events",
        description: "Collaborate with Red Bull on campus activations and exclusive member events"
      },
      {
        title: "Company Tours",
        description: "Organize exclusive tours of marketing agencies and corporate offices in San Diego"
      }
    ],
    howToJoin: [
      "Attend a weekly meeting and connect with the Events VP",
      "Shadow an upcoming event to see the committee in action",
      "Complete the event planning interest form",
      "Attend the committee onboarding session",
      "Join a sub-team (logistics, marketing, or partnerships) based on your interests"
    ]
  },
  podcast: {
    id: "podcast",
    name: "Podcast Committee",
    mission: "The Podcast Committee produces the official AMA SDSU podcast, sharing marketing insights and career stories with the SDSU community and beyond. We develop content creation, audio production, and interviewing skills while building a platform that showcases our members and industry leaders.",
    icon: Mic,
    benefits: [
      "Develop podcasting and audio production skills",
      "Interview marketing professionals and industry leaders",
      "Build public speaking and communication abilities",
      "Learn content planning and storytelling",
      "Grow your personal brand through podcast hosting",
      "Create shareable content for your professional portfolio"
    ],
    pastWork: [
      {
        title: "Industry Leader Interview Series",
        description: "Hosted 20+ episodes featuring CMOs, brand managers, and marketing directors sharing their career journeys and insights."
      },
      {
        title: "Student Success Stories",
        description: "Spotlighted AMA SDSU alumni who have launched successful marketing careers, providing inspiration and guidance for current members."
      },
      {
        title: "Marketing Trends Deep Dives",
        description: "Produced educational episodes analyzing current marketing trends, from social media algorithms to AI in marketing."
      }
    ],
    featuredItems: [
      {
        title: "Guest Speaker Access",
        description: "Exclusive access to interview speakers who present at AMA events and professional guests"
      },
      {
        title: "Production Training",
        description: "Hands-on training in audio editing, interviewing techniques, and podcast distribution"
      }
    ],
    howToJoin: [
      "Attend a weekly meeting and meet the Podcast team",
      "Listen to a few podcast episodes to understand our style",
      "Complete the podcast committee application",
      "Attend a podcast recording session as an observer",
      "Join as a researcher, host, or producer based on your interests and skills"
    ]
  },
  adobe: {
    id: "adobe",
    name: "Adobe Creative Committee",
    mission: "The Adobe Creative Committee empowers members to master Adobe Creative Suite through hands-on workshops and real-world projects. We develop design and content creation skills essential for modern marketing while producing visual assets for AMA SDSU's brand and events.",
    icon: Palette,
    benefits: [
      "Learn industry-standard design software (Photoshop, Illustrator, Premiere, etc.)",
      "Build a professional design portfolio",
      "Create marketing materials for real events and campaigns",
      "Develop visual storytelling and brand design skills",
      "Access to Adobe Creative Cloud resources and tutorials",
      "Collaborate with events and social media teams on creative projects"
    ],
    pastWork: [
      {
        title: "AMA SDSU Rebrand",
        description: "Led the visual rebrand of AMA SDSU's social media presence, creating cohesive templates and brand guidelines used across all platforms."
      },
      {
        title: "Event Marketing Materials",
        description: "Designed posters, social media graphics, and digital assets for 50+ events, resulting in increased engagement and attendance."
      },
      {
        title: "Member Spotlight Series",
        description: "Created visually compelling member feature graphics and video content showcasing our community's achievements."
      }
    ],
    featuredItems: [
      {
        title: "Weekly Design Workshops",
        description: "Learn new Adobe tools and techniques through hands-on sessions led by experienced designers"
      },
      {
        title: "Real Client Projects",
        description: "Work on design projects for AMA events, sponsors, and partner organizations"
      }
    ],
    howToJoin: [
      "Attend a weekly meeting to see our current projects",
      "No prior Adobe experience required - we teach from beginner to advanced",
      "Complete the creative committee interest form",
      "Attend a beginner workshop to learn the basics",
      "Start contributing to projects while building your skills and portfolio"
    ]
  }
};

export default function CommitteePage() {
  const [match, params] = useRoute("/committees/:id");
  const committeeId = params?.id || "";
  const committee = committeesData[committeeId];

  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  if (!committee) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" data-testid="heading-not-found">Committee Not Found</h1>
          <Link href="/" data-testid="link-back-home-notfound">
            <Button data-testid="button-back-home">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const CommitteeIcon = committee.icon;

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid={`section-committee-${committeeId}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Link href="/" data-testid="link-back-home">
            <Button 
              variant="ghost" 
              className="mb-8"
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center" data-testid="icon-committee">
              <CommitteeIcon className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="heading-committee-name">
              {committee.name}
            </h1>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl" data-testid="text-mission">
            {committee.mission}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-benefits">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-benefits">
              Why Join This Committee?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {committee.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3"
                data-testid={`benefit-${index}`}
              >
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-past-work">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-past-work">
              Past Work & Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {committee.pastWork.map((work, index) => (
              <Card 
                key={index} 
                className="p-6 hover-elevate"
                data-testid={`card-past-work-${index}`}
              >
                <h3 className="text-xl font-semibold mb-3" data-testid={`heading-work-${index}`}>
                  {work.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-work-${index}`}>
                  {work.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" data-testid="section-featured">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" data-testid="heading-featured">
            What Makes Us Special
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {committee.featuredItems.map((item, index) => (
              <Card 
                key={index} 
                className="p-8 hover-elevate text-center"
                data-testid={`card-featured-${index}`}
              >
                <h3 className="text-2xl font-bold mb-3" data-testid={`heading-featured-${index}`}>
                  {item.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-featured-${index}`}>
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30" data-testid="section-how-to-join">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-how-to-join">
              How to Join
            </h2>
          </div>

          <Card className="p-8 md:p-12 max-w-3xl mx-auto">
            <ol className="space-y-4">
              {committee.howToJoin.map((step, index) => (
                <li 
                  key={index} 
                  className="flex gap-4"
                  data-testid={`step-${index}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-lg pt-1">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 text-center">
              <p className="text-lg mb-6" data-testid="text-ready">
                Ready to join the {committee.name}?
              </p>
              <Link href="/" data-testid="link-join">
                <Button 
                  size="lg"
                  data-testid="button-join"
                >
                  Join AMA SDSU Today
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer settings={settings} />
    </div>
  );
}
