"use client";
import SettingsSidebar from "@/components/layout/SettingsSidebar";
import { useState } from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <>
      <SettingsSidebar
        collapsed={isSidebarMinimized}
        toggle={() => setIsSidebarMinimized(!isSidebarMinimized)}
      />
      <div
        className={`${
          isSidebarMinimized ? "-ml-64" : "ml-14"
        } transition-all duration-300 flex-1`}
      >
        <main className="p-6">{children}</main>
      </div>
    </>
  );
}
