"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { fetcherWc } from "@/helper";

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
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Enrollment List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Enrollment No</TableHead>
            <TableHead>Activated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEnrollments.map((enrollment, index) => (
            <TableRow key={index}>
              <TableCell>{enrollment.name}</TableCell>
              <TableCell>{enrollment.enrollmentNo}</TableCell>
              <TableCell>
                <Button
                  variant="default"
                  onClick={() => toggleActivation(startIndex + index)}
                  className={`px-3 py-1 text-white rounded ${
                    enrollment.activated ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {enrollment.activated ? "Activated" : "Deactivate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
