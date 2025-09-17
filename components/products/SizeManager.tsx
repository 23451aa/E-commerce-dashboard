'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface Size {
  id: string;
  size: string;
  quantity: number;
  price: number;
}

interface SizeManagerProps {
  sizes: Size[];
  onSizesChange: (sizes: Size[]) => void;
}

export default function SizeManager({ sizes, onSizesChange }: SizeManagerProps) {
  const addSize = (e:any) => {
    e.preventDefault();
    const newSize: Size = {
      id: Date.now().toString(),
      size: '',
      quantity: 0,
      price: 0,
    };
    onSizesChange([...sizes, newSize]);
  };

  const updateSize = (id: string, field: keyof Size, value: string | number) => {
    const updatedSizes = sizes.map(size => 
      size.id === id ? { ...size, [field]: value } : size
    );
    onSizesChange(updatedSizes);
  };

  const removeSize = (id: string) => {
    const filteredSizes = sizes.filter(size => size.id !== id);
    onSizesChange(filteredSizes);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product Sizes</CardTitle>
        <Button onClick={addSize} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Size
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sizes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No sizes added yet. Click "Add Size" to get started.</p>
          </div>
        ) : (
          sizes.map((size) => (
            <div key={size.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor={`size-${size.id}`}>Size</Label>
                <Input
                  id={`size-${size.id}`}
                  placeholder="e.g., S, M, L, XL"
                  value={size.size}
                  onChange={(e) => updateSize(size.id, 'size', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`quantity-${size.id}`}>Quantity</Label>
                <Input
                  id={`quantity-${size.id}`}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={size.quantity}
                  onChange={(e) => updateSize(size.id, 'quantity', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`price-${size.id}`}>Price ($)</Label>
                <Input
                  id={`price-${size.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={size.price}
                  onChange={(e) => updateSize(size.id, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeSize(size.id)}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}