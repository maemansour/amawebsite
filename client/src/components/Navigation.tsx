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
              <span className="text-primary-foreground font-bold text-lg">AMA</span>
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
                    <ul className="grid w-48 gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#mission"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-mission"
                          >
                            <div className="text-sm font-medium leading-none">Mission</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Our purpose and goals
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#executive"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-executive"
                          >
                            <div className="text-sm font-medium leading-none">Executive Board</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Meet our leaders
                            </p>
                          </a>
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
                    <ul className="grid w-48 gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#membership"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-membership"
                          >
                            <div className="text-sm font-medium leading-none">Membership</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Join our community
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#events"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-events"
                          >
                            <div className="text-sm font-medium leading-none">Events</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Upcoming activities
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium" data-testid="menu-alumni">
                    Alumni
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#alumni-relations"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-alumni-relations"
                          >
                            <div className="text-sm font-medium leading-none">Alumni Relations</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Stay connected
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="#past-vp"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid="link-past-vp"
                          >
                            <div className="text-sm font-medium leading-none">Past VP Executive Boards</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Honor our leaders
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
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
                  <a href="#mission" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-mission">
                    Mission
                  </a>
                  <a href="#executive" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-executive">
                    Executive Board
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-muted-foreground px-3">Get Involved</span>
                  <a href="#membership" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-membership">
                    Membership
                  </a>
                  <a href="#events" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-events">
                    Events
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-muted-foreground px-3">Alumni</span>
                  <a href="#alumni-relations" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-alumni-relations">
                    Alumni Relations
                  </a>
                  <a href="#past-vp" className="text-base py-2 hover-elevate rounded-md px-6" onClick={() => setMobileOpen(false)} data-testid="link-mobile-past-vp">
                    Past VP Executive Boards
                  </a>
                </div>
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
