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
import { Switch } from '@/components/ui/switch';

interface TopBar {
  id: string;
  text: string;
  backgroundColor: string;
  link: string;
  hasButton: boolean;
  buttonText: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  buttonLink: string;
  isActive: boolean;
  createdAt: string;
}

interface EditTopBarDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (topBar: TopBar) => void;
  topBar: TopBar | null;
}

export default function EditTopBarDialog({
  isOpen,
  onClose,
  onSubmit,
  topBar,
}: EditTopBarDialogProps) {
  const [formData, setFormData] = useState({
    text: '',
    backgroundColor: '#3b82f6',
    link: '',
    hasButton: false,
    buttonText: '',
    buttonTextColor: '#ffffff',
    buttonBackgroundColor: '#ef4444',
    buttonLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (topBar) {
      setFormData({
        text: topBar.text,
        backgroundColor: topBar.backgroundColor,
        link: topBar.link,
        hasButton: topBar.hasButton,
        buttonText: topBar.buttonText,
        buttonTextColor: topBar.buttonTextColor,
        buttonBackgroundColor: topBar.buttonBackgroundColor,
        buttonLink: topBar.buttonLink,
      });
    }
  }, [topBar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim() || !formData.link.trim() || !topBar) {
      return;
    }

    if (formData.hasButton && (!formData.buttonText.trim() || !formData.buttonLink.trim())) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit({
        ...topBar,
        text: formData.text.trim(),
        backgroundColor: formData.backgroundColor,
        link: formData.link.trim(),
        hasButton: formData.hasButton,
        buttonText: formData.buttonText.trim(),
        buttonTextColor: formData.buttonTextColor,
        buttonBackgroundColor: formData.buttonBackgroundColor,
        buttonLink: formData.buttonLink.trim(),
      });

      onClose();
    } catch (error) {
      console.error('Error updating topbar:', error);
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
          <DialogTitle>Edit Top Bar</DialogTitle>
          <DialogDescription>
            Update the top bar settings and appearance.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editTopBarText">Top Bar Text *</Label>
                <Input
                  id="editTopBarText"
                  placeholder="Enter top bar message"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editBackgroundColor">Background Color *</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    id="editBackgroundColor"
                    value={formData.backgroundColor}
                    onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  <Input
                    value={formData.backgroundColor}
                    onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editTopBarLink">Top Bar Link *</Label>
                <Input
                  id="editTopBarLink"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="editHasButton"
                  checked={formData.hasButton}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasButton: checked })}
                />
                <Label htmlFor="editHasButton">Add Button</Label>
              </div>
            </div>

            {/* Right Column - Button Settings */}
            <div className="space-y-4">
              {formData.hasButton && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="editButtonText">Button Text *</Label>
                    <Input
                      id="editButtonText"
                      placeholder="Shop Now"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      required={formData.hasButton}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editButtonTextColor">Button Text Color *</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="editButtonTextColor"
                        value={formData.buttonTextColor}
                        onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <Input
                        value={formData.buttonTextColor}
                        onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                        placeholder="#ffffff"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editButtonBackgroundColor">Button Background Color *</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="editButtonBackgroundColor"
                        value={formData.buttonBackgroundColor}
                        onChange={(e) => setFormData({ ...formData, buttonBackgroundColor: e.target.value })}
                        className="w-12 h-10 rounded border border-gray-300"
                      />
                      <Input
                        value={formData.buttonBackgroundColor}
                        onChange={(e) => setFormData({ ...formData, buttonBackgroundColor: e.target.value })}
                        placeholder="#ef4444"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editButtonLink">Button Link *</Label>
                    <Input
                      id="editButtonLink"
                      type="url"
                      placeholder="https://example.com/shop"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      required={formData.hasButton}
                    />
                  </div>
                </>
              )}

              {/* Preview */}
              <div className="space-y-2">
                <Label>Preview</Label>
                <div 
                  className="p-4 rounded-lg text-white text-center"
                  style={{ backgroundColor: formData.backgroundColor }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <span>{formData.text || 'Your top bar text here'}</span>
                    {formData.hasButton && formData.buttonText && (
                      <button
                        className="px-4 py-2 rounded text-sm font-medium"
                        style={{
                          backgroundColor: formData.buttonBackgroundColor,
                          color: formData.buttonTextColor,
                        }}
                      >
                        {formData.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
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
                'Update Top Bar'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}