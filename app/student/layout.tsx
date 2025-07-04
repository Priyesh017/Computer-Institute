"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Loader, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { navMain } from "@/data";
import { NavMain } from "@/components/nav-main";
import { useRouter } from "next/navigation";

export default function Menu({ dashboard }: { dashboard: React.ReactNode }) {
  const { logout, isSidebarOpen, setSidebarOpen, user } = useAuthStore();
  const [temploading, settemploading] = useState(false);
  const filteredNav = navMain.filter((nav) => nav.role === "student");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "STUDENT") {
      router.replace("/unauthorized");
    }
  }, [user, router]);

  if (!user || user.role !== "STUDENT") return <Loader />;

  const logouthandler = async () => {
    settemploading(true);
    try {
      await fetcherWc("/logout", "GET");
      logout();
    } catch (error) {
      console.log(error);
      toast("error happened");
    } finally {
      settemploading(false);
    }
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar className=" w-64 min-h-screen">
        <h1 className="text-2xl text-ellipsis font-bold text-gray-900 text-center border-b border-gray-300 px-4 py-6 overflow-hidden">
          Student Dashboard
        </h1>
        <SidebarContent className="p-2">
          <NavMain items={filteredNav} />
          <div className="relative top-52 w-full">
            <Button
              className="flex items-center gap-2 text-left w-full border border-gray-900 p-2"
              variant="destructive"
              disabled={temploading}
              onClick={logouthandler}
            >
              Logout
              <LogOut size={20} />
              {temploading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>
      {/* Content Section */}

      <main className="flex-col gap-4 overflow-y-auto w-screen">
        <SidebarTrigger className="fixed rounded-none z-50" />
        {dashboard}
      </main>
    </SidebarProvider>
  );
}
