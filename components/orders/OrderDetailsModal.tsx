"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Package, CreditCard, Tag } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  orderDate: string;
  paymentMethod: string;
  paymentStatus: string;
  couponApplied: string;
  totalAmount: number;
  status: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  products: Product[];
  subtotal: number;
  discount: number;
  shippingCost: number;
}

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate: (orderId: string, newStatus: string) => void;
}

const orderStatuses = [
  "Order Placed",
  "Order Confirmed",
  "Processing",
  "Dispatched",
  "In Transit",
  "Out for Delivery",
  "Reaching Destination",
  "Completed",
];

const statusColors = {
  "Order Placed": "bg-blue-100 text-blue-800",
  "Order Confirmed": "bg-green-100 text-green-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Dispatched: "bg-purple-100 text-purple-800",
  "In Transit": "bg-indigo-100 text-indigo-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  "Reaching Destination": "bg-pink-100 text-pink-800",
  Completed: "bg-emerald-100 text-emerald-800",
};

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onStatusUpdate,
}: OrderDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(order?.status);

  if (!order) return null;

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    onStatusUpdate(order.id, newStatus);
  };

  // for print orderDetail
  const handlePrint = () => {
    const printContents = document.getElementById("print-section")?.innerHTML;
    if (printContents) {
      const printWindow = window.open("", "", "width=800,height=600");
      if (printWindow) {
        printWindow.document.write(`
        <html>
          <head>
            <title>Order ${order?.id}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ccc; padding: 8px; }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Order Details - {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Order Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select
                  value={currentStatus}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge
                  className={
                    statusColors[currentStatus as keyof typeof statusColors]
                  }
                >
                  {currentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <div id="print-section">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer ID</p>
                    <p className="font-medium">{order.customer.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{order.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{order.customer.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Shipping Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.shippingAddress.street}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.country}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Products Table */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Products</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>Product</TableHead>
                          <TableHead className="text-center">
                            Quantity
                          </TableHead>
                          <TableHead className="text-right">
                            Unit Price
                          </TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.name}
                                      width={48}
                                      height={48}
                                    />
                                  ) : (
                                    <Package className="h-6 w-6 text-gray-500" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-600">
                                    ID: {product.id}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {product.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              ${product.price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${(product.quantity * product.price).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({order.couponApplied}):</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>${order.shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount:</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">{order.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge
                      className={
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  {order.couponApplied && (
                    <div>
                      <p className="text-sm text-gray-600">Coupon Applied</p>
                      <div className="flex items-center space-x-1">
                        <Tag className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          {order.couponApplied}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlePrint}>Print Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
