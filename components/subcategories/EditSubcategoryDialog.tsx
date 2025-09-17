'use client';

import { useState, useEffect } from 'react';
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

interface Subcategory {
  id: string;
  name: string;
  parentCategoryId: string;
  parentCategoryName: string;
  image: string;
  createdAt: string;
}

interface EditSubcategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subcategory: {
    id: string;
    name: string;
    parentCategoryId: string;
    image: string;
  }) => void;
  subcategory: Subcategory | null;
  categories: Array<{ id: string; name: string; }>;
}

export default function EditSubcategoryDialog({
  isOpen,
  onClose,
  onSubmit,
  subcategory,
  categories,
}: EditSubcategoryDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    parentCategoryId: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (subcategory) {
      setFormData({
        name: subcategory.name,
        parentCategoryId: subcategory.parentCategoryId,
        image: subcategory.image,
      });
    }
  }, [subcategory]);

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
    
    if (!formData.name.trim() || !formData.parentCategoryId || !formData.image || !subcategory) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        id: subcategory.id,
        name: formData.name.trim(),
        parentCategoryId: formData.parentCategoryId,
        image: formData.image,
      });

      onClose();
    } catch (error) {
      console.error('Error updating subcategory:', error);
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
          <DialogTitle>Edit Subcategory</DialogTitle>
          <DialogDescription>
            Update the subcategory name, parent category, and image.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Subcategory Name */}
            <div className="space-y-2">
              <Label htmlFor="editSubcategoryName">Subcategory Name *</Label>
              <Input
                id="editSubcategoryName"
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
              
              <div className="relative">
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={formData.image}
                      alt="Subcategory preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                      <div className="flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <label className="cursor-pointer">
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="pointer-events-none"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Replace
                          </Button>
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
                  Updating...
                </>
              ) : (
                'Update Subcategory'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}