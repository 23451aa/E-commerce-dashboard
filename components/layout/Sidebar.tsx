'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Ticket,
  ShoppingBag,
  Package,
  Plus,
  FolderTree,
  Layers,
  BarChart3,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Settings,
  Gift,
  Star,
} from 'lucide-react';

const navigation = [
  { name: 'Admin Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Coupon Management', href: '/admin/coupons', icon: Ticket },
  { name: 'All Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'All Products', href: '/admin/products', icon: Package },
  { name: 'Create Product', href: '/admin/products/create', icon: Plus },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Sub Categories', href: '/admin/sub-categories', icon: Layers },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Website Banners', href: '/admin/banners/web', icon: Monitor },
  { name: 'App Banners', href: '/admin/banners/app', icon: Smartphone },
  { name: 'Top Bar Management', href: '/admin/topbar', icon: Settings },
  { name: 'Home Screen Offers', href: '/admin/offers', icon: Gift },
  { name: 'Review Management', href: '/admin/reviews', icon: Star },
];
type SidebarProps = {
  collapsed: boolean;
  toggle: () => void;
};

export default function Sidebar({ collapsed, toggle }: SidebarProps) {
  // const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-40 shadow-lg',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        )}
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2 h-[calc(100vh-80px)] overflow-y-auto pb-8 ">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                    collapsed && 'justify-center px-2'
                  )}
                  title={collapsed ? item.name : ''}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors duration-200',
                      isActive ? 'text-blue-700' : 'text-gray-500 group-hover:text-gray-700',
                      !collapsed && 'mr-3'
                    )}
                  />
                  {!collapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}