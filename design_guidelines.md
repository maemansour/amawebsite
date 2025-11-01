# AMA SDSU Website Design Guidelines

## Design Approach
**Reference-Based Design with Professional Organization Standards**

This website draws inspiration from professional association websites and modern university organization platforms (like national AMA chapters, student organization portals). The design prioritizes clear information hierarchy, professional credibility, and easy content management while maintaining the established AMA brand identity.

## Typography System

**Font Families:**
- Primary: 'Inter' or 'Roboto' (Google Fonts) - for body text and UI elements
- Headings: 'Poppins' or 'Montserrat' (Google Fonts) - for impact and professionalism

**Typography Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headings: text-3xl md:text-4xl, font-bold
- Subsection Headings: text-2xl md:text-3xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg
- Small Text/Captions: text-sm
- Button Text: text-base, font-medium

## Layout System

**Spacing Primitives:**
Use Tailwind units of 2, 4, 6, 8, 12, 16, and 20 for consistent vertical rhythm (e.g., p-4, mb-8, py-16, gap-6)

**Container Strategy:**
- Max-width container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Section padding: py-12 md:py-16 lg:py-20
- Card padding: p-6 md:p-8
- Component spacing: space-y-8 md:space-y-12

## Core Components

### Navigation Header
- Full-width sticky header with shadow on scroll
- Logo on left (AMA SDSU wordmark/logo)
- Desktop: horizontal menu with dropdown indicators, CTA button on right
- Mobile: hamburger menu with slide-out drawer
- Dropdowns: About Us (Mission, Executive Board, Committees), Get Involved (Membership, Events), Alumni (Network, Stories)
- Social icons in header for quick access

### Hero Section
- Large hero image showing AMA events/members (use professional group photo or event imagery)
- Overlay gradient for text readability
- Badge component for "#2 TOP 10 Chapter" achievement (positioned top-right of hero)
- Centered headline with mission statement
- Dual CTAs: primary "Join The Family" + secondary "View Events"
- Height: 70vh on desktop, 60vh on tablet, natural height on mobile

### Featured Highlights Carousel
- Full-width section with 3-4 slides
- Each slide: large image with caption overlay
- Navigation: arrow buttons (left/right) + dot indicators
- Auto-advance every 5 seconds with pause on hover
- Categories: Announcements, Event Highlights, Member Spotlights

### Upcoming Events Grid
- 3-column grid on desktop (lg:grid-cols-3), 2-column on tablet (md:grid-cols-2), single column on mobile
- Event cards with: category badge, event image placeholder, title, date/time, location with pin icon, "View Details" button
- Category badges: different styling for Weekly Meeting, Professional Development, Social, Networking
- Hover effect: slight lift (hover:shadow-lg hover:-translate-y-1 transition-transform)

### Event Calendar Page
- Two-column layout: sidebar with month calendar, main area with detailed event listings
- Filter options: All Events, By Category, By Month
- Event detail cards: expanded version with full description, RSVP count, "Add to Google Calendar" button
- Mobile: stack calendar above listings

### Newsletter Subscription Section
- Centered layout with max-w-2xl
- Headline + subheading explaining benefits
- Email input with inline submit button
- Success/error message states

### Footer
- 4-column grid on desktop (lg:grid-cols-4), 2-column on tablet, single column on mobile
- Columns: Quick Links, Get Involved, Contact Info, Follow Us
- Contact info includes: email, meeting location, meeting times, office hours
- Social media icons: Instagram, LinkedIn, TikTok, Spotify (use Font Awesome icons)
- Bottom bar with copyright and "Made with ❤️ at SDSU"

### Admin Panel (/admin)
- Login screen: centered card with logo, email/password inputs, remember me checkbox
- Dashboard layout: sidebar navigation + main content area
- Sidebar tabs: General Settings, Manage Events, Manage Sponsors, Highlights, Executive Board, Alumni, Membership, Committees
- Content area: forms with clear sections, save/cancel buttons, delete confirmations
- Event management: table view with action buttons, create/edit modal with comprehensive form fields
- Toast notifications for save/delete actions

## Component Library

**Buttons:**
- Primary: rounded-md px-6 py-3, font-medium
- Secondary: outline variant with border
- Icon buttons: square with icon, no text
- Button groups: flex gap-4

**Cards:**
- Rounded corners: rounded-lg
- Shadow: shadow-md with hover:shadow-xl
- Border: subtle border or none for clean look
- Image cards: aspect-ratio-16/9 for event images

**Forms:**
- Input fields: border, rounded-md, focus ring
- Labels: font-medium mb-2
- Helper text: text-sm below inputs
- Error states: border change + error message
- Consistent spacing: space-y-4 for form groups

**Badges/Tags:**
- Small rounded-full or rounded-md
- Uppercase text-xs font-semibold
- Category-specific styling (without color references)

**Icons:**
Use Font Awesome via CDN for:
- Navigation arrows (fa-chevron-down)
- Social media (fa-brands)
- Location pins (fa-map-marker)
- Calendar (fa-calendar)
- User (fa-user)
- Edit/Delete (fa-edit, fa-trash)

## Images

**Hero Image:**
Large, professional photograph of AMA SDSU members at an event or meeting. Should convey professionalism, diversity, and engagement. Minimum 1920x1080px, landscape orientation.

**Highlights Carousel:**
3-4 high-quality event photos showcasing different aspects of the club (networking events, professional speakers, social gatherings, competitions). Each 1200x800px.

**Event Card Images:**
Placeholder or actual event photos, consistent aspect ratio (16:9), minimum 600x400px.

**Executive Board:**
Professional headshots of board members (square format, 400x400px minimum).

## Accessibility

- Semantic HTML throughout (nav, main, section, article)
- ARIA labels for icon-only buttons
- Focus states on all interactive elements
- Sufficient contrast ratios (maintain readability)
- Form labels properly associated with inputs
- Alt text for all images
- Keyboard navigation support

## Animation Guidelines

**Subtle, Professional Animations:**
- Page transitions: minimal fade-in
- Carousel: smooth slide transitions (300ms)
- Hover effects: transform and shadow changes (200ms ease)
- Admin panel: toast notifications slide in from top
- No distracting parallax or scroll-triggered animations
- Focus on micro-interactions that enhance usability

## Responsive Breakpoints

- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2-column layouts where appropriate)
- Desktop: > 1024px (full multi-column layouts)
- Large desktop: > 1280px (max-width constraints engage)