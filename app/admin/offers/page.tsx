"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateOfferDialog from "@/components/offers/CreateOfferDialog";
import EditOfferDialog from "@/components/offers/EditOfferDialog";
import DeleteOfferDialog from "@/components/offers/DeleteOfferDialog";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Gift,
  Image as ImageIcon,
  Package,
  FolderTree,
  Clock,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

// Mock offers data
const initialOffers = [
  {
    id: "1",
    type: "banner",
    title: "Summer Sale 2024",
    description: "Get up to 70% off on summer collection",
    image:
      "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount: 70,
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    isActive: true,
    priority: 1,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    type: "product",
    title: "Flash Deal - Headphones",
    description: "Limited time offer on premium headphones",
    productId: "PROD-001",
    productName: "Premium Wireless Headphones",
    discount: 40,
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-25T23:59:59Z",
    isActive: false,
    priority: 2,
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    type: "category",
    title: "Electronics Mega Sale",
    description: "Special discounts on all electronics",
    categoryId: "CAT-001",
    categoryName: "Electronics",
    discount: 25,
    startDate: "2024-02-01T00:00:00Z",
    endDate: "2024-02-29T23:59:59Z",
    isActive: true,
    priority: 3,
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    type: "time-based",
    title: "Weekend Special",
    description: "Weekend only flash sale",
    discount: 30,
    startDate: "2024-01-27T00:00:00Z",
    endDate: "2024-01-28T23:59:59Z",
    isActive: true,
    priority: 1,
    createdAt: "2024-01-12T14:20:00Z",
  },
];

export default function HomeScreenOffersPage() {
  const [offers, setOffers] = useState(initialOffers);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    offer: (typeof initialOffers)[0] | null;
  }>({
    isOpen: false,
    offer: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    offer: (typeof initialOffers)[0] | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    offer: null,
    isLoading: false,
  });

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      searchTerm === "" ||
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || offer.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && offer.isActive) ||
      (statusFilter === "inactive" && !offer.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateOffer = (offerData: any) => {
    const newOffer = {
      id: Date.now().toString(),
      ...offerData,
      createdAt: new Date().toISOString(),
    };

    setOffers([newOffer, ...offers]);
  };

  const handleEditOffer = (offerData: any) => {
    setOffers(
      offers.map((offer) => (offer.id === offerData.id ? offerData : offer))
    );
  };

  const handleDeleteClick = (offer: (typeof initialOffers)[0]) => {
    setDeleteDialog({
      isOpen: true,
      offer,
      isLoading: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.offer) return;

    setDeleteDialog((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOffers(offers.filter((o) => o.id !== deleteDialog.offer!.id));
      setDeleteDialog({ isOpen: false, offer: null, isLoading: false });
    } catch (error) {
      console.error("Error deleting offer:", error);
      setDeleteDialog((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteDialog.isLoading) {
      setDeleteDialog({ isOpen: false, offer: null, isLoading: false });
    }
  };

  const toggleActive = (id: string) => {
    setOffers(
      offers.map((offer) =>
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
    );
  };

  const getOfferTypeIcon = (type: string) => {
    switch (type) {
      case "banner":
        return <ImageIcon className="h-4 w-4" />;
      case "product":
        return <Package className="h-4 w-4" />;
      case "category":
        return <FolderTree className="h-4 w-4" />;
      case "time-based":
        return <Clock className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const getOfferTypeBadge = (type: string) => {
    const colors = {
      banner: "bg-blue-100 text-blue-800",
      product: "bg-green-100 text-green-800",
      category: "bg-purple-100 text-purple-800",
      "time-based": "bg-orange-100 text-orange-800",
    };

    return (
      <Badge
        className={
          colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
        }
      >
        {getOfferTypeIcon(type)}
        <span className="ml-1 capitalize">{type.replace("-", " ")}</span>
      </Badge>
    );
  };

  const isOfferExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const isOfferScheduled = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const getOfferStatus = (offer: (typeof initialOffers)[0]) => {
    if (!offer.isActive) return "Inactive";
    if (isOfferExpired(offer.endDate)) return "Expired";
    if (isOfferScheduled(offer.startDate)) return "Scheduled";
    return "Active";
  };

  const getStatusBadge = (offer: (typeof initialOffers)[0]) => {
    const status = getOfferStatus(offer);
    const colors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      Expired: "bg-red-100 text-red-800",
      Scheduled: "bg-blue-100 text-blue-800",
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
    );
  };

  // Calculate statistics
  const totalOffers = offers.length;
  const activeOffers = offers.filter(
    (o) => o.isActive && !isOfferExpired(o.endDate)
  ).length;
  const scheduledOffers = offers.filter((o) =>
    isOfferScheduled(o.startDate)
  ).length;
  const expiredOffers = offers.filter((o) => isOfferExpired(o.endDate)).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Home Screen Offers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage promotional offers displayed on the home screen.
          </p>
        </div>
        <Button onClick={() => setCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Offers
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalOffers}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Offers
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {activeOffers}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                <p className="text-3xl font-bold text-blue-600">
                  {scheduledOffers}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-3xl font-bold text-red-600">
                  {expiredOffers}
                </p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
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
                  placeholder="Search offers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="banner">Banner Offers</SelectItem>
                  <SelectItem value="product">Product Offers</SelectItem>
                  <SelectItem value="category">Category Offers</SelectItem>
                  <SelectItem value="time-based">Time-based Offers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setStatusFilter("all");
              }}
            >
              Reset Filters
            </Button>
            <p className="text-sm text-gray-600">
              Showing {filteredOffers.length} of {offers.length} offers
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Offers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Offers</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Offer Details</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Discount</TableHead>
                  <TableHead className="font-semibold">Schedule</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow key={offer.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {offer.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={offer.image}
                              alt={offer.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900">
                            {offer.title}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {offer.description}
                          </p>
                          {(offer.productName || offer.categoryName) && (
                            <p className="text-xs text-blue-600">
                              {offer.productName || offer.categoryName}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getOfferTypeBadge(offer.type)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-green-700 border-green-300"
                      >
                        {offer.discount}% OFF
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>
                          Start:{" "}
                          {format(new Date(offer.startDate), "MMM dd, yyyy")}
                        </div>
                        <div>
                          End: {format(new Date(offer.endDate), "MMM dd, yyyy")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={offer.isActive}
                          onCheckedChange={() => toggleActive(offer.id)}
                        />
                        {getStatusBadge(offer)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditDialog({ isOpen: true, offer })}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(offer)}
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
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    {offer.image && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{offer.title}</h3>
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getOfferTypeBadge(offer.type)}
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-300"
                        >
                          {offer.discount}% OFF
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={offer.isActive}
                        onCheckedChange={() => toggleActive(offer.id)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Start Date</p>
                      <p className="font-medium">
                        {format(new Date(offer.startDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">End Date</p>
                      <p className="font-medium">
                        {format(new Date(offer.endDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    {getStatusBadge(offer)}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditDialog({ isOpen: true, offer })}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(offer)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No offers found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateOfferDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        onSubmit={handleCreateOffer}
      />

      <EditOfferDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, offer: null })}
        onSubmit={handleEditOffer}
        offer={editDialog.offer}
      />

      <DeleteOfferDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        offerTitle={deleteDialog.offer?.title || ""}
        isLoading={deleteDialog.isLoading}
      />
    </div>
  );
}
