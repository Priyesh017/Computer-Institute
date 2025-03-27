"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { navMain } from "@/data";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isSidebarOpen } = useAuthStore();

  if (!user || !user.role) {
    return;
  }
  const filteredNav = navMain.filter((d) => d.role === user.role.toLowerCase());

  return (
    <Sidebar collapsible="icon" {...props}>
      {isSidebarOpen && (
        <>
          <h1 className="text-2xl text-ellipsis font-bold text-gray-900 text-center border-b border-gray-300 px-4 py-6 overflow-hidden">
            {user.role === "ADMIN" ? "Central Admin" : "Branch Admin"} Dashboard
          </h1>
          <h1 className="text-md text-ellipsis font-bold text-gray-600 px-4 text-center border-b border-gray-300 py-2 overflow-x-hidden">
            Welcome {user ? user.name : "Guest"}
          </h1>
        </>
      )}
      <div className={`${!isSidebarOpen} && pt-8`}></div>
      <SidebarContent>
        <NavMain items={filteredNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
