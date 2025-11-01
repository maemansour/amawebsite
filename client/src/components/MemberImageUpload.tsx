import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Check, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | undefined) => void;
  memberName?: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function MemberImageUpload({
  currentImage,
  onImageChange,
  memberName = "Member",
}: MemberImageUploadProps) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImage(reader.result as string);
      setShowDialog(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea: CropArea, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async (): Promise<Blob> => {
    if (!originalImage || !croppedAreaPixels) {
      throw new Error("No image or crop area");
    }

    const image = await createImage(originalImage);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      }, "image/jpeg", 0.95);
    });
  };

  const handleSave = async () => {
    try {
      setIsUploading(true);

      // Create cropped image
      const croppedBlob = await createCroppedImage();

      // Get presigned upload URL and permanent object path
      const uploadResponse = await apiRequest("POST", "/api/objects/upload", {});
      const uploadData = await uploadResponse.json() as { uploadURL: string; objectPath: string };

      // Upload to object storage using the temporary signed URL
      const putResponse = await fetch(uploadData.uploadURL, {
        method: "PUT",
        body: croppedBlob,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      if (!putResponse.ok) {
        throw new Error("Upload failed");
      }

      // Return the normalized object path to parent component
      onImageChange(uploadData.objectPath);

      toast({
        title: "Image uploaded",
        description: "Profile image has been uploaded successfully.",
      });

      setShowDialog(false);
      setOriginalImage(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onImageChange(undefined);
    toast({
      title: "Image removed",
      description: "Profile image has been removed.",
    });
  };

  return (
    <div className="space-y-2">
      <Label>Profile Image</Label>
      <div className="flex gap-3 items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={currentImage} alt={memberName} />
          <AvatarFallback>{memberName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("member-profile-image")?.click()}
            data-testid="button-upload-member-image"
          >
            <Upload className="w-4 h-4 mr-2" />
            {currentImage ? "Change" : "Upload"}
          </Button>
          {currentImage && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              data-testid="button-remove-member-image"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          )}
          <input
            id="member-profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Crop Profile Image</DialogTitle>
            <DialogDescription>
              Adjust the image to create a perfect profile picture
            </DialogDescription>
          </DialogHeader>

          {originalImage && (
            <div className="space-y-4 flex-1 min-h-0">
              <div 
                className="relative bg-muted rounded-lg overflow-hidden"
                style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                  <Cropper
                    image={originalImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    cropShape="round"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Zoom</Label>
                <Slider
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(value) => setZoom(value[0])}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isUploading}>
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Image
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });
}
