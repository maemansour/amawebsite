import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertSettingsSchema, 
  insertEventSchema, 
  insertHighlightSchema,
  insertNewsletterSubscriptionSchema,
  insertExecutiveMemberSchema,
  insertFeaturedSpeakerSchema,
  insertCommitteeConfigSchema
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

// Extend session data to include userId
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration with PostgreSQL-backed storage
  // Detect if we're on a deployed Replit site (uses HTTPS) or truly in local dev
  const isReplitDeployment = process.env.REPL_ID !== undefined;
  const isProduction = process.env.NODE_ENV === "production";
  const useSecureCookies = isReplitDeployment || isProduction;
  
  console.log("[SESSION CONFIG] Environment detection:");
  console.log("  - REPL_ID exists:", !!process.env.REPL_ID);
  console.log("  - NODE_ENV:", process.env.NODE_ENV);
  console.log("  - isReplitDeployment:", isReplitDeployment);
  console.log("  - useSecureCookies:", useSecureCookies);
  console.log("  - DATABASE_URL exists:", !!process.env.DATABASE_URL);
  
  const PgSession = connectPgSimple(session);
  
  // Create PostgreSQL session store with error handling
  const sessionStore = new PgSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: false // Neon handles SSL internally
    },
    tableName: 'session', // Session table name
    createTableIfMissing: true, // Auto-create session table
  });
  
  // Add error handler for session store
  sessionStore.on('error', (error) => {
    console.error("[SESSION STORE] Error:", error);
  });
  
  sessionStore.on('connect', () => {
    console.log("[SESSION STORE] Successfully connected to PostgreSQL");
  });
  
  app.use(
    session({
      store: sessionStore, // Use PostgreSQL for session persistence
      secret: process.env.SESSION_SECRET || "ama-sdsu-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: useSecureCookies, // Use secure cookies on Replit deployments and production
        httpOnly: true,
        sameSite: useSecureCookies ? 'none' : 'lax', // Use 'none' for HTTPS deployments to allow cookies during redirects
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Middleware to check admin authentication
  function requireAuth(req: any, res: any, next: any) {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  // ===== SETTINGS ROUTES =====
  
  // GET settings
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      if (!settings) {
        return res.status(404).json({ message: "Settings not found" });
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // PUT settings (admin only)
  app.put("/api/settings", requireAuth, async (req, res) => {
    try {
      const validatedData = insertSettingsSchema.parse(req.body);
      const updated = await storage.updateSettings(validatedData);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid settings data", error });
    }
  });

  // ===== EVENTS ROUTES =====
  
  // GET all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // GET single event
  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  // POST create event (admin only)
  app.post("/api/events", requireAuth, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data", error });
    }
  });

  // PUT update event (admin only)
  app.put("/api/events/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertEventSchema.partial().parse(req.body);
      const updated = await storage.updateEvent(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data", error });
    }
  });

  // DELETE event (admin only)
  app.delete("/api/events/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteEvent(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // ===== HIGHLIGHTS ROUTES =====
  
  // GET all highlights
  app.get("/api/highlights", async (req, res) => {
    try {
      const highlights = await storage.getAllHighlights();
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  // GET single highlight
  app.get("/api/highlights/:id", async (req, res) => {
    try {
      const highlight = await storage.getHighlight(req.params.id);
      if (!highlight) {
        return res.status(404).json({ message: "Highlight not found" });
      }
      res.json(highlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch highlight" });
    }
  });

  // POST create highlight (admin only)
  app.post("/api/highlights", requireAuth, async (req, res) => {
    try {
      const validatedData = insertHighlightSchema.parse(req.body);
      const highlight = await storage.createHighlight(validatedData);
      res.status(201).json(highlight);
    } catch (error) {
      res.status(400).json({ message: "Invalid highlight data", error });
    }
  });

  // DELETE highlight (admin only)
  app.delete("/api/highlights/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteHighlight(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Highlight not found" });
      }
      res.json({ message: "Highlight deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete highlight" });
    }
  });

  // ===== NEWSLETTER ROUTES =====
  
  // POST newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(validatedData.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Invalid subscription data", error });
    }
  });

  // GET all newsletter subscriptions (admin only)
  app.get("/api/newsletter/subscriptions", requireAuth, async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  // DELETE newsletter subscription (admin only)
  app.delete("/api/newsletter/subscriptions/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteNewsletterSubscription(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete subscription" });
    }
  });

  // ===== ADMIN AUTH ROUTES =====
  
  // POST login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      console.log("[LOGIN] Attempt for username:", username);
      console.log("[LOGIN] Request headers:", req.headers);
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const isValid = await storage.verifyPassword(username, password);
      
      if (!isValid) {
        console.log("[LOGIN] Invalid credentials for:", username);
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        console.log("[LOGIN] User not found:", username);
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      
      console.log("[LOGIN] Session ID before save:", req.sessionID);
      console.log("[LOGIN] Session data before save:", req.session);
      
      // Explicitly save the session before sending response
      req.session.save((err) => {
        if (err) {
          console.error("[LOGIN] Session save error:", err);
          return res.status(500).json({ message: "Session save failed" });
        }
        
        console.log("[LOGIN] Session saved successfully!");
        console.log("[LOGIN] Session ID:", req.sessionID);
        console.log("[LOGIN] Session userId:", req.session.userId);
        console.log("[LOGIN] Response headers:", res.getHeaders());
        
        res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
      });
    } catch (error) {
      console.error("[LOGIN] Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // POST logout
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  // GET auth status
  app.get("/api/admin/status", (req, res) => {
    console.log("[AUTH STATUS] Request received");
    console.log("[AUTH STATUS] Session ID:", req.sessionID);
    console.log("[AUTH STATUS] Session data:", req.session);
    console.log("[AUTH STATUS] Session userId:", req.session.userId);
    console.log("[AUTH STATUS] Cookies:", req.headers.cookie);
    
    if (req.session.userId) {
      console.log("[AUTH STATUS] Authenticated: true");
      res.json({ authenticated: true, userId: req.session.userId });
    } else {
      console.log("[AUTH STATUS] Authenticated: false");
      res.json({ authenticated: false });
    }
  });

  // POST change password (admin only)
  app.post("/api/admin/change-password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.session.userId;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters" });
      }

      // Get the user to verify current password
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify current password
      const isValid = await storage.verifyPassword(user.username, currentPassword);
      if (!isValid) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Update to new password
      const success = await storage.updatePassword(userId, newPassword);
      if (!success) {
        return res.status(500).json({ message: "Failed to update password" });
      }

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // ===== OBJECT STORAGE ROUTES =====
  // Referenced from blueprint:javascript_object_storage
  
  // Serve public-visibility objects (admin-uploaded images)
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error serving object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // Get presigned upload URL (admin only)
  app.post("/api/objects/upload", requireAuth, async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      
      // Extract the permanent object URL by removing query parameters
      const objectURL = uploadURL.split('?')[0];
      
      // Normalize to /objects/xxx format for storage
      const normalizedPath = objectStorageService.normalizeObjectEntityPath(uploadURL);
      
      res.json({ uploadURL, objectURL, objectPath: normalizedPath });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  // Update Our Chapter page images (admin only)
  app.put("/api/chapter-images", requireAuth, async (req, res) => {
    const { imageType, imageURL } = req.body;
    
    if (!imageType || !imageURL) {
      return res.status(400).json({ error: "imageType and imageURL are required" });
    }

    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        imageURL,
        {
          owner: userId,
          visibility: "public",
        },
      );

      // Update settings with the new image path
      const fieldMap: Record<string, keyof typeof insertSettingsSchema.shape> = {
        hero: "ourChapterHeroImage",
        mission: "ourChapterMissionImage",
        whyChoose: "ourChapterWhyChooseImage",
        services: "ourChapterServicesImage",
        family: "familyImage",
        executiveBoard: "executiveBoardHeroImage",
        sponsorsHero: "sponsorsHeroImage",
        sponsorsPartner1: "sponsorsPartnerImage1",
        sponsorsPartner2: "sponsorsPartnerImage2",
        committees: "committeesImage",
        committeesWhyJoin: "committeesWhyJoinImage",
        consultingTeam: "consultingTeamImage",
        consultingMission: "consultingMissionImage",
        membershipHero: "membershipHeroImage",
        membershipEngagement: "membershipEngagementImage",
      };

      const fieldName = fieldMap[imageType];
      if (!fieldName) {
        return res.status(400).json({ error: "Invalid imageType" });
      }

      // Fetch current settings first
      const currentSettings = await storage.getSettings();
      if (!currentSettings) {
        return res.status(500).json({ error: "Settings not found" });
      }

      // Update with new image
      const updated = await storage.updateSettings({
        ...currentSettings,
        [fieldName]: objectPath,
      });
      
      res.status(200).json({
        objectPath,
        settings: updated,
      });
    } catch (error) {
      console.error("Error setting chapter image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Executive Members routes
  app.get("/api/executive-members", async (_, res) => {
    const members = await storage.getAllExecutiveMembers();
    res.json(members);
  });

  app.get("/api/executive-members/:id", async (req, res) => {
    const member = await storage.getExecutiveMember(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(member);
  });

  app.post("/api/executive-members", requireAuth, async (req, res) => {
    try {
      const validatedData = insertExecutiveMemberSchema.parse(req.body);
      const newMember = await storage.createExecutiveMember(validatedData);
      res.status(201).json(newMember);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid member data", details: error });
      }
      console.error("Error creating executive member:", error);
      res.status(500).json({ error: "Failed to create member" });
    }
  });

  // IMPORTANT: Reorder endpoint must come BEFORE :id routes to avoid Express matching "reorder" as an ID
  app.put("/api/executive-members/reorder", requireAuth, async (req, res) => {
    try {
      console.log("[REORDER] Received request body:", JSON.stringify(req.body, null, 2));
      
      // Validate the request body with Zod
      const reorderSchema = z.object({
        updates: z.array(
          z.object({
            id: z.string(),
            displayOrder: z.number().int().min(0),
          })
        ),
      });

      const validatedData = reorderSchema.parse(req.body);
      console.log("[REORDER] Validated data:", JSON.stringify(validatedData, null, 2));
      console.log("[REORDER] Number of updates:", validatedData.updates.length);
      
      await storage.bulkUpdateMemberDisplayOrder(validatedData.updates);
      console.log("[REORDER] Successfully updated member display order");
      res.json({ message: "Display order updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("[REORDER] Validation error:", error);
        return res.status(400).json({ error: "Invalid request data", details: error });
      }
      console.error("[REORDER] Error updating member display order:", error);
      res.status(500).json({ error: "Failed to update display order" });
    }
  });

  app.put("/api/executive-members/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertExecutiveMemberSchema.partial().parse(req.body);
      const updated = await storage.updateExecutiveMember(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid member data", details: error });
      }
      console.error("Error updating executive member:", error);
      res.status(500).json({ error: "Failed to update member" });
    }
  });

  app.delete("/api/executive-members/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteExecutiveMember(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting executive member:", error);
      res.status(500).json({ error: "Failed to delete member" });
    }
  });

  // Sponsors routes
  app.get("/api/sponsors", async (_, res) => {
    const sponsorsList = await storage.getAllSponsors();
    res.json(sponsorsList);
  });

  app.get("/api/sponsors/:id", async (req, res) => {
    const sponsor = await storage.getSponsor(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ error: "Sponsor not found" });
    }
    res.json(sponsor);
  });

  app.post("/api/sponsors", requireAuth, async (req, res) => {
    try {
      const { insertSponsorSchema } = await import("@shared/schema");
      const validatedData = insertSponsorSchema.parse(req.body);
      const newSponsor = await storage.createSponsor(validatedData);
      res.status(201).json(newSponsor);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid sponsor data", details: error });
      }
      console.error("Error creating sponsor:", error);
      res.status(500).json({ error: "Failed to create sponsor" });
    }
  });

  // IMPORTANT: Reorder endpoint must come BEFORE :id routes
  app.put("/api/sponsors/reorder", requireAuth, async (req, res) => {
    try {
      const reorderSchema = z.object({
        updates: z.array(
          z.object({
            id: z.string(),
            displayOrder: z.number().int().min(0),
          })
        ),
      });

      const validatedData = reorderSchema.parse(req.body);
      await storage.bulkUpdateSponsorDisplayOrder(validatedData.updates);
      res.json({ message: "Sponsor display order updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error });
      }
      console.error("Error updating sponsor display order:", error);
      res.status(500).json({ error: "Failed to update display order" });
    }
  });

  app.put("/api/sponsors/:id", requireAuth, async (req, res) => {
    try {
      const { insertSponsorSchema } = await import("@shared/schema");
      const validatedData = insertSponsorSchema.partial().parse(req.body);
      const updated = await storage.updateSponsor(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid sponsor data", details: error });
      }
      console.error("Error updating sponsor:", error);
      res.status(500).json({ error: "Failed to update sponsor" });
    }
  });

  app.delete("/api/sponsors/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSponsor(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      res.status(500).json({ error: "Failed to delete sponsor" });
    }
  });

  // Slideshows routes
  app.get("/api/slideshows", async (_, res) => {
    const slideshowsList = await storage.getAllSlideshows();
    res.json(slideshowsList);
  });

  app.get("/api/slideshows/:id", async (req, res) => {
    const slideshow = await storage.getSlideshow(req.params.id);
    if (!slideshow) {
      return res.status(404).json({ error: "Slideshow not found" });
    }
    res.json(slideshow);
  });

  app.post("/api/slideshows", requireAuth, async (req, res) => {
    try {
      const { insertSlideshowSchema } = await import("@shared/schema");
      const validatedData = insertSlideshowSchema.parse(req.body);
      const newSlideshow = await storage.createSlideshow(validatedData);
      res.status(201).json(newSlideshow);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid slideshow data", details: error });
      }
      console.error("Error creating slideshow:", error);
      res.status(500).json({ error: "Failed to create slideshow" });
    }
  });

  // IMPORTANT: Reorder endpoint must come BEFORE :id routes
  app.put("/api/slideshows/reorder", requireAuth, async (req, res) => {
    try {
      const reorderSchema = z.object({
        updates: z.array(
          z.object({
            id: z.string(),
            displayOrder: z.number().int().min(0),
          })
        ),
      });

      const validatedData = reorderSchema.parse(req.body);
      await storage.bulkUpdateSlideshowDisplayOrder(validatedData.updates);
      res.json({ message: "Slideshow display order updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error });
      }
      console.error("Error updating slideshow display order:", error);
      res.status(500).json({ error: "Failed to update display order" });
    }
  });

  app.put("/api/slideshows/:id", requireAuth, async (req, res) => {
    try {
      const { insertSlideshowSchema } = await import("@shared/schema");
      const validatedData = insertSlideshowSchema.partial().parse(req.body);
      const updated = await storage.updateSlideshow(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Slideshow not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid slideshow data", details: error });
      }
      console.error("Error updating slideshow:", error);
      res.status(500).json({ error: "Failed to update slideshow" });
    }
  });

  app.delete("/api/slideshows/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSlideshow(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Slideshow not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting slideshow:", error);
      res.status(500).json({ error: "Failed to delete slideshow" });
    }
  });

  // Slideshow Slides routes
  app.get("/api/slideshows/:slideshowId/slides", async (req, res) => {
    const slidesList = await storage.getAllSlides(req.params.slideshowId);
    res.json(slidesList);
  });

  app.get("/api/slides/:id", async (req, res) => {
    const slide = await storage.getSlide(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }
    res.json(slide);
  });

  app.post("/api/slides", requireAuth, async (req, res) => {
    try {
      const { insertSlideshowSlideSchema } = await import("@shared/schema");
      const validatedData = insertSlideshowSlideSchema.parse(req.body);
      const newSlide = await storage.createSlide(validatedData);
      res.status(201).json(newSlide);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid slide data", details: error });
      }
      console.error("Error creating slide:", error);
      res.status(500).json({ error: "Failed to create slide" });
    }
  });

  // IMPORTANT: Reorder endpoint must come BEFORE :id routes
  app.put("/api/slides/reorder", requireAuth, async (req, res) => {
    try {
      const reorderSchema = z.object({
        updates: z.array(
          z.object({
            id: z.string(),
            displayOrder: z.number().int().min(0),
          })
        ),
      });

      const validatedData = reorderSchema.parse(req.body);
      await storage.bulkUpdateSlideDisplayOrder(validatedData.updates);
      res.json({ message: "Slide display order updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error });
      }
      console.error("Error updating slide display order:", error);
      res.status(500).json({ error: "Failed to update display order" });
    }
  });

  app.put("/api/slides/:id", requireAuth, async (req, res) => {
    try {
      const { insertSlideshowSlideSchema } = await import("@shared/schema");
      const validatedData = insertSlideshowSlideSchema.partial().parse(req.body);
      const updated = await storage.updateSlide(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Slide not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid slide data", details: error });
      }
      console.error("Error updating slide:", error);
      res.status(500).json({ error: "Failed to update slide" });
    }
  });

  app.delete("/api/slides/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteSlide(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Slide not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting slide:", error);
      res.status(500).json({ error: "Failed to delete slide" });
    }
  });

  // Portfolio Clients routes
  app.get("/api/portfolio-clients", async (_, res) => {
    const clients = await storage.getAllPortfolioClients();
    res.json(clients);
  });

  app.post("/api/portfolio-clients", requireAuth, async (req, res) => {
    try {
      const { insertPortfolioClientSchema } = await import("@shared/schema");
      const validatedData = insertPortfolioClientSchema.parse(req.body);
      const newClient = await storage.createPortfolioClient(validatedData);
      res.status(201).json(newClient);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid portfolio client data", details: error });
      }
      console.error("Error creating portfolio client:", error);
      res.status(500).json({ error: "Failed to create portfolio client" });
    }
  });

  app.put("/api/portfolio-clients/:id", requireAuth, async (req, res) => {
    try {
      const { insertPortfolioClientSchema } = await import("@shared/schema");
      const validatedData = insertPortfolioClientSchema.partial().parse(req.body);
      const updated = await storage.updatePortfolioClient(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Portfolio client not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid portfolio client data", details: error });
      }
      console.error("Error updating portfolio client:", error);
      res.status(500).json({ error: "Failed to update portfolio client" });
    }
  });

  app.delete("/api/portfolio-clients/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deletePortfolioClient(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Portfolio client not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting portfolio client:", error);
      res.status(500).json({ error: "Failed to delete portfolio client" });
    }
  });

  // ===== ALUMNI SPOTLIGHT ROUTES =====
  
  // GET all alumni spotlight entries
  app.get("/api/alumni-spotlight", async (_, res) => {
    const alumni = await storage.getAllAlumniSpotlight();
    res.json(alumni);
  });

  // POST new alumni spotlight entry (admin only)
  app.post("/api/alumni-spotlight", requireAuth, async (req, res) => {
    try {
      const { insertAlumniSpotlightSchema } = await import("@shared/schema");
      const validatedData = insertAlumniSpotlightSchema.parse(req.body);
      const newAlumni = await storage.createAlumniSpotlight(validatedData);
      res.status(201).json(newAlumni);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid alumni spotlight data", details: error });
      }
      console.error("Error creating alumni spotlight:", error);
      res.status(500).json({ error: "Failed to create alumni spotlight entry" });
    }
  });

  // PUT update alumni spotlight entry (admin only)
  app.put("/api/alumni-spotlight/:id", requireAuth, async (req, res) => {
    try {
      const { insertAlumniSpotlightSchema } = await import("@shared/schema");
      const validatedData = insertAlumniSpotlightSchema.partial().parse(req.body);
      const updated = await storage.updateAlumniSpotlight(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Alumni spotlight entry not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid alumni spotlight data", details: error });
      }
      console.error("Error updating alumni spotlight:", error);
      res.status(500).json({ error: "Failed to update alumni spotlight entry" });
    }
  });

  // DELETE alumni spotlight entry (admin only)
  app.delete("/api/alumni-spotlight/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteAlumniSpotlight(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Alumni spotlight entry not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting alumni spotlight:", error);
      res.status(500).json({ error: "Failed to delete alumni spotlight entry" });
    }
  });

  // Bulk reorder alumni spotlight entries (admin only)
  app.post("/api/alumni-spotlight/reorder", requireAuth, async (req, res) => {
    try {
      const updates = z.array(z.object({
        id: z.string(),
        displayOrder: z.number()
      })).parse(req.body);
      
      await storage.bulkUpdateAlumniSpotlightOrder(updates);
      res.status(200).json({ message: "Alumni spotlight order updated successfully" });
    } catch (error) {
      console.error("Error reordering alumni spotlight:", error);
      res.status(500).json({ error: "Failed to reorder alumni spotlight" });
    }
  });

  // ===== FEATURED SPEAKERS ROUTES =====
  
  // GET all featured speakers
  app.get("/api/featured-speakers", async (_, res) => {
    const speakers = await storage.getAllFeaturedSpeakers();
    res.json(speakers);
  });

  // POST new featured speaker (admin only)
  app.post("/api/featured-speakers", requireAuth, async (req, res) => {
    try {
      const validatedData = insertFeaturedSpeakerSchema.parse(req.body);
      const speaker = await storage.createFeaturedSpeaker(validatedData);
      res.status(201).json(speaker);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid featured speaker data", details: error });
      }
      console.error("Error creating featured speaker:", error);
      res.status(500).json({ error: "Failed to create featured speaker" });
    }
  });

  // PUT update featured speaker (admin only)
  app.put("/api/featured-speakers/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertFeaturedSpeakerSchema.partial().parse(req.body);
      const updated = await storage.updateFeaturedSpeaker(req.params.id, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Featured speaker not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid featured speaker data", details: error });
      }
      console.error("Error updating featured speaker:", error);
      res.status(500).json({ error: "Failed to update featured speaker" });
    }
  });

  // DELETE featured speaker (admin only)
  app.delete("/api/featured-speakers/:id", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteFeaturedSpeaker(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Featured speaker not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting featured speaker:", error);
      res.status(500).json({ error: "Failed to delete featured speaker" });
    }
  });

  // Bulk reorder featured speakers (admin only)
  app.post("/api/featured-speakers/reorder", requireAuth, async (req, res) => {
    try {
      const updates = z.array(z.object({
        id: z.string(),
        displayOrder: z.number()
      })).parse(req.body);
      
      await storage.bulkUpdateFeaturedSpeakersOrder(updates);
      res.status(200).json({ message: "Featured speakers order updated successfully" });
    } catch (error) {
      console.error("Error reordering featured speakers:", error);
      res.status(500).json({ error: "Failed to reorder featured speakers" });
    }
  });

  // ===== COMMITTEE CONFIGS ROUTES =====

  // GET all committee configs
  app.get("/api/committees", async (_, res) => {
    const configs = await storage.getAllCommitteeConfigs();
    res.json(configs);
  });

  // GET committee config by slug
  app.get("/api/committees/:slug", async (req, res) => {
    const config = await storage.getCommitteeConfigBySlug(req.params.slug);
    if (!config) {
      return res.status(404).json({ error: "Committee not found" });
    }
    res.json(config);
  });

  // POST new committee config (admin only)
  app.post("/api/committees", requireAuth, async (req, res) => {
    try {
      const validatedData = insertCommitteeConfigSchema.parse(req.body);
      const config = await storage.createCommitteeConfig(validatedData);
      res.status(201).json(config);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid committee config data", details: error });
      }
      console.error("Error creating committee config:", error);
      res.status(500).json({ error: "Failed to create committee config" });
    }
  });

  // PUT update committee config (admin only)
  app.put("/api/committees/:slug", requireAuth, async (req, res) => {
    try {
      const validatedData = insertCommitteeConfigSchema.partial().parse(req.body);
      const updated = await storage.updateCommitteeConfig(req.params.slug, validatedData);
      if (!updated) {
        return res.status(404).json({ error: "Committee not found" });
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid committee config data", details: error });
      }
      console.error("Error updating committee config:", error);
      res.status(500).json({ error: "Failed to update committee config" });
    }
  });

  // DELETE committee config (admin only)
  app.delete("/api/committees/:slug", requireAuth, async (req, res) => {
    try {
      const deleted = await storage.deleteCommitteeConfig(req.params.slug);
      if (!deleted) {
        return res.status(404).json({ error: "Committee not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting committee config:", error);
      res.status(500).json({ error: "Failed to delete committee config" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
