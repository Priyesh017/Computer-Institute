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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      title: "Course",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Course Details",
          url: "#",
        },
        {
          title: "Course Fees",
          url: "#",
        },
        {
          title: "Fees Deposit",
          url: "#",
        },
      ],
    },
    {
      title: "Center",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Center",
          url: "#",
        },
        {
          title: "State and District Wise List",
          url: "#",
        },
      ],
    },
    {
      title: "Gallery",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Picnic",
          url: "#",
        },
        {
          title: "Online admission",
          url: "#",
        },
      ],
    },
    {
      title: "Education",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Online admission",
          url: "#",
        },
        {
          title: "Certificate Download",
          url: "#",
        },
        {
          title: "Id Card",
          url: "#",
        },
        {
          title: "Enrollment",
          url: "#",
        },
        {
          title: "Marksheet",
          url: "#",
        },
        {
          title: "Examination Form",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
