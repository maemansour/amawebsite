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
  type InsertNewsletterSubscription
} from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export const storage = new MemStorage();
