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
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataItem } from "@/lib/typs";
import { EnrollmentDetails } from "@/components/exmformdetails";

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedexmform, setselectedexmform] = useState<DataItem | null>(null);
  const queryClient = useQueryClient();

  // Fetching exam forms using React Query
  const {
    data: exmforms = [],
    isLoading,
    isError,
  } = useQuery<DataItem[]>({
    queryKey: ["exmforms"],
    queryFn: () => fetcherWc("/exmformsfetch", "GET").then((res) => res.data),
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
      toast("Please wait...");
      return fetcherWc("/generateadmit", "POST", { enrollment });
    },
    onSuccess: (data) => toast(data.success ? "Generated" : "Error"),
    onError: () => toast("Some error happened"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  // Filter and paginate data
  const filteredEnrollment = exmforms.filter((e) =>
    e.EnrollmentNo.toString().toLowerCase().includes(search.toLowerCase())
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = filteredEnrollment.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
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

      <div className="grid grid-cols-5 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>

      {currentEnrollments.map((enrollment, index) => (
        <div
          key={enrollment.id}
          className="grid md:grid-cols-5 items-center text-center text-gray-600 gap-2 font-bold py-3 border-b border-gray-500 hover:bg-blue-100"
        >
          <div
            className="hover:text-orange-600 cursor-pointer"
            onClick={() => setselectedexmform(enrollment)}
          >
            {enrollment.enrollment.name}
          </div>
          <div>{enrollment.EnrollmentNo}</div>
          <span>{new Date(enrollment.createdAt).toDateString()}</span>
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
      {selectedexmform && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-auto">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setselectedexmform(null)}
            >
              <X size={24} className="hover:text-red-600" />
            </button>
            <EnrollmentDetails enrollment={selectedexmform} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
