"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/products/ImageUpload";
import SizeManager from "@/components/products/SizeManager";
import ListManager from "@/components/products/ListManager";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface Size {
  id: string;
  size: string;
  quantity: number;
  price: number;
}

interface ProductFormData {
  title: string;
  description: string;
  brand: string;
  sku: string;
  discount: number;
  category: string;
  subcategory: string;
  isFeatured: boolean;
  sizes: Size[];
  benefits: string[];
  ingredients: string[];
  longDescription: string;
  images: string[];
}

// const categories = [
//   { value: "electronics", label: "Electronics" },
//   { value: "clothing", label: "Clothing" },
//   { value: "home", label: "Home & Garden" },
//   { value: "sports", label: "Sports & Outdoors" },
//   { value: "beauty", label: "Beauty & Personal Care" },
//   { value: "books", label: "Books" },
//   { value: "toys", label: "Toys & Games" },
// ];

// const subcategories = {
//   electronics: [
//     { value: "smartphones", label: "Smartphones" },
//     { value: "laptops", label: "Laptops" },
//     { value: "headphones", label: "Headphones" },
//     { value: "cameras", label: "Cameras" },
//   ],
//   clothing: [
//     { value: "mens", label: "Men's Clothing" },
//     { value: "womens", label: "Women's Clothing" },
//     { value: "kids", label: "Kids' Clothing" },
//     { value: "shoes", label: "Shoes" },
//   ],
//   home: [
//     { value: "furniture", label: "Furniture" },
//     { value: "decor", label: "Home Decor" },
//     { value: "kitchen", label: "Kitchen & Dining" },
//     { value: "garden", label: "Garden & Outdoor" },
//   ],
//   sports: [
//     { value: "fitness", label: "Fitness Equipment" },
//     { value: "outdoor", label: "Outdoor Recreation" },
//     { value: "team-sports", label: "Team Sports" },
//     { value: "water-sports", label: "Water Sports" },
//   ],
//   beauty: [
//     { value: "skincare", label: "Skincare" },
//     { value: "makeup", label: "Makeup" },
//     { value: "haircare", label: "Hair Care" },
//     { value: "fragrance", label: "Fragrance" },
//   ],
//   books: [
//     { value: "fiction", label: "Fiction" },
//     { value: "non-fiction", label: "Non-Fiction" },
//     { value: "textbooks", label: "Textbooks" },
//     { value: "children", label: "Children's Books" },
//   ],
//   toys: [
//     { value: "action-figures", label: "Action Figures" },
//     { value: "board-games", label: "Board Games" },
//     { value: "educational", label: "Educational Toys" },
//     { value: "outdoor-toys", label: "Outdoor Toys" },
//   ],
// };

type Category = { value: string; label: string; id: string };
type Subcategory = { value: string; label: string; parentId: string , parentCategoryName: string };

export default function CreateProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    category: "",
    subcategory: "",
    isFeatured: false,
    sizes: [],
    benefits: [],
    ingredients: [],
    longDescription: "",
    images: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(
        data.map((cat: any) => ({
          value: cat.slug,
          label: cat.name,
          id: cat.id,
        }))
      );
    };
    const fetchSubCategories = async () => {
      const res = await fetch("/api/subcategories");
      const data = await res.json();

      setSubcategories(
        data.map((subcat: any) => ({
          value: subcat.slug,
          parentId: subcat.parentCategoryId,
          label: subcat.name,
          parentCategoryName: subcat.parentCategoryName,
          
        }))
      );
    };
    fetchCategories();
    fetchSubCategories();
  }, []);

  // useEffect(() => {
  //   // Reset subcategory when category changes
  //   if (formData.category) {
  //     const filteredSubcategories = subcategories.filter(
  //       (subcategory) => subcategory.parentId === formData.category.id
  //     );
  //     setSubcategories(filteredSubcategories);
  //   } else {
  //     setSubcategories([]);
  //   }
  // }, [formData.category]);


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  console.log("category:",categories);
  console.log("subcategory:", subcategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create product");
      }

      toast.success("✅ Product created successfully!");
      setFormData({
        title: "",
        description: "",
        brand: "",
        sku: "",
        discount: 0,
        category: "",
        subcategory: "",
        isFeatured: false,
        sizes: [],
        benefits: [],
        ingredients: [],
        longDescription: "",
        images: [],
      });
    } catch (error: any) {
      toast.error("❌ " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Product
            </h1>
            <p className="text-gray-600 mt-2">
              Add a new product to your catalog with all the details.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter product title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      placeholder="Enter product SKU"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Product Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a brief product description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      placeholder="Enter brand name"
                      value={formData.brand}
                      onChange={(e) =>
                        handleInputChange("brand", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={formData.discount}
                      onChange={(e) =>
                        handleInputChange(
                          "discount",
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: string) => {
                        handleInputChange("category", value);
                        handleInputChange("subcategory", ""); // Reset subcategory
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value: any) =>
                        handleInputChange("subcategory", value)
                      }
                      disabled={!formData.category}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.category &&
                          subcategories
                            .filter((subcategory: Subcategory) => subcategory.parentCategoryName === formData.category)
                            .map((subcategory: Subcategory) => (
                              <SelectItem
                                key={subcategory.parentId}
                                value={subcategory.value}
                              >
                                {subcategory.label}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked: any) =>
                      handleInputChange("isFeatured", checked)
                    }
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </CardContent>
            </Card>

            {/* Sizes */}
            <SizeManager
              sizes={formData.sizes}
              onSizesChange={(sizes) => handleInputChange("sizes", sizes)}
            />

            {/* Benefits */}
            <ListManager
              title="Product Benefits"
              items={formData.benefits}
              onItemsChange={(benefits) =>
                handleInputChange("benefits", benefits)
              }
              placeholder="Enter a product benefit..."
            />

            {/* Ingredients */}
            <ListManager
              title="Ingredients"
              items={formData.ingredients}
              onItemsChange={(ingredients) =>
                handleInputChange("ingredients", ingredients)
              }
              placeholder="Enter an ingredient..."
            />

            {/* Long Description */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Long Description</Label>
                  <div className="min-h-[300px]"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Images and Actions */}
          <div className="space-y-6">
            {/* Product Images */}
            <Card>
              <CardContent className="p-6">
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) =>
                    handleInputChange("images", images)
                  }
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Product...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Create Product
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to discard all changes?")
                    ) {
                      setFormData({
                        title: "",
                        description: "",
                        brand: "",
                        sku: "",
                        discount: 0,
                        category: "",
                        subcategory: "",
                        isFeatured: false,
                        sizes: [],
                        benefits: [],
                        ingredients: [],
                        longDescription: "",
                        images: [],
                      });
                    }
                  }}
                >
                  Reset Form
                </Button>
              </CardContent>
            </Card>

            {/* Form Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Form Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Required Fields:</span>
                  <span
                    className={
                      formData.title &&
                      formData.description &&
                      formData.sku &&
                      formData.category
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {
                      [
                        formData.title,
                        formData.description,
                        formData.sku,
                        formData.category,
                      ].filter(Boolean).length
                    }
                    /4
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Images:</span>
                  <span>{formData.images.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sizes:</span>
                  <span>{formData.sizes.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Benefits:</span>
                  <span>{formData.benefits.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ingredients:</span>
                  <span>{formData.ingredients.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
