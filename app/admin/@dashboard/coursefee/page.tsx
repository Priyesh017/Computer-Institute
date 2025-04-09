"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";
import { Enrollment } from "@/lib/typs";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcherWc } from "@/helper";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 5;

const ExamFee = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [feesPaid, setFeesPaid] = useState<{ [key: number]: number }>({});
  const queryClient = useQueryClient();

  const { data: enrollments = [], isLoading } = useQuery<Enrollment[]>({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const { data } = await fetcherWc("/amountFetch", "POST");
      return data || [];
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const mutation = useMutation({
    mutationFn: async ({
      EnrollmentNo,
      id,
      remainingAmount,
    }: {
      EnrollmentNo: number;
      id: number;
      remainingAmount: number;
    }) => {
      const amountPaid = feesPaid[id] || 0;
      if (amountPaid < 0 || amountPaid > remainingAmount) {
        throw new Error("Invalid amount entered.");
      }
      return fetcherWc("/amountEdit", "POST", {
        EnrollmentNo: EnrollmentNo,
        tp: amountPaid,
        ar: remainingAmount - amountPaid,
      });
    },
    onSuccess: (_, { id }) => {
      toast.success("Payment updated successfully.");
      setFeesPaid((prev) => ({ ...prev, [id]: 0 }));
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
    onError: () => {
      toast.error("Failed to update payment.");
    },
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = enrollments.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">All Course Fees</h2>

      <div className="grid grid-cols-7 text-xs md:text-lg text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Total Fee</span>
        <span>Fees Paid</span>
        <span>Fees Due</span>
        <span>Action</span>
      </div>

      {isLoading ? (
        <div className="text-center p-4">Loading data...</div>
      ) : (
        <div>
          {currentEnrollments.map((enrollment) => {
            const remainingAmount =
              enrollment.amount?.amountRemain ?? enrollment.course.price;

            return (
              <div
                key={enrollment.id}
                className="grid md:grid-cols-7 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer hover:bg-blue-100"
              >
                <div className="hover:text-violet-800">{enrollment.name}</div>
                <div>{enrollment.EnrollmentNo}</div>
                <span>{enrollment.course.price}</span>
                <input
                  type="number"
                  value={feesPaid[enrollment.id] || ""}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setFeesPaid((prev) => ({
                      ...prev,
                      [enrollment.id]: value,
                    }));
                  }}
                  className="p-2 rounded-md text-center bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  min={0}
                  max={remainingAmount}
                />
                <span>{remainingAmount}</span>
                <Button
                  className="mx-4 bg-green-600 hover:bg-green-500"
                  onClick={() =>
                    mutation.mutate({
                      EnrollmentNo: enrollment.EnrollmentNo,
                      id: enrollment.id,
                      remainingAmount,
                    })
                  }
                  disabled={mutation.isPending}
                >
                  Save
                  {mutation.isPending && <Loader2 className="animate-spin" />}
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) =>
                  startIndex + PAGE_SIZE < enrollments.length ? prev + 1 : prev
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ExamFee;
