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
import Form from "@/admincomponents/ExamRegForm";
import ExamForms from "@/app/_components/examforms";
import Marksheets from "@/app/_components/marksheets";
import IDCardDownload from "@/components/downloads/id_card";
import AdmitCardDownload from "@/components/downloads/admit_card";
import MarksheetDownload from "@/components/downloads/mark_sheet";
import CertificateDownload from "@/components/downloads/certi_ficate";
import CourseFee from "@/components/fees/CourseFee";
import ExamFee from "@/components/fees/ExamFee";

import ExamFormApproval from "@/components/approval/Aadmit";
import MarksheetApproval from "@/components/approval/Amarksheet";
import EnrollmentApproval from "@/components/approval/Aenrollment";

export default function AdminDashboard() {
  const selectedComponent = useAuthStore((state) => state.selectedComponent);
  const { user } = useAuthStore();
  const router = useRouter();

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
      case "ID CARD":
        return <IDcardForm />;
      case "MARKSHEET":
        return <Marksheet />;
      case "ADMIT CARD":
        return <Admit />;
      case "CERTIFICATE":
        return <Certificate />;
      case "EXAM FORM":
        return <Form />;
      case "EXAM FORMS":
        return <ExamForms />;

      case "MARKSHEETS":
        return <Marksheets />;
      case "ID CARD DOWNLOAD":
        return <IDCardDownload />;
      case "ADMIT CARD DOWNLOAD":
        return <AdmitCardDownload />;
      case "MARKSHEET DOWNLOAD":
        return <MarksheetDownload />;
      case "CERTIFICATE DOWNLOAD":
        return <CertificateDownload />;
      case "COURSE FEE":
        return <CourseFee />;
      case "EXAM FEE":
        return <ExamFee />;
      case "ENROLLMENTS APPROVAL":
        return <EnrollmentApproval />;

      case "EXAM FORM APPROVAL":
        return <ExamFormApproval />;
      case "MARKSHEETS APPROVAL":
        return <MarksheetApproval />;
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
