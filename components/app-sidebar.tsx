"use client";

import { Settings2, SquareTerminal } from "lucide-react";

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

const data = {
  navMain: [
    {
      title: "Fee payment",
      url: "#",
      role: "center",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "exam fee",
          url: "#",
        },
        {
          title: "Course Fee",
          url: "#",
        },
      ],
    },
    {
      title: "admin",
      url: "#",
      role: "admin",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "enrollments",
          url: "#",
        },
        {
          title: "id cards",
          url: "#",
        },
        {
          title: "admit cards",
          url: "#",
        },
        {
          title: "marks",
          url: "#",
        },
      ],
    },
    {
      title: "Education",
      role: "center",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Online admission",
          url: "#",
        },
        {
          title: "id Download",
          url: "#",
        },
        {
          title: "admit download",
          url: "#",
        },
        {
          title: "exam form fillup",
          url: "#",
        },
        {
          title: "Marksheet download",
          url: "#",
        },
        {
          title: "certificate download",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  if (!user) return;

  const filteredNav = data.navMain.filter(
    (d) => d.role === user.role.toLowerCase()
  );

  return (
    <Sidebar collapsible="icon" {...props}>
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
