"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { data } from "@/data";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!user || !user.role) {
      router.push("/");
      return;
    }
  }, []);

  if (!user || !user.role) {
    return;
  }
  const filteredNav = data.navMain.filter(
    (d) => d.role === user.role.toLowerCase()
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <h1 className="text-2xl font-bold text-gray-900 text-center border-b border-gray-300 py-6">
        Admin Dashboard
      </h1>
      <SidebarContent>
        <h1 className="text-md font-bold text-gray-600 px-4 text-center border-b border-gray-300 py-2">
          Welcome {user ? user.name : "Guest"}
        </h1>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
