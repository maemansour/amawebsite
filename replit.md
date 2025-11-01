# AMA SDSU Website

## Overview

The AMA SDSU website is a full-stack web application for the American Marketing Association chapter at San Diego State University. The platform serves as a digital hub for the student organization, showcasing their achievements (#2 TOP 10 Chapter), promoting events, managing member engagement, and providing administrative capabilities. The website features a modern, professional design inspired by national association websites and university organization platforms.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript as the core framework
- Vite for development server and build tooling
- React Router (Wouter) for client-side routing with paths: `/`, `/calendar`, `/contact`, `/admin`, `/admin/dashboard`

**UI Component System**
- Shadcn UI (new-york style) as the primary component library using Radix UI primitives
- Tailwind CSS for styling with a custom design system
- Design follows professional organization standards with Inter/Roboto for body text and Poppins/Montserrat for headings
- Responsive-first approach with mobile, tablet, and desktop breakpoints

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- No global client state management library (component-level state with hooks)

**Key Design Decisions**
- Custom color system using CSS variables with HSL values for theme consistency
- Component aliasing (`@/components`, `@/lib`, etc.) for clean imports
- Separation of public-facing pages from admin interface
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- Session-based authentication using express-session
- RESTful API design pattern

**API Structure**
- `/api/settings` - Site configuration (hero text, social links, meeting info)
- `/api/events` - Event management (CRUD operations)
- `/api/highlights` - Featured content carousel
- `/api/newsletter/subscribe` - Newsletter subscription handling
- `/api/admin/*` - Admin authentication and dashboard endpoints

**Authentication & Authorization**
- Session-based auth with HTTP-only cookies
- Admin routes protected with `requireAuth` middleware
- Session secret configurable via environment variable

**Data Storage Strategy**
- Drizzle ORM as the database abstraction layer
- PostgreSQL dialect configured (via `@neondatabase/serverless`)
- In-memory storage implementation (`MemStorage`) as fallback/development option
- Schema-first approach with Zod validation through `drizzle-zod`

**Database Schema**
- **settings** - Single-row configuration table (hero text, social media links, meeting details)
- **events** - Event listings with title, description, date, time, location, category
- **highlights** - Carousel content for featured stories/announcements
- **newsletter_subscriptions** - Email collection for newsletter
- **users** - Admin user accounts (implied from storage interface)

**Key Design Decisions**
- Middleware for request logging and JSON response capture
- Raw body preservation for webhook validation support
- Development vs production environment handling
- Vite integration for SSR/development mode

### External Dependencies

**Database & Storage**
- Neon Database (PostgreSQL-compatible serverless database via `@neondatabase/serverless`)
- Drizzle ORM for database operations and migrations
- Database URL configured via `DATABASE_URL` environment variable

**UI Component Libraries**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, tooltips, etc.)
- Embla Carousel for image/content carousels
- React Hook Form with Zod resolvers for form validation
- Lucide React and React Icons for iconography

**Development Tools**
- Replit-specific plugins for development (`@replit/vite-plugin-*`)
- ESBuild for server-side bundling
- TypeScript for type safety across the stack

**Font Resources**
- Google Fonts (Inter, Poppins) loaded via CDN in HTML head

**Session Storage**
- `connect-pg-simple` available for PostgreSQL-backed session storage (currently using default in-memory sessions)

**Key Integration Points**
- Social media platforms: Instagram, LinkedIn, TikTok, Spotify (links configurable via settings)
- Email integration ready (email addresses collected for newsletter)
- No payment processing or external APIs currently integrated