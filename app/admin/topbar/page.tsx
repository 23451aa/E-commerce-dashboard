'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EditTopBarDialog from '@/components/topbar/EditTopBarDialog';
import DeleteTopBarDialog from '@/components/topbar/DeleteTopBarDialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Settings,
  Monitor,
  Link as LinkIcon,
  Palette
} from 'lucide-react';

// Mock topbar data
const initialTopBars = [
  {
    id: '1',
    text: 'Free shipping on orders over $50!',
    backgroundColor: '#3b82f6',
    link: 'https://example.com/shipping',
    hasButton: true,
    buttonText: 'Shop Now',
    buttonTextColor: '#ffffff',
    buttonBackgroundColor: '#ef4444',
    buttonLink: 'https://example.com/shop',
    isActive: true,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    text: 'Summer Sale - Up to 70% off!',
    backgroundColor: '#f59e0b',
    link: 'https://example.com/sale',
    hasButton: false,
    buttonText: '',
    buttonTextColor: '',
    buttonBackgroundColor: '',
    buttonLink: '',
    isActive: false,
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    text: 'New arrivals every week',
    backgroundColor: '#10b981',
    link: 'https://example.com/new',
    hasButton: true,
    buttonText: 'View New',
    buttonTextColor: '#000000',
    buttonBackgroundColor: '#ffffff',
    buttonLink: 'https://example.com/new-arrivals',
    isActive: true,
    createdAt: '2024-01-13T09:15:00Z',
  },
];

export default function TopBarManagementPage() {
  const [topBars, setTopBars] = useState(initialTopBars);
  const [searchTerm, setSearchTerm] = useState('');
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
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    topBar: typeof initialTopBars[0] | null;
  }>({
    isOpen: false,
    topBar: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    topBar: typeof initialTopBars[0] | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    topBar: null,
    isLoading: false,
  });

  const filteredTopBars = topBars.filter((topBar) =>
    topBar.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.text.trim() || !formData.link.trim()) {
      return;
    }

    if (formData.hasButton && (!formData.buttonText.trim() || !formData.buttonLink.trim())) {
      return;
    }

    const newTopBar = {
      id: Date.now().toString(),
      text: formData.text.trim(),
      backgroundColor: formData.backgroundColor,
      link: formData.link.trim(),
      hasButton: formData.hasButton,
      buttonText: formData.buttonText.trim(),
      buttonTextColor: formData.buttonTextColor,
      buttonBackgroundColor: formData.buttonBackgroundColor,
      buttonLink: formData.buttonLink.trim(),
      isActive: false,
      createdAt: new Date().toISOString(),
    };

    setTopBars([newTopBar, ...topBars]);
    
    // Reset form
    setFormData({
      text: '',
      backgroundColor: '#3b82f6',
      link: '',
      hasButton: false,
      buttonText: '',
      buttonTextColor: '#ffffff',
      buttonBackgroundColor: '#ef4444',
      buttonLink: '',
    });
  };

  const handleEditTopBar = (topBarData: typeof initialTopBars[0]) => {
    setTopBars(topBars.map(topBar => 
      topBar.id === topBarData.id ? topBarData : topBar
    ));
  };

  const handleDeleteClick = (topBar: typeof initialTopBars[0]) => {
    setDeleteDialog({
      isOpen: true,
      topBar,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.topBar) return;

    setDeleteDialog(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTopBars(topBars.filter(t => t.id !== deleteDialog.topBar!.id));
      setDeleteDialog({ isOpen: false, topBar: null, isLoading: false });
    } catch (error) {
      console.error('Error deleting topbar:', error);
      setDeleteDialog(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, topBar: null, isLoading: false });
    }
  };

  const toggleActive = (id: string) => {
    setTopBars(topBars.map(topBar => 
      topBar.id === id ? { ...topBar, isActive: !topBar.isActive } : topBar
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Top Bar Management</h1>
          <p className="text-gray-600 mt-2">
            Manage top navigation bar settings and announcements.
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Top Bars</p>
              <p className="text-3xl font-bold text-gray-900">{topBars.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Monitor className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create TopBar Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Top Bar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topBarText">Top Bar Text *</Label>
                  <Input
                    id="topBarText"
                    placeholder="Enter top bar message"
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color *</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="backgroundColor"
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
                  <Label htmlFor="topBarLink">Top Bar Link *</Label>
                  <Input
                    id="topBarLink"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasButton"
                    checked={formData.hasButton}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasButton: checked })}
                  />
                  <Label htmlFor="hasButton">Add Button</Label>
                </div>
              </div>

              {/* Right Column - Button Settings */}
              <div className="space-y-4">
                {formData.hasButton && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="buttonText">Button Text *</Label>
                      <Input
                        id="buttonText"
                        placeholder="Shop Now"
                        value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                        required={formData.hasButton}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="buttonTextColor">Button Text Color *</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="buttonTextColor"
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
                      <Label htmlFor="buttonBackgroundColor">Button Background Color *</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="buttonBackgroundColor"
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
                      <Label htmlFor="buttonLink">Button Link *</Label>
                      <Input
                        id="buttonLink"
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

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Top Bar
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* TopBars Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Top Bars</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search top bars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Text</TableHead>
                  <TableHead className="font-semibold">Background</TableHead>
                  <TableHead className="font-semibold">Link</TableHead>
                  <TableHead className="font-semibold">Button</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTopBars.map((topBar) => (
                  <TableRow key={topBar.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium max-w-xs truncate">
                      {topBar.text}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: topBar.backgroundColor }}
                        />
                        <span className="text-sm text-gray-600">{topBar.backgroundColor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-blue-600 truncate max-w-xs">
                          {topBar.link}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {topBar.hasButton ? (
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">
                            {topBar.buttonText}
                          </Badge>
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {topBar.buttonLink}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No button</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={topBar.isActive}
                          onCheckedChange={() => toggleActive(topBar.id)}
                        />
                        <Badge className={topBar.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {topBar.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditDialog({ isOpen: true, topBar })}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(topBar)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredTopBars.map((topBar) => (
              <Card key={topBar.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{topBar.text}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: topBar.backgroundColor }}
                        />
                        <span className="text-sm text-gray-600">{topBar.backgroundColor}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={topBar.isActive}
                        onCheckedChange={() => toggleActive(topBar.id)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Link: </span>
                      <span className="text-blue-600 truncate">{topBar.link}</span>
                    </div>
                    {topBar.hasButton && (
                      <div>
                        <span className="text-gray-600">Button: </span>
                        <Badge variant="outline" className="text-xs">
                          {topBar.buttonText}
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditDialog({ isOpen: true, topBar })}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(topBar)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTopBars.length === 0 && (
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No top bars found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditTopBarDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, topBar: null })}
        onSubmit={handleEditTopBar}
        topBar={editDialog.topBar}
      />

      <DeleteTopBarDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        topBarText={deleteDialog.topBar?.text || ''}
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
}