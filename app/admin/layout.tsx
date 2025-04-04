"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";

export default function Layout({ dashboard }: { dashboard: React.ReactNode }) {
  const { isSidebarOpen, setSidebarOpen } = useAuthStore();

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <SidebarTrigger className="fixed top-0 left-0 z-50" />

      <div className="flex w-screen">
        <AppSidebar />

        <main className="w-screen gap-4 pt-5">{dashboard}</main>
      </div>
    </SidebarProvider>
  );
}
