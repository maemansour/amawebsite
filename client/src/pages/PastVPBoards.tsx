import { Award, Users } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function PastVPBoards() {
  const pastBoards = [
    {
      year: "2023-2024",
      members: [
        { name: "Rachel Martinez", title: "President" },
        { name: "Kevin Nguyen", title: "Vice President" },
        { name: "Amanda Chen", title: "Secretary" },
        { name: "Brandon Lee", title: "Treasurer" }
      ],
      achievement: "Achieved #3 TOP 10 Chapter status"
    },
    {
      year: "2022-2023",
      members: [
        { name: "Tyler Anderson", title: "President" },
        { name: "Maria Rodriguez", title: "Vice President" },
        { name: "James Kim", title: "Secretary" },
        { name: "Sofia Garcia", title: "Treasurer" }
      ],
      achievement: "Expanded committee programs"
    },
    {
      year: "2021-2022",
      members: [
        { name: "Lauren Smith", title: "President" },
        { name: "Daniel Park", title: "Vice President" },
        { name: "Olivia Johnson", title: "Secretary" },
        { name: "Marcus Williams", title: "Treasurer" }
      ],
      achievement: "Launched podcast initiative"
    },
    {
      year: "2020-2021",
      members: [
        { name: "Christopher Davis", title: "President" },
        { name: "Ashley Thompson", title: "Vice President" },
        { name: "Ryan Martinez", title: "Secretary" },
        { name: "Emma Wilson", title: "Treasurer" }
      ],
      achievement: "Navigated virtual programming during COVID-19"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5" data-testid="section-past-vp-header">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-block mb-4">
                <Award className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="heading-past-vp-boards">
                Past VP Executive Boards
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-past-vp-description">
                Honor the leaders who helped shape our chapter's success.
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 md:py-20" data-testid="section-intro">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-legacy">
              A Legacy of Leadership
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-legacy">
              AMA SDSU's success is built on the dedication and vision of our past executive boards. Each year, student leaders have worked tirelessly to create opportunities, build community, and advance our chapter's mission. We honor their contributions and the foundation they've built.
            </p>
          </div>
        </section>

        {/* Past Boards Timeline */}
        <section className="py-16 md:py-20 bg-muted/30" data-testid="section-past-boards">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-testid="heading-past-boards">
              Executive Board History
            </h2>
            
            <div className="space-y-8">
              {pastBoards.map((board, boardIndex) => (
                <Card key={boardIndex} className="p-8" data-testid={`card-board-${boardIndex}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" data-testid={`text-year-${boardIndex}`}>
                        {board.year}
                      </h3>
                      <p className="text-primary font-medium" data-testid={`text-achievement-${boardIndex}`}>
                        {board.achievement}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {board.members.map((member, memberIndex) => (
                      <div key={memberIndex} className="flex items-center gap-3 p-3 rounded-md bg-muted/50" data-testid={`member-${boardIndex}-${memberIndex}`}>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium" data-testid={`text-member-name-${boardIndex}-${memberIndex}`}>
                            {member.name}
                          </p>
                          <p className="text-sm text-muted-foreground" data-testid={`text-member-title-${boardIndex}-${memberIndex}`}>
                            {member.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Thank You Message */}
        <section className="py-16 md:py-20" data-testid="section-thank-you">
          <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="heading-thank-you">
              Thank You
            </h2>
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-thank-you-1">
              To all our past executive board members: your dedication, creativity, and leadership have shaped AMA SDSU into the premier marketing organization it is today.
            </p>
            <p className="text-lg text-muted-foreground" data-testid="text-thank-you-2">
              Your legacy lives on in every event we host, every member we support, and every success we achieve. Thank you for paving the way and inspiring future generations of marketing leaders.
            </p>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
}
