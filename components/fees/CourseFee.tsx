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
import { Button } from "../ui/button";
import { toast } from "react-toastify";

export interface Enrollment {
  name: string;
  Enrollmentno: string;
  activated: boolean;
  id: number;
  createdAt: string;
  course: {
    price: number;
  };
  amount?: {
    TotalPaid: number;
    amountRemain: number;
  };
}

const PAGE_SIZE = 5;

const ExamFee = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feesPaid, setFeesPaid] = useState<{ [key: number]: number }>({});
  const [reload, setreload] = useState(false);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await fetcherWc("/amountFetch", "POST");
        setEnrollments(data.data);
        setreload(false);
      } catch (error) {
        console.log(error);
        toast("some error happened");
      }
    };

    fetchEnrollments();
  }, [reload]);

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
    toast("wait for some time...");
    const amountPaid = feesPaid[id] || 0;
    try {
      const data = await fetcherWc("/amountEdit", "POST", {
        EnrollmentNo: enrollmentNo,
        tp: amountPaid,
        ar: remainingAmount - amountPaid,
      });
      if (data.success) {
        toast("ok");
        setreload(true);
      } else toast("not ok");
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  };

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">All Course Fees</h2>
      <div className="grid grid-cols-7 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Total Fee</span>
        <span>Fees Paid</span>
        <span>Fees Due</span>
        <span>Action</span>
      </div>
      <div>
        {currentEnrollments.map((enrollment) => {
          const remainingAmount =
            enrollment.amount?.amountRemain ?? enrollment.course.price;
          return (
            <div
              key={enrollment.id}
              className="grid grid-cols-7 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer hover:bg-blue-100"
            >
              <div className="hover:text-violet-800">{enrollment.name}</div>
              <div>{enrollment.Enrollmentno}</div>
              <span>{new Date(enrollment.createdAt).toDateString()}</span>
              <span>{enrollment.course.price}</span>
              <input
                type="number"
                value={
                  feesPaid[enrollment.id] !== undefined
                    ? feesPaid[enrollment.id]
                    : enrollment.amount?.TotalPaid || ""
                }
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFeesPaid((prev) => ({ ...prev, [enrollment.id]: value }));
                }}
                className="p-2 rounded-md text-center bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
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
