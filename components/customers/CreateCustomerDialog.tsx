"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface CreateCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (Customer: {
    name: string;
    parentCategoryId: string;
    image: string;
  }) => void;
}

export default function CreateCustomerDialog({
  isOpen,
  onClose,
  onSubmit,
}: CreateCustomerDialogProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate API call
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Customer created successfully");
      } else {
        toast.error(data.error || "Failed to create customer");
      }
      // Reset form
      setFormData({ username: "", password: "", email: "", phoneNumber: "" });
      onClose();
    } catch (error) {
      console.error("Error creating Customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ username: "", password: "", email: "", phoneNumber: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
          <DialogDescription>
            Add a new Customer with name, parent category, and image.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="CustomerName">Customer Name *</Label>
              <Input
                id="CustomerName"
                placeholder="Enter Customer name"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="CustomerPhoneNumber">
                Customer Phone Number *
              </Label>
              <Input
                id="CustomerPhoneNumber"
                placeholder="Enter Customer phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="CustomerEmail">Customer Email *</Label>
              <Input
                id="CustomerEmail"
                placeholder="Enter Customer email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="CustomerPassword">Customer Password *</Label>
              <Input
                id="CustomerPassword"
                placeholder="Enter Customer password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
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
                isSubmitting ||
                !formData.username.trim() ||
                !formData.password.trim() ||
                !formData.email.trim() ||
                !formData.phoneNumber.trim()
              }
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                "Create Customer"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
