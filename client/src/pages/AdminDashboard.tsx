import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { 
  Settings as SettingsIcon, 
  Calendar, 
  Image as ImageIcon,
  Save,
  Trash2,
  Plus,
  LogOut,
  Users,
  GripVertical,
  Pencil
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { type Settings, type Event, type Highlight, type ExecutiveMember, type InsertExecutiveMember, type Slideshow, type InsertSlideshow, type SlideshowSlide, type InsertSlideshowSlide, type PortfolioClient, type InsertPortfolioClient, type AlumniSpotlight, type InsertAlumniSpotlight, type FeaturedSpeaker, type CommitteeConfig, type InsertCommitteeConfig } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ImageUploadWithCrop } from "@/components/ImageUploadWithCrop";
import { MemberImageUpload } from "@/components/MemberImageUpload";
import { SlideImageUpload } from "@/components/SlideImageUpload";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");

  // Check if user is authenticated
  const { data: authStatus } = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/status"],
  });

  // Redirect if not authenticated
  if (authStatus && !authStatus.authenticated) {
    setLocation("/admin");
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      setLocation("/admin");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white dark:bg-background border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AMA</span>
              </div>
              <div>
                <h1 className="font-heading font-bold text-xl" data-testid="text-admin-dashboard-title">
                  Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground">AMA SDSU Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild data-testid="button-view-site">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  View Site
                </a>
              </Button>
              <Button variant="ghost" onClick={handleLogout} data-testid="button-admin-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 max-w-7xl" data-testid="tabs-admin">
            <TabsTrigger value="general" data-testid="tab-general">
              <SettingsIcon className="h-4 w-4 mr-2" />
              General Settings
            </TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="highlights" data-testid="tab-highlights">
              <ImageIcon className="h-4 w-4 mr-2" />
              Highlights
            </TabsTrigger>
            <TabsTrigger value="slideshows" data-testid="tab-slideshows">
              <ImageIcon className="h-4 w-4 mr-2" />
              Slideshows
            </TabsTrigger>
            <TabsTrigger value="executive-members" data-testid="tab-executive-members">
              <Users className="h-4 w-4 mr-2" />
              Executive Board
            </TabsTrigger>
            <TabsTrigger value="committees" data-testid="tab-committees">
              <ImageIcon className="h-4 w-4 mr-2" />
              Committees
            </TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">
              <ImageIcon className="h-4 w-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="alumni-spotlight" data-testid="tab-alumni-spotlight">
              <Users className="h-4 w-4 mr-2" />
              Alumni Spotlight
            </TabsTrigger>
            <TabsTrigger value="podcast" data-testid="tab-podcast">
              <ImageIcon className="h-4 w-4 mr-2" />
              Podcast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="events">
            <ManageEvents />
          </TabsContent>

          <TabsContent value="highlights">
            <ManageHighlights />
          </TabsContent>

          <TabsContent value="slideshows">
            <ManageSlideshows />
          </TabsContent>

          <TabsContent value="executive-members">
            <ManageExecutiveMembers />
          </TabsContent>

          <TabsContent value="committees">
            <ManageCommittees />
          </TabsContent>

          <TabsContent value="portfolio">
            <ManagePortfolio />
          </TabsContent>

          <TabsContent value="alumni-spotlight">
            <ManageAlumniSpotlight />
          </TabsContent>

          <TabsContent value="podcast">
            <ManagePodcast />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function GeneralSettings() {
  const { toast } = useToast();
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });

  const [formData, setFormData] = useState<Partial<Settings>>({});

  // Update form data when settings load
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Settings>) => {
      return await apiRequest("PUT", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Save failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Configure the main homepage hero content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroDescription">Hero Description</Label>
            <Textarea
              id="heroDescription"
              value={formData.heroDescription || ""}
              onChange={(e) => handleChange("heroDescription", e.target.value)}
              rows={5}
              placeholder="Enter hero section description"
              data-testid="textarea-hero-description"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memberCount">Member Count</Label>
              <Input
                id="memberCount"
                type="number"
                value={formData.memberCount || ""}
                onChange={(e) => handleChange("memberCount", parseInt(e.target.value))}
                placeholder="280"
                data-testid="input-member-count"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinLink">Join Form Link</Label>
              <Input
                id="joinLink"
                type="url"
                value={formData.joinLink || ""}
                onChange={(e) => handleChange("joinLink", e.target.value)}
                placeholder="https://docs.google.com/forms/..."
                data-testid="input-join-link"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
          <CardDescription>Configure weekly meeting information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetingDay">Meeting Day</Label>
              <Input
                id="meetingDay"
                value={formData.meetingDay || ""}
                onChange={(e) => handleChange("meetingDay", e.target.value)}
                placeholder="Tuesday"
                data-testid="input-meeting-day"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingTime">Meeting Time</Label>
              <Input
                id="meetingTime"
                value={formData.meetingTime || ""}
                onChange={(e) => handleChange("meetingTime", e.target.value)}
                placeholder="5:00 PM"
                data-testid="input-meeting-time"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meetingLocation">Meeting Location</Label>
              <Input
                id="meetingLocation"
                value={formData.meetingLocation || ""}
                onChange={(e) => handleChange("meetingLocation", e.target.value)}
                placeholder="On Campus"
                data-testid="input-meeting-location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingRoom">Meeting Room</Label>
              <Input
                id="meetingRoom"
                value={formData.meetingRoom || ""}
                onChange={(e) => handleChange("meetingRoom", e.target.value)}
                placeholder="Varies"
                data-testid="input-meeting-room"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Configure social media links and usernames</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="instagramUsername">Instagram Username</Label>
              <Input
                id="instagramUsername"
                value={formData.instagramUsername || ""}
                onChange={(e) => handleChange("instagramUsername", e.target.value)}
                placeholder="@sdsuama"
                data-testid="input-instagram-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramFollowers">Followers</Label>
              <Input
                id="instagramFollowers"
                value={formData.instagramFollowers || ""}
                onChange={(e) => handleChange("instagramFollowers", e.target.value)}
                placeholder="2,774"
                data-testid="input-instagram-followers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramLink">Link</Label>
              <Input
                id="instagramLink"
                type="url"
                value={formData.instagramLink || ""}
                onChange={(e) => handleChange("instagramLink", e.target.value)}
                placeholder="https://instagram.com/..."
                data-testid="input-instagram-link"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedinUsername">LinkedIn Username</Label>
              <Input
                id="linkedinUsername"
                value={formData.linkedinUsername || ""}
                onChange={(e) => handleChange("linkedinUsername", e.target.value)}
                placeholder="AMA San Diego State"
                data-testid="input-linkedin-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinLink">Link</Label>
              <Input
                id="linkedinLink"
                type="url"
                value={formData.linkedinLink || ""}
                onChange={(e) => handleChange("linkedinLink", e.target.value)}
                placeholder="https://linkedin.com/..."
                data-testid="input-linkedin-link"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tiktokUsername">TikTok Username</Label>
              <Input
                id="tiktokUsername"
                value={formData.tiktokUsername || ""}
                onChange={(e) => handleChange("tiktokUsername", e.target.value)}
                placeholder="@sdsuama"
                data-testid="input-tiktok-username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktokLink">Link</Label>
              <Input
                id="tiktokLink"
                type="url"
                value={formData.tiktokLink || ""}
                onChange={(e) => handleChange("tiktokLink", e.target.value)}
                placeholder="https://tiktok.com/..."
                data-testid="input-tiktok-link"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spotifyLink">Spotify Link</Label>
            <Input
              id="spotifyLink"
              type="url"
              value={formData.spotifyLink || ""}
              onChange={(e) => handleChange("spotifyLink", e.target.value)}
              placeholder="https://open.spotify.com/..."
              data-testid="input-spotify-link"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="membership.sdsuama@gmail.com"
              data-testid="input-email"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Home Page Images</CardTitle>
          <CardDescription>Upload and crop images for the Home page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Meet Our fAMAily Section Image"
            imageType="family"
            currentImage={settings?.familyImage}
            aspectRatio={16 / 9}
            testId="button-upload-family-image"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Our Chapter Page Images</CardTitle>
          <CardDescription>Upload and crop images for the Our Chapter page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Hero Section Image"
            imageType="hero"
            currentImage={settings?.ourChapterHeroImage}
            aspectRatio={3 / 2}
            testId="button-upload-hero-image"
          />

          <ImageUploadWithCrop
            label="Mission Section Image"
            imageType="mission"
            currentImage={settings?.ourChapterMissionImage}
            aspectRatio={2 / 1}
            testId="button-upload-mission-image"
          />

          <ImageUploadWithCrop
            label="Why Choose Us Section Image"
            imageType="whyChoose"
            currentImage={settings?.ourChapterWhyChooseImage}
            aspectRatio={5 / 4}
            testId="button-upload-why-choose-image"
          />

          <ImageUploadWithCrop
            label="Services Section Image"
            imageType="services"
            currentImage={settings?.ourChapterServicesImage}
            aspectRatio={5 / 4}
            testId="button-upload-services-image"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Executive Board Page Images</CardTitle>
          <CardDescription>Upload and crop images for the Executive Board page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Hero Section Image"
            imageType="executiveBoard"
            currentImage={settings?.executiveBoardHeroImage}
            aspectRatio={3 / 2}
            testId="button-upload-executive-hero-image"
          />

          <div className="space-y-2">
            <Label htmlFor="executiveBoardCaption">Hero Caption</Label>
            <Input
              id="executiveBoardCaption"
              name="executiveBoardCaption"
              value={formData.executiveBoardCaption || ""}
              onChange={(e) => setFormData({ ...formData, executiveBoardCaption: e.target.value })}
              placeholder="e.g., 2024-2025 Leadership Team"
              data-testid="input-executive-board-caption"
            />
            <p className="text-xs text-muted-foreground">
              Text displayed on the hero image caption
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sponsors Page Images</CardTitle>
          <CardDescription>Upload and crop images for the Sponsors/Partners page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Hero Section Image"
            imageType="sponsorsHero"
            currentImage={settings?.sponsorsHeroImage}
            aspectRatio={3 / 2}
            testId="button-upload-sponsors-hero-image"
          />

          <ImageUploadWithCrop
            label="Partner/Collaboration Image 1"
            imageType="sponsorsPartner1"
            currentImage={settings?.sponsorsPartnerImage1}
            aspectRatio={3 / 2}
            testId="button-upload-sponsors-partner-1"
          />

          <ImageUploadWithCrop
            label="Partner/Collaboration Image 2"
            imageType="sponsorsPartner2"
            currentImage={settings?.sponsorsPartnerImage2}
            aspectRatio={3 / 2}
            testId="button-upload-sponsors-partner-2"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Committees Page Images</CardTitle>
          <CardDescription>Upload and crop images for the Committees page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Committees Section Image (next to Multimedia Committee)"
            imageType="committees"
            currentImage={settings?.committeesImage}
            aspectRatio={4 / 3}
            testId="button-upload-committees-image"
          />

          <ImageUploadWithCrop
            label="Why Join Section Image (next to Benefits)"
            imageType="committeesWhyJoin"
            currentImage={settings?.committeesWhyJoinImage}
            aspectRatio={4 / 3}
            testId="button-upload-committees-why-join-image"
          />

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Consulting Committee Page Images</h3>
            
            <ImageUploadWithCrop
              label="Team Photo (Consulting Directors)"
              imageType="consultingTeam"
              currentImage={settings?.consultingTeamImage}
              aspectRatio={4 / 3}
              testId="button-upload-consulting-team-image"
            />

            <ImageUploadWithCrop
              label="Mission Section Image (Collaborative Learning)"
              imageType="consultingMission"
              currentImage={settings?.consultingMissionImage}
              aspectRatio={4 / 3}
              testId="button-upload-consulting-mission-image"
            />

            <div className="space-y-2 mt-6">
              <Label htmlFor="consultingApplyLink">Apply Button Link</Label>
              <Input
                id="consultingApplyLink"
                type="url"
                value={formData.consultingApplyLink || ""}
                onChange={(e) => handleChange("consultingApplyLink", e.target.value)}
                placeholder="https://forms.gle/..."
                data-testid="input-consulting-apply-link"
              />
              <p className="text-sm text-muted-foreground">
                Link for the "Apply to Consulting Committee" button
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Membership Page Settings</CardTitle>
          <CardDescription>Configure images, pricing, and links for the Membership page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ImageUploadWithCrop
            label="Hero Section Image (Finance Team)"
            imageType="membershipHero"
            currentImage={settings?.membershipHeroImage}
            aspectRatio={4 / 3}
            testId="button-upload-membership-hero-image"
          />

          <ImageUploadWithCrop
            label="Get Engaged & Network Section Image"
            imageType="membershipEngagement"
            currentImage={settings?.membershipEngagementImage}
            aspectRatio={4 / 3}
            testId="button-upload-membership-engagement-image"
          />

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Membership Pricing</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semesterPrice">One Semester Price ($)</Label>
                <Input
                  id="semesterPrice"
                  type="text"
                  value={formData.semesterPrice || ""}
                  onChange={(e) => handleChange("semesterPrice", e.target.value)}
                  placeholder="49"
                  data-testid="input-semester-price"
                />
                <p className="text-sm text-muted-foreground">
                  Price for one semester membership (popular tier)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearPrice">Year Price ($)</Label>
                <Input
                  id="yearPrice"
                  type="text"
                  value={formData.yearPrice || ""}
                  onChange={(e) => handleChange("yearPrice", e.target.value)}
                  placeholder="49"
                  data-testid="input-year-price"
                />
                <p className="text-sm text-muted-foreground">
                  Price for annual membership
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Call to Action Links</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="joinNowLink">Join Now Button Link</Label>
                <Input
                  id="joinNowLink"
                  type="url"
                  value={formData.joinNowLink || ""}
                  onChange={(e) => handleChange("joinNowLink", e.target.value)}
                  placeholder="https://forms.gle/..."
                  data-testid="input-join-now-link"
                />
                <p className="text-sm text-muted-foreground">
                  Link for the "Join Now" button in the Ready to Join section
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calendarSubscribeUrl">Calendar Subscribe URL</Label>
                <Input
                  id="calendarSubscribeUrl"
                  type="url"
                  value={formData.calendarSubscribeUrl || ""}
                  onChange={(e) => handleChange("calendarSubscribeUrl", e.target.value)}
                  placeholder="https://calendar.google.com/calendar/ical/..."
                  data-testid="input-calendar-subscribe-url"
                />
                <p className="text-sm text-muted-foreground">
                  Google Calendar or iCal subscription link for the "Subscribe to Events Calendar" button
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          disabled={updateMutation.isPending}
          data-testid="button-save-settings"
        >
          <Save className="h-4 w-4 mr-2" />
          {updateMutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}

function ManageEvents() {
  const { toast } = useToast();
  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Weekly Meeting",
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/events", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created", description: "The event has been added successfully." });
      setIsAdding(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return await apiRequest("PUT", `/api/events/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event updated", description: "The event has been updated successfully." });
      setEditingId(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/events/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted", description: "The event has been removed." });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "Weekly Meeting",
    });
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
    });
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)} data-testid="button-add-event">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Event" : "Add New Event"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-event-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  data-testid="textarea-event-description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    data-testid="input-event-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="5:00 PM"
                    required
                    data-testid="input-event-time"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    data-testid="input-event-location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    data-testid="input-event-category"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-event">
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  data-testid="button-cancel-event"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} data-testid={`card-admin-event-${event.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {event.date} at {event.time} • {event.location}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)} data-testid={`button-edit-event-${event.id}`}>
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => deleteMutation.mutate(event.id)}
                    data-testid={`button-delete-event-${event.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{event.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ManageHighlights() {
  const { toast } = useToast();
  const { data: highlights = [] } = useQuery<Highlight[]>({
    queryKey: ["/api/highlights"],
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Announcement",
    imageUrl: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/highlights", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/highlights"] });
      toast({ title: "Highlight created", description: "The highlight has been added successfully." });
      setIsAdding(false);
      setFormData({ title: "", description: "", category: "Announcement", imageUrl: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/highlights/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/highlights"] });
      toast({ title: "Highlight deleted", description: "The highlight has been removed." });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {!isAdding ? (
        <div className="flex justify-end">
          <Button onClick={() => setIsAdding(true)} data-testid="button-add-highlight">
            <Plus className="h-4 w-4 mr-2" />
            Add Highlight
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Add New Highlight</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="highlight-title">Title</Label>
                <Input
                  id="highlight-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-highlight-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="highlight-description">Description</Label>
                <Textarea
                  id="highlight-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  data-testid="textarea-highlight-description"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highlight-category">Category</Label>
                  <Input
                    id="highlight-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    data-testid="input-highlight-category"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="highlight-imageUrl">Image URL</Label>
                  <Input
                    id="highlight-imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    data-testid="input-highlight-image-url"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending} data-testid="button-save-highlight">
                  {createMutation.isPending ? "Saving..." : "Save Highlight"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)} data-testid="button-cancel-highlight">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {highlights.map((highlight) => (
          <Card key={highlight.id} data-testid={`card-admin-highlight-${highlight.id}`}>
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img
                src={highlight.imageUrl}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  <CardDescription className="mt-1">{highlight.category}</CardDescription>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(highlight.id)}
                  data-testid={`button-delete-highlight-${highlight.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{highlight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Sortable Member Card Component
interface SortableMemberCardProps {
  member: ExecutiveMember;
  onEdit: (member: ExecutiveMember) => void;
  onDelete: (id: string) => void;
}

function SortableMemberCard({ member, onEdit, onDelete }: SortableMemberCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} data-testid={`card-admin-member-${member.id}`}>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mt-1">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <img
              src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{member.name}</CardTitle>
            <CardDescription className="truncate">{member.title}</CardDescription>
            <p className="text-xs text-muted-foreground mt-1">
              {member.major} • {member.year}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {member.bio && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(member)}
            data-testid={`button-edit-member-${member.id}`}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(member.id)}
            data-testid={`button-delete-member-${member.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Sortable Team Section Component
interface SortableTeamSectionProps {
  team: string;
  members: ExecutiveMember[];
  sensors: any;
  onMemberDragEnd: (event: DragEndEvent) => void;
  onMemberEdit: (member: ExecutiveMember) => void;
  onMemberDelete: (id: string) => void;
}

function SortableTeamSection({ team, members, sensors, onMemberDragEnd, onMemberEdit, onMemberDelete }: SortableTeamSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: team });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 mb-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold" data-testid={`heading-team-${team.toLowerCase().replace(/\s+/g, '-')}`}>
          {team}
        </h3>
        <span className="text-sm text-muted-foreground">
          (Drag teams or members to reorder)
        </span>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onMemberDragEnd}
      >
        <SortableContext
          items={members.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <SortableMemberCard
                key={member.id}
                member={member}
                onEdit={onMemberEdit}
                onDelete={onMemberDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function ManageExecutiveMembers() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingMember, setEditingMember] = useState<ExecutiveMember | null>(null);
  const [formData, setFormData] = useState<Partial<InsertExecutiveMember>>({
    name: "",
    title: "",
    major: "",
    year: "",
    bio: "",
    email: "",
    linkedin: "",
    image: "",
    team: "",
    displayOrder: 0,
  });
  const [localMembers, setLocalMembers] = useState<ExecutiveMember[]>([]);
  const [teamOrder, setTeamOrder] = useState<string[]>([]);

  const { data: members = [], isLoading } = useQuery<ExecutiveMember[]>({
    queryKey: ["/api/executive-members"],
  });

  // Update local state when members data changes
  useEffect(() => {
    setLocalMembers(members);
    
    // Derive team order from the actual order members appear in (not alphabetically)
    // This preserves the order saved in displayOrder values
    const seenTeams = new Set<string>();
    const teams: string[] = [];
    
    members.forEach((member) => {
      if (!seenTeams.has(member.team)) {
        seenTeams.add(member.team);
        teams.push(member.team);
      }
    });
    
    setTeamOrder(teams);
  }, [members]);

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsertExecutiveMember>) =>
      apiRequest("POST", "/api/executive-members", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/executive-members"] });
      toast({
        title: "Member added",
        description: "Executive board member has been added successfully.",
      });
      setIsAdding(false);
      setFormData({
        name: "",
        title: "",
        major: "",
        year: "",
        bio: "",
        email: "",
        linkedin: "",
        image: "",
        team: "",
        displayOrder: 0,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertExecutiveMember> }) =>
      apiRequest("PUT", `/api/executive-members/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/executive-members"] });
      toast({
        title: "Member updated",
        description: "Executive board member has been updated successfully.",
      });
      setEditingMember(null);
      setFormData({
        name: "",
        title: "",
        major: "",
        year: "",
        bio: "",
        email: "",
        linkedin: "",
        image: "",
        team: "",
        displayOrder: 0,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      apiRequest("DELETE", `/api/executive-members/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/executive-members"] });
      toast({
        title: "Member deleted",
        description: "Executive board member has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (updates: Array<{ id: string; displayOrder: number }>) =>
      apiRequest("PUT", "/api/executive-members/reorder", { updates }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/executive-members"] });
      toast({
        title: "Order updated",
        description: "Member order has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (member: ExecutiveMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      title: member.title,
      major: member.major,
      year: member.year,
      bio: member.bio || "",
      email: member.email || "",
      linkedin: member.linkedin || "",
      image: member.image || "",
      team: member.team,
      displayOrder: member.displayOrder,
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingMember(null);
    setIsAdding(false);
    setFormData({
      name: "",
      title: "",
      major: "",
      year: "",
      bio: "",
      email: "",
      linkedin: "",
      image: "",
      team: "",
      displayOrder: 0,
    });
  };

  const handleMemberDragEnd = (event: DragEndEvent, team: string) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const teamMembers = groupedMembers[team];
    const oldIndex = teamMembers.findIndex((m) => m.id === active.id);
    const newIndex = teamMembers.findIndex((m) => m.id === over.id);

    const reorderedMembers = arrayMove(teamMembers, oldIndex, newIndex);
    
    // Update display order for all members in this team
    const updates = reorderedMembers.map((member, index) => ({
      id: member.id,
      displayOrder: index,
    }));

    // Let the query refetch handle UI updates (no optimistic update)
    reorderMutation.mutate(updates);
  };

  const handleTeamDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = teamOrder.indexOf(active.id as string);
    const newIndex = teamOrder.indexOf(over.id as string);

    const newTeamOrder = arrayMove(teamOrder, oldIndex, newIndex);

    // Build a fresh grouping from current localMembers to ensure we have the latest data
    const currentGrouped = localMembers.reduce((acc, member) => {
      if (!acc[member.team]) {
        acc[member.team] = [];
      }
      acc[member.team].push(member);
      return acc;
    }, {} as Record<string, ExecutiveMember[]>);

    // Sort members within each team by their current displayOrder
    Object.keys(currentGrouped).forEach((team) => {
      currentGrouped[team].sort((a, b) => a.displayOrder - b.displayOrder);
    });

    // Update displayOrder for all members to reflect new team ordering
    // Members from team 0 get displayOrder 0-N, team 1 gets N+1-M, etc.
    const updates: Array<{ id: string; displayOrder: number }> = [];
    let currentOrder = 0;

    newTeamOrder.forEach((team) => {
      const teamMembers = currentGrouped[team];
      if (teamMembers && teamMembers.length > 0) {
        teamMembers.forEach((member) => {
          updates.push({
            id: member.id,
            displayOrder: currentOrder,
          });
          currentOrder++;
        });
      }
    });

    // Let the query refetch handle UI updates (no optimistic update)
    reorderMutation.mutate(updates);
  };

  // Memoize grouped members to prevent infinite render loops
  // Group members by team and sort within each team
  const groupedMembers = useMemo(() => {
    const grouped = localMembers.reduce((acc, member) => {
      if (!acc[member.team]) {
        acc[member.team] = [];
      }
      acc[member.team].push(member);
      return acc;
    }, {} as Record<string, ExecutiveMember[]>);

    // Sort members within each team by displayOrder (non-mutating approach)
    Object.keys(grouped).forEach((team) => {
      grouped[team] = [...grouped[team]].sort((a, b) => a.displayOrder - b.displayOrder);
    });

    return grouped;
  }, [localMembers]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" data-testid="heading-manage-executive-members">
            Executive Board Members
          </h2>
          <p className="text-muted-foreground">Manage executive board members by team</p>
        </div>
        <Button
          onClick={() => {
            setIsAdding(true);
            setEditingMember(null);
          }}
          data-testid="button-add-executive-member"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {(isAdding || editingMember) && (
        <Card data-testid="card-executive-member-form">
          <CardHeader>
            <CardTitle>{editingMember ? "Edit Member" : "Add New Member"}</CardTitle>
            <CardDescription>
              {editingMember ? "Update member information" : "Add a new executive board member"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-name">Name *</Label>
                  <Input
                    id="member-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-member-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-title">Title *</Label>
                  <Input
                    id="member-title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-member-title"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-major">Major *</Label>
                  <Input
                    id="member-major"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    required
                    data-testid="input-member-major"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-year">Year *</Label>
                  <Input
                    id="member-year"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    required
                    data-testid="input-member-year"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="member-bio">Bio</Label>
                <Textarea
                  id="member-bio"
                  value={formData.bio ?? ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  data-testid="textarea-member-bio"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-email">Email</Label>
                  <Input
                    id="member-email"
                    type="email"
                    value={formData.email ?? ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-member-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-linkedin">LinkedIn URL</Label>
                  <Input
                    id="member-linkedin"
                    type="url"
                    value={formData.linkedin ?? ""}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    data-testid="input-member-linkedin"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="member-team">Team *</Label>
                  <Input
                    id="member-team"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    required
                    placeholder="e.g., Executive Leadership, Marketing Team"
                    data-testid="input-member-team"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="member-display-order">Display Order</Label>
                  <Input
                    id="member-display-order"
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                    data-testid="input-member-display-order"
                  />
                </div>
              </div>

              <MemberImageUpload
                currentImage={formData.image ?? undefined}
                onImageChange={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                memberName={formData.name || "Member"}
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-member"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingMember
                    ? "Update Member"
                    : "Add Member"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-member">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {localMembers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No executive board members yet. Add your first member above.</p>
          </CardContent>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleTeamDragEnd}
        >
          <SortableContext items={teamOrder} strategy={verticalListSortingStrategy}>
            <div className="space-y-8">
              {teamOrder.map((team) => {
                if (!groupedMembers[team]) return null;
                
                return (
                  <SortableTeamSection
                    key={team}
                    team={team}
                    members={groupedMembers[team]}
                    sensors={sensors}
                    onMemberDragEnd={(event) => handleMemberDragEnd(event, team)}
                    onMemberEdit={startEdit}
                    onMemberDelete={(id) => deleteMutation.mutate(id)}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function ManageSlideshows() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingSlideshow, setEditingSlideshow] = useState<Slideshow | null>(null);
  const [expandedSlideshow, setExpandedSlideshow] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<InsertSlideshow>>({
    title: "",
    displayOrder: 0,
  });
  const [localSlideshows, setLocalSlideshows] = useState<Slideshow[]>([]);

  const { data: slideshows = [], isLoading } = useQuery<Slideshow[]>({
    queryKey: ["/api/slideshows"],
  });

  useEffect(() => {
    setLocalSlideshows(slideshows);
  }, [slideshows]);

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsertSlideshow>) =>
      apiRequest("POST", "/api/slideshows", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slideshows"] });
      toast({
        title: "Slideshow added",
        description: "Slideshow has been added successfully.",
      });
      setIsAdding(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Failed to add slideshow",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSlideshow> }) =>
      apiRequest("PUT", `/api/slideshows/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slideshows"] });
      toast({
        title: "Slideshow updated",
        description: "Slideshow has been updated successfully.",
      });
      setEditingSlideshow(null);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Failed to update slideshow",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      apiRequest("DELETE", `/api/slideshows/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slideshows"] });
      toast({
        title: "Slideshow deleted",
        description: "Slideshow and all its slides have been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete slideshow",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (updates: Array<{ id: string; displayOrder: number }>) => {
      return await apiRequest("PUT", "/api/slideshows/reorder", { updates });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/slideshows"] });
      await queryClient.refetchQueries({ queryKey: ["/api/slideshows"] });
    },
    onError: (error) => {
      console.error("Reorder error:", error);
      toast({
        title: "Failed to reorder slideshows",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      displayOrder: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlideshow) {
      updateMutation.mutate({ id: editingSlideshow.id, data: formData });
    } else {
      const maxOrder = localSlideshows.length > 0 
        ? Math.max(...localSlideshows.map(s => s.displayOrder || 0))
        : -1;
      createMutation.mutate({ ...formData, displayOrder: maxOrder + 1 });
    }
  };

  const startEdit = (slideshow: Slideshow) => {
    setEditingSlideshow(slideshow);
    setFormData(slideshow);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setEditingSlideshow(null);
    setIsAdding(false);
    resetForm();
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localSlideshows.findIndex((s) => s.id === active.id);
      const newIndex = localSlideshows.findIndex((s) => s.id === over.id);

      const reorderedSlideshows = arrayMove(localSlideshows, oldIndex, newIndex);
      setLocalSlideshows(reorderedSlideshows);

      const updates = reorderedSlideshows.map((s, index) => ({
        id: s.id,
        displayOrder: index,
      }));

      reorderMutation.mutate(updates);
    }
  };

  const toggleSlideshow = (slideshowId: string) => {
    setExpandedSlideshow(expandedSlideshow === slideshowId ? null : slideshowId);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading slideshows...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Slideshows</CardTitle>
          <CardDescription>
            Create and manage brand-specific slideshows. Each slideshow will display as a separate carousel on the sponsors page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAdding && !editingSlideshow && (
            <Button onClick={() => setIsAdding(true)} data-testid="button-add-slideshow">
              <Plus className="h-4 w-4 mr-2" />
              Add New Slideshow
            </Button>
          )}

          {(isAdding || editingSlideshow) && (
            <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="slideshow-title">Slideshow Title</Label>
                <Input
                  id="slideshow-title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Platinum Sponsors, Gold Sponsors, etc."
                  required
                  data-testid="input-slideshow-title"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-slideshow">
                  <Save className="h-4 w-4 mr-2" />
                  {editingSlideshow ? "Update" : "Create"} Slideshow
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} data-testid="button-cancel-slideshow">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localSlideshows.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {localSlideshows.map((slideshow) => (
              <SortableSlideshowItem
                key={slideshow.id}
                slideshow={slideshow}
                onEdit={startEdit}
                onDelete={(id) => deleteMutation.mutate(id)}
                isExpanded={expandedSlideshow === slideshow.id}
                onToggle={() => toggleSlideshow(slideshow.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {localSlideshows.length === 0 && !isAdding && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No slideshows yet. Click "Add New Slideshow" to create one.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SortableSlideshowItem({
  slideshow,
  onEdit,
  onDelete,
  isExpanded,
  onToggle,
}: {
  slideshow: Slideshow;
  onEdit: (slideshow: Slideshow) => void;
  onDelete: (id: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slideshow.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <button
            className="cursor-grab active:cursor-grabbing mt-1"
            {...attributes}
            {...listeners}
            data-testid={`button-drag-slideshow-${slideshow.id}`}
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg" data-testid={`text-slideshow-title-${slideshow.id}`}>
              {slideshow.title}
            </h3>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              data-testid={`button-toggle-slides-${slideshow.id}`}
            >
              {isExpanded ? "Hide" : "Manage"} Slides
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(slideshow)}
              data-testid={`button-edit-slideshow-${slideshow.id}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(slideshow.id)}
              data-testid={`button-delete-slideshow-${slideshow.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isExpanded && <ManageSlides slideshowId={slideshow.id} />}
      </CardContent>
    </Card>
  );
}

function ManageSlides({ slideshowId }: { slideshowId: string }) {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<InsertSlideshowSlide>>({
    slideshowId,
    image: "",
    displayOrder: 0,
  });
  const [localSlides, setLocalSlides] = useState<SlideshowSlide[]>([]);

  const { data: slides = [], isLoading } = useQuery<SlideshowSlide[]>({
    queryKey: ["/api/slideshows", slideshowId, "slides"],
    queryFn: async () => {
      const response = await fetch(`/api/slideshows/${slideshowId}/slides`);
      if (!response.ok) throw new Error("Failed to fetch slides");
      return response.json();
    },
  });

  useEffect(() => {
    setLocalSlides(slides);
  }, [slides]);

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsertSlideshowSlide>) =>
      apiRequest("POST", "/api/slides", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slideshows", slideshowId, "slides"] });
      toast({
        title: "Slide added",
        description: "Slide has been added successfully.",
      });
      setIsAdding(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Failed to add slide",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      apiRequest("DELETE", `/api/slides/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slideshows", slideshowId, "slides"] });
      toast({
        title: "Slide deleted",
        description: "Slide has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete slide",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (updates: Array<{ id: string; displayOrder: number }>) => {
      return await apiRequest("PUT", "/api/slides/reorder", { updates });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["/api/slideshows", slideshowId, "slides"] });
      await queryClient.refetchQueries({ queryKey: ["/api/slideshows", slideshowId, "slides"] });
    },
    onError: (error) => {
      console.error("Reorder error:", error);
      toast({
        title: "Failed to reorder slides",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      slideshowId,
      image: "",
      displayOrder: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maxOrder = localSlides.length > 0 
      ? Math.max(...localSlides.map(s => s.displayOrder || 0))
      : -1;
    createMutation.mutate({ ...formData, slideshowId, displayOrder: maxOrder + 1 });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = localSlides.findIndex((s) => s.id === active.id);
      const newIndex = localSlides.findIndex((s) => s.id === over.id);

      const reorderedSlides = arrayMove(localSlides, oldIndex, newIndex);
      setLocalSlides(reorderedSlides);

      const updates = reorderedSlides.map((s, index) => ({
        id: s.id,
        displayOrder: index,
      }));

      reorderMutation.mutate(updates);
    }
  };

  if (isLoading) {
    return <div className="mt-4 text-center py-4 text-sm text-muted-foreground">Loading slides...</div>;
  }

  return (
    <div className="mt-6 pt-6 border-t border-border space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Slides</h4>
        {!isAdding && (
          <Button size="sm" onClick={() => setIsAdding(true)} data-testid={`button-add-slide-${slideshowId}`}>
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-md p-4 bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor={`slide-image-${slideshowId}`}>Slide Image</Label>
            <SlideImageUpload
              currentImage={formData.image || undefined}
              onImageChange={(url) => setFormData({ ...formData, image: url || "" })}
              label="Upload Slide Image"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={createMutation.isPending || !formData.image} data-testid={`button-save-slide-${slideshowId}`}>
              <Save className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => { setIsAdding(false); resetForm(); }} data-testid={`button-cancel-slide-${slideshowId}`}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localSlides.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {localSlides.map((slide) => (
              <SortableSlideItem
                key={slide.id}
                slide={slide}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {localSlides.length === 0 && !isAdding && (
        <div className="text-center py-6 text-sm text-muted-foreground border border-dashed border-border rounded-md">
          No slides yet. Click "Add Slide" to create one.
        </div>
      )}
    </div>
  );
}

function SortableSlideItem({
  slide,
  onDelete,
}: {
  slide: SlideshowSlide;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group">
      <div className="border border-border rounded-md overflow-hidden bg-card">
        <div className="aspect-video relative">
          {slide.image && (
            <img
              src={slide.image}
              alt="Slide"
              className="w-full h-full object-cover"
            />
          )}
          <button
            className="absolute top-2 left-2 cursor-grab active:cursor-grabbing bg-background/80 p-1.5 rounded"
            {...attributes}
            {...listeners}
            data-testid={`button-drag-slide-${slide.id}`}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(slide.id)}
            data-testid={`button-delete-slide-${slide.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ManagePortfolio() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingClient, setEditingClient] = useState<PortfolioClient | null>(null);
  const [formData, setFormData] = useState<Partial<InsertPortfolioClient>>({
    semester: "",
    clientName: "",
    clientUrl: "",
    displayOrder: 0,
  });

  const { data: clients = [], isLoading } = useQuery<PortfolioClient[]>({
    queryKey: ["/api/portfolio-clients"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsertPortfolioClient>) =>
      apiRequest("POST", "/api/portfolio-clients", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio-clients"] });
      toast({
        title: "Client added",
        description: "Portfolio client has been added successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add portfolio client. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPortfolioClient> }) =>
      apiRequest("PUT", `/api/portfolio-clients/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio-clients"] });
      toast({
        title: "Client updated",
        description: "Portfolio client has been updated successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update portfolio client. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/portfolio-clients/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio-clients"] });
      toast({
        title: "Client deleted",
        description: "Portfolio client has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete portfolio client. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      semester: "",
      clientName: "",
      clientUrl: "",
      displayOrder: 0,
    });
    setIsAdding(false);
    setEditingClient(null);
  };

  const startEdit = (client: PortfolioClient) => {
    setEditingClient(client);
    setFormData({
      semester: client.semester,
      clientName: client.clientName,
      clientUrl: client.clientUrl,
      displayOrder: client.displayOrder,
    });
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: formData });
    } else {
      const maxOrder = clients.length > 0 
        ? Math.max(...clients.map(c => c.displayOrder || 0))
        : -1;
      createMutation.mutate({ ...formData, displayOrder: maxOrder + 1 });
    }
  };

  const groupedBySemester = useMemo(() => {
    const grouped = clients.reduce((acc, client) => {
      if (!acc[client.semester]) {
        acc[client.semester] = [];
      }
      acc[client.semester].push(client);
      return acc;
    }, {} as Record<string, PortfolioClient[]>);

    return Object.entries(grouped).sort(([a], [b]) => {
      const semesterOrder = ["Spring", "Fall"];
      const [aSeason, aYear] = a.split(" ");
      const [bSeason, bYear] = b.split(" ");
      
      if (aYear !== bYear) {
        return parseInt(bYear) - parseInt(aYear);
      }
      return semesterOrder.indexOf(bSeason) - semesterOrder.indexOf(aSeason);
    });
  }, [clients]);

  if (isLoading) {
    return <div className="text-center py-8">Loading portfolio clients...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Consulting Committee Portfolio</CardTitle>
          <CardDescription>
            Add and manage client portfolio entries for the Consulting Committee page. Entries are organized by semester.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="w-full" data-testid="button-add-portfolio-client">
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          )}

          {isAdding && (
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-border rounded-md">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    value={formData.semester || ""}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    placeholder="e.g., Spring 2025"
                    required
                    data-testid="input-semester"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName || ""}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g., FindGood.Tech"
                    required
                    data-testid="input-client-name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientUrl">Client Website URL</Label>
                <Input
                  id="clientUrl"
                  type="url"
                  value={formData.clientUrl || ""}
                  onChange={(e) => setFormData({ ...formData, clientUrl: e.target.value })}
                  placeholder="https://example.com"
                  required
                  data-testid="input-client-url"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-portfolio-client"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingClient ? "Update Client" : "Add Client"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-portfolio-client">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {groupedBySemester.length === 0 && !isAdding && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No portfolio clients yet. Click "Add New Client" to create one.
          </CardContent>
        </Card>
      )}

      {groupedBySemester.map(([semester, semesterClients]) => (
        <Card key={semester}>
          <CardHeader>
            <CardTitle className="text-lg">{semester}</CardTitle>
            <CardDescription>{semesterClients.length} client{semesterClients.length !== 1 ? 's' : ''}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {semesterClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 border border-border rounded-md hover-elevate"
                  data-testid={`portfolio-client-${client.id}`}
                >
                  <div className="flex-1">
                    <div className="font-medium">{client.clientName}</div>
                    <a
                      href={client.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                      data-testid={`link-client-url-${client.id}`}
                    >
                      {client.clientUrl}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(client)}
                      data-testid={`button-edit-portfolio-client-${client.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(client.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-portfolio-client-${client.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ManageAlumniSpotlight() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<AlumniSpotlight | null>(null);
  const [formData, setFormData] = useState<Partial<InsertAlumniSpotlight>>({
    name: "",
    classYear: "",
    position: "",
    company: "",
    description: "",
    linkedinUrl: "",
    imageUrl: "",
    displayOrder: 0,
  });

  const { data: alumni = [], isLoading } = useQuery<AlumniSpotlight[]>({
    queryKey: ["/api/alumni-spotlight"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<InsertAlumniSpotlight>) =>
      apiRequest("POST", "/api/alumni-spotlight", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alumni-spotlight"] });
      toast({
        title: "Alumni added",
        description: "Alumni spotlight entry has been added successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add alumni spotlight entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertAlumniSpotlight> }) =>
      apiRequest("PUT", `/api/alumni-spotlight/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alumni-spotlight"] });
      toast({
        title: "Alumni updated",
        description: "Alumni spotlight entry has been updated successfully.",
      });
      resetForm();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update alumni spotlight entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/alumni-spotlight/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/alumni-spotlight"] });
      toast({
        title: "Alumni deleted",
        description: "Alumni spotlight entry has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete alumni spotlight entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      classYear: "",
      position: "",
      company: "",
      description: "",
      linkedinUrl: "",
      imageUrl: "",
      displayOrder: 0,
    });
    setIsAdding(false);
    setEditingAlumni(null);
  };

  const startEdit = (alumniEntry: AlumniSpotlight) => {
    setEditingAlumni(alumniEntry);
    setFormData({
      name: alumniEntry.name,
      classYear: alumniEntry.classYear,
      position: alumniEntry.position,
      company: alumniEntry.company,
      description: alumniEntry.description,
      linkedinUrl: alumniEntry.linkedinUrl || "",
      imageUrl: alumniEntry.imageUrl || "",
      displayOrder: alumniEntry.displayOrder,
    });
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlumni) {
      updateMutation.mutate({ id: editingAlumni.id, data: formData });
    } else {
      const maxOrder = alumni.length > 0 
        ? Math.max(...alumni.map(a => a.displayOrder || 0))
        : -1;
      createMutation.mutate({ ...formData, displayOrder: maxOrder + 1 });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading alumni spotlight...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Alumni Spotlight</CardTitle>
          <CardDescription>
            Add and manage alumni spotlight entries for the Alumni page. These featured alumni will be displayed prominently.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} className="w-full" data-testid="button-add-alumni">
              <Plus className="h-4 w-4 mr-2" />
              Add Alumni Spotlight
            </Button>
          )}

          {isAdding && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    data-testid="input-alumni-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classYear">Class Year</Label>
                  <Input
                    id="classYear"
                    value={formData.classYear || ""}
                    onChange={(e) => setFormData({ ...formData, classYear: e.target.value })}
                    placeholder="Class of 2023"
                    required
                    data-testid="input-alumni-class-year"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position || ""}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Marketing Manager"
                    required
                    data-testid="input-alumni-position"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Google"
                    required
                    data-testid="input-alumni-company"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share their success story and impact..."
                  rows={4}
                  required
                  data-testid="input-alumni-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL (optional)</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl || ""}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/in/johndoe"
                  data-testid="input-alumni-linkedin"
                />
              </div>

              <div className="space-y-2">
                <Label>Profile Image (optional)</Label>
                <MemberImageUpload
                  currentImage={formData.imageUrl || undefined}
                  onImageChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  memberName={formData.name || "Alumni"}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-alumni"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingAlumni ? "Update Alumni" : "Add Alumni"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-alumni">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {alumni.length === 0 && !isAdding && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No alumni spotlight entries yet. Click "Add Alumni Spotlight" to create one.
          </CardContent>
        </Card>
      )}

      {alumni.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Alumni Spotlight Entries</CardTitle>
            <CardDescription>{alumni.length} featured alumni</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alumni.map((alumniEntry) => (
                <div
                  key={alumniEntry.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-md hover-elevate"
                  data-testid={`alumni-entry-${alumniEntry.id}`}
                >
                  {alumniEntry.imageUrl && (
                    <img
                      src={alumniEntry.imageUrl}
                      alt={alumniEntry.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-lg">{alumniEntry.name}</div>
                    <div className="text-sm text-muted-foreground">{alumniEntry.classYear}</div>
                    <div className="text-sm font-medium mt-1">{alumniEntry.position} at {alumniEntry.company}</div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{alumniEntry.description}</p>
                    {alumniEntry.linkedinUrl && (
                      <a
                        href={alumniEntry.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-1 inline-block"
                        data-testid={`link-linkedin-${alumniEntry.id}`}
                      >
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(alumniEntry)}
                      data-testid={`button-edit-alumni-${alumniEntry.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMutation.mutate(alumniEntry.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-alumni-${alumniEntry.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ManageCommittees() {
  const { toast } = useToast();
  const { data: committees = [], isLoading } = useQuery<CommitteeConfig[]>({
    queryKey: ["/api/committees"],
  });

  const [formData, setFormData] = useState<Partial<InsertCommitteeConfig>>({
    slug: "",
    name: "",
    heroImage: "",
    missionImage: "",
    image1: "",
    image2: "",
    image3: "",
    description: "",
    applyLink: "",
    email: "",
    spotifyUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    displayOrder: 0
  });
  const [selectedCommittee, setSelectedCommittee] = useState<CommitteeConfig | null>(null);

  const allCommittees = [
    { slug: "consulting", name: "Consulting Committee" },
    { slug: "podcast", name: "Podcast Committee" },
    { slug: "event-planning", name: "Event Planning Committee" },
    { slug: "adobe", name: "Adobe Committee" },
    { slug: "sales", name: "Sales Committee" },
    { slug: "competitions", name: "Competitions Committee" },
    { slug: "multimedia", name: "Multimedia Committee" }
  ];

  const updateCommitteeMutation = useMutation({
    mutationFn: async ({ slug, data }: { slug: string; data: Partial<InsertCommitteeConfig> }) => {
      return await apiRequest("PUT", `/api/committees/${slug}`, data);
    },
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/committees"] });
      queryClient.invalidateQueries({ queryKey: [`/api/committees/${slug}`] });
      toast({
        title: "Success",
        description: "Committee settings updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update committee settings",
      });
    },
  });

  const createCommitteeMutation = useMutation({
    mutationFn: async (data: InsertCommitteeConfig) => {
      return await apiRequest("POST", "/api/committees", data);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/committees"] });
      if (data.slug) {
        queryClient.invalidateQueries({ queryKey: [`/api/committees/${data.slug}`] });
      }
      toast({
        title: "Success",
        description: "Committee configuration created successfully",
      });
      setFormData({
        slug: "",
        name: "",
        heroImage: "",
        missionImage: "",
        image1: "",
        image2: "",
        image3: "",
        description: "",
        applyLink: "",
        email: "",
        spotifyUrl: "",
        instagramUrl: "",
        youtubeUrl: "",
        displayOrder: 0
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create committee configuration",
      });
    },
  });

  const handleCommitteeSelect = (slug: string) => {
    const committee = committees.find(c => c.slug === slug);
    if (committee) {
      setSelectedCommittee(committee);
      setFormData({
        slug: committee.slug,
        name: committee.name,
        heroImage: committee.heroImage || "",
        missionImage: committee.missionImage || "",
        image1: committee.image1 || "",
        image2: committee.image2 || "",
        image3: committee.image3 || "",
        description: committee.description || "",
        applyLink: committee.applyLink || "",
        email: committee.email || "",
        spotifyUrl: committee.spotifyUrl || "",
        instagramUrl: committee.instagramUrl || "",
        youtubeUrl: committee.youtubeUrl || "",
        displayOrder: committee.displayOrder || 0
      });
    } else {
      const defaultCommittee = allCommittees.find(c => c.slug === slug);
      if (defaultCommittee) {
        setSelectedCommittee(null);
        setFormData({
          slug: defaultCommittee.slug,
          name: defaultCommittee.name,
          heroImage: "",
          missionImage: "",
          image1: "",
          image2: "",
          image3: "",
          description: "",
          applyLink: "",
          email: "",
          spotifyUrl: "",
          instagramUrl: "",
          youtubeUrl: "",
          displayOrder: committees.length
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCommittee) {
      updateCommitteeMutation.mutate({ slug: selectedCommittee.slug, data: formData });
    } else {
      if (!formData.slug || !formData.name) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Committee slug and name are required",
        });
        return;
      }
      createCommitteeMutation.mutate(formData as InsertCommitteeConfig);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Committees Configuration</CardTitle>
          <CardDescription>
            Manage images and content for all committee pages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="committeeSelect">Select Committee</Label>
            <select
              id="committeeSelect"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              onChange={(e) => handleCommitteeSelect(e.target.value)}
              value={formData.slug}
              data-testid="select-committee"
            >
              <option value="">-- Select a committee --</option>
              {allCommittees.map(committee => {
                const exists = committees.some(c => c.slug === committee.slug);
                return (
                  <option key={committee.slug} value={committee.slug}>
                    {committee.name} {exists ? "(configured)" : "(not configured)"}
                  </option>
                );
              })}
            </select>
          </div>

          {formData.slug && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="committeeName">Committee Name</Label>
                <Input
                  id="committeeName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Consulting Committee"
                  data-testid="input-committee-name"
                />
              </div>

              <div className="space-y-2">
                <Label>Hero Image</Label>
                <ImageUploadWithCrop
                  aspectRatio={4 / 3}
                  currentImage={formData.heroImage || undefined}
                  onImageChange={(url) => setFormData({ ...formData, heroImage: url })}
                  imageType="hero"
                />
              </div>

              <div className="space-y-2">
                <Label>Mission/About Image</Label>
                <ImageUploadWithCrop
                  aspectRatio={4 / 3}
                  currentImage={formData.missionImage || undefined}
                  onImageChange={(url) => setFormData({ ...formData, missionImage: url })}
                  imageType="mission"
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Image 1</Label>
                <ImageUploadWithCrop
                  aspectRatio={4 / 3}
                  currentImage={formData.image1 || undefined}
                  onImageChange={(url) => setFormData({ ...formData, image1: url })}
                  imageType="whyChoose"
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Image 2</Label>
                <ImageUploadWithCrop
                  aspectRatio={4 / 3}
                  currentImage={formData.image2 || undefined}
                  onImageChange={(url) => setFormData({ ...formData, image2: url })}
                  imageType="services"
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Image 3</Label>
                <ImageUploadWithCrop
                  aspectRatio={4 / 3}
                  currentImage={formData.image3 || undefined}
                  onImageChange={(url) => setFormData({ ...formData, image3: url })}
                  imageType="family"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="committeeDescription">Description</Label>
                <Textarea
                  id="committeeDescription"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Optional description text"
                  rows={3}
                  data-testid="input-committee-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="applyLink">Apply Link</Label>
                  <Input
                    id="applyLink"
                    type="url"
                    value={formData.applyLink || ""}
                    onChange={(e) => setFormData({ ...formData, applyLink: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-apply-link"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committeeEmail">Contact Email</Label>
                  <Input
                    id="committeeEmail"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="committee@example.com"
                    data-testid="input-committee-email"
                  />
                </div>
              </div>

              {formData.slug === "podcast" && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold">Podcast-Specific Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="spotifyUrl">Spotify URL</Label>
                      <Input
                        id="spotifyUrl"
                        type="url"
                        value={formData.spotifyUrl || ""}
                        onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                        placeholder="https://open.spotify.com/..."
                        data-testid="input-spotify-url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagramUrl">Instagram URL</Label>
                      <Input
                        id="instagramUrl"
                        type="url"
                        value={formData.instagramUrl || ""}
                        onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                        placeholder="https://instagram.com/..."
                        data-testid="input-instagram-url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input
                        id="youtubeUrl"
                        type="url"
                        value={formData.youtubeUrl || ""}
                        onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                        placeholder="https://youtube.com/..."
                        data-testid="input-youtube-url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktokUrl">TikTok URL</Label>
                      <Input
                        id="tiktokUrl"
                        type="url"
                        value={formData.tiktokUrl || ""}
                        onChange={(e) => setFormData({ ...formData, tiktokUrl: e.target.value })}
                        placeholder="https://tiktok.com/@..."
                        data-testid="input-tiktok-url"
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={updateCommitteeMutation.isPending || createCommitteeMutation.isPending}
                data-testid="button-save-committee"
              >
                <Save className="h-4 w-4 mr-2" />
                {selectedCommittee ? "Update Committee" : "Create Committee"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      {isLoading && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Loading committees...
          </CardContent>
        </Card>
      )}

      {!isLoading && committees.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Configured Committees</CardTitle>
            <CardDescription>
              {committees.length} of {allCommittees.length} committees configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {committees
                .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                .map((committee) => (
                  <div
                    key={committee.id}
                    className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                    data-testid={`committee-card-${committee.slug}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{committee.name}</h3>
                      <p className="text-sm text-muted-foreground">/{committee.slug}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleCommitteeSelect(committee.slug)}
                      data-testid={`button-edit-committee-${committee.slug}`}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ManagePodcast() {
  const { toast } = useToast();
  const { data: settings } = useQuery<Settings>({
    queryKey: ["/api/settings"],
  });
  const { data: speakers = [], isLoading } = useQuery<FeaturedSpeaker[]>({
    queryKey: ["/api/featured-speakers"],
  });

  const [formData, setFormData] = useState<Partial<Settings>>({});
  const [speakerFormData, setSpeakerFormData] = useState({
    name: "",
    topic: "",
    description: "",
    category: "recent" as "recent" | "past"
  });
  const [isAddingSpeaker, setIsAddingSpeaker] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<FeaturedSpeaker | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData({
        podcastHeroImage: settings.podcastHeroImage,
        podcastIndustryImage: settings.podcastIndustryImage,
        podcastCreativeImage: settings.podcastCreativeImage,
        podcastSpotifyUrl: settings.podcastSpotifyUrl,
        podcastInstagramUrl: settings.podcastInstagramUrl,
        podcastYoutubeUrl: settings.podcastYoutubeUrl,
        podcastEmail: settings.podcastEmail,
        podcastApplyLink: settings.podcastApplyLink
      });
    }
  }, [settings]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: Partial<Settings>) => {
      return await apiRequest("POST", "/api/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Podcast settings updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update settings",
      });
    },
  });

  const createSpeakerMutation = useMutation({
    mutationFn: async (data: typeof speakerFormData & { displayOrder: number }) => {
      return await apiRequest("POST", "/api/featured-speakers", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/featured-speakers"] });
      toast({
        title: "Success",
        description: "Featured speaker added successfully",
      });
      resetSpeakerForm();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add speaker",
      });
    },
  });

  const updateSpeakerMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof speakerFormData }) => {
      return await apiRequest("PATCH", `/api/featured-speakers/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/featured-speakers"] });
      toast({
        title: "Success",
        description: "Featured speaker updated successfully",
      });
      resetSpeakerForm();
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update speaker",
      });
    },
  });

  const deleteSpeakerMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/featured-speakers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/featured-speakers"] });
      toast({
        title: "Success",
        description: "Featured speaker deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete speaker",
      });
    },
  });

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettingsMutation.mutate(formData);
  };

  const resetSpeakerForm = () => {
    setSpeakerFormData({
      name: "",
      topic: "",
      description: "",
      category: "recent"
    });
    setIsAddingSpeaker(false);
    setEditingSpeaker(null);
  };

  const startEditSpeaker = (speaker: FeaturedSpeaker) => {
    setEditingSpeaker(speaker);
    setSpeakerFormData({
      name: speaker.name,
      topic: speaker.topic,
      description: speaker.description,
      category: speaker.category as "recent" | "past"
    });
    setIsAddingSpeaker(true);
  };

  const handleSpeakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpeaker) {
      updateSpeakerMutation.mutate({ id: editingSpeaker.id, data: speakerFormData });
    } else {
      const maxOrder = speakers.length > 0 
        ? Math.max(...speakers.map(s => s.displayOrder || 0))
        : -1;
      createSpeakerMutation.mutate({ ...speakerFormData, displayOrder: maxOrder + 1 });
    }
  };

  const recentSpeakers = speakers.filter(s => s.category === "recent");
  const pastSpeakers = speakers.filter(s => s.category === "past");

  return (
    <div className="space-y-6">
      {/* Podcast Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Podcast Page Settings</CardTitle>
          <CardDescription>
            Configure podcast page content, images, and platform links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSettingsSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <ImageUploadWithCrop
                aspectRatio={4 / 3}
                currentImage={formData.podcastHeroImage || undefined}
                onImageChange={(url) => setFormData({ ...formData, podcastHeroImage: url })}
                imageType="podcastHero"
              />
            </div>

            <div className="space-y-2">
              <Label>Industry Connections Image</Label>
              <ImageUploadWithCrop
                aspectRatio={4 / 3}
                currentImage={formData.podcastIndustryImage || undefined}
                onImageChange={(url) => setFormData({ ...formData, podcastIndustryImage: url })}
                imageType="podcastIndustry"
              />
            </div>

            <div className="space-y-2">
              <Label>Creative Skills Image</Label>
              <ImageUploadWithCrop
                aspectRatio={4 / 3}
                currentImage={formData.podcastCreativeImage || undefined}
                onImageChange={(url) => setFormData({ ...formData, podcastCreativeImage: url })}
                imageType="podcastCreative"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="spotifyUrl">Spotify URL</Label>
                <Input
                  id="spotifyUrl"
                  type="url"
                  value={formData.podcastSpotifyUrl || ""}
                  onChange={(e) => setFormData({ ...formData, podcastSpotifyUrl: e.target.value })}
                  placeholder="https://open.spotify.com/..."
                  data-testid="input-spotify-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  type="url"
                  value={formData.podcastInstagramUrl || ""}
                  onChange={(e) => setFormData({ ...formData, podcastInstagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                  data-testid="input-instagram-url"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  value={formData.podcastYoutubeUrl || ""}
                  onChange={(e) => setFormData({ ...formData, podcastYoutubeUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  data-testid="input-youtube-url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="podcastEmail">Contact Email</Label>
                <Input
                  id="podcastEmail"
                  type="email"
                  value={formData.podcastEmail || ""}
                  onChange={(e) => setFormData({ ...formData, podcastEmail: e.target.value })}
                  placeholder="podcast.sdsuama@gmail.com"
                  data-testid="input-podcast-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applyLink">Apply Link (for join button)</Label>
              <Input
                id="applyLink"
                type="url"
                value={formData.podcastApplyLink || ""}
                onChange={(e) => setFormData({ ...formData, podcastApplyLink: e.target.value })}
                placeholder="https://forms.gle/..."
                data-testid="input-apply-link"
              />
            </div>

            <Button
              type="submit"
              disabled={updateSettingsMutation.isPending}
              data-testid="button-save-podcast-settings"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Podcast Settings
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Featured Speakers Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Featured Speakers</CardTitle>
          <CardDescription>
            Add and manage featured speakers for the podcast page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAddingSpeaker && (
            <Button onClick={() => setIsAddingSpeaker(true)} className="w-full" data-testid="button-add-speaker">
              <Plus className="h-4 w-4 mr-2" />
              Add Featured Speaker
            </Button>
          )}

          {isAddingSpeaker && (
            <form onSubmit={handleSpeakerSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="speakerName">Speaker Name</Label>
                  <Input
                    id="speakerName"
                    value={speakerFormData.name}
                    onChange={(e) => setSpeakerFormData({ ...speakerFormData, name: e.target.value })}
                    placeholder="John Doe"
                    required
                    data-testid="input-speaker-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="speakerTopic">Topic/Title</Label>
                  <Input
                    id="speakerTopic"
                    value={speakerFormData.topic}
                    onChange={(e) => setSpeakerFormData({ ...speakerFormData, topic: e.target.value })}
                    placeholder="Marketing Strategy Expert"
                    required
                    data-testid="input-speaker-topic"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakerDescription">Description</Label>
                <Textarea
                  id="speakerDescription"
                  value={speakerFormData.description}
                  onChange={(e) => setSpeakerFormData({ ...speakerFormData, description: e.target.value })}
                  placeholder="Brief description of the speaker and their expertise..."
                  rows={3}
                  required
                  data-testid="input-speaker-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="speakerCategory">Category</Label>
                <select
                  id="speakerCategory"
                  value={speakerFormData.category}
                  onChange={(e) => setSpeakerFormData({ ...speakerFormData, category: e.target.value as ("recent" | "past") })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  data-testid="select-speaker-category"
                >
                  <option value="recent">Recent Featured Speaker</option>
                  <option value="past">Past Featured Speaker</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={createSpeakerMutation.isPending || updateSpeakerMutation.isPending}
                  data-testid="button-save-speaker"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingSpeaker ? "Update Speaker" : "Add Speaker"}
                </Button>
                <Button type="button" variant="outline" onClick={resetSpeakerForm} data-testid="button-cancel-speaker">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Speakers List */}
      {speakers.length > 0 && (
        <>
          {recentSpeakers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Featured Speakers</CardTitle>
                <CardDescription>{recentSpeakers.length} recent speakers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentSpeakers.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-md hover-elevate"
                      data-testid={`speaker-recent-${speaker.id}`}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-lg">{speaker.name}</div>
                        <div className="text-sm font-semibold text-[#D4A574] mt-1">{speaker.topic}</div>
                        <p className="text-sm text-muted-foreground mt-2">{speaker.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditSpeaker(speaker)}
                          data-testid={`button-edit-speaker-${speaker.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteSpeakerMutation.mutate(speaker.id)}
                          disabled={deleteSpeakerMutation.isPending}
                          data-testid={`button-delete-speaker-${speaker.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {pastSpeakers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Past Featured Speakers</CardTitle>
                <CardDescription>{pastSpeakers.length} past speakers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pastSpeakers.map((speaker) => (
                    <div
                      key={speaker.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-md hover-elevate"
                      data-testid={`speaker-past-${speaker.id}`}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-lg">{speaker.name}</div>
                        <div className="text-sm font-semibold text-[#D4A574] mt-1">{speaker.topic}</div>
                        <p className="text-sm text-muted-foreground mt-2">{speaker.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEditSpeaker(speaker)}
                          data-testid={`button-edit-speaker-${speaker.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteSpeakerMutation.mutate(speaker.id)}
                          disabled={deleteSpeakerMutation.isPending}
                          data-testid={`button-delete-speaker-${speaker.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {speakers.length === 0 && !isAddingSpeaker && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No featured speakers yet. Click "Add Featured Speaker" to create one.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
