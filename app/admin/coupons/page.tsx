"use client";

import { useEffect, useState } from "react";
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
import CreateCouponDialog from "@/components/coupons/CreateCouponDialog";
import EditCouponDialog from "@/components/coupons/EditCouponDialog";
import DeleteCouponDialog from "@/components/coupons/DeleteCouponDialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Download,
  Ticket,
  TrendingUp,
  Users,
  IndianRupee,
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    coupon: any | null;
  }>({
    isOpen: false,
    coupon: null,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    coupon: any | null;
  }>({
    isOpen: false,
    coupon: null,
  });

  // Fetch coupons from API
  useEffect(() => {
    setIsLoading(true);
    fetch("/api/coupons")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCoupons(
          data.map((c: any) => ({
            ...c,
            name: c.coupon,
            status: getCouponStatus(c),
            usageCount: c.useCount,
          }))
        );
        setIsLoading(false); // ← stop loading
      });
  }, []);

  function getCouponStatus(coupon: any) {
    const now = new Date();
    const start = new Date(coupon.startDate);
    const end = new Date(coupon.endDate);
    if (now < start) return "Scheduled";
    if (now > end) return "Expired";
    return "Active";
  }

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCoupon = async (newCoupon: {
    name: string;
    discount: number;
    startDate: Date;
    endDate: Date;
  }) => {
    await fetch("/api/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coupon: newCoupon.name,
        discount: newCoupon.discount,
        startDate: format(newCoupon.startDate, "yyyy-MM-dd"),
        endDate: format(newCoupon.endDate, "yyyy-MM-dd"),
      }),
    });
    // Refresh list
    const res = await fetch("/api/coupons");
    const data = await res.json();
    setCoupons(
      data.map((c: any) => ({
        ...c,
        name: c.coupon,
        status: getCouponStatus(c),
        usageCount: c.useCount,
      }))
    );
    setCreateDialog(false);
  };

  const handleEditCoupon = async (updatedCoupon: {
    id: string;
    name: string;
    discount: number;
    startDate: Date;
    endDate: Date;
  }) => {
    await fetch(`/api/coupons/${updatedCoupon.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coupon: updatedCoupon.name,
        discount: updatedCoupon.discount,
        startDate: format(updatedCoupon.startDate, "yyyy-MM-dd"),
        endDate: format(updatedCoupon.endDate, "yyyy-MM-dd"),
      }),
    });
    // Refresh list
    const res = await fetch("/api/coupons");
    const data = await res.json();
    setCoupons(
      data.map((c: any) => ({
        ...c,
        name: c.coupon,
        status: getCouponStatus(c),
        usageCount: c.useCount,
      }))
    );
    setEditDialog({ isOpen: false, coupon: null });
  };

  const handleDeleteCoupon = async (deleteCoupon: {
    id: string;
    name: string;
    discount: number;
    startDate: Date;
    endDate: Date;
  }) => {
    try {
      // Deleting coupon
      console.log(deleteCoupon.id);

      const res = await fetch(`/api/coupons/${deleteCoupon.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon: deleteCoupon.name,
          discount: deleteCoupon.discount,
          startDate: format(deleteCoupon.startDate, "yyyy-MM-dd"),
          endDate: format(deleteCoupon.endDate, "yyyy-MM-dd"),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete coupon");
      }

      // Optimistically update the UI by removing the deleted coupon
      setCoupons((prevCoupons) =>
        prevCoupons.filter((c) => c.id !== deleteCoupon.id)
      );

      // Optionally refresh list after deletion
      const updatedCouponsRes = await fetch("/api/coupons");
      const updatedCouponsData = await updatedCouponsRes.json();

      setCoupons(
        updatedCouponsData.map((c: any) => ({
          ...c,
          name: c.coupon,
          status: getCouponStatus(c),
          usageCount: c.useCount,
        }))
      );

      // Close the delete dialog
      setDeleteDialog({ isOpen: false, coupon: null });
    } catch (error) {
      console.error("Error deleting coupon:", error);
      // Optionally, show an error notification or message to the user
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Expired: "bg-red-100 text-red-800 border-red-200",
      Scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {status}
      </Badge>
    );
  };

  const activeCoupons = coupons.filter((c) => c.status === "Active").length;
  const totalUsage = coupons.reduce((sum, c) => sum + c.useCount, 0);
  const totalSavings = coupons.reduce(
    (sum, c) => sum + c.usageCount * c.discount * 10,
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Coupon Management
          </h1>
          <p className="text-gray-600 mt-2">
            Create and manage discount coupons for your store.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Coupon
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-16 h-8" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            {" "}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Coupons
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {coupons.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Ticket className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Coupons
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {activeCoupons}
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
                      Total Usage
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {totalUsage}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Savings
                    </p>
                    <p className="text-3xl font-bold text-yellow-600">
                      ₹{totalSavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <IndianRupee className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredCoupons.length} of {coupons.length} coupons
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Coupon Name</TableHead>
                  <TableHead className="font-semibold">Discount</TableHead>
                  <TableHead className="font-semibold">Start Date</TableHead>
                  <TableHead className="font-semibold">End Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Usage</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        {[...Array(7)].map((__, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  : filteredCoupons.map((coupon) => (
                      <TableRow key={coupon.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {coupon.name}
                        </TableCell>
                        <TableCell>{coupon.discount}%</TableCell>
                        <TableCell>
                          {coupon.startDate &&
                          !isNaN(new Date(coupon.startDate).getTime())
                            ? format(new Date(coupon.startDate), "MMM dd yyyy")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {coupon.endDate &&
                          !isNaN(new Date(coupon.endDate).getTime())
                            ? format(new Date(coupon.endDate), "MMM dd, yyyy")
                            : "-"}
                        </TableCell>
                        <TableCell>{getStatusBadge(coupon.status)}</TableCell>
                        <TableCell>{coupon.usageCount}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setEditDialog({ isOpen: true, coupon })
                              }
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                setDeleteDialog({ isOpen: true, coupon })
                              }
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
            {filteredCoupons.map((coupon) => (
              <Card key={coupon.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{coupon.name}</h3>
                    {getStatusBadge(coupon.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Discount</p>
                      <p className="font-medium">{coupon.discount}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Usage</p>
                      <p className="font-medium">{coupon.usageCount}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-600">Valid Period</p>
                    <p className="font-medium">
                      {coupon.startDate &&
                      !isNaN(new Date(coupon.startDate).getTime())
                        ? format(new Date(coupon.startDate), "MMM dd, yyyy")
                        : "-"}
                      {" - "}
                      {coupon.endDate &&
                      !isNaN(new Date(coupon.endDate).getTime())
                        ? format(new Date(coupon.endDate), "MMM dd, yyyy")
                        : "-"}
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditDialog({ isOpen: true, coupon })}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteDialog({ isOpen: true, coupon })}
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

          {filteredCoupons.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No coupons found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateCouponDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        onSubmit={handleCreateCoupon}
      />

      <EditCouponDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, coupon: null })}
        onSubmit={handleEditCoupon}
        coupon={editDialog.coupon}
      />

      {/* <DeleteCouponDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, coupon: null })}
        onConfirm={()=>handleDeleteCoupon}
       
        couponName={deleteDialog.coupon?.name || ""}
      /> */}

      <DeleteCouponDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, coupon: null })}
        onConfirm={async () => {
          if (deleteDialog.coupon) {
            await handleDeleteCoupon(deleteDialog.coupon);
          }
        }}
        couponName={deleteDialog.coupon?.name || ""}
      />
    </div>
  );
}
