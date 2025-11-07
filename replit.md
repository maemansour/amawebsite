# AMA SDSU Website

## Overview
The AMA SDSU website is a full-stack web application serving as the digital hub for the American Marketing Association chapter at San Diego State University. Its purpose is to showcase the organization's achievements, promote events, manage member engagement, and provide administrative capabilities. The platform aims to be a comprehensive resource for members and a representation of the chapter's brand and success.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework & UI:** React with TypeScript (Vite), Shadcn UI (New York style) built on Radix UI, styled with Tailwind CSS. Responsive-first design with custom CSS variables for coloring and professional fonts (Inter/Roboto, Poppins/Montserrat).
- **Routing & State:** React Router (Wouter) for navigation; TanStack Query for server state; component-level state for client state.
- **Key Features:**
    - Comprehensive navigation with multi-tiered dropdowns and mobile responsiveness.
    - Dedicated pages for Contact, Membership, Resources, Alumni (with spotlight and email collection), Executive Board, Sponsors, Committees, and an Event Calendar.
    - Admin-managed CRUD operations for Executive Board members (with drag-and-drop reordering), Sponsors, Slideshows (with drag-and-drop reordering for both slideshows and individual slides), Alumni Spotlight, and Portfolio Clients.
    - Centralized Committee Management System: Unified admin interface for all 7 committees with slug-based routing, flexible fields, and image uploads.
    - Image Upload System: Professional image upload with cropping for various site elements (site images, member profiles, slideshows) with secure admin-only access.
    - Dynamic content display with scroll-triggered reveal animations (`framer-motion`).
    - Admin Password Management for secure password changes.

### Backend
- **Framework:** Express.js with TypeScript on Node.js.
- **API Design:** RESTful API supporting various entities including settings, events, highlights, newsletter subscriptions, admin operations, executive members, sponsors, slideshows, portfolio clients, committee configurations, and object storage.
- **Authentication:** Session-based authentication using `express-session` with PostgreSQL-backed storage (`connect-pg-simple`). Secure, HTTP-only cookies, with `secure: true` and `sameSite: 'none'` for deployed environments, and `requireAuth` middleware for admin routes. Admin password reset to a default on server initialization.
- **Database:** Drizzle ORM with PostgreSQL dialect, configured for Neon Database.
- **Schema:** Tables for `settings`, `events`, `highlights`, `newsletter_subscriptions`, `users` (admin accounts), `executiveMembers`, `sponsors`, `slideshows`, `slideshowSlides`, `portfolioClients`, `alumniSpotlight`, `featuredSpeakers`, and `committeeConfigs`.
- **Image Upload System:** Custom image upload components integrating with Replit Object Storage, handling various aspect ratios and types for different site sections.

## External Dependencies
- **Database:** Neon Database (PostgreSQL-compatible serverless) via `@neondatabase/serverless`.
- **Object Storage:** Replit Object Storage (Google Cloud Storage backend) via `@google-cloud/storage`.
- **UI & Interaction:** Radix UI, Shadcn UI, Embla Carousel, React Hook Form, Zod, Lucide React, React Icons, `@dnd-kit` libraries for drag-and-drop.
- **Development Tools:** Vite, ESBuild, TypeScript.
- **Fonts:** Google Fonts (Inter, Poppins).
- **Session Management:** `connect-pg-simple`.
- **Social Media Integration:** Configurable links for Instagram, LinkedIn, TikTok, Spotify.