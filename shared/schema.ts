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
  // Executive Board page images
  executiveBoardHeroImage: text("executive_board_hero_image").notNull().default("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"),
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
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin").notNull(),
  imageUrl: text("image_url").notNull(),
  displayOrder: integer("display_order").notNull().default(0), // For ordering within team
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExecutiveMemberSchema = createInsertSchema(executiveMembers).omit({ 
  id: true, 
  createdAt: true 
});
export type InsertExecutiveMember = z.infer<typeof insertExecutiveMemberSchema>;
export type ExecutiveMember = typeof executiveMembers.$inferSelect;
