import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import EventCalendar from "@/pages/EventCalendar";
import Contact from "@/pages/Contact";
import CommitteePage from "@/pages/CommitteePage";
import Committees from "@/pages/Committees";
import ConsultingCommittee from "@/pages/ConsultingCommittee";
import EventPlanningCommittee from "@/pages/EventPlanningCommittee";
import Membership from "@/pages/Membership";
import Resources from "@/pages/Resources";
import Alumni from "@/pages/Alumni";
import ExecutiveBoard from "@/pages/ExecutiveBoard";
import OurChapter from "@/pages/OurChapter";
import OurSponsors from "@/pages/OurSponsors";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PublicLayout>
          <Home />
        </PublicLayout>
      </Route>
      <Route path="/calendar">
        <PublicLayout>
          <EventCalendar />
        </PublicLayout>
      </Route>
      <Route path="/contact">
        <PublicLayout>
          <Contact />
        </PublicLayout>
      </Route>
      <Route path="/executive-board">
        <PublicLayout>
          <ExecutiveBoard />
        </PublicLayout>
      </Route>
      <Route path="/our-chapter">
        <PublicLayout>
          <OurChapter />
        </PublicLayout>
      </Route>
      <Route path="/sponsors">
        <PublicLayout>
          <OurSponsors />
        </PublicLayout>
      </Route>
      <Route path="/committees">
        <PublicLayout>
          <Committees />
        </PublicLayout>
      </Route>
      <Route path="/committees/consulting">
        <PublicLayout>
          <ConsultingCommittee />
        </PublicLayout>
      </Route>
      <Route path="/committees/event-planning">
        <PublicLayout>
          <EventPlanningCommittee />
        </PublicLayout>
      </Route>
      <Route path="/committees/:id">
        <PublicLayout>
          <CommitteePage />
        </PublicLayout>
      </Route>
      <Route path="/membership">
        <PublicLayout>
          <Membership />
        </PublicLayout>
      </Route>
      <Route path="/resources">
        <PublicLayout>
          <Resources />
        </PublicLayout>
      </Route>
      <Route path="/alumni">
        <PublicLayout>
          <Alumni />
        </PublicLayout>
      </Route>
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route>
        <PublicLayout>
          <NotFound />
        </PublicLayout>
      </Route>
    </Switch>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
