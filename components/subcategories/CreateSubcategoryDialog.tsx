'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';

interface CreateSubcategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subcategory: {
    name: string;
    parentCategoryId: string;
    image: string;
  }) => void;
  categories: Array<{ id: string; name: string; }>;
}

export default function CreateSubcategoryDialog({
  isOpen,
  onClose,
  onSubmit,
  categories,
}: CreateSubcategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    parentCategoryId: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.parentCategoryId || !formData.image) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        name: formData.name.trim(),
        parentCategoryId: formData.parentCategoryId,
        image: formData.image,
      });

      // Reset form
      setFormData({ name: '', parentCategoryId: '', image: '' });
      onClose();
    } catch (error) {
      console.error('Error creating subcategory:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', parentCategoryId: '', image: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Subcategory</DialogTitle>
          <DialogDescription>
            Add a new subcategory with name, parent category, and image.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Subcategory Name */}
            <div className="space-y-2">
              <Label htmlFor="subcategoryName">Subcategory Name *</Label>
              <Input
                id="subcategoryName"
                placeholder="Enter subcategory name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Parent Category */}
            <div className="space-y-2">
              <Label>Parent Category *</Label>
              <Select 
                value={formData.parentCategoryId} 
                onValueChange={(value) => setFormData({ ...formData, parentCategoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Subcategory Image *</Label>
              
              {!formData.image ? (
                <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                  <label className="cursor-pointer block">
                    <div className="p-8 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Click to upload image
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      required
                    />
                  </label>
                </Card>
              ) : (
                <div className="relative">
                  <Card className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={formData.image}
                        alt="Subcategory preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.name.trim() || !formData.parentCategoryId || !formData.image}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                'Create Subcategory'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}