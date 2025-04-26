"use client";

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
import { Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataItem } from "@/lib/typs";
import { EnrollmentDetails } from "@/components/exmformdetails";
import Loader from "@/components/Loader";

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedexmform, setselectedexmform] = useState<DataItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [loading, setloading] = useState<number | null>(null);

  const {
    data: exmforms = [],
    isLoading,
    isError,
  } = useQuery<DataItem[]>({
    queryKey: ["exmforms"],
    queryFn: () => fetcherWc("/exmformsfetch", "GET").then((data) => data.data),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Mutation for approving/disapproving
  const toggleActivation = useMutation({
    mutationFn: async ({ verified, id }: DataItem) => {
      const endpoint = verified ? "/exmformDisApprove" : "/exmformApprove";
      return fetcherWc(endpoint, "POST", { id });
    },
    onSuccess: (_, { id, verified }) => {
      queryClient.setQueryData(["exmforms"], (prev: DataItem[]) =>
        prev.map((p) => (p.id === id ? { ...p, verified: !verified } : p))
      );
      toast("Success");
    },
    onError: () => toast("Some error happened"),
  });

  // Mutation for generating admit
  const generateAdmit = useMutation({
    mutationFn: async (enrollment: DataItem) => {
      setloading(enrollment.id);
      return fetcherWc("/generateadmit", "POST", { enrollment });
    },
    onSuccess: (data) => toast(data.success ? "Generated" : "Error"),
    onError: () => toast("Some error happened"),
    onSettled: () => setloading(null),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading data</p>;

  // Filter and paginate data
  const filteredEnrollment = exmforms.filter(
    (e) =>
      e.enrollment.center.code
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) // replace the EnrollmentNo with the Branch ID
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = filteredEnrollment.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Exam Form Verify</h2>
        <Input
          type="text"
          placeholder="Search Enrollment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-8 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Created</span>
        <span>Branch ID</span>
        <span>Course Name</span>
        <span>Status</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>

      {currentEnrollments.map((enrollment, index) => (
        <div
          key={enrollment.id}
          className="grid md:grid-cols-8 items-center text-center text-gray-600 gap-2 font-bold py-3 border-b border-gray-500 hover:bg-blue-100"
        >
          <div
            className="hover:text-orange-600 cursor-pointer"
            onClick={() => {
              setselectedexmform(enrollment);
              setIsModalOpen(true);
            }}
          >
            {enrollment.enrollment.name}
          </div>
          <div>{enrollment.EnrollmentNo}</div>
          <div>
            {new Date(enrollment.createdAt).toLocaleDateString("en-GB")}
          </div>

          <span>{enrollment.enrollment.center.code}</span>
          <span>{enrollment.enrollment.course.CName} </span>
          <span>{enrollment.enrollment.status.val}</span>
          <div className="flex items-center justify-center gap-2">
            <Switch
              id={`activation-${startIndex + index}`}
              checked={enrollment.verified}
              onCheckedChange={() => toggleActivation.mutate(enrollment)}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
          </div>
          <Button
            className={`mx-4 ${
              enrollment.verified
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => generateAdmit.mutate(enrollment)}
            disabled={!enrollment.verified}
          >
            Generate Admit
            {generateAdmit.isPending && loading == enrollment.id && (
              <Loader2 className="animate-spin" />
            )}
          </Button>
        </div>
      ))}

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
                  startIndex + PAGE_SIZE < exmforms.length ? prev + 1 : prev
                )
              }
              isActive={startIndex + PAGE_SIZE < exmforms.length}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedexmform && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl w-full max-w-fit max-h-[90vh] overflow-auto">
            <div className="absolute top-0 right-0 flex items-center gap-2 p-2">
              <button
                className="p-2 hover:text-red-600 hover:bg-gray-300 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <EnrollmentDetails enrollment={selectedexmform} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
