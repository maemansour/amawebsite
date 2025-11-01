import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Crop, Check } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadWithCropProps {
  label: string;
  imageType: "hero" | "mission" | "whyChoose" | "services";
  currentImage?: string;
  aspectRatio?: number;
  testId?: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ImageUploadWithCrop({
  label,
  imageType,
  currentImage,
  aspectRatio = 16 / 9,
  testId,
}: ImageUploadWithCropProps) {
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

      // Get presigned upload URL
      const uploadResponse = await apiRequest("POST", "/api/objects/upload", {});
      const uploadData = await uploadResponse.json() as { uploadURL: string };

      // Upload to object storage
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

      // Update settings with the new image
      await apiRequest("PUT", "/api/chapter-images", {
        imageType,
        imageURL: uploadData.uploadURL,
      });

      // Invalidate and refetch settings query to refresh the image
      await queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      await queryClient.refetchQueries({ queryKey: ["/api/settings"] });

      toast({
        title: "Image updated",
        description: "Your image has been uploaded and saved successfully.",
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

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-3 items-start">
        {currentImage && (
          <div className="rounded-md overflow-hidden border border-border w-32 h-20">
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById(`file-${imageType}`)?.click()}
            data-testid={testId}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload & Crop
          </Button>
          <input
            id={`file-${imageType}`}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
            <DialogDescription>
              Adjust the image to fit perfectly in your site
            </DialogDescription>
          </DialogHeader>

          {originalImage && (
            <div className="space-y-4">
              <div 
                className="relative bg-muted rounded-lg overflow-hidden"
                style={{
                  width: '100%',
                  paddingBottom: `${(1 / aspectRatio) * 100}%`,
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                  <Cropper
                    image={originalImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
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
