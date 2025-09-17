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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Offer {
  id: string;
  type: string;
  title: string;
  description: string;
  image?: string;
  discount: number;
  startDate: string;
  endDate: string;
  productId?: string;
  productName?: string;
  categoryId?: string;
  categoryName?: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
}

interface EditOfferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (offer: Offer) => void;
  offer: Offer | null;
}

export default function EditOfferDialog({
  isOpen,
  onClose,
  onSubmit,
  offer,
}: EditOfferDialogProps) {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    image: '',
    discount: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    productId: '',
    productName: '',
    categoryId: '',
    categoryName: '',
    priority: '1',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (offer) {
      setFormData({
        type: offer.type,
        title: offer.title,
        description: offer.description,
        image: offer.image || '',
        discount: offer.discount.toString(),
        startDate: new Date(offer.startDate),
        endDate: new Date(offer.endDate),
        productId: offer.productId || '',
        productName: offer.productName || '',
        categoryId: offer.categoryId || '',
        categoryName: offer.categoryName || '',
        priority: offer.priority.toString(),
      });
    }
  }, [offer]);

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
    
    if (!formData.type || !formData.title.trim() || !formData.discount || !formData.startDate || !formData.endDate || !offer) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        ...offer,
        type: formData.type,
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image,
        discount: parseInt(formData.discount),
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        productId: formData.productId,
        productName: formData.productName,
        categoryId: formData.categoryId,
        categoryName: formData.categoryName,
        priority: parseInt(formData.priority),
      });

      onClose();
    } catch (error) {
      console.error('Error updating offer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Offer</DialogTitle>
          <DialogDescription>
            Update the offer details and settings.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Offer Type */}
            <div className="space-y-2">
              <Label>Offer Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select offer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banner">Banner Offer</SelectItem>
                  <SelectItem value="product">Product Offer</SelectItem>
                  <SelectItem value="category">Category Offer</SelectItem>
                  <SelectItem value="time-based">Time-based Offer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editOfferTitle">Offer Title *</Label>
                <Input
                  id="editOfferTitle"
                  placeholder="Enter offer title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="editDiscount">Discount (%) *</Label>
                <Input
                  id="editDiscount"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="25"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                placeholder="Enter offer description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Conditional Fields */}
            {formData.type === 'product' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editProductId">Product ID</Label>
                  <Input
                    id="editProductId"
                    placeholder="PROD-001"
                    value={formData.productId}
                    onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editProductName">Product Name</Label>
                  <Input
                    id="editProductName"
                    placeholder="Product name"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {formData.type === 'category' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editCategoryId">Category ID</Label>
                  <Input
                    id="editCategoryId"
                    placeholder="CAT-001"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editCategoryName">Category Name</Label>
                  <Input
                    id="editCategoryName"
                    placeholder="Category name"
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP")
                      ) : (
                        <span>Pick start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({ ...formData, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP")
                      ) : (
                        <span>Pick end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({ ...formData, endDate: date })}
                      disabled={(date) => 
                        formData.startDate && date < formData.startDate
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Image Upload (for banner offers) */}
            {formData.type === 'banner' && (
              <div className="space-y-2">
                <Label>Banner Image</Label>
                
                {!formData.image ? (
                  <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                    <label className="cursor-pointer block">
                      <div className="p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Click to upload banner image
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
                      />
                    </label>
                  </Card>
                ) : (
                  <div className="relative">
                    <Card className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={formData.image}
                          alt="Banner preview"
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
                )}
              </div>
            )}

            {/* Priority */}
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">High (1)</SelectItem>
                  <SelectItem value="2">Medium (2)</SelectItem>
                  <SelectItem value="3">Low (3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                'Update Offer'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}