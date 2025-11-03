import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Settings table - stores general site configuration
export const settings = pgTable("settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  heroDescription: text("hero_description").notNull(),
  memberCount: integer("member_count").notNull(),
  meetingDay: text("meeting_day").notNull(),
  meetingTime: text("meeting_time").notNull(),
  meetingLocation: text("meeting_location").notNull(),
  meetingRoom: text("meeting_room").notNull(),
  meetingSemester: text("meeting_semester").notNull(),
  joinLink: text("join_link").notNull(),
  instagramLink: text("instagram_link").notNull(),
  instagramUsername: text("instagram_username").notNull(),
  instagramFollowers: text("instagram_followers").notNull(),
  linkedinLink: text("linkedin_link").notNull(),
  linkedinUsername: text("linkedin_username").notNull(),
  tiktokLink: text("tiktok_link").notNull(),
  tiktokUsername: text("tiktok_username").notNull(),
  spotifyLink: text("spotify_link").notNull(),
  email: text("email").notNull(),
  // Our Chapter page images
  ourChapterHeroImage: text("our_chapter_hero_image").notNull().default("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"),
  ourChapterMissionImage: text("our_chapter_mission_image").notNull().default("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop"),
  ourChapterWhyChooseImage: text("our_chapter_why_choose_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  ourChapterServicesImage: text("our_chapter_services_image").notNull().default("https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop"),
  // Home page images
  familyImage: text("family_image").notNull().default("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop"),
  // Executive Board page images and content
  executiveBoardHeroImage: text("executive_board_hero_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  executiveBoardCaption: text("executive_board_caption").notNull().default("2024-2025 Leadership Team"),
  // Sponsors page images and content
  sponsorsHeroImage: text("sponsors_hero_image").notNull().default("https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"),
  sponsorsPartnerImage1: text("sponsors_partner_image_1").notNull().default("https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop"),
  sponsorsPartnerImage2: text("sponsors_partner_image_2").notNull().default("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"),
  // Committees page images
  committeesImage: text("committees_image").notNull().default("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"),
  committeesWhyJoinImage: text("committees_why_join_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  // Consulting Committee page images
  consultingTeamImage: text("consulting_team_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  consultingMissionImage: text("consulting_mission_image").notNull().default("https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"),
  // Consulting Committee apply link
  consultingApplyLink: text("consulting_apply_link").notNull().default(""),
  // Membership page images and pricing
  membershipHeroImage: text("membership_hero_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  membershipEngagementImage: text("membership_engagement_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
  semesterPrice: text("semester_price").notNull().default("49"),
  yearPrice: text("year_price").notNull().default("49"),
  joinNowLink: text("join_now_link").notNull().default(""),
});

export const insertSettingsSchema = createInsertSchema(settings).omit({ id: true });
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;

// Events table - stores all club events
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(), // Format: YYYY-MM-DD
  time: text("time").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(), // e.g., "Weekly Meeting", "Professional Development"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Highlights table - stores featured content for the carousel
export const highlights = pgTable("highlights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., "Announcement", "Event"
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertHighlightSchema = createInsertSchema(highlights).omit({ id: true, createdAt: true });
export type InsertHighlight = z.infer<typeof insertHighlightSchema>;
export type Highlight = typeof highlights.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({ 
  id: true, 
  subscribedAt: true 
});
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;

// Admin users (for password authentication)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Executive Board Members
export const executiveMembers = pgTable("executive_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  title: text("title").notNull(),
  team: text("team").notNull(), // e.g., "Executive Board", "Marketing Team", "Events Team"
  major: text("major").notNull(),
  year: text("year").notNull(), // e.g., "Senior", "Junior"
  bio: text("bio"),
  email: text("email"),
  linkedin: text("linkedin"),
  image: text("image"),
  displayOrder: integer("display_order").notNull().default(0), // For ordering within team
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExecutiveMemberSchema = createInsertSchema(executiveMembers).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertExecutiveMember = z.infer<typeof insertExecutiveMemberSchema>;
export type ExecutiveMember = typeof executiveMembers.$inferSelect;

// Sponsors table - stores sponsor/partner information for the carousel
export const sponsors = pgTable("sponsors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "Redbull"
  category: text("category").notNull(), // e.g., "GBM Sponsor", "Event Partner"
  description: text("description").notNull(), // e.g., "Collaboration with AMA SDSU"
  image: text("image"), // Sponsor logo/image
  displayOrder: integer("display_order").notNull().default(0), // For carousel ordering
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSponsorSchema = createInsertSchema(sponsors).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type Sponsor = typeof sponsors.$inferSelect;

// Slideshows table - stores slideshow collections for sponsors/brands
export const slideshows = pgTable("slideshows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(), // e.g., "Celsius", "LinkedIn"
  displayOrder: integer("display_order").notNull().default(0), // For ordering slideshows
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSlideshowSchema = createInsertSchema(slideshows).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertSlideshow = z.infer<typeof insertSlideshowSchema>;
export type Slideshow = typeof slideshows.$inferSelect;

// Slideshow Slides table - stores individual slides within a slideshow
export const slideshowSlides = pgTable("slideshow_slides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slideshowId: varchar("slideshow_id").notNull().references(() => slideshows.id, { onDelete: 'cascade' }),
  image: text("image").notNull(), // Slide image URL
  displayOrder: integer("display_order").notNull().default(0), // For ordering slides within slideshow
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSlideshowSlideSchema = createInsertSchema(slideshowSlides).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertSlideshowSlide = z.infer<typeof insertSlideshowSlideSchema>;
export type SlideshowSlide = typeof slideshowSlides.$inferSelect;

// Portfolio Clients table - stores consulting committee client portfolio entries
export const portfolioClients = pgTable("portfolio_clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  semester: text("semester").notNull(), // e.g., "Spring 2025", "Fall 2024"
  clientName: text("client_name").notNull(), // e.g., "FindGood.Tech"
  clientUrl: text("client_url").notNull(), // Client website URL
  displayOrder: integer("display_order").notNull().default(0), // For ordering clients
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertPortfolioClientSchema = createInsertSchema(portfolioClients).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertPortfolioClient = z.infer<typeof insertPortfolioClientSchema>;
export type PortfolioClient = typeof portfolioClients.$inferSelect;

// Alumni Spotlight table - stores featured alumni profiles
export const alumniSpotlight = pgTable("alumni_spotlight", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // e.g., "Jennifer Park"
  classYear: text("class_year").notNull(), // e.g., "Class of 2020"
  position: text("position").notNull(), // e.g., "Senior Brand Manager"
  company: text("company").notNull(), // e.g., "The Coca-Cola Company"
  description: text("description").notNull(), // Brief bio about their achievements
  imageUrl: text("image_url"), // Profile image URL (optional)
  linkedinUrl: text("linkedin_url"), // LinkedIn profile URL (optional)
  displayOrder: integer("display_order").notNull().default(0), // For ordering alumni
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAlumniSpotlightSchema = createInsertSchema(alumniSpotlight).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertAlumniSpotlight = z.infer<typeof insertAlumniSpotlightSchema>;
export type AlumniSpotlight = typeof alumniSpotlight.$inferSelect;
