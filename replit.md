# AMA SDSU Website

## Overview
The AMA SDSU website is a full-stack web application serving as the digital hub for the American Marketing Association chapter at San Diego State University. Its purpose is to showcase the organization's achievements, promote events, manage member engagement, and provide administrative capabilities. The platform features a modern, professional design, aiming to be a comprehensive resource for members and a representation of the chapter's brand and success.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React with TypeScript, using Vite for tooling.
- **Routing:** React Router (Wouter) for client-side navigation.
- **UI/UX:** Shadcn UI (new-york style) built on Radix UI, styled with Tailwind CSS. Custom color system with CSS variables (HSL). Professional fonts (Inter/Roboto for body, Poppins/Montserrat for headings). Responsive-first design.
- **State Management:** TanStack Query for server state; component-level state with hooks for client state.
- **Key Design Decisions:** Component aliasing, clear separation of public and admin interfaces, toast notifications for user feedback.
- **Features:**
    - Professional image upload system with built-in cropping (`react-easy-crop`) and secure admin-only access for both site images and member profiles.
    - Executive Board member management with full CRUD operations, team-based organization, profile image uploads with circular cropping, dynamic public display, and drag-and-drop reordering.
    - Drag-and-drop functionality using `@dnd-kit` libraries for reordering both executive board teams and members within teams, with persistent storage via bulk update API endpoint.
    - Scroll-triggered reveal animations using `framer-motion` via `ScrollReveal` component for enhanced user experience across multiple pages (About Us, Committees).
    - Comprehensive navigation structure with a three-tiered dropdown system, mobile-responsive, covering "About Us," "Get Involved," and "Alumni" sections.
    - Dedicated pages for Contact (with form, social links, FAQs), Membership (tiers, benefits, how to join), Resources (national AMA links), Alumni (spotlight, mentorship), Executive Board (team-organized member display), Sponsors (partner collaborations and partnerships), and Committees (with detailed committee information and scroll-triggered reveals).
    - Homepage enhancements including "Our Chapter" section, "Chapter History & Impact," "Partners & Collaborations," "Weekly Meetings," and "Committees" grid.
    - Sponsors page with professional hero section, multiple brand-specific slideshow carousels with auto-rotation, benefits section, and partnership CTA.
    - Slideshow system: Multiple brand-specific carousels on sponsors page, each with its own title and image-only slides. Full CRUD management via admin dashboard with drag-and-drop ordering for both slideshows and slides. Features Embla Carousel with auto-rotation (5-second intervals), manual dot navigation, 16:9 aspect ratio slides, and gradient overlays.
    - Committees page: Professional layout featuring hero section with portfolio banner, committee cards grid (Consulting, Event Planning, Podcast, Adobe, Sales, Competitions, Multimedia) with detailed descriptions and "Why Join" sections, two admin-customizable images (one next to Multimedia committee card, one next to "Why Join a Committee" benefits section), commitment card in 2-column layout, and CTA section. All sections enhanced with ScrollReveal animations matching About Us page design pattern.
    - Consulting Committee detail page (`/committees/consulting`): Dedicated page featuring hero section with back navigation, building icon, gold "Committee" accent text, tagline, hands-on experience highlight card, admin-customizable team photo with "Consulting Directors" label; Our Mission section with dark blue card and admin-customizable "Collaborative Learning" image overlay; Why Join section with three benefit cards (Networking, Experience highlighted, Skills) in gold accents; Client Portfolio section displaying past clients organized by semester with clickable links; How to Join section with numbered steps and "For Businesses" contact card; Ready to Start CTA. Fully dark-mode compatible with explicit light/dark variants for all custom colors (#D4A574 gold accent). Scrolls to top when page loads. All images controllable via admin dashboard.

### Backend
- **Framework:** Express.js with TypeScript on Node.js.
- **API Design:** RESTful API with endpoints for settings, events, highlights, newsletter, admin, executive members (including bulk reorder endpoint), sponsors (with full CRUD and bulk reorder endpoint), slideshows (with full CRUD and bulk reorder endpoint), and object storage.
- **Authentication:** Session-based authentication using `express-session` with HTTP-only cookies; `requireAuth` middleware for admin routes.
- **Database:** Drizzle ORM with PostgreSQL dialect (configured for Neon Database).
- **Schema:** Tables for `settings` (site configuration, images including sponsor page images, committees page images, and consulting committee page images), `events`, `highlights`, `newsletter_subscriptions`, `users` (admin accounts with bcrypt hashed passwords), `executiveMembers` (board members with team organization and displayOrder for custom sorting), `sponsors` (partner organizations with name, category, description, image, and displayOrder for carousel sorting), `slideshows` (brand-specific slideshow collections with title and displayOrder), and `slideshowSlides` (individual slides within slideshows with image URL and displayOrder, cascade delete on parent slideshow removal).
- **Key Design Decisions:** Middleware for request logging, environment-specific configurations, Drizzle ORM with Zod validation. Executive member ordering uses displayOrder field exclusively—team order is derived from member order, not alphabetically, ensuring consistency between admin panel and public website. Specific routes (like `/reorder`) must be defined before parameterized routes (like `/:id`) in Express routing.
- **Image Upload System:** Three dedicated upload components:
  - `ImageUploadWithCrop`: For site-wide images (hero sections, sponsor images, committees images, consulting committee images, etc.) with configurable aspect ratios, uploads via `/api/objects/upload`, normalizes URLs via `/api/chapter-images`. Supports multiple image types including hero, mission, whyChoose, services, family, executiveBoard, sponsorsHero, sponsorsPartner1, sponsorsPartner2, committees, committeesWhyJoin, consultingTeam, and consultingMission.
  - `MemberImageUpload`: For executive member profile pictures with 1:1 circular crop, stores normalized `/objects/xxx` paths directly in database.
  - `SlideImageUpload`: For slideshow slide images with 16:9 aspect ratio cropping, uses per-instance refs to support multiple instances on same page, stores normalized `/objects/xxx` paths directly in database.

## External Dependencies
- **Database:** Neon Database (PostgreSQL-compatible serverless) via `@neondatabase/serverless`.
- **Object Storage:** Replit Object Storage (Google Cloud Storage backend) via `@google-cloud/storage` for admin-uploaded images.
- **UI Components:** Radix UI, Shadcn UI, Embla Carousel (with Autoplay plugin), React Hook Form, Zod, Lucide React, React Icons.
- **Drag & Drop:** `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` for drag-and-drop reordering of executive board teams/members, sponsors, slideshows, and slides within slideshows.
- **Development Tools:** Vite, ESBuild, TypeScript.
- **Fonts:** Google Fonts (Inter, Poppins).
- **Session Management:** `connect-pg-simple` (available for PostgreSQL-backed sessions, currently using in-memory).
- **Social Media:** Instagram, LinkedIn, TikTok, Spotify (links configurable).