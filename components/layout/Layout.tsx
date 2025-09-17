'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar collapsed={isSidebarMinimized} toggle={() => setIsSidebarMinimized(!isSidebarMinimized)} />
      <div
        className={`${isSidebarMinimized ? 'ml-14' :'ml-64'} transition-all duration-300 flex-1`}
      >
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}