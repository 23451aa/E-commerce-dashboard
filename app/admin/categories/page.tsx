"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ Import Skeleton
import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import DeleteCategoryDialog from "@/components/categories/DeleteCategoryDialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FolderTree,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "/api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [createDialog, setCreateDialog] = useState(false);

  type Category = {
    id: string;
    name: string;
    images: { url: string }[];
    createdAt: string;
  };

  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    category: Category | null;
  }>({ isOpen: false, category: null });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    category: Category | null;
    isLoading: boolean;
  }>({ isOpen: false, category: null, isLoading: false });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // ✅ stop skeleton after fetch
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-sm text-gray-500">
            Manage product categories and organization.
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Total Categories Card */}
      <Card>
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Categories</p>
            {loading ? (
              <Skeleton className="h-6 w-12 mt-1" />
            ) : (
              <p className="text-2xl font-semibold">{categories.length}</p>
            )}
          </div>
          <FolderTree className="w-6 h-6 text-blue-500" />
        </CardContent>
      </Card>

      {/* All Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Categories</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-5 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-12 w-12 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      <TableCell className="text-center flex gap-2 justify-center">
                        <Skeleton className="h-8 w-8 rounded" />
                        <Skeleton className="h-8 w-8 rounded" />
                      </TableCell>
                    </TableRow>
                  ))
                : filteredCategories.map((c: any) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell>
                        <img
                          src={c.images?.[0]?.url || ""}
                          alt={c.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setEditDialog({ isOpen: true, category: c })
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            setDeleteDialog({
                              isOpen: true,
                              category: c,
                              isLoading: false,
                            })
                          }
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
