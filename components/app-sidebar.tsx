"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

// center
// admission
// id card download
// admit download
// exam form fillup
// MARKSHEET download
// certificate download

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";

// This is sample data.

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
  console.log(user.role);
  const filteredNav = data.navMain.filter(
    (d) => d.role === user.role.toLowerCase()
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
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
