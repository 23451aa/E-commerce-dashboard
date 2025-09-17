"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateSubcategoryDialog from "@/components/subcategories/CreateSubcategoryDialog";
import EditSubcategoryDialog from "@/components/subcategories/EditSubcategoryDialog";
import DeleteSubcategoryDialog from "@/components/subcategories/DeleteSubcategoryDialog";
import { Plus, Edit, Trash2, Search, Layers, Upload, X } from "lucide-react";
import { toast } from "sonner";

// Mock categories data
// const categories = [
//   { id: '507f1f77bcf86cd799439011', name: 'Electronics' },
//   { id: '507f1f77bcf86cd799439012', name: 'Beauty & Personal Care' },
//   { id: '507f1f77bcf86cd799439013', name: 'Sports & Outdoors' },
//   { id: '507f1f77bcf86cd799439014', name: 'Fashion & Accessories' },
//   { id: '507f1f77bcf86cd799439015', name: 'Food & Beverages' },
// ];

// Mock subcategories data
// const initialSubcategories = [
//   {
//     id: "607f1f77bcf86cd799439021",
//     name: "Smartphones",
//     parentCategoryId: "507f1f77bcf86cd799439011",
//     parentCategoryName: "Electronics",
//     image:
//       "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
//     createdAt: "2024-01-15T10:30:00Z",
//   },
//   {
//     id: "607f1f77bcf86cd799439022",
//     name: "Laptops",
//     parentCategoryId: "507f1f77bcf86cd799439011",
//     parentCategoryName: "Electronics",
//     image:
//       "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
//     createdAt: "2024-01-14T15:45:00Z",
//   },
//   {
//     id: "607f1f77bcf86cd799439023",
//     name: "Skincare",
//     parentCategoryId: "507f1f77bcf86cd799439012",
//     parentCategoryName: "Beauty & Personal Care",
//     image:
//       "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
//     createdAt: "2024-01-13T09:15:00Z",
//   },
//   {
//     id: "607f1f77bcf86cd799439024",
//     name: "Makeup",
//     parentCategoryId: "507f1f77bcf86cd799439012",
//     parentCategoryName: "Beauty & Personal Care",
//     image:
//       "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400",
//     createdAt: "2024-01-12T14:20:00Z",
//   },
//   {
//     id: "607f1f77bcf86cd799439025",
//     name: "Fitness Equipment",
//     parentCategoryId: "507f1f77bcf86cd799439013",
//     parentCategoryName: "Sports & Outdoors",
//     image:
//       "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
//     createdAt: "2024-01-11T11:30:00Z",
//   },
// ];

type Category = {
  id: string;
  name: string;
};
type Subcategory = {
  id: string;
  name: string;
  image: string;
  parentCategoryId: string;
  parentCategoryName: string;
  createdAt: string;
};

export default function SubCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newParentCategoryId, setNewParentCategoryId] = useState("");
  const [newSubcategoryImage, setNewSubcategoryImage] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    subcategory: (typeof subcategories)[0] | null;
  }>({
    isOpen: false,
    subcategory: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    subcategory: (typeof subcategories)[0] | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    subcategory: null,
    isLoading: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchSubcategories = async () => {
      try {
        const response = await fetch("/api/subcategories");
        if (!response.ok) throw new Error("Failed to fetch subcategories");
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchCategories();
    fetchSubcategories();
  }, [searchTerm, categoryFilter, newSubcategoryImage]);

  const filteredSubcategories = subcategories.filter((subcategory) => {
    const matchesSearch =
      subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory.parentCategoryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      subcategory.parentCategoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file && file.type.startsWith("image/")) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const imageUrl = e.target?.result as string;
  //       setNewSubcategoryImage(imageUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removeImage = () => {
  //   setNewSubcategoryImage("");
  // };

  // const handleCreateSubcategory = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const response = await fetch("/api/subcategories", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: newSubcategoryName.trim(),
  //       parentCategoryId: newParentCategoryId,
  //       image: newSubcategoryImage,
  //     }),
  //   });
  //   console.log(await response.json());
  //   toast.success("✅ Subcategory created successfully!");
  //    setNewParentCategoryId("");
  //   setNewSubcategoryName("");
  //   setNewSubcategoryImage("");

  //   if (!response.ok) {
  //     console.error("Failed to create subcategory");
  //     return;
  //   }

  //   const parentCategory = categories.find(
  //     (cat) => cat.id === newParentCategoryId
  //   );
  //   if (!parentCategory) return;

  //   const newSubcategory = {
  //     id: Date.now().toString(),
  //     name: newSubcategoryName.trim(),
  //     parentCategoryId: newParentCategoryId,
  //     parentCategoryName: parentCategory.name,
  //     image: newSubcategoryImage,
  //     createdAt: new Date().toISOString(),
  //   };

  //   setSubcategories([newSubcategory, ...subcategories]);
  //   setNewSubcategoryName("");
  //   setNewParentCategoryId("");
  //   setNewSubcategoryImage("");
  // };

  // const handleCreateSubcategoryDialog = async (subcategoryData: {
  //   name: string;
  //   parentCategoryId: string;
  //   image: string;
  // }) => {
  //   // e.preventDefault();
  //   const response = await fetch("/api/subcategories", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: subcategoryData.name.trim(),
  //       parentCategoryId: subcategoryData.parentCategoryId,
  //       image: subcategoryData.image,
  //     }),
  //   });

  //   if (!response.ok) {
  //     console.error("Failed to create subcategory");
  //     return;
  //   }

  //   toast.success(" Subcategory created successfully!");
  //   setNewParentCategoryId("");
  //   setNewSubcategoryName("");
  //   setNewSubcategoryImage("");

  //   const parentCategory = categories.find(
  //     (cat) => cat.id === subcategoryData.parentCategoryId
  //   );
  //   if (!parentCategory) return;

  //   const newSubcategory = {
  //     id: Date.now().toString(),
  //     name: subcategoryData.name,
  //     parentCategoryId: subcategoryData.parentCategoryId,
  //     parentCategoryName: parentCategory.name,
  //     image: subcategoryData.image,
  //     createdAt: new Date().toISOString(),
  //   };

  //   setSubcategories([newSubcategory, ...subcategories]);
  // };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setNewSubcategoryImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewSubcategoryImage("");
  };

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Creating subcategory...");

    try {
      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSubcategoryName.trim(),
          parentCategoryId: newParentCategoryId,
          image: newSubcategoryImage,
        }),
      });

      if (!response.ok) throw new Error("Failed to create subcategory");

      toast.success("Subcategory created successfully!", { id: toastId });

      const parentCategory = categories.find(
        (cat) => cat.id === newParentCategoryId
      );
      if (!parentCategory) return;

      const newSubcategory = {
        id: Date.now().toString(),
        name: newSubcategoryName.trim(),
        parentCategoryId: newParentCategoryId,
        parentCategoryName: parentCategory.name,
        image: newSubcategoryImage,
        createdAt: new Date().toISOString(),
      };

      setSubcategories([newSubcategory, ...subcategories]);
      setNewParentCategoryId("");
      setNewSubcategoryName("");
      setNewSubcategoryImage("");
    } catch (error: any) {
      toast.error(error.message || "Error creating subcategory", {
        id: toastId,
      });
    }
  };

  const handleCreateSubcategoryDialog = async (subcategoryData: {
    name: string;
    parentCategoryId: string;
    image: string;
  }) => {
    const toastId = toast.loading("Creating subcategory...");

    try {
      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: subcategoryData.name.trim(),
          parentCategoryId: subcategoryData.parentCategoryId,
          image: subcategoryData.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to create subcategory");

      toast.success("✅ Subcategory created successfully!", { id: toastId });

      const parentCategory = categories.find(
        (cat) => cat.id === subcategoryData.parentCategoryId
      );
      if (!parentCategory) return;

      const newSubcategory = {
        id: Date.now().toString(),
        name: subcategoryData.name,
        parentCategoryId: subcategoryData.parentCategoryId,
        parentCategoryName: parentCategory.name,
        image: subcategoryData.image,
        createdAt: new Date().toISOString(),
      };

      setSubcategories([newSubcategory, ...subcategories]);
      setNewParentCategoryId("");
      setNewSubcategoryName("");
      setNewSubcategoryImage("");
    } catch (error: any) {
      toast.error(error.message || "Error creating subcategory", {
        id: toastId,
      });
    }
  };

  const handleEditSubcategory = (subcategoryData: {
    id: string;
    name: string;
    parentCategoryId: string;
    image: string;
  }) => {
    const parentCategory = categories.find(
      (cat) => cat.id === subcategoryData.parentCategoryId
    );
    if (!parentCategory) return;

    setSubcategories(
      subcategories.map((subcategory) =>
        subcategory.id === subcategoryData.id
          ? {
              ...subcategory,
              name: subcategoryData.name,
              parentCategoryId: subcategoryData.parentCategoryId,
              parentCategoryName: parentCategory.name,
              image: subcategoryData.image,
            }
          : subcategory
      )
    );
  };

  const handleDeleteClick = (subcategory: (typeof subcategories)[0]) => {
    setDeleteDialog({
      isOpen: true,
      subcategory,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.subcategory) return;

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubcategories(
        subcategories.filter((s) => s.id !== deleteDialog.subcategory!.id)
      );
      setDeleteDialog({ isOpen: false, subcategory: null, isLoading: false });
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      setDeleteDialog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, subcategory: null, isLoading: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Subcategory Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage product subcategories and hierarchies.
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Subcategory
        </Button>
      </div>

      {/* Stats Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Subcategories
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {subcategories.length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Layers className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Subcategory Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Subcategory</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateSubcategory} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subcategoryName">Subcategory Name *</Label>
                  <Input
                    id="subcategoryName"
                    placeholder="Enter subcategory name"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Parent Category *</Label>
                  <Select
                    value={newParentCategoryId}
                    onValueChange={setNewParentCategoryId}
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    !newSubcategoryName.trim() ||
                    !newParentCategoryId ||
                    !newSubcategoryImage
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Subcategory
                </Button>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-2">
                <Label>Subcategory Image *</Label>

                {!newSubcategoryImage ? (
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
                          src={newSubcategoryImage}
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
          </form>
        </CardContent>
      </Card>

      {/* Subcategories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Subcategories</span>
            <div className="flex items-center space-x-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search subcategories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">
                    Subcategory Name
                  </TableHead>
                  <TableHead className="font-semibold">
                    Parent Category
                  </TableHead>
                  <TableHead className="font-semibold">
                    Subcategory Image
                  </TableHead>
                  <TableHead className="font-semibold">Created Date</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubcategories.map((subcategory) => (
                  <TableRow key={subcategory.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {subcategory.name}
                    </TableCell>
                    <TableCell>{subcategory.parentCategoryName}</TableCell>
                    <TableCell>
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={subcategory.image}
                          alt={subcategory.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(subcategory.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setEditDialog({ isOpen: true, subcategory })
                          }
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(subcategory)}
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
          <div className="md:hidden space-y-4">
            {filteredSubcategories.map((subcategory) => (
              <Card key={subcategory.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">
                        {subcategory.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Parent: {subcategory.parentCategoryName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Created:{" "}
                        {new Date(subcategory.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setEditDialog({ isOpen: true, subcategory })
                      }
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(subcategory)}
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

          {filteredSubcategories.length === 0 && (
            <div className="text-center py-12">
              <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No subcategories found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateSubcategoryDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        onSubmit={handleCreateSubcategoryDialog}
        categories={categories}
      />

      <EditSubcategoryDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, subcategory: null })}
        onSubmit={handleEditSubcategory}
        subcategory={editDialog.subcategory}
        categories={categories}
      />

      <DeleteSubcategoryDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        subcategoryName={deleteDialog.subcategory?.name || ""}
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
}
