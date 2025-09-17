"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderDetailsModal from "@/components/orders/OrderDetailsModal";
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  ShoppingBag,
  DollarSign,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import {
  format,
  subDays,
  subMonths,
  isAfter,
  isBefore,
  startOfDay,
  endOfDay,
} from "date-fns";

type Orders = {
  id: string;
  orderId: string;
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
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shippingCost: number;
};

// Mock orders data
// const initialOrders = [
//   {
//     id: "ORD-2024-001",
//     orderDate: "2024-01-15T10:30:00Z",
//     paymentMethod: "Razorpay",
//     paymentStatus: "Paid",
//     couponApplied: "WELCOME10",
//     totalAmount: 299.99,
//     status: "Processing",
//     customer: {
//       id: "CUST-001",
//       name: "John Doe",
//       email: "john.doe@email.com",
//       phone: "+1-555-0123",
//     },
//     shippingAddress: {
//       street: "123 Main Street, Apt 4B",
//       city: "New York",
//       state: "NY",
//       zipCode: "10001",
//       country: "United States",
//     },
//     products: [
//       {
//         id: "PROD-001",
//         name: "Wireless Headphones",
//         quantity: 1,
//         price: 199.99,
//         image: "",
//       },
//       {
//         id: "PROD-002",
//         name: "Phone Case",
//         quantity: 2,
//         price: 50.0,
//         image: "",
//       },
//     ],
//     subtotal: 299.99,
//     discount: 30.0,
//     shippingCost: 9.99,
//   },
//   {
//     id: "ORD-2024-002",
//     orderDate: "2024-01-14T15:45:00Z",
//     paymentMethod: "COD",
//     paymentStatus: "Not Paid",
//     couponApplied: "",
//     totalAmount: 159.99,
//     status: "Order Confirmed",
//     customer: {
//       id: "CUST-002",
//       name: "Jane Smith",
//       email: "jane.smith@email.com",
//       phone: "+1-555-0124",
//     },
//     shippingAddress: {
//       street: "456 Oak Avenue",
//       city: "Los Angeles",
//       state: "CA",
//       zipCode: "90210",
//       country: "United States",
//     },
//     products: [
//       {
//         id: "PROD-003",
//         name: "Bluetooth Speaker",
//         quantity: 1,
//         price: 159.99,
//         image: "",
//       },
//     ],
//     subtotal: 159.99,
//     discount: 0,
//     shippingCost: 0,
//   },
//   {
//     id: "ORD-2024-003",
//     orderDate: "2024-01-13T09:15:00Z",
//     paymentMethod: "Razorpay",
//     paymentStatus: "Paid",
//     couponApplied: "SUMMER25",
//     totalAmount: 449.99,
//     status: "Dispatched",
//     customer: {
//       id: "CUST-003",
//       name: "Bob Johnson",
//       email: "bob.johnson@email.com",
//       phone: "+1-555-0125",
//     },
//     shippingAddress: {
//       street: "789 Pine Street",
//       city: "Chicago",
//       state: "IL",
//       zipCode: "60601",
//       country: "United States",
//     },
//     products: [
//       {
//         id: "PROD-004",
//         name: "Laptop Stand",
//         quantity: 1,
//         price: 89.99,
//         image: "",
//       },
//       {
//         id: "PROD-005",
//         name: "Wireless Mouse",
//         quantity: 1,
//         price: 39.99,
//         image: "",
//       },
//       {
//         id: "PROD-006",
//         name: "Keyboard",
//         quantity: 1,
//         price: 129.99,
//         image: "",
//       },
//     ],
//     subtotal: 259.97,
//     discount: 65.0,
//     shippingCost: 15.99,
//   },
//   {
//     id: "ORD-2024-004",
//     orderDate: "2024-01-12T14:20:00Z",
//     paymentMethod: "COD",
//     paymentStatus: "Not Paid",
//     couponApplied: "",
//     totalAmount: 89.99,
//     status: "Completed",
//     customer: {
//       id: "CUST-004",
//       name: "Alice Brown",
//       email: "alice.brown@email.com",
//       phone: "+1-555-0126",
//     },
//     shippingAddress: {
//       street: "321 Elm Street",
//       city: "Houston",
//       state: "TX",
//       zipCode: "77001",
//       country: "United States",
//     },
//     products: [
//       {
//         id: "PROD-007",
//         name: "Phone Charger",
//         quantity: 1,
//         price: 29.99,
//         image: "",
//       },
//       {
//         id: "PROD-008",
//         name: "Screen Protector",
//         quantity: 2,
//         price: 30.0,
//         image: "",
//       },
//     ],
//     subtotal: 89.99,
//     discount: 0,
//     shippingCost: 0,
//   },
//   {
//     id: "ORD-2024-005",
//     orderDate: "2024-01-11T11:30:00Z",
//     paymentMethod: "Razorpay",
//     paymentStatus: "Paid",
//     couponApplied: "FLASH50",
//     totalAmount: 199.99,
//     status: "In Transit",
//     customer: {
//       id: "CUST-005",
//       name: "Charlie Wilson",
//       email: "charlie.wilson@email.com",
//       phone: "+1-555-0127",
//     },
//     shippingAddress: {
//       street: "654 Maple Drive",
//       city: "Phoenix",
//       state: "AZ",
//       zipCode: "85001",
//       country: "United States",
//     },
//     products: [
//       {
//         id: "PROD-009",
//         name: "Tablet Case",
//         quantity: 1,
//         price: 49.99,
//         image: "",
//       },
//       {
//         id: "PROD-010",
//         name: "Stylus Pen",
//         quantity: 3,
//         price: 50.0,
//         image: "",
//       },
//     ],
//     subtotal: 149.99,
//     discount: 75.0,
//     shippingCost: 25.0,
//   },
// ];

const dateRangeOptions = [
  { value: "all", label: "All Orders" },
  { value: "today", label: "Today's Orders" },
  { value: "yesterday", label: "Today & Yesterday" },
  { value: "2days", label: "Last 2 Days" },
  { value: "7days", label: "Last 7 Days" },
  { value: "15days", label: "Last 15 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "2months", label: "Last 2 Months" },
  { value: "3months", label: "Last 3 Months" },
  { value: "10months", label: "Last 10 Months" },
  { value: "12months", label: "Last 12 Months" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch orders from API or other source
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Filter orders based on search and filter criteria
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase());

      // Date range filter
      let matchesDateRange = true;
      if (dateRange !== "all") {
        const orderDate = new Date(order.orderDate);
        const now = new Date();

        switch (dateRange) {
          case "today":
            matchesDateRange =
              isAfter(orderDate, startOfDay(now)) &&
              isBefore(orderDate, endOfDay(now));
            break;
          case "yesterday":
            matchesDateRange = isAfter(orderDate, startOfDay(subDays(now, 1)));
            break;
          case "2days":
            matchesDateRange = isAfter(orderDate, subDays(now, 2));
            break;
          case "7days":
            matchesDateRange = isAfter(orderDate, subDays(now, 7));
            break;
          case "15days":
            matchesDateRange = isAfter(orderDate, subDays(now, 15));
            break;
          case "30days":
            matchesDateRange = isAfter(orderDate, subDays(now, 30));
            break;
          case "2months":
            matchesDateRange = isAfter(orderDate, subMonths(now, 2));
            break;
          case "3months":
            matchesDateRange = isAfter(orderDate, subMonths(now, 3));
            break;
          case "10months":
            matchesDateRange = isAfter(orderDate, subMonths(now, 10));
            break;
          case "12months":
            matchesDateRange = isAfter(orderDate, subMonths(now, 12));
            break;
        }
      }

      // Payment status filter
      const matchesPaymentStatus =
        paymentStatus === "all" ||
        order.paymentStatus.toLowerCase() === paymentStatus.toLowerCase();

      // Payment method filter
      const matchesPaymentMethod =
        paymentMethod === "all" ||
        order.paymentMethod.toLowerCase() === paymentMethod.toLowerCase();

      return (
        matchesSearch &&
        matchesDateRange &&
        matchesPaymentStatus &&
        matchesPaymentMethod
      );
    });
  }, [orders, searchTerm, dateRange, paymentStatus, paymentMethod]);

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // Call API to update order status
    fetch(`/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
        return response.json();
      })
      .then((data) => {
        // Update local state with new order status
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateRange("all");
    setPaymentStatus("all");
    setPaymentMethod("all");
  };

  const getStatusBadge = (status: string) => {
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

    return (
      <Badge
        className={
          statusColors[status as keyof typeof statusColors] ||
          "bg-gray-100 text-gray-800"
        }
      >
        {status}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    return (
      <Badge
        className={
          status === "Paid"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }
      >
        {status}
      </Badge>
    );
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const paidOrders = orders.filter(
    (order) => order.paymentStatus === "Paid"
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">
            View and manage all customer orders.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
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
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paid Orders</p>
                <p className="text-3xl font-bold text-purple-600">
                  {paidOrders}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {completedOrders}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* MongoDB ID Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by Order ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">No Filter</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="not paid">Not Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">No Filter</SelectItem>
                  <SelectItem value="cod">COD</SelectItem>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset Filters</span>
            </Button>
            <p className="text-sm text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Order Date</TableHead>
                  <TableHead className="font-semibold">
                    Payment Method
                  </TableHead>
                  <TableHead className="font-semibold">
                    Payment Status
                  </TableHead>
                  <TableHead className="font-semibold">
                    Coupon Applied
                  </TableHead>
                  <TableHead className="font-semibold">Total Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.orderId} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {format(new Date(order.orderDate), "MMM dd, yyyy HH:mm")}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      {order.couponApplied ? (
                        <Badge
                          variant="outline"
                          className="text-green-700 border-green-300"
                        >
                          {order.couponApplied}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      ₹{order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date</p>
                      <p className="font-medium">
                        {format(new Date(order.orderDate), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Amount</p>
                      <p className="font-medium">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Payment</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                  </div>

                  {order.couponApplied && (
                    <div className="text-sm">
                      <p className="text-gray-600">Coupon</p>
                      <Badge
                        variant="outline"
                        className="text-green-700 border-green-300"
                      >
                        {order.couponApplied}
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center justify-end pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No orders found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}
