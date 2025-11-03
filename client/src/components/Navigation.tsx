import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-background border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover-elevate rounded-md px-2 py-1" data-testid="link-home">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-semibold text-base tracking-tight">AM&gt;</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground hidden sm:inline">
              AMA SDSU
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
              data-testid="link-nav-home"
            >
              Home
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium" data-testid="menu-about">
                    About Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-1 gap-3 p-4 w-[280px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/executive-board"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-executive"
                          >
                            <div className="text-sm font-medium leading-none">Executive Board</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Meet our leadership team and executive board members.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/our-chapter"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-our-chapter"
                          >
                            <div className="text-sm font-medium leading-none">Our Chapter</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Learn about our TOP 10 chapter and what we offer.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/sponsors"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-sponsors"
                          >
                            <div className="text-sm font-medium leading-none">Our Sponsors</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Meet the organizations that support our mission.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium" data-testid="menu-get-involved">
                    Get Involved
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-1 gap-3 p-4 w-[280px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/committees"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-committees"
                          >
                            <div className="text-sm font-medium leading-none">Committees</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Get hands-on experience in marketing, events, and more.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/membership"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-membership"
                          >
                            <div className="text-sm font-medium leading-none">Membership</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Learn about membership benefits and how to join.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/resources"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-official-ama"
                          >
                            <div className="text-sm font-medium leading-none">Official AMA</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Connect with the national American Marketing...
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/alumni"
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive("/alumni") ? "text-primary" : "text-foreground"
                      }`}
                      data-testid="link-nav-alumni"
                    >
                      Alumni
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              href="/calendar"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/calendar") ? "text-primary" : "text-foreground"
              }`}
              data-testid="link-nav-calendar"
            >
              Event Calendar
            </Link>

            <Link 
              href="/contact"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/contact") ? "text-primary" : "text-foreground"
              }`}
              data-testid="link-nav-contact"
            >
              Contact
            </Link>
          </nav>

          {/* Join AMA Button */}
          <div className="hidden md:block">
            <Button variant="default" size="default" asChild data-testid="button-join">
              <a href="#join">Join AMA</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  href="/"
                  className="text-base font-medium py-2 hover-elevate rounded-md px-3"
                  onClick={() => setMobileOpen(false)}
                  data-testid="link-mobile-home"
                >
                  Home
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-muted-foreground px-3">About Us</span>
                  <Link href="/executive-board" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-executive">
                    Executive Board
                  </Link>
                  <Link href="/our-chapter" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-our-chapter">
                    Our Chapter
                  </Link>
                  <Link href="/sponsors" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-sponsors">
                    Our Sponsors
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-muted-foreground px-3">Get Involved</span>
                  <Link href="/committees" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-committees">
                    Committees
                  </Link>
                  <Link href="/membership" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-membership">
                    Membership
                  </Link>
                  <Link href="/resources" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-official-ama">
                    Official AMA
                  </Link>
                </div>
                <Link 
                  href="/alumni"
                  className="text-base font-medium py-2 hover-elevate rounded-md px-3"
                  onClick={() => setMobileOpen(false)}
                  data-testid="link-mobile-alumni"
                >
                  Alumni
                </Link>
                <Link 
                  href="/calendar"
                  className="text-base font-medium py-2 hover-elevate rounded-md px-3"
                  onClick={() => setMobileOpen(false)}
                  data-testid="link-mobile-calendar"
                >
                  Event Calendar
                </Link>
                <Link 
                  href="/contact"
                  className="text-base font-medium py-2 hover-elevate rounded-md px-3"
                  onClick={() => setMobileOpen(false)}
                  data-testid="link-mobile-contact"
                >
                  Contact
                </Link>
                <Button variant="default" className="mt-4" asChild data-testid="button-mobile-join">
                  <a href="#join">Join AMA</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
