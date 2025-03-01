"use client";
import EnrollmentList from "@/app/_components/enrollments";
import AddStudent from "@/app/_components/studentEntry";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Marksheet from "@/admincomponents/Marksheet";
import Form from "@/admincomponents/ExamRegForm";
import ExamForms from "@/app/_components/examforms";
import Marksheets from "@/app/_components/marksheets";
import AllDownloads from "@/admincomponents/AllDownloads";
import CourseFee from "@/components/fees/CourseFee";

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  const { user } = useAuthStore();
  const router = useRouter();
  const defaultOpen = useState(true)[0];

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ONLINE ADMISSION":
        return <AddStudent />;
      case "ENROLLMENTS":
        return <EnrollmentList />;
      case "MARKSHEET":
        return <Marksheet />;
      case "EXAM FORM":
        return <Form />;
      case "EXAM FORMS":
        return <ExamForms />;
      case "MARKSHEETS":
        return <Marksheets />;
      case "ALL DOWNLOADS":
        return <AllDownloads />;
      case "COURSE FEE":
        return <CourseFee />;
    }
  };

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarTrigger className="absolute rounded-none z-50" />
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
