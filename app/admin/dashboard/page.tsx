"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { useState } from "react";

import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const EnrollmentList = dynamic(() => import("@/app/_components/enrollments"), {
  loading: () => <Loader />,
});
const AddStudent = dynamic(() => import("@/app/_components/studentEntry"), {
  loading: () => <Loader />,
});
const Marksheet = dynamic(() => import("@/admincomponents/Marksheet"), {
  loading: () => <Loader />,
});
const Form = dynamic(() => import("@/admincomponents/ExamRegForm"), {
  loading: () => <Loader />,
});
const ExamForms = dynamic(() => import("@/app/_components/examforms"), {
  loading: () => <Loader />,
});
const Marksheets = dynamic(() => import("@/app/_components/marksheets"), {
  loading: () => <Loader />,
});
const AllDownloads = dynamic(() => import("@/admincomponents/AllDownloads"), {
  loading: () => <Loader />,
});
const CourseFee = dynamic(() => import("@/components/fees/CourseFee"), {
  loading: () => <Loader />,
});
const Enquiry = dynamic(() => import("@/app/_components/enquiry"), {
  loading: () => <Loader />,
});
const Gallery = dynamic(() => import("@/components/GalleryForm"), {
  loading: () => <Loader />,
});

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  const { isSidebarOpen, setSidebarOpen, loading, user } = useAuthStore();
  const defaultOpen = useState(true)[0];

  if (loading) return <Loader />;

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
      case "ENQUIRY":
        return <Enquiry />;
      case "GALLERY INSERTION":
        return <Gallery />;
    }
  };

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      open={isSidebarOpen}
      onOpenChange={setSidebarOpen}
    >
      <SidebarTrigger className="absolute rounded-none z-50" />
      <div className="h-screen flex flex-col bg-gray-100 w-screen">
        {/* Navbar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <AppSidebar />
          {/* Main Content */}
          <main className="flex-col gap-4 lg:p-6 overflow-y-auto w-screen">
            {renderComponent() ||
              (user ? (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-center">
                    Welcome Back, {user.name.toString().toUpperCase()}! 😊
                  </h1>
                  <p className="text-center text-lg">
                    We appreciate your dedication. Wishing you a productive and
                    successful day ahead!
                  </p>
                </div>
              ) : null)}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
