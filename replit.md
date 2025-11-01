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
- React Router (Wouter) for client-side routing with paths: `/`, `/calendar`, `/contact`, `/executive-board`, `/our-chapter`, `/sponsors`, `/weekly-meetings`, `/committees`, `/committees/:id`, `/membership`, `/resources`, `/alumni`, `/past-vp-boards`, `/admin`, `/admin/dashboard`

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
- `/api/settings` - Site configuration (hero text, social links, meeting info, Our Chapter page images)
- `/api/events` - Event management (CRUD operations)
- `/api/highlights` - Featured content carousel
- `/api/newsletter/subscribe` - Newsletter subscription handling
- `/api/admin/*` - Admin authentication and dashboard endpoints
- `/api/objects/upload` - Generate presigned upload URL for image uploads (admin-only)
- `/api/chapter-images` - Update Our Chapter page images with uploaded files (admin-only)
- `/objects/:objectPath(*)` - Serve publicly accessible uploaded images

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
- **settings** - Single-row configuration table (hero text, social media links, meeting details, Our Chapter page images)
  - Image fields: `ourChapterHeroImage`, `ourChapterMissionImage`, `ourChapterWhyChooseImage`, `ourChapterServicesImage`
- **events** - Event listings with title, description, date, time, location, category
- **highlights** - Carousel content for featured stories/announcements
- **newsletter_subscriptions** - Email collection for newsletter
- **users** - Admin user accounts (password hashed with bcrypt)

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
- **Replit Object Storage** - Cloud storage for admin-uploaded images
  - Google Cloud Storage backend via `@google-cloud/storage`
  - Environment variables: `DEFAULT_OBJECT_STORAGE_BUCKET_ID`, `PRIVATE_OBJECT_DIR`, `PUBLIC_OBJECT_SEARCH_PATHS`
  - Public visibility for user-uploaded images on Our Chapter page
  - ACL policy management for access control

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

## Recent Changes (2025-11-01)

### Image Upload System with Cropping (November 2025)

**Feature Overview**
- Professional image upload system for Our Chapter page
- Built-in image cropping with zoom controls using `react-easy-crop`
- Secure admin-only upload with session authentication
- Integration with Replit Object Storage for reliable cloud hosting

**Technical Implementation**
- **Client Components:**
  - `ImageUploadWithCrop` - Reusable upload component with cropper dialog
  - Drag-and-drop support, file validation, and preview
  - Canvas-based image cropping with adjustable zoom (1x-3x)
  - Aspect ratios matching page display: 3:2 (hero), 2:1 (mission), 5:4 (why choose/services)
  - Responsive aspect ratio container using CSS padding-bottom technique
  
- **Server Infrastructure:**
  - `server/objectStorage.ts` - Object storage service with presigned URL generation
  - `server/objectAcl.ts` - ACL policy management for public/private access control
  - Three new API endpoints for upload workflow
  
- **Upload Flow:**
  1. Admin clicks "Upload & Crop" in dashboard
  2. Selects image file from computer
  3. Cropper dialog opens with zoom slider
  4. Admin adjusts crop area and zoom level
  5. Click "Save Image" triggers:
     - Client creates cropped image blob via canvas API
     - Requests presigned upload URL from backend
     - Uploads cropped image directly to Google Cloud Storage
     - Backend sets public ACL policy on uploaded file
     - Settings updated with normalized object path (`/objects/uploads/...`)
     - React Query cache invalidated and refetched
  6. Success toast notification
  7. Preview updates immediately, public page shows new image

- **Security & Performance:**
  - Admin authentication required for all upload operations
  - Session-based authorization with `requireAuth` middleware
  - Presigned URLs with 15-minute expiration for secure uploads
  - Public visibility set on images for fast public access (no auth required)
  - Optimized JPEG output at 95% quality
  - Immediate cache invalidation ensures consistency

- **Admin Dashboard Integration:**
  - Replaced URL input fields with upload buttons
  - Live preview of uploaded images (128x80px thumbnails)
  - Four upload sections: Hero, Mission, Why Choose Us, Services
  - Test IDs: `button-upload-hero-image`, `button-upload-mission-image`, etc.

**Files Modified/Created:**
- `client/src/components/ImageUploadWithCrop.tsx` - New component
- `server/objectStorage.ts` - New service
- `server/objectAcl.ts` - New ACL management
- `server/routes.ts` - Added object storage routes
- `client/src/pages/AdminDashboard.tsx` - Integrated upload component
- `shared/schema.ts` - Added image URL fields to settings

### New Pages Added (Completed & Tested)
1. **Contact Page** (`/contact`) - Tabbed interface with:
   - Contact form using shadcn Form + react-hook-form with Zod validation
   - Email Us section
   - Follow Us section with all social platforms (Instagram, LinkedIn, TikTok, Spotify)
   - FAQs tab with null-safe meeting info display
   - Visit Us section with meeting details
   
2. **Membership Page** (`/membership`) - Dedicated page showcasing:
   - Membership tiers with consistent pricing ($49/semester for One Semester, $79/year for Two Semesters)
   - Chapter vs National benefits comparison
   - How to Join section
   - Committee involvement information
   
3. **Resources Page** (`/resources`) - Official AMA resources including:
   - National Website and Student Resources cards
   - National Programs section (Collegiate Case Competition, Career Center, etc.)
   - Links to official AMA resources
   
4. **Alumni Page** (`/alumni`) - Alumni relations hub with:
   - Stay Connected options (Mentorship Program, Career Network, Alumni Events)
   - Alumni Spotlight grid with featured alumni profiles
   - Alumni Success Stories section

5. **Committee Pages** (`/committees/:id`) - Individual pages for Consulting, Event Planning, Podcast, and Adobe Creative committees with missions, benefits, past work, and join instructions

### Technical Improvements
- Contact form implements proper validation with shadcn Form component
- All social links pull from settings with appropriate fallbacks
- FAQ section gracefully handles missing settings data
- All pages include comprehensive data-testid attributes for testing
- Comprehensive e2e testing completed and passing

### Database Migration
- Successfully migrated from in-memory storage to PostgreSQL database
- Implemented secure bcrypt password hashing for admin authentication
- Admin credentials: username "admin", password "admin123"
- All data now persists across server restarts

### Homepage Enhancements
- Added Our Chapter section with 4 offering cards
- Added Chapter History & Impact with achievement statistics
- Added Partners & Collaborations featuring Red Bull
- Added Weekly Meetings information
- Added Committees grid with links to individual committee pages
- Added comprehensive Membership comparison section

### Scroll Animations (November 2025)

**Feature Overview**
- Smooth scroll-triggered animations using framer-motion
- Professional fade-in and slide effects as users scroll through pages
- Configurable animation directions (up, down, left, right, none) and delays
- Viewport-based detection triggers animations when elements come into view

**Technical Implementation**
- **ScrollReveal Component** (`client/src/components/ScrollReveal.tsx`)
  - Reusable wrapper component using framer-motion's `useInView` hook
  - Animation directions: up (default), down, left, right, none
  - Customizable delay for staggered animations
  - Fires once per element using `once: true` for performance
  - Smooth easing curve: `[0.21, 0.47, 0.32, 0.98]`
  
- **Pages with Animations:**
  - Home page: Hero section, events grid, newsletter form
  - Our Chapter page: All major sections with direction-based animations
  - Executive Board: Header, team grid with staggered delays
  - Additional pages: Contact, Membership, Calendar (animations added throughout)
  
- **Animation Patterns:**
  - Headers/titles: Fade up from below
  - Side-by-side content: Opposing directions (left/right) with delays
  - Grid items: Staggered delays (`index * 0.1`) for cascade effect
  - CTAs: Simple fade-up for emphasis

**User Experience Benefits**
- Professional, modern feel with subtle motion
- Guides user attention through content hierarchy
- Improves perceived performance and engagement
- Never intrusive - animations respect reduced motion preferences via framer-motion

### Complete Navigation Structure (November 2025)

**Navigation Component Architecture**
- Three-tiered dropdown navigation system matching national AMA standards
- Mobile-responsive navigation with Sheet component for small screens
- Wouter Link components for all routing (no anchor links except Join AMA CTA)

**About Us Dropdown** (`/executive-board`, `/our-chapter`, `/sponsors`)
1. **Executive Board Page** - Leadership team with 6 officers, profile cards, contact info, leadership message
2. **Our Chapter Page** - TOP 10 chapter status, mission/vision statements, values, achievements grid, chapter history
3. **Our Sponsors Page** - Partner organizations (Red Bull), partnership benefits, become a sponsor CTA

**Get Involved Dropdown** (`/weekly-meetings`, `/committees`, `/membership`, `/resources`)
1. **Weekly Meetings Page** - Meeting schedule (day/time/location from settings), agenda, highlights, what to bring
2. **Committees Landing Page** - Overview of 4 committees (Consulting, Event Planning, Podcast, Adobe Creative) with links to detail pages
3. **Membership Page** - (Existing) Pricing tiers and benefits
4. **Official AMA (Resources)** - (Existing) National AMA resources and programs

**Alumni Dropdown** (`/alumni`, `/past-vp-boards`)
1. **Alumni Relations Page** - (Existing) Stay connected, mentorship, alumni spotlights
2. **Past VP Executive Boards Page** - Historical board members by year (2023-2024, 2022-2023, 2021-2022, 2020-2021) with achievements

**Top-Level Navigation**
- Home (`/`)
- Event Calendar (`/calendar`)
- Contact (`/contact`)

**Technical Implementation Details**
- Fixed test ID conflicts by prefixing homepage component test IDs with "home-" (e.g., `data-testid="heading-home-our-chapter"` vs dedicated page `data-testid="heading-our-chapter"`)
- All navigation dropdowns use shadcn NavigationMenu with NavigationMenuItem components
- Mobile navigation uses Sheet component with proper Link components
- All pages follow consistent hero header → content sections → Footer pattern
- Comprehensive data-testid attributes throughout for e2e testing
- End-to-end testing verified all navigation paths and page content