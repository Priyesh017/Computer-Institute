"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Download, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import { fetcherWc } from "@/helper";
import { useRouter } from "next/navigation";
import Downloads from "@/components/studentdashboard/Downloads";
import Profile, {
  StudentProfileProps,
} from "@/components/studentdashboard/Profile";

export default function Menu() {
  const { user, logout } = useAuthStore();
  const student = useAuthStore().user as unknown as StudentProfileProps;

  const defaultOpen = useState(true)[0];
  const sideMenu = [
    {
      icon: <User size={24} />,
      name: "Profile",
      section: <Profile />,
    },
    {
      icon: <Download size={24} />,
      name: "Downloads",
      section: <Downloads enrollment={student} />,
    },
  ];
  const [activeSection, setActiveSection] = useState(sideMenu[0].name);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/checkupdates");
      return;
    }
  }, [user, router]);

  const logouthandler = async () => {
    await fetcherWc("/logout", "GET");
    logout();
  };
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarProvider defaultOpen={defaultOpen}>
        <Sidebar className="bg-gray-900 text-white w-64 min-h-screen">
          <SidebarContent className="bg-gray-900 p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg text-gray-300 mx-auto my-6">
                Student Dashboard
              </SidebarGroupLabel>
              <h1 className="text-md text-gray-300 py-4">{user?.name}</h1>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sideMenu.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        className={`flex items-center gap-5 py-2 transition text-gray-300 ${
                          activeSection === item.name ? "bg-gray-700" : ""
                        }`}
                        onClick={() => setActiveSection(item.name)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="relative top-52 w-full">
              <Button
                className="flex items-center gap-2 text-left w-full border border-gray-700 p-2"
                variant="destructive"
                onClick={logouthandler}
              >
                Logout
                <LogOut size={20} />
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>
        {/* Content Section */}
        <div className="min-h-screen w-[100%] bg-gray-300 text-black">
          <SidebarTrigger className="absolute rounded-none z-50" />
          {sideMenu.find((item) => item.name === activeSection)?.section}
        </div>
      </SidebarProvider>
    </div>
  );
}
