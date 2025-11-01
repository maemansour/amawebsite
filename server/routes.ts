import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { 
  insertSettingsSchema, 
  insertEventSchema, 
  insertHighlightSchema,
  insertNewsletterSubscriptionSchema 
} from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
