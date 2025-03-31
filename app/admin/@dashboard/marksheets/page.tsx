"use client";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { fetcherWc } from "@/helper";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudentReportCard from "@/components/StudentReportCard";
import { MarksWithEnrollment } from "@/lib/typs";
import Loader from "@/components/Loader";

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingType, setLoadingType] = useState<
    "marksheet" | "certificate" | null
  >(null);

  const [search, setSearch] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<MarksWithEnrollment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch enrollments using React Query
  const { data: enrollments = [], isLoading } = useQuery<MarksWithEnrollment[]>(
    {
      queryKey: ["marksheets"],
      queryFn: async () => {
        const res = await fetcherWc("/marksheetfetch", "GET");
        return res.data || [];
      },
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  // Approve/Disapprove mutation
  const toggleMutation = useMutation({
    mutationFn: async (enrollment: MarksWithEnrollment) => {
      const endpoint = enrollment.verified
        ? "/exmmarksDisApprove"
        : "/exmmarksApprove";
      const res = await fetcherWc(endpoint, "POST", { id: enrollment.id });
      if (!res.success) throw new Error("Action failed");
      return enrollment.id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(
        ["marksheets"],
        (oldData: MarksWithEnrollment[]) =>
          oldData.map((e) =>
            e.id === id ? { ...e, verified: !e.verified } : e
          )
      );
      toast.success("Updated successfully");
    },
    onError: () => {
      toast.error("Action failed");
    },
  });

  // Generate Marksheet/Certificate Mutation
  const generateMutation = useMutation({
    mutationFn: async ({
      type,
      enrollment,
    }: {
      type: "marksheet" | "certificate";
      enrollment: MarksWithEnrollment;
    }) => {
      const endpoint =
        type === "marksheet" ? "/generateMarksheet" : "/generateCertificate";
      setLoadingType(type);
      const res = await fetcherWc(endpoint, "POST", { data: enrollment });
      if (!res.success) throw new Error("Generation failed");
    },
    onSuccess: () => {
      toast.success("Generated successfully");
      setLoadingType(null);
    },
    onError: () => {
      toast.error("Generation failed");
      setLoadingType(null);
    },
  });

  const filteredEnrollment = enrollments.filter((enrollment) =>
    enrollment.EnrollmentNo.toString()
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = filteredEnrollment.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      {/* Header & Search */}
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Marksheet Verify</h2>
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-5 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>

      {/* Table Data */}
      {isLoading ? (
        <Loader />
      ) : (
        currentEnrollments.map((d) => (
          <div
            key={d.id}
            className="grid md:grid-cols-5 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-gray-500"
          >
            <div
              className="hover:text-violet-800 cursor-pointer"
              onClick={() => {
                setSelectedEnrollment(d);
                setIsModalOpen(true);
              }}
            >
              {d.enrollment.name}
            </div>
            <div>{d.EnrollmentNo}</div>
            <span>{new Date(d.createdAt).toDateString()}</span>
            <div className="flex items-center justify-center">
              <Switch
                checked={d.verified}
                onCheckedChange={() => toggleMutation.mutate(d)}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
            </div>
            <Button
              className={`mx-4 ${
                d.verified ? "bg-purple-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!d.verified}
              onClick={() => {
                setSelectedEnrollment(d);
                setIsGenerateModalOpen(true);
              }}
            >
              Generate
            </Button>
          </div>
        ))
      )}

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
              <X size={15} className="hover:text-red-600" />
            </button>
            <h2 className="text-xl font-bold mb-4">Generate Options</h2>
            <Button
              className="bg-blue-600"
              disabled={loadingType === "marksheet"}
              onClick={() =>
                generateMutation.mutate({
                  type: "marksheet",
                  enrollment: selectedEnrollment,
                })
              }
            >
              Generate Marksheet
              {loadingType === "marksheet" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
            <Button
              className="bg-green-600 ml-4"
              disabled={loadingType === "certificate"}
              onClick={() =>
                generateMutation.mutate({
                  type: "certificate",
                  enrollment: selectedEnrollment,
                })
              }
            >
              Generate Certificate
              {loadingType === "certificate" && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
