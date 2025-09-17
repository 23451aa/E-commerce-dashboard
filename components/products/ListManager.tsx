'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface ListManagerProps {
  title: string;
  items: string[];
  onItemsChange: (items: string[]) => void;
  placeholder?: string;
}

export default function ListManager({ 
  title, 
  items, 
  onItemsChange, 
  placeholder = "Enter item..." 
}: ListManagerProps) {
  const [newItem, setNewItem] = useState('');

  const addItem = (e:any) => {
    e.preventDefault();
    if (newItem.trim()) {
      onItemsChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    const filteredItems = items.filter((_, i) => i !== index);
    onItemsChange(filteredItems);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem(e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder={placeholder}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <p>No {title.toLowerCase()} added yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <span className="flex-1">{item}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}