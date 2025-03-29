"use client";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { Enrollment } from "@/lib/typs";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 5;

const ExamFee = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feesPaid, setFeesPaid] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetcherWc("/amountFetch", "POST");
        if (data) setEnrollments(data);
      } catch (error) {
        console.error(error);
        toast.error("Some error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = enrollments.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const saveHandler = async (
    enrollmentNo: string,
    id: number,
    remainingAmount: number
  ) => {
    const amountPaid = feesPaid[id] || 0;

    if (amountPaid < 0 || amountPaid > remainingAmount) {
      toast.error("Invalid amount entered.");
      return;
    }

    try {
      const { success } = await fetcherWc("/amountEdit", "POST", {
        EnrollmentNo: enrollmentNo,
        tp: amountPaid,
        ar: remainingAmount - amountPaid,
      });

      if (success) {
        toast.success("Payment updated successfully.");
        setFeesPaid((prev) => ({ ...prev, [id]: 0 })); // Reset input after saving
        setEnrollments((prev) =>
          prev.map((enrollment) =>
            enrollment.id === id
              ? {
                  ...enrollment,
                  amount: {
                    ...enrollment.amount,
                    TotalPaid: (enrollment.amount?.TotalPaid || 0) + amountPaid,
                    amountRemain: remainingAmount - amountPaid,
                  },
                }
              : enrollment
          )
        );
      } else {
        toast.error("Failed to update payment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occurred.");
    }
  };

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
                <div>{enrollment.Enrollmentno}</div>
                <span>{enrollment.course.price}</span>

                <input
                  type=""
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
                    saveHandler(
                      enrollment.Enrollmentno,
                      enrollment.id,
                      remainingAmount
                    )
                  }
                >
                  Save
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
