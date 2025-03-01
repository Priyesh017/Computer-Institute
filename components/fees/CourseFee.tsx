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

export interface Enrollment {
  name: string;
  Enrollmentno: string;
  activated: boolean;
  id: number;
  createdAt: string;
}

const PAGE_SIZE = 5;

const ExamFee = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNew, setIsNew] = useState(true);

  const fetchfn = async () => {
    const data = await fetcherWc("/AllEnrollments", "GET");
    console.log(data);
    setEnrollments(data);
  };
  console.log(enrollments);
  useEffect(() => {
    fetchfn();
  }, []);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = enrollments.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );
  const saveHandler;
  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6"></h2>
      <div className="grid grid-cols-7 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Total Fee</span>
        <span>Fees Paid</span>
        <span>Fees Due</span>
        <span>Action</span>
      </div>
      <div className="">
        {currentEnrollments.map((enrollment: Enrollment, index: number) => (
          <div
            key={index}
            className={`click grid grid-cols-7 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer ${
              isNew ? "bg-rose-100" : "bg-gray-200"
            } hover:bg-blue-100`}
          >
            <div
              className="hover:text-violet-800"
              onClick={() => {
                setIsNew(false);
              }}
            >
              {isNew && (
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              )}
              {enrollment.name}
            </div>
            <div>{enrollment.Enrollmentno}</div>
            <span>{new Date(enrollment.createdAt).toDateString()}</span>
            <span>2000</span>
            <input
              type="number"
              className="p-2 rounded-md text-center bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
            <span>600</span>
            <Button
              className="mx-4 bg-green-600 hover:bg-green-500"
              onClick={saveHandler}
            >
              Save
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
    </div>
  );
};

export default ExamFee;
