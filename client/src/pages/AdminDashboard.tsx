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
  GripVertical
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
import { type Settings, type Event, type Highlight, type ExecutiveMember, type InsertExecutiveMember } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ImageUploadWithCrop } from "@/components/ImageUploadWithCrop";
import { MemberImageUpload } from "@/components/MemberImageUpload";

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
          <TabsList className="grid w-full grid-cols-4 max-w-3xl" data-testid="tabs-admin">
            <TabsTrigger value="general" data-testid="tab-general">
              <SettingsIcon className="h-4 w-4 mr-2" />
              General Settings
            </TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Events
            </TabsTrigger>
            <TabsTrigger value="highlights" data-testid="tab-highlights">
              <ImageIcon className="h-4 w-4 mr-2" />
              Highlights
            </TabsTrigger>
            <TabsTrigger value="executive-members" data-testid="tab-executive-members">
              <Users className="h-4 w-4 mr-2" />
              Executive Board
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

          <TabsContent value="executive-members">
            <ManageExecutiveMembers />
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
