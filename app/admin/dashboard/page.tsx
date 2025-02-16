"use client";
import Navbar from "@/app/_components/navbar";
import AddStudent from "@/app/_components/studentEntry";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarStore } from "@/store";

export default function AdminDashboard() {
  const selectedComponent = useSidebarStore((state) => state.selectedComponent);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "student_entry":
        return <AddStudent situation="" />;
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
              Welcome, Admin
            </h1>
            {renderComponent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
