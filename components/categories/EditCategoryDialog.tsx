"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  images: { url: string }[];
  createdAt: string;
}

interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (category: { id: string; name: string; image: string }) => void;
  category: Category | null;
}

export default function EditCategoryDialog({
  isOpen,
  onClose,
  onSubmit,
  category,
}: EditCategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        image: category.images[0]?.url || "",
      });
    }
  }, [category]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setFormData((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
    console.log("Image uploaded:", formData);
    
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting category:", formData);

    if (!formData.name.trim() || !formData.image || !category) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit({
        id: category.id,
        name: formData.name.trim(),
        image: formData.image,
      });
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", image: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name and image.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editCategoryName">Category Name *</Label>
              <Input
                id="editCategoryName"
                placeholder="Enter category name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category Image *</Label>
              <div className="relative">
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={formData.image || undefined}
                      alt="Category preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <div className="flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        {/* <label className="cursor-pointer">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="pointer-events-none"
                          > <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                            <Upload className="h-4 w-4 mr-2" />
                            Replace
                          </Button>
                         
                        </label> */}
                        <label className="cursor-pointer flex items-center space-x-2 justify-center">
                          <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 pointer-events-none">
                            <Upload className="h-4 w-4 mr-2" />
                            Replace
                        </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
 
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || !formData.name.trim() || !formData.image
              }
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                "Update Category"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
