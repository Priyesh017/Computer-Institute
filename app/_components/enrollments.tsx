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
import { Switch } from "@/components/ui/switch";

interface Enrollment {
  name: string;
  enrollmentNo: string;
  activated: boolean;
}

const PAGE_SIZE = 5; // Number of enrollments per page

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchfn = async () => {
    const data = await fetcherWc("/AllEnrollments", "GET");
    setEnrollments(data);
  };

  useEffect(() => {
    fetchfn();
  }, []);

  const toggleActivation = (index: number) => {
    setEnrollments((prev) =>
      prev.map((enrollment, i) =>
        i === index
          ? { ...enrollment, activated: !enrollment.activated }
          : enrollment
      )
    );
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = enrollments.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">Enrollment List</h2>
      <div className="grid grid-cols-3 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
      </div>
      <div>
        {currentEnrollments.map((enrollment, index) => (
          <div
            key={index}
            className="grid grid-cols-3 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-gray-500"
          >
            <div>{enrollment.name}</div>
            <div>{enrollment.enrollmentNo}</div>
            <div className="flex items-center justify-center gap-2">
              <Switch
                id={`activation-${startIndex + index}`}
                checked={enrollment.activated}
                onCheckedChange={() => {
                  console.log("Toggling:", startIndex + index); // Debugging
                  toggleActivation(startIndex + index);
                }}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
              />
            </div>
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

export default EnrollmentList;
