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
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";
import { Search, Trash2, UserPlus, Filter, Download, Edit } from "lucide-react";
import { toast } from "sonner";
import CreateCustomerDialog from "@/components/customers/CreateCustomerDialog";

// Mock customer data
// const initialCustomers = [
//   {
//     id: 1,
//     username: 'john_doe',
//     email: 'john.doe@email.com',
//     joinedDate: '2024-01-15',
//     status: 'Active',
//     totalOrders: 12,
//     totalSpent: '$1,245.50',
//   },
//   {
//     id: 2,
//     username: 'jane_smith',
//     email: 'jane.smith@email.com',
//     joinedDate: '2024-01-10',
//     status: 'Active',
//     totalOrders: 8,
//     totalSpent: '$892.30',
//   },
//   {
//     id: 3,
//     username: 'bob_johnson',
//     email: 'bob.johnson@email.com',
//     joinedDate: '2024-01-08',
//     status: 'Inactive',
//     totalOrders: 3,
//     totalSpent: '$156.75',
//   },
//   {
//     id: 4,
//     username: 'alice_brown',
//     email: 'alice.brown@email.com',
//     joinedDate: '2024-01-05',
//     status: 'Active',
//     totalOrders: 15,
//     totalSpent: '$2,134.80',
//   },
//   {
//     id: 5,
//     username: 'charlie_wilson',
//     email: 'charlie.wilson@email.com',
//     joinedDate: '2024-01-03',
//     status: 'Active',
//     totalOrders: 6,
//     totalSpent: '$445.20',
//   },
//   {
//     id: 6,
//     username: 'diana_martinez',
//     email: 'diana.martinez@email.com',
//     joinedDate: '2024-01-01',
//     status: 'Suspended',
//     totalOrders: 2,
//     totalSpent: '$89.99',
//   },
// ];

type Customers = {
  id: string;
  username: string;
  email: string;
  joinedDate: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    customer: (typeof customers)[0] | null;
  }>({
    isOpen: false,
    customer: null,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("/api/customers");
      const data = await response.json();
      console.log(data);
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

  function formatDate(dateString: string | null) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleCreateCustomerDialog = async () => {
    setCreateDialog(false);
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Customer created successfully");
      setCustomers((prev) => [...prev, data]);
    } else {
      toast.error(data.error || "Failed to create customer");
    }
  };

  const handleDeleteClick = (customer: (typeof customers)[0]) => {
    setDeleteDialog({
      isOpen: true,
      customer,
    });
  };

  const handleDeleteConfirm = async (id: string) => {
    if (!id) return;
    const res = await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Customer deleted successfully");
    } else {
      toast.error(data.error || "Failed to delete");
    }
    setCustomers(customers.filter((c) => c.id !== deleteDialog.customer!.id));
    setDeleteDialog({ isOpen: false, customer: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ isOpen: false, customer: null });
  };
  const getStatusBadge = (status: string) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800 border-green-200",
      Inactive: "bg-gray-100 text-gray-800 border-gray-200",
      Suspended: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Customer Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your customer base and view customer details.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => setCreateDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {customers.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Customers
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {customers.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  New This Month
                </p>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
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
                <p className="text-3xl font-bold text-yellow-600">$4,964.54</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Showing {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>

          {/* Customers Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Username</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Joined Date</TableHead>
                  <TableHead className="font-semibold">Total Orders</TableHead>
                  <TableHead className="font-semibold">Total Spent</TableHead>
                  <TableHead className="font-semibold text-center">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {customer.username}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{formatDate(customer.joinedDate)}</TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">
                      {customer.totalSpent}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        // onClick={() => handleEditProduct(customer.id)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(customer)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No customers found.</p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Dialogs */}
     
      <CreateCustomerDialog
        isOpen={createDialog}
        onClose={() => setCreateDialog(false)}
        onSubmit={handleCreateCustomerDialog}
      />
      {/* <EditCustomerDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, customer: null })}
        onSubmit={handleEditCustomerDialog}
        customer={editDialog.customer}
      /> */}
      <DeleteCustomerDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={() => handleDeleteConfirm(deleteDialog.customer?.id || "")}
        customerName={deleteDialog.customer?.username || ""}
      />
    </div>
  );
}
