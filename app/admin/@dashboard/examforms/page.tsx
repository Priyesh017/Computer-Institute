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
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataItem } from "@/lib/typs";
import Loader from "@/components/Loader";

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const [loading, setloading] = useState<number | null>(null);

  const {
    data: exmforms = [],
    isLoading,
    isError,
  } = useQuery<DataItem[]>({
    queryKey: ["exmforms"],
    queryFn: () => fetcherWc("/exmformsfetch", "GET"),
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["enrollments", currentPage] });
      queryClient.refetchQueries({ queryKey: ["enrollments", currentPage] });
      toast(data.success ? "Generated" : "Error");
    },
    onError: () => toast("Some error happened"),
    onSettled: () => setloading(null),
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading data</p>;

  // Filter and paginate data
  const filteredEnrollment = exmforms.filter(
    (e) =>
      e.enrollment.centerid
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

      {currentEnrollments.map((enrollment, index) => {
        const remc =
          6 - Math.abs(enrollment.enrollment.centerid).toString().length;
        const paddedNumberc = enrollment.enrollment.centerid
          .toString()
          .padStart(remc, "0");

        return (
          <div
            key={enrollment.id}
            className="grid md:grid-cols-8 items-center text-center text-gray-600 gap-2 font-bold py-3 border-b border-gray-500 hover:bg-blue-100"
          >
            <div className="">{enrollment.enrollment.name}</div>
            <div>{enrollment.EnrollmentNo}</div>
            <div>
              {new Date(enrollment.createdAt).toLocaleDateString("en-GB")}
            </div>

            <span>{`YCTC${paddedNumberc}`}</span>
            <span>
              {enrollment.enrollment.course.CName}

              <br />
              {`(${enrollment.enrollment.course.Duration} months)`}
            </span>
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
        );
      })}

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
    </div>
  );
};

export default ExamForm;
