import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertSettingsSchema, 
  insertEventSchema, 
  insertHighlightSchema,
  insertNewsletterSubscriptionSchema,
  insertExecutiveMemberSchema
} from "@shared/schema";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";

// Extend session data to include userId
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "ama-sdsu-secret-key-change-in-production",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
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

  // ===== ADMIN AUTH ROUTES =====
  
  // POST login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }
      
      const isValid = await storage.verifyPassword(username, password);
      
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.session.userId = user.id;
      res.json({ message: "Login successful", user: { id: user.id, username: user.username } });
    } catch (error) {
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
    if (req.session.userId) {
      res.json({ authenticated: true, userId: req.session.userId });
    } else {
      res.json({ authenticated: false });
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

  const httpServer = createServer(app);

  return httpServer;
}
