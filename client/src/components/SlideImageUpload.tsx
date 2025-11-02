import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Check, X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SlideImageUploadProps {
  currentImage?: string;
  onImageChange: (imageUrl: string | undefined) => void;
  label?: string;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function SlideImageUpload({
  currentImage,
  onImageChange,
  label = "Upload Slide Image",
}: SlideImageUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, "image/jpeg", 0.9);
    });
  };

  const handleConfirm = async () => {
    if (!originalImage || !croppedAreaPixels) return;

    setIsUploading(true);
    try {
      const croppedImageBlob = await createCroppedImage();
      
      // Get presigned upload URL
      const uploadResponse = await apiRequest("POST", "/api/objects/upload", {});
      const uploadData = await uploadResponse.json() as { uploadURL: string; objectPath: string };

      // Upload to object storage using the presigned URL
      const putResponse = await fetch(uploadData.uploadURL, {
        method: "PUT",
        body: croppedImageBlob,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      if (!putResponse.ok) {
        throw new Error("Upload failed");
      }

      // Use the normalized object path
      onImageChange(uploadData.objectPath);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
      setShowDialog(false);
      setOriginalImage(null);
    } catch (error) {
      console.error("Upload error:", error);
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
      description: "Slide image has been removed",
    });
  };

  return (
    <div className="space-y-4">
      {currentImage ? (
        <div className="space-y-4">
          <div className="aspect-video w-full max-w-md rounded-md overflow-hidden border border-border">
            <img
              src={currentImage}
              alt="Current slide"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-change-slide-image"
            >
              <Upload className="h-4 w-4 mr-2" />
              Change Image
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRemove}
              data-testid="button-remove-slide-image"
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
          data-testid="button-upload-slide-image"
        >
          <Upload className="h-4 w-4 mr-2" />
          {label}
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="input-slide-image-file"
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Crop Slide Image</DialogTitle>
            <DialogDescription>
              Adjust the crop area to frame your image perfectly (16:9 aspect ratio)
            </DialogDescription>
          </DialogHeader>

          {originalImage && (
            <div className="space-y-6">
              <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                <Cropper
                  image={originalImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  objectFit="contain"
                />
              </div>

              <div className="space-y-2">
                <Label>Zoom</Label>
                <Slider
                  value={[zoom]}
                  onValueChange={(values) => setZoom(values[0])}
                  min={1}
                  max={3}
                  step={0.1}
                  data-testid="slider-slide-zoom"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              disabled={isUploading}
              data-testid="button-cancel-crop"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isUploading}
              data-testid="button-confirm-crop"
            >
              <Check className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Confirm"}
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
