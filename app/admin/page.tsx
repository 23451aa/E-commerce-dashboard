import KPICard from "@/components/dashboard/KPICard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";
import LatestCustomers from "@/components/dashboard/LatestCustomers";
import { ShoppingBag, Package, TrendingUp, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders"
          value="1,234"
          change="+12% from last month"
          changeType="positive"
          icon={<ShoppingBag className="h-6 w-6" />}
          color="blue"
        />
        <KPICard
          title="Total Products"
          value="567"
          change="+3 new this week"
          changeType="positive"
          icon={<Package className="h-6 w-6" />}
          color="green"
        />
        <KPICard
          title="Total Revenue"
          value="₹89,432"
          change="+18% from last month"
          changeType="positive"
          icon={<IndianRupee className="h-6 w-6" />}
          color="yellow"
        />
        <KPICard
          title="Total Sales"
          value="2,847"
          change="-2% from last month"
          changeType="negative"
          icon={<TrendingUp className="h-6 w-6" />}
          color="red"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <RecentOrders />
          <ProductPerformance />
        </div>

        {/* Right Column - Takes 1/3 width */}
        <div className="space-y-6">
          <InventoryAlerts />
          <LatestCustomers />
        </div>
      </div>
    </div>
  );
}
