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
// import { Download } from "lucide-react";
// import { motion } from "framer-motion";

export interface Enrollment {
  name: string;
  Enrollmentno: string;
  activated: boolean;
  id: number;
  createdAt: string;
}

const PAGE_SIZE = 5;

const ExamFee  = () => {
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

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">ID Card Download</h2>
      <div className="grid grid-cols-6 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Total Fee</span>
        <span>Fees Paid</span>
        <span>Fees Due</span>
      </div>
      <div>
        {currentEnrollments.map((enrollment: Enrollment, index: number) => (
          <div
            key={index}
            className={`click grid grid-cols-6 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer ${
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
            <span>{enrollment.createdAt}</span>
            <div className="flex items-center justify-center gap-2">
              {/* <motion.a
                // key={item.id}
                // href={item.file}
                download
                className="download-item w-20 flex items-center justify-center p-2 text-gray-300 hover:text-gray-700 bg-violet-700 border border-violet-500 rounded-lg shadow-md hover:bg-violet-700/40 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
              </motion.a> */}
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

export default ExamFee;
