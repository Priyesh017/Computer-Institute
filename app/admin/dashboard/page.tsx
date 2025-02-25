"use client";
import EnrollmentList from "@/app/_components/enrollments";
import Navbar from "@/app/_components/navbar";
import AddStudent from "@/app/_components/studentEntry";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  // cookies na thakle redirect
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]); // Runs only when `user` changes

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ONLINE ADMISSION":
        return <AddStudent />;
      case "ENROLLMENTS":
        return <EnrollmentList />;
    }
  };
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col bg-gray-100 w-screen">
        {/* Navbar */}
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content */}
          <main className="flex-col gap-4 lg:p-6 overflow-y-auto w-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Welcome, {user ? user.name : "Guest"}
            </h1>
            {renderComponent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
