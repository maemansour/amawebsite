import { 
  type User, 
  type InsertUser,
  type Settings,
  type InsertSettings,
  type Event,
  type InsertEvent,
  type Highlight,
  type InsertHighlight,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ExecutiveMember,
  type InsertExecutiveMember,
  type Sponsor,
  type InsertSponsor,
  type Slideshow,
  type InsertSlideshow,
  type SlideshowSlide,
  type InsertSlideshowSlide,
  type PortfolioClient,
  type InsertPortfolioClient,
  type AlumniSpotlight,
  type InsertAlumniSpotlight,
  type FeaturedSpeaker,
  type InsertFeaturedSpeaker,
  type CommitteeConfig,
  type InsertCommitteeConfig,
  users,
  settings as settingsTable,
  events,
  highlights,
  newsletterSubscriptions,
  executiveMembers,
  sponsors,
  slideshows,
  slideshowSlides,
  portfolioClients,
  alumniSpotlight,
  featuredSpeakers,
  committeeConfigs
} from "@shared/schema";
import { randomUUID } from "crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Settings management
  getSettings(): Promise<Settings | undefined>;
  updateSettings(settings: InsertSettings): Promise<Settings>;
  
  // Events management
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;
  
  // Highlights management
  getAllHighlights(): Promise<Highlight[]>;
  getHighlight(id: string): Promise<Highlight | undefined>;
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  deleteHighlight(id: string): Promise<boolean>;
  
  // Newsletter subscriptions
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  deleteNewsletterSubscription(id: string): Promise<boolean>;
  
  // Executive Members management
  getAllExecutiveMembers(): Promise<ExecutiveMember[]>;
  getExecutiveMember(id: string): Promise<ExecutiveMember | undefined>;
  createExecutiveMember(member: InsertExecutiveMember): Promise<ExecutiveMember>;
  updateExecutiveMember(id: string, member: Partial<InsertExecutiveMember>): Promise<ExecutiveMember | undefined>;
  deleteExecutiveMember(id: string): Promise<boolean>;
  bulkUpdateMemberDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Sponsors management
  getAllSponsors(): Promise<Sponsor[]>;
  getSponsor(id: string): Promise<Sponsor | undefined>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined>;
  deleteSponsor(id: string): Promise<boolean>;
  bulkUpdateSponsorDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Slideshows management
  getAllSlideshows(): Promise<Slideshow[]>;
  getSlideshow(id: string): Promise<Slideshow | undefined>;
  createSlideshow(slideshow: InsertSlideshow): Promise<Slideshow>;
  updateSlideshow(id: string, slideshow: Partial<InsertSlideshow>): Promise<Slideshow | undefined>;
  deleteSlideshow(id: string): Promise<boolean>;
  bulkUpdateSlideshowDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Slideshow Slides management
  getAllSlides(slideshowId: string): Promise<SlideshowSlide[]>;
  getSlide(id: string): Promise<SlideshowSlide | undefined>;
  createSlide(slide: InsertSlideshowSlide): Promise<SlideshowSlide>;
  updateSlide(id: string, slide: Partial<InsertSlideshowSlide>): Promise<SlideshowSlide | undefined>;
  deleteSlide(id: string): Promise<boolean>;
  bulkUpdateSlideDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Portfolio Clients management
  getAllPortfolioClients(): Promise<PortfolioClient[]>;
  createPortfolioClient(client: InsertPortfolioClient): Promise<PortfolioClient>;
  updatePortfolioClient(id: string, client: Partial<InsertPortfolioClient>): Promise<PortfolioClient | undefined>;
  deletePortfolioClient(id: string): Promise<boolean>;
  
  // Alumni Spotlight management
  getAllAlumniSpotlight(): Promise<AlumniSpotlight[]>;
  createAlumniSpotlight(alumni: InsertAlumniSpotlight): Promise<AlumniSpotlight>;
  updateAlumniSpotlight(id: string, alumni: Partial<InsertAlumniSpotlight>): Promise<AlumniSpotlight | undefined>;
  deleteAlumniSpotlight(id: string): Promise<boolean>;
  bulkUpdateAlumniSpotlightOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Featured Speakers management
  getAllFeaturedSpeakers(): Promise<FeaturedSpeaker[]>;
  createFeaturedSpeaker(speaker: InsertFeaturedSpeaker): Promise<FeaturedSpeaker>;
  updateFeaturedSpeaker(id: string, speaker: Partial<InsertFeaturedSpeaker>): Promise<FeaturedSpeaker | undefined>;
  deleteFeaturedSpeaker(id: string): Promise<boolean>;
  bulkUpdateFeaturedSpeakersOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void>;
  
  // Committee Configs management
  getAllCommitteeConfigs(): Promise<CommitteeConfig[]>;
  getCommitteeConfigBySlug(slug: string): Promise<CommitteeConfig | undefined>;
  createCommitteeConfig(config: InsertCommitteeConfig): Promise<CommitteeConfig>;
  updateCommitteeConfig(slug: string, config: Partial<InsertCommitteeConfig>): Promise<CommitteeConfig | undefined>;
  deleteCommitteeConfig(slug: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private settings: Settings | null;
  private events: Map<string, Event>;
  private highlights: Map<string, Highlight>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.users = new Map();
    this.settings = null;
    this.events = new Map();
    this.highlights = new Map();
    this.newsletterSubscriptions = new Map();
    
    // Initialize with default admin user (password: admin123)
    // In production, this should be hashed properly
    this.users.set("admin", {
      id: "admin",
      username: "admin",
      password: "admin123" // In production, use bcrypt
    });
    
    // Initialize with default settings
    this.settings = {
      id: "default",
      heroDescription: "Aiming to educate and empower young professionals looking to break into the marketing, sales, and advertising industries. At SDSU AMA we accomplish this through weekly meetings with industry professional guest speakers and elite marketing company and agency tours. We promote growth and learning through case studies, workshops, and events. Open to SDSU students of all majors and invites you to connect with our fAMAly!",
      memberCount: 280,
      meetingDay: "Tuesday",
      meetingTime: "5:00 PM",
      meetingLocation: "On Campus",
      meetingRoom: "Varies",
      meetingSemester: "Fall & Spring Semesters",
      joinLink: "https://docs.google.com/forms/d/e/1FAIpQLSe...",
      instagramLink: "https://www.instagram.com/sdsuama/",
      instagramUsername: "@sdsuama",
      instagramFollowers: "2,774 followers",
      linkedinLink: "https://www.linkedin.com/company/sdsuama",
      linkedinUsername: "AMA San Diego State",
      tiktokLink: "https://www.tiktok.com/@sdsuama",
      tiktokUsername: "@sdsuama",
      spotifyLink: "https://open.spotify.com/show/2LsTf0B9ohPZ",
      email: "membership.sdsuama@gmail.com"
    };
    
    // Initialize with sample events
    const sampleEvents: InsertEvent[] = [
      {
        title: "GBM #4 with Phil Hahn",
        description: "Join us for our fourth General Body Meeting featuring Phil Hahn, a marketing industry expert who will share insights on career development and industry trends.",
        date: "2025-11-15",
        time: "5:00 PM",
        location: "Hillel of San Diego",
        category: "Weekly Meeting"
      },
      {
        title: "Marketing Week: Day 1",
        description: "Polish Your Presence: Resume & LinkedIn Workshop with industry speakers. Learn how to create a compelling professional presence.",
        date: "2025-11-20",
        time: "9:00 AM",
        location: "TBD",
        category: "Professional Development"
      },
      {
        title: "Marketing Week: Day 2",
        description: "Industry Insights: Personal Branding. Discover how to build and maintain your personal brand in the digital age.",
        date: "2025-11-21",
        time: "2:00 PM",
        location: "TBD",
        category: "Professional Development"
      },
      {
        title: "Marketing Week: Day 3",
        description: "Ace the Interview: Mock Interviews + Tips. Practice your interviewing skills with marketing professionals and get valuable feedback.",
        date: "2025-11-22",
        time: "4:00 PM",
        location: "TBD",
        category: "Professional Development"
      }
    ];
    
    sampleEvents.forEach(event => {
      const id = randomUUID();
      this.events.set(id, {
        ...event,
        id,
        createdAt: new Date()
      });
    });
    
    // Initialize with sample highlights
    const sampleHighlights: InsertHighlight[] = [
      {
        title: "New Executive Board",
        description: "Meet the new leadership team for the 2024-2025 academic year.",
        category: "Announcement",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
      },
      {
        title: "AMA Exec '25 Photos",
        description: "Check out photos from our latest executive board photoshoot and team building event.",
        category: "Event",
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop"
      }
    ];
    
    sampleHighlights.forEach(highlight => {
      const id = randomUUID();
      this.highlights.set(id, {
        ...highlight,
        id,
        createdAt: new Date()
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Settings methods
  async getSettings(): Promise<Settings | undefined> {
    return this.settings || undefined;
  }

  async updateSettings(settings: InsertSettings): Promise<Settings> {
    const updated: Settings = {
      id: this.settings?.id || "default",
      ...settings
    };
    this.settings = updated;
    return updated;
  }

  // Events methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const newEvent: Event = {
      ...event,
      id,
      createdAt: new Date()
    };
    this.events.set(id, newEvent);
    return newEvent;
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const existing = this.events.get(id);
    if (!existing) return undefined;
    
    const updated: Event = {
      ...existing,
      ...event
    };
    this.events.set(id, updated);
    return updated;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }

  // Highlights methods
  async getAllHighlights(): Promise<Highlight[]> {
    return Array.from(this.highlights.values());
  }

  async getHighlight(id: string): Promise<Highlight | undefined> {
    return this.highlights.get(id);
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const id = randomUUID();
    const newHighlight: Highlight = {
      ...highlight,
      id,
      createdAt: new Date()
    };
    this.highlights.set(id, newHighlight);
    return newHighlight;
  }

  async deleteHighlight(id: string): Promise<boolean> {
    return this.highlights.delete(id);
  }

  // Newsletter subscription methods
  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values());
  }

  async getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined> {
    return this.newsletterSubscriptions.get(email);
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const newSubscription: NewsletterSubscription = {
      ...subscription,
      id,
      subscribedAt: new Date()
    };
    this.newsletterSubscriptions.set(subscription.email, newSubscription);
    return newSubscription;
  }

  async deleteNewsletterSubscription(id: string): Promise<boolean> {
    for (const [email, subscription] of this.newsletterSubscriptions.entries()) {
      if (subscription.id === id) {
        this.newsletterSubscriptions.delete(email);
        return true;
      }
    }
    return false;
  }
}

// Database storage using PostgreSQL
export class DbStorage implements IStorage {
  private db;

  constructor() {
    const sql = neon(process.env.DATABASE_URL!);
    this.db = drizzle(sql);
  }

  async initialize() {
    // Check if admin user exists, if not create it
    const adminUser = await this.getUserByUsername("admin");
    if (!adminUser) {
      // createUser() will hash the password, so pass plaintext here
      await this.createUser({
        username: "admin",
        password: "admin123"
      });
    }

    // Initialize default settings if they don't exist
    const existingSettings = await this.getSettings();
    if (!existingSettings) {
      await this.db.insert(settingsTable).values({
        heroDescription: "Aiming to educate and empower young professionals looking to break into the marketing, sales, and advertising industries. At SDSU AMA we accomplish this through weekly meetings with industry professional guest speakers and elite marketing company and agency tours. We promote growth and learning through case studies, workshops, and events. Open to SDSU students of all majors and invites you to connect with our fAMAly!",
        memberCount: 280,
        meetingDay: "Tuesday",
        meetingTime: "5:00 PM",
        meetingLocation: "On Campus",
        meetingRoom: "Varies",
        meetingSemester: "Fall & Spring Semesters",
        joinLink: "https://docs.google.com/forms/d/e/1FAIpQLSe...",
        instagramLink: "https://www.instagram.com/sdsuama/",
        instagramUsername: "@sdsuama",
        instagramFollowers: "2,774 followers",
        linkedinLink: "https://www.linkedin.com/company/sdsuama",
        linkedinUsername: "AMA San Diego State",
        tiktokLink: "https://www.tiktok.com/@sdsuama",
        tiktokUsername: "@sdsuama",
        spotifyLink: "https://open.spotify.com/show/2LsTf0B9ohPZ",
        email: "membership.sdsuama@gmail.com"
      });

      // Add sample events
      await this.db.insert(events).values([
        {
          title: "GBM #4 with Phil Hahn",
          description: "Join us for our fourth General Body Meeting featuring Phil Hahn, a marketing industry expert who will share insights on career development and industry trends.",
          date: "2025-11-15",
          time: "5:00 PM",
          location: "Hillel of San Diego",
          category: "Weekly Meeting"
        },
        {
          title: "Marketing Week: Day 1",
          description: "Polish Your Presence: Resume & LinkedIn Workshop with industry speakers. Learn how to create a compelling professional presence.",
          date: "2025-11-20",
          time: "9:00 AM",
          location: "TBD",
          category: "Professional Development"
        },
        {
          title: "Marketing Week: Day 2",
          description: "Industry Insights: Personal Branding. Discover how to build and maintain your personal brand in the digital age.",
          date: "2025-11-21",
          time: "2:00 PM",
          location: "TBD",
          category: "Professional Development"
        },
        {
          title: "Marketing Week: Day 3",
          description: "Ace the Interview: Mock Interviews + Tips. Practice your interviewing skills with marketing professionals and get valuable feedback.",
          date: "2025-11-22",
          time: "4:00 PM",
          location: "TBD",
          category: "Professional Development"
        }
      ]);

      // Add sample highlights
      await this.db.insert(highlights).values([
        {
          title: "New Executive Board",
          description: "Meet the new leadership team for the 2024-2025 academic year.",
          category: "Announcement",
          imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
        },
        {
          title: "AMA Exec '25 Photos",
          description: "Check out photos from our latest executive board photoshoot and team building event.",
          category: "Event",
          imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop"
        }
      ]);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const result = await this.db.insert(users).values({
      ...insertUser,
      password: hashedPassword
    }).returning();
    return result[0];
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = await this.getUserByUsername(username);
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }

  // Settings methods
  async getSettings(): Promise<Settings | undefined> {
    const result = await this.db.select().from(settingsTable).limit(1);
    return result[0];
  }

  async updateSettings(settings: InsertSettings): Promise<Settings> {
    const existing = await this.getSettings();
    if (existing) {
      const result = await this.db
        .update(settingsTable)
        .set(settings)
        .where(eq(settingsTable.id, existing.id))
        .returning();
      return result[0];
    }
    const result = await this.db.insert(settingsTable).values(settings).returning();
    return result[0];
  }

  // Events methods
  async getAllEvents(): Promise<Event[]> {
    return await this.db.select().from(events);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await this.db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await this.db.insert(events).values(event).returning();
    return result[0];
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const result = await this.db
      .update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await this.db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }

  // Highlights methods
  async getAllHighlights(): Promise<Highlight[]> {
    return await this.db.select().from(highlights);
  }

  async getHighlight(id: string): Promise<Highlight | undefined> {
    const result = await this.db.select().from(highlights).where(eq(highlights.id, id));
    return result[0];
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const result = await this.db.insert(highlights).values(highlight).returning();
    return result[0];
  }

  async deleteHighlight(id: string): Promise<boolean> {
    const result = await this.db.delete(highlights).where(eq(highlights.id, id)).returning();
    return result.length > 0;
  }

  // Newsletter subscription methods
  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await this.db.select().from(newsletterSubscriptions);
  }

  async getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined> {
    const result = await this.db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return result[0];
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const result = await this.db.insert(newsletterSubscriptions).values(subscription).returning();
    return result[0];
  }

  async deleteNewsletterSubscription(id: string): Promise<boolean> {
    const result = await this.db.delete(newsletterSubscriptions).where(eq(newsletterSubscriptions.id, id)).returning();
    return result.length > 0;
  }
  
  // Executive Members management
  async getAllExecutiveMembers(): Promise<ExecutiveMember[]> {
    // Order by displayOrder only - team order is derived from member order
    // First member of each team determines that team's position
    const members = await this.db.select().from(executiveMembers).orderBy(executiveMembers.displayOrder);
    return members;
  }

  async getExecutiveMember(id: string): Promise<ExecutiveMember | undefined> {
    const result = await this.db.select().from(executiveMembers).where(eq(executiveMembers.id, id));
    return result[0];
  }

  async createExecutiveMember(member: InsertExecutiveMember): Promise<ExecutiveMember> {
    const result = await this.db.insert(executiveMembers).values(member).returning();
    return result[0];
  }

  async updateExecutiveMember(id: string, member: Partial<InsertExecutiveMember>): Promise<ExecutiveMember | undefined> {
    const result = await this.db.update(executiveMembers)
      .set(member)
      .where(eq(executiveMembers.id, id))
      .returning();
    return result[0];
  }

  async deleteExecutiveMember(id: string): Promise<boolean> {
    const result = await this.db.delete(executiveMembers).where(eq(executiveMembers.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateMemberDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    // Execute all updates in a transaction for consistency
    for (const update of updates) {
      console.log(`[STORAGE] Updating member ${update.id} with displayOrder:`, update.displayOrder, `(type: ${typeof update.displayOrder})`);
      await this.db.update(executiveMembers)
        .set({ displayOrder: update.displayOrder })
        .where(eq(executiveMembers.id, update.id));
    }
  }
  
  // Sponsors management
  async getAllSponsors(): Promise<Sponsor[]> {
    const sponsorList = await this.db.select().from(sponsors).orderBy(sponsors.displayOrder);
    return sponsorList;
  }

  async getSponsor(id: string): Promise<Sponsor | undefined> {
    const result = await this.db.select().from(sponsors).where(eq(sponsors.id, id));
    return result[0];
  }

  async createSponsor(sponsor: InsertSponsor): Promise<Sponsor> {
    const result = await this.db.insert(sponsors).values(sponsor).returning();
    return result[0];
  }

  async updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined> {
    const result = await this.db.update(sponsors)
      .set(sponsor)
      .where(eq(sponsors.id, id))
      .returning();
    return result[0];
  }

  async deleteSponsor(id: string): Promise<boolean> {
    const result = await this.db.delete(sponsors).where(eq(sponsors.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateSponsorDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    for (const update of updates) {
      await this.db.update(sponsors)
        .set({ displayOrder: update.displayOrder })
        .where(eq(sponsors.id, update.id));
    }
  }
  
  // Slideshows management
  async getAllSlideshows(): Promise<Slideshow[]> {
    const slideshowList = await this.db.select().from(slideshows).orderBy(slideshows.displayOrder);
    return slideshowList;
  }

  async getSlideshow(id: string): Promise<Slideshow | undefined> {
    const result = await this.db.select().from(slideshows).where(eq(slideshows.id, id));
    return result[0];
  }

  async createSlideshow(slideshow: InsertSlideshow): Promise<Slideshow> {
    const result = await this.db.insert(slideshows).values(slideshow).returning();
    return result[0];
  }

  async updateSlideshow(id: string, slideshow: Partial<InsertSlideshow>): Promise<Slideshow | undefined> {
    const result = await this.db.update(slideshows)
      .set(slideshow)
      .where(eq(slideshows.id, id))
      .returning();
    return result[0];
  }

  async deleteSlideshow(id: string): Promise<boolean> {
    const result = await this.db.delete(slideshows).where(eq(slideshows.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateSlideshowDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    for (const update of updates) {
      await this.db.update(slideshows)
        .set({ displayOrder: update.displayOrder })
        .where(eq(slideshows.id, update.id));
    }
  }
  
  // Slideshow Slides management
  async getAllSlides(slideshowId: string): Promise<SlideshowSlide[]> {
    const slideList = await this.db.select().from(slideshowSlides)
      .where(eq(slideshowSlides.slideshowId, slideshowId))
      .orderBy(slideshowSlides.displayOrder);
    return slideList;
  }

  async getSlide(id: string): Promise<SlideshowSlide | undefined> {
    const result = await this.db.select().from(slideshowSlides).where(eq(slideshowSlides.id, id));
    return result[0];
  }

  async createSlide(slide: InsertSlideshowSlide): Promise<SlideshowSlide> {
    const result = await this.db.insert(slideshowSlides).values(slide).returning();
    return result[0];
  }

  async updateSlide(id: string, slide: Partial<InsertSlideshowSlide>): Promise<SlideshowSlide | undefined> {
    const result = await this.db.update(slideshowSlides)
      .set(slide)
      .where(eq(slideshowSlides.id, id))
      .returning();
    return result[0];
  }

  async deleteSlide(id: string): Promise<boolean> {
    const result = await this.db.delete(slideshowSlides).where(eq(slideshowSlides.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateSlideDisplayOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    for (const update of updates) {
      await this.db.update(slideshowSlides)
        .set({ displayOrder: update.displayOrder })
        .where(eq(slideshowSlides.id, update.id));
    }
  }
  
  // Portfolio Clients management
  async getAllPortfolioClients(): Promise<PortfolioClient[]> {
    const clients = await this.db.select().from(portfolioClients).orderBy(portfolioClients.displayOrder);
    return clients;
  }

  async createPortfolioClient(client: InsertPortfolioClient): Promise<PortfolioClient> {
    const result = await this.db.insert(portfolioClients).values(client).returning();
    return result[0];
  }

  async updatePortfolioClient(id: string, client: Partial<InsertPortfolioClient>): Promise<PortfolioClient | undefined> {
    const result = await this.db.update(portfolioClients)
      .set(client)
      .where(eq(portfolioClients.id, id))
      .returning();
    return result[0];
  }

  async deletePortfolioClient(id: string): Promise<boolean> {
    const result = await this.db.delete(portfolioClients).where(eq(portfolioClients.id, id)).returning();
    return result.length > 0;
  }
  
  // Alumni Spotlight management
  async getAllAlumniSpotlight(): Promise<AlumniSpotlight[]> {
    const alumni = await this.db.select().from(alumniSpotlight).orderBy(alumniSpotlight.displayOrder);
    return alumni;
  }

  async createAlumniSpotlight(alumni: InsertAlumniSpotlight): Promise<AlumniSpotlight> {
    const result = await this.db.insert(alumniSpotlight).values(alumni).returning();
    return result[0];
  }

  async updateAlumniSpotlight(id: string, alumni: Partial<InsertAlumniSpotlight>): Promise<AlumniSpotlight | undefined> {
    const result = await this.db.update(alumniSpotlight)
      .set(alumni)
      .where(eq(alumniSpotlight.id, id))
      .returning();
    return result[0];
  }

  async deleteAlumniSpotlight(id: string): Promise<boolean> {
    const result = await this.db.delete(alumniSpotlight).where(eq(alumniSpotlight.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateAlumniSpotlightOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    for (const update of updates) {
      await this.db.update(alumniSpotlight)
        .set({ displayOrder: update.displayOrder })
        .where(eq(alumniSpotlight.id, update.id));
    }
  }
  
  // Featured Speakers management
  async getAllFeaturedSpeakers(): Promise<FeaturedSpeaker[]> {
    const speakers = await this.db.select().from(featuredSpeakers).orderBy(featuredSpeakers.displayOrder);
    return speakers;
  }

  async createFeaturedSpeaker(speaker: InsertFeaturedSpeaker): Promise<FeaturedSpeaker> {
    const result = await this.db.insert(featuredSpeakers).values(speaker).returning();
    return result[0];
  }

  async updateFeaturedSpeaker(id: string, speaker: Partial<InsertFeaturedSpeaker>): Promise<FeaturedSpeaker | undefined> {
    const result = await this.db.update(featuredSpeakers)
      .set(speaker)
      .where(eq(featuredSpeakers.id, id))
      .returning();
    return result[0];
  }

  async deleteFeaturedSpeaker(id: string): Promise<boolean> {
    const result = await this.db.delete(featuredSpeakers).where(eq(featuredSpeakers.id, id)).returning();
    return result.length > 0;
  }

  async bulkUpdateFeaturedSpeakersOrder(updates: Array<{ id: string; displayOrder: number }>): Promise<void> {
    for (const update of updates) {
      await this.db.update(featuredSpeakers)
        .set({ displayOrder: update.displayOrder })
        .where(eq(featuredSpeakers.id, update.id));
    }
  }
  
  // Committee Configs management
  async getAllCommitteeConfigs(): Promise<CommitteeConfig[]> {
    const configs = await this.db.select().from(committeeConfigs).orderBy(committeeConfigs.displayOrder);
    return configs;
  }

  async getCommitteeConfigBySlug(slug: string): Promise<CommitteeConfig | undefined> {
    const result = await this.db.select().from(committeeConfigs).where(eq(committeeConfigs.slug, slug));
    return result[0];
  }

  async createCommitteeConfig(config: InsertCommitteeConfig): Promise<CommitteeConfig> {
    const result = await this.db.insert(committeeConfigs).values(config).returning();
    return result[0];
  }

  async updateCommitteeConfig(slug: string, config: Partial<InsertCommitteeConfig>): Promise<CommitteeConfig | undefined> {
    const result = await this.db.update(committeeConfigs)
      .set(config)
      .where(eq(committeeConfigs.slug, slug))
      .returning();
    return result[0];
  }

  async deleteCommitteeConfig(slug: string): Promise<boolean> {
    const result = await this.db.delete(committeeConfigs).where(eq(committeeConfigs.slug, slug)).returning();
    return result.length > 0;
  }
}

// Use database storage
export const storage = new DbStorage();
