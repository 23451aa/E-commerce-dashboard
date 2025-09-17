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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface Coupon {
  id: string;
  name: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: string;
  usageCount: number;
}

interface EditCouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (coupon: {
    id: string;
    name: string;
    discount: number;
    startDate: Date;
    endDate: Date;
  }) => void;
  coupon: Coupon | null;
}

export default function EditCouponDialog({
  isOpen,
  onClose,
  onSubmit,
  coupon,
}: EditCouponDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    discount: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  useEffect(() => {
    if (coupon) {
      setFormData({
        name: coupon.name,
        discount: coupon.discount.toString(),
        startDate: new Date(coupon.startDate),
        endDate: new Date(coupon.endDate),
      });
    }
  }, [coupon]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.discount || !formData.startDate || !formData.endDate || !coupon) {
      return;
    }

    onSubmit({
      id: coupon.id,
      name: formData.name,
      discount: parseFloat(formData.discount),
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      discount: '',
      startDate: undefined,
      endDate: undefined,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Coupon</DialogTitle>
          <DialogDescription>
            Update the coupon details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Coupon Name */}
            <div className="space-y-2">
              <Label htmlFor="editCouponName">Coupon Name</Label>
              <Input
                id="editCouponName"
                placeholder="e.g., SUMMER2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Discount Percentage */}
            <div className="space-y-2">
              <Label htmlFor="editDiscount">Discount Percentage</Label>
              <div className="relative">
                <Input
                  id="editDiscount"
                  type="number"
                  placeholder="e.g., 25"
                  min="1"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  required
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>
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

              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date</Label>
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
                        date < new Date() || 
                        (formData.startDate ? date < formData.startDate : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Update Coupon</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}