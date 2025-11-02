import { Mail, MapPin, Clock } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTiktok, FaSpotify } from "react-icons/fa";
import { type Settings } from "@shared/schema";

interface FooterProps {
  settings?: Settings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* AMA SDSU Logo & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-heading font-semibold text-base tracking-tight">AM&gt;</span>
              </div>
              <span className="font-heading font-bold text-lg">AMA SDSU</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Empowering the next generation of marketing professionals at San Diego State University.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              {settings?.instagramLink && (
                <a
                  href={settings.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 rounded-md transition-colors"
                  aria-label="Instagram"
                  data-testid="link-social-instagram"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}
              {settings?.linkedinLink && (
                <a
                  href={settings.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 rounded-md transition-colors"
                  aria-label="LinkedIn"
                  data-testid="link-social-linkedin"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>
              )}
              {settings?.tiktokLink && (
                <a
                  href={settings.tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 rounded-md transition-colors"
                  aria-label="TikTok"
                  data-testid="link-social-tiktok"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>
              )}
              {settings?.spotifyLink && (
                <a
                  href={settings.spotifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate p-2 rounded-md transition-colors"
                  aria-label="Spotify"
                  data-testid="link-social-spotify"
                >
                  <FaSpotify className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-base" data-testid="text-footer-quick-links">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-about">
                  About Us
                </a>
              </li>
              <li>
                <a href="/calendar" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-events">
                  Events
                </a>
              </li>
              <li>
                <a href="#alumni-relations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-alumni">
                  Alumni
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-base" data-testid="text-footer-get-involved">
              Get Involved
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/weekly-meetings" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-weekly-meetings">
                  Weekly Meetings
                </a>
              </li>
              <li>
                <a href="/committees" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-committees">
                  Committees
                </a>
              </li>
              <li>
                <a href="/membership" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-membership">
                  Membership
                </a>
              </li>
              <li>
                <a href="https://www.ama.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate rounded px-2 py-1 inline-block" data-testid="link-footer-official-ama">
                  Official AMA
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-base" data-testid="text-footer-contact-info">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              {settings?.email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <a 
                    href={`mailto:${settings.email}`} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    data-testid="link-footer-email"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.meetingLocation && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80" data-testid="text-footer-location">
                    {settings.meetingLocation}
                    {settings.meetingRoom && <><br />{settings.meetingRoom}</>}
                  </span>
                </li>
              )}
              {settings?.meetingDay && settings?.meetingTime && (
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80" data-testid="text-footer-meeting-time">
                    {settings.meetingDay}s at {settings.meetingTime}
                    {settings.meetingSemester && <><br />{settings.meetingSemester}</>}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p data-testid="text-footer-copyright">
            © {currentYear} American Marketing Association - San Diego State University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
