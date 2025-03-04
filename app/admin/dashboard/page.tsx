"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const EnrollmentList = dynamic(() => import("@/app/_components/enrollments"), {
  loading: () => <Loader />,
});
const AddStudent = dynamic(() => import("@/app/_components/studentEntry"), {
  loading: () => <p>Loading...</p>,
});
const Marksheet = dynamic(() => import("@/admincomponents/Marksheet"), {
  loading: () => <p>Loading...</p>,
});
const Form = dynamic(() => import("@/admincomponents/ExamRegForm"), {
  loading: () => <p>Loading...</p>,
});
const ExamForms = dynamic(() => import("@/app/_components/examforms"), {
  loading: () => <p>Loading...</p>,
});
const Marksheets = dynamic(() => import("@/app/_components/marksheets"), {
  loading: () => <p>Loading...</p>,
});
const AllDownloads = dynamic(() => import("@/admincomponents/AllDownloads"), {
  loading: () => <p>Loading...</p>,
});
const CourseFee = dynamic(() => import("@/components/fees/CourseFee"), {
  loading: () => <p>Loading...</p>,
});
const Enquiry = dynamic(() => import("@/app/_components/enquiry"), {
  loading: () => <p>Loading...</p>,
});
const Gallery = dynamic(() => import("@/components/GalleryForm"), {
  loading: () => <p>Loading...</p>,
});

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  const { user, isSidebarOpen, setSidebarOpen } = useAuthStore();
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
            {renderComponent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
