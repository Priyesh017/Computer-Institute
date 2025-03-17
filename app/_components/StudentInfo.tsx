"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { fetcherWc } from "@/helper";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Enrollment {
  admitLink: string;
  certificateLink: string;
  dob: string; // or Date if you want to parse it
  idCardLink: string;
  marksheetLink: string;
  imageLink: string;
  name: string;
  createdAt: string; // or Date
  Enrollmentno: string;
  id: number;
  activated: boolean;
}

const PAGE_SIZE = 5;

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [totalEnrollments, setTotalEnrollments] = useState(0); // Track total count

  const fetchEnrollments = useCallback(async () => {
    try {
      const { enrollments, total } = await fetcherWc(
        `/AllEnrollments?page=${currentPage}&limit=${PAGE_SIZE}`,
        "GET"
      );
      setEnrollments(enrollments);
      setTotalEnrollments(total);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchEnrollments();
  }, [currentPage, fetchEnrollments]);

  const filteredEnrollment = enrollments.filter((enrollment) =>
    enrollment.Enrollmentno?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Student Info</h2>
        <Input
          type="text"
          placeholder="Search enrollment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-3 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Pending</span>
        <span>Pass Out</span>
        <span>Drop Out</span>
      </div>

      {filteredEnrollment.map((enrollment) => (
        <div
          key={enrollment.id}
          className="click grid md:grid-cols-3 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer bg-gray-200 hover:bg-blue-100"
        >
          <div
            className="hover:text-violet-800"
            onClick={() => {
              setSelectedEnrollment(enrollment);
              setIsModalOpen(true);
            }}
          >
            {enrollment.name}
          </div>
          <div
            className="border-gray-500 border-x hover:text-violet-800"
            onClick={() => {
              setSelectedEnrollment(enrollment);
              setIsModalOpen(true);
            }}
          >
            {enrollment.name}
          </div>
          <div
            className="hover:text-violet-800"
            onClick={() => {
              setSelectedEnrollment(enrollment);
              setIsModalOpen(true);
            }}
          >
            {enrollment.name}
          </div>
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
                  currentPage * PAGE_SIZE < totalEnrollments ? prev + 1 : prev
                )
              }
              isActive={currentPage * PAGE_SIZE < totalEnrollments}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-auto">
            <button
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <EnrollmentDetails enrollment={selectedEnrollment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentList;

const EnrollmentDetails = ({ enrollment }: { enrollment: Enrollment }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(enrollment).map(([key, value]) => (
          <div key={key} className="p-3 border-b border-gray-300">
            <span className="font-semibold capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span className="block text-gray-900">
              {key === "createdAt" || key === "dob"
                ? new Date(value).toDateString()
                : value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
