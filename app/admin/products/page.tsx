"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  SortAsc,
  SortDesc,
  ArrowUpDown,
} from "lucide-react";

// Mock product data with MongoDB ObjectIds
// const initialProducts = [
//   {
//     id: "507f1f77bcf86cd799439011",
//     title: "Premium Wireless Headphones",
//     category: "Electronics",
//     subcategory: "Audio",
//     brand: "TechSound",
//     sku: "TWH-001",
//     description:
//       "High-quality wireless headphones with noise cancellation and premium sound quality.",
//     images: [
//       "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "100ml", quantity: 50, price: 199.99 },
//       { size: "200ml", quantity: 30, price: 249.99 },
//       { size: "300ml", quantity: 20, price: 299.99 },
//     ],
//     featured: true,
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:30:00Z",
//   },
//   {
//     id: "507f1f77bcf86cd799439012",
//     title: "Organic Face Moisturizer",
//     category: "Beauty",
//     subcategory: "Skincare",
//     brand: "NaturalGlow",
//     sku: "OFM-002",
//     description:
//       "Natural organic moisturizer for all skin types with vitamin E and aloe vera.",
//     images: [
//       "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "50ml", quantity: 100, price: 29.99 },
//       { size: "100ml", quantity: 75, price: 49.99 },
//       { size: "200ml", quantity: 45, price: 79.99 },
//     ],
//     featured: false,
//     createdAt: "2024-01-14T15:45:00Z",
//     updatedAt: "2024-01-14T15:45:00Z",
//   },
//   {
//     id: "507f1f77bcf86cd799439013",
//     title: "Smart Fitness Tracker Watch",
//     category: "Electronics",
//     subcategory: "Wearables",
//     brand: "FitTech",
//     sku: "SFT-003",
//     description:
//       "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
//     images: [
//       "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
//       "https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "Small", quantity: 25, price: 149.99 },
//       { size: "Medium", quantity: 40, price: 149.99 },
//       { size: "Large", quantity: 35, price: 149.99 },
//     ],
//     featured: true,
//     createdAt: "2024-01-13T09:15:00Z",
//     updatedAt: "2024-01-13T09:15:00Z",
//   },
//   {
//     id: "507f1f77bcf86cd799439014",
//     title: "Eco-Friendly Yoga Mat",
//     category: "Sports",
//     subcategory: "Fitness",
//     brand: "EcoFit",
//     sku: "EYM-004",
//     description:
//       "Sustainable yoga mat made from natural rubber with excellent grip and cushioning.",
//     images: [
//       "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "4mm", quantity: 60, price: 59.99 },
//       { size: "6mm", quantity: 40, price: 69.99 },
//       { size: "8mm", quantity: 30, price: 79.99 },
//     ],
//     featured: false,
//     createdAt: "2024-01-12T14:20:00Z",
//     updatedAt: "2024-01-12T14:20:00Z",
//   },
//   {
//     id: "507f1f77bcf86cd799439015",
//     title: "Gourmet Coffee Beans",
//     category: "Food",
//     subcategory: "Beverages",
//     brand: "RoastMaster",
//     sku: "GCB-005",
//     description:
//       "Premium single-origin coffee beans with rich flavor and aromatic profile.",
//     images: [
//       "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "250g", quantity: 80, price: 24.99 },
//       { size: "500g", quantity: 60, price: 44.99 },
//       { size: "1kg", quantity: 40, price: 79.99 },
//     ],
//     featured: true,
//     createdAt: "2024-01-11T11:30:00Z",
//     updatedAt: "2024-01-11T11:30:00Z",
//   },
//   {
//     id: "507f1f77bcf86cd799439016",
//     title: "Luxury Silk Scarf",
//     category: "Fashion",
//     subcategory: "Accessories",
//     brand: "SilkElegance",
//     sku: "LSS-006",
//     description:
//       "Handcrafted silk scarf with elegant patterns and premium quality fabric.",
//     images: [
//       "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ],
//     sizes: [
//       { size: "Small", quantity: 15, price: 89.99 },
//       { size: "Medium", quantity: 25, price: 109.99 },
//       { size: "Large", quantity: 20, price: 129.99 },
//     ],
//     featured: false,
//     createdAt: "2024-01-10T16:45:00Z",
//     updatedAt: "2024-01-10T16:45:00Z",
//   },
// ];

type Product = {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  description: string;
  images: any;
  sizes: { size: string; qty: number; price: number }[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

type SortField = "title" | "category" | "price" | "featured" | "createdAt";
type SortDirection = "asc" | "desc";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    product: (typeof products)[0] | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    product: null,
    isLoading: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const rawData = await response.json();

        const transformedData: Product[] = rawData.map(
          (item: any): Product => ({
            id: item.id,
            title: item.title,
            category: item.category?.name || "Unknown",
            subcategory: item.subcategory?.name || undefined,
            brand: item.brand,
            sku: item.sku,
            description: item.description,
            images: item.images,
            sizes: item.sizes.map((s: any) => ({
              size: s.size,
              quantity: s.quantity,
              price: s.price,
            })),
            featured: item.featured,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
        );
        // console.log(transformedData);

        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" && product.featured) ||
        (featuredFilter === "not-featured" && !product.featured);

      return matchesSearch && matchesCategory && matchesFeatured;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case "price":
          aValue = Math.min(...a.sizes.map((s) => s.price));
          bValue = Math.min(...b.sizes.map((s) => s.price));
          break;
        case "featured":
          aValue = a.featured ? 1 : 0;
          bValue = b.featured ? 1 : 0;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    products,
    searchTerm,
    categoryFilter,
    featuredFilter,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === "asc" ? (
      <SortAsc className="h-4 w-4" />
    ) : (
      <SortDesc className="h-4 w-4" />
    );
  };

  const handleFeaturedToggle = (productId: string, featured: boolean) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, featured } : product
      )
    );
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/admin/products/edit/${productId}`);
  };

  const handleDeleteClick = (product: (typeof products)[0]) => {
    setDeleteDialog({
      isOpen: true,
      product,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.product) return;

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setProducts(products.filter((p) => p.id !== deleteDialog.product!.id));
      setDeleteDialog({ isOpen: false, product: null, isLoading: false });
    } catch (error) {
      console.error("Error deleting product:", error);
      setDeleteDialog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, product: null, isLoading: false });
    }
  };

  const formatPriceRange = (sizes: (typeof products)[0]["sizes"]) => {
    if (sizes.length === 0) return "No pricing";

    return sizes
      .map((size) => `${size.size}: ₹${size.price.toFixed(2)}`)
      .join(", ");
  };

  const formatSizes = (sizes: (typeof products)[0]["sizes"]) => {
    return sizes.map((size) => size.size);
  };

  // const getTotalStock = (sizes: (typeof products)[0]["sizes"]) => {
  //   return sizes.reduce((total, size) => total + size.quantity, 0);
  // };
  const getTotalStock = (sizes: (typeof products)[0]["sizes"]) => {
    return sizes.reduce((total, size) => total + size?.qty, 0); // ✅ FIXED: was `size.quantity`
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setFeaturedFilter("all");
    setSortField("createdAt");
    setSortDirection("desc");
  };

  // Calculate statistics
  const totalProducts = products.length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const lowStockProducts = products.filter(
    (p) => getTotalStock(p.sizes) < 20
  ).length;
  // const totalValue = products.reduce((sum, product) => {
  //   const avgPrice =
  //     product.sizes.reduce((total, size) => total + size.price, 0) /
  //     product.sizes.length;

  //   const totalStock = getTotalStock(product.sizes);

  //   return sum + avgPrice * totalStock;
  // }, 0);

 const totalValue = products.reduce((sum, product) => {
  const productValue = product.sizes.reduce(
    (total, size) => total + size.price * size.qty,
    0
  );
  return sum + productValue;
}, 0);
  console.log("Total Inventory Value: ₹", totalValue.toFixed(2));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your product catalog and inventory.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/admin/products/create")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalProducts}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Featured Products
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {featuredProducts}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Low Stock Alert
                </p>
                <p className="text-3xl font-bold text-red-600">
                  {lowStockProducts}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Inventory Value
                </p>
                <p className="text-3xl font-bold text-yellow-600">
                  ₹{totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Filter */}
            <div>
              <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Featured Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="featured">Featured Only</SelectItem>
                  <SelectItem value="not-featured">Not Featured</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Reset Filters</span>
            </Button>
            <p className="text-sm text-gray-600">
              Showing {filteredAndSortedProducts.length} of {products.length}{" "}
              products
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("title")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      ID / Image / Title
                      {getSortIcon("title")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("category")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Category
                      {getSortIcon("category")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("price")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Price Range
                      {getSortIcon("price")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold">Sizes</TableHead>
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("featured")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Featured
                      {getSortIcon("featured")}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0].url}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-500 font-mono">
                            {product.id.substring(0, 8)}...
                          </p>
                          <p className="font-medium text-gray-900 line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.category}</p>
                        {product.subcategory && (
                          <p className="text-sm text-gray-500">
                            {product.subcategory}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {product.sizes.map((size, index) => (
                          <div key={index} className="whitespace-nowrap">
                            {size.size}:{" "}
                            <span className="font-medium">
                              ₹{size.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {formatSizes(product.sizes).map((size, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.featured}
                        onCheckedChange={(checked) =>
                          handleFeaturedToggle(product.id, checked)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(product)}
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
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono">
                        ID: {product.id.substring(0, 8)}...
                      </p>
                      <p className="text-sm text-gray-500">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={product.featured}
                        onCheckedChange={(checked) =>
                          handleFeaturedToggle(product.id, checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Category</p>
                      <p className="font-medium">{product.category}</p>
                      {product.subcategory && (
                        <p className="text-gray-500">{product.subcategory}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">Stock</p>
                      <p className="font-medium">
                        {getTotalStock(product.sizes)} units
                      </p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-600 mb-2">
                      Available Sizes & Prices
                    </p>
                    <div className="space-y-1">
                      {product.sizes.map((size, index) => (
                        <div key={index} className="flex justify-between">
                          <Badge variant="outline" className="text-xs">
                            {size.size}
                          </Badge>
                          <span className="font-medium">
                            ₹{size.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProduct(product.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(product)}
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

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No products found matching your criteria.
              </p>
              <Button
                className="mt-4"
                onClick={() => router.push("/admin/products/create")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={deleteDialog.product?.title || ""}
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
}
