"use client";
import { Loader2 } from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { fetcherWc } from "@/helper";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import StudentReportCard from "./StudentReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";

type Mark = {
  subject: string;
  theoryMarks: string;
  practicalMarks: string;
  theoryFullMarks: string;
  practicalFullMarks: string;
};

export type MarksWithEnrollment = {
  id: number;
  marks: Mark[];
  remarks: "PASS" | "FAIL";
  EnrollmentNo: string;
  grade: string;
  totalMarks: number;
  percentage: number;
  verified: boolean;
  createdAt: Date;
  year: string;
  serialNo: number;
  enrollment: {
    name: string;
    father: string;
    dob: Date;
    imageLink: string;
    course: {
      CName: string;
      Duration: number;
    };
    center: {
      Centername: string;
      address: string;
      code: string;
    };
  };
};

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [enrollments, setEnrollments] = useState<MarksWithEnrollment[]>([]);
  console.log(enrollments);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<MarksWithEnrollment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { setloadingTime } = useAuthStore();

  const [temploading, settemploading] = useState(false);
  const [temploading2, settemploading2] = useState(false);

  const fetchfn = useCallback(async () => {
    try {
      setloadingTime(true);
      const data = await fetcherWc("/marksheetfetch", "GET");
      setEnrollments(data.data);
      setloadingTime(false);
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  }, [setloadingTime]);

  useEffect(() => {
    fetchfn();
  }, [fetchfn]);

  const toggleActivation = async ({ verified, id }: MarksWithEnrollment) => {
    toast("plz wait");

    try {
      if (verified) {
        const data = await fetcherWc("/exmmarksDisApprove", "POST", { id });

        if (data.success) {
          setEnrollments((prev) =>
            prev.map((p) => (p.id === id ? { ...p, verified: false } : p))
          );
        }
        toast(data.success ? "success" : "failed");
        return;
      }

      const data = await fetcherWc("/exmmarksApprove", "POST", { id });

      if (data.success) {
        setEnrollments((prev) =>
          prev.map((p) => (p.id === id ? { ...p, verified: true } : p))
        );
      }
      toast(data.success ? "success" : "failed");
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  };

  const handleGenerateClick = (enrollment: MarksWithEnrollment) => {
    setSelectedEnrollment(enrollment);
    setIsGenerateModalOpen(true);
  };

  const handleGenerate = async (
    type: "marksheet" | "certificate",
    selectedEnrollment: MarksWithEnrollment
  ) => {
    if (!selectedEnrollment) return;

    const endpoint =
      type === "marksheet" ? "/generateMarksheet" : "/generateCertificate";
    if (type === "marksheet") settemploading(true);
    else settemploading2(true);

    try {
      const response = await fetcherWc(endpoint, "POST", {
        data: selectedEnrollment,
      });
      if (type === "marksheet") settemploading(false);
      else settemploading2(false);

      if (!response.success) toast.error("failed");
      else toast.success("success");
    } catch (error) {
      console.log(error);
      toast.error("some error, try again!");
    } finally {
      if (type === "marksheet") settemploading(false);
      else settemploading2(false);
    }
  };

  const filteredEnrollment = enrollments.filter((enrollment) =>
    enrollment.EnrollmentNo.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = filteredEnrollment.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Marksheet Verify</h2>
        <Input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-5 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>
      <div>
        {currentEnrollments.map((d, index: number) => (
          <div
            key={index}
            className={`click grid md:grid-cols-5 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer ${
              isNew ? "bg-rose-100" : "bg-gray-200"
            } hover:bg-blue-100`}
          >
            <div
              className="hover:text-violet-800"
              onClick={() => {
                setSelectedEnrollment(d);
                setIsModalOpen(true);
                setIsNew(false);
              }}
            >
              {isNew && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {d.enrollment.name}
            </div>
            <div>{d.EnrollmentNo}</div>
            <span>{new Date(d.createdAt).toDateString()}</span>
            <div className="flex items-center justify-center gap-2">
              <Switch
                id={`activation-${startIndex + index}`}
                checked={d.verified}
                onCheckedChange={() => toggleActivation(d)}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
            </div>
            <Button
              className={`mx-4 ${
                d.verified
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!d.verified} // Disable if not verified
              onClick={() => handleGenerateClick(d)} // Open modal
            >
              Generate
            </Button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isActive={currentPage !== 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) =>
                  startIndex + PAGE_SIZE < enrollments.length ? prev + 1 : prev
                )
              }
              isActive={startIndex + PAGE_SIZE < enrollments.length}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-auto">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} className="hover:text-red-600" />
            </button>
            <StudentReportCard selectedEnrollment={selectedEnrollment} />
          </div>
        </div>
      )}

      {/* Generate Modal */}
      {isGenerateModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setIsGenerateModalOpen(false)}
            >
              <X size={24} className="hover:text-red-600" />
            </button>
            <h2 className="text-xl font-bold mb-4">Generate Options</h2>
            <p className="text-gray-600 mb-4">Select an option below:</p>
            <div className="flex gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 flex-1"
                onClick={() => handleGenerate("marksheet", selectedEnrollment)}
                disabled={temploading}
              >
                Generate Marksheet
                {temploading && <Loader2 className="animate-spin" />}
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex-1"
                disabled={temploading2}
                onClick={() =>
                  handleGenerate("certificate", selectedEnrollment)
                }
              >
                Generate Certificate
                {temploading2 && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
