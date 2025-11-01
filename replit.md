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
    - Professional image upload system for "Our Chapter" page with built-in cropping (`react-easy-crop`) and secure admin-only access.
    - Scroll-triggered animations using `framer-motion` for enhanced user experience.
    - Comprehensive navigation structure with a three-tiered dropdown system, mobile-responsive, covering "About Us," "Get Involved," and "Alumni" sections.
    - Dedicated pages for Contact (with form, social links, FAQs), Membership (tiers, benefits, how to join), Resources (national AMA links), Alumni (spotlight, mentorship), and individual Committee pages.
    - Homepage enhancements including "Our Chapter" section, "Chapter History & Impact," "Partners & Collaborations," "Weekly Meetings," and "Committees" grid.

### Backend
- **Framework:** Express.js with TypeScript on Node.js.
- **API Design:** RESTful API with endpoints for settings, events, highlights, newsletter, admin, and object storage.
- **Authentication:** Session-based authentication using `express-session` with HTTP-only cookies; `requireAuth` middleware for admin routes.
- **Database:** Drizzle ORM with PostgreSQL dialect (configured for Neon Database).
- **Schema:** Tables for `settings` (site configuration, images), `events`, `highlights`, `newsletter_subscriptions`, and `users` (admin accounts with bcrypt hashed passwords).
- **Key Design Decisions:** Middleware for request logging, environment-specific configurations, Drizzle ORM with Zod validation.

## External Dependencies
- **Database:** Neon Database (PostgreSQL-compatible serverless) via `@neondatabase/serverless`.
- **Object Storage:** Replit Object Storage (Google Cloud Storage backend) via `@google-cloud/storage` for admin-uploaded images.
- **UI Components:** Radix UI, Shadcn UI, Embla Carousel, React Hook Form, Zod, Lucide React, React Icons.
- **Development Tools:** Vite, ESBuild, TypeScript.
- **Fonts:** Google Fonts (Inter, Poppins).
- **Session Management:** `connect-pg-simple` (available for PostgreSQL-backed sessions, currently using in-memory).
- **Social Media:** Instagram, LinkedIn, TikTok, Spotify (links configurable).