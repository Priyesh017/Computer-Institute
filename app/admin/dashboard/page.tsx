"use client";
import EnrollmentList from "@/app/_components/enrollments";
import AddStudent from "@/app/_components/studentEntry";
import IDcardForm from "@/admincomponents/IDCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Admit from "@/admincomponents/Admit";
import Marksheet from "@/admincomponents/Marksheet";
import Certificate from "@/admincomponents/Certificate";
import Form from "@/admincomponents/Form";

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ONLINE ADMISSION":
        return <AddStudent />;
      case "ENROLLMENTS":
        return <EnrollmentList />;
      case "ID CARDS":
        return <IDcardForm />;
      case "MARKSHEET":
        return <Marksheet />;
      case "ADMIT CARDS":
        return <Admit />;
      case "CERTIFICATES":
        return <Certificate />;
      case "EXAM FORM":
        return <Form />;
    }
  };
  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col bg-gray-100 w-screen">
        {/* Navbar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar />
          {/* Main Content */}
          <main className="flex-col gap-4 lg:p-6 overflow-y-auto w-screen">
            {renderComponent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
