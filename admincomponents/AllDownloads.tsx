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
import { X } from "lucide-react";
import AllDownloads from "@/components/studentdashboard/Downloads";
import { toast } from "react-toastify";

export interface EnrollmentType {
  Enrollmentno: string;
  IdCardNo: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  name: string;
  dob: string;
  createdAt: string;
}

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [exmforms, setexmforms] = useState<EnrollmentType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedexmform, setselectedexmform] = useState<EnrollmentType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const fetchfn = async () => {
    try {
      const { enrollments } = await fetcherWc("/AllEnrollments", "GET");

      setexmforms(enrollments);
    } catch (error) {
      toast("some error happened");
    }
  };

  useEffect(() => {
    fetchfn();
  }, []);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = exmforms.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">All Enrollments</h2>
      <div className="grid grid-cols-3 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
      </div>
      <div>
        {currentEnrollments.map((enrollment, index: number) => (
          <div
            key={index}
            className={`click grid grid-cols-3 items-center text-xs md:text-lg text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer ${
              isNew ? "bg-rose-100" : "bg-gray-200"
            } hover:bg-blue-100`}
          >
            <div
              className="hover:text-violet-800"
              onClick={() => {
                setselectedexmform(enrollment);
                setIsModalOpen(true);
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
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-auto">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} className="hover:text-red-600" />
            </button>
            <AllDownloads enrollment={selectedexmform} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
