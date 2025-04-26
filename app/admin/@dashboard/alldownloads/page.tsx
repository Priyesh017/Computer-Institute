"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetcherWc } from "@/helper";
import { X } from "lucide-react";
import { EnrollmentDetails } from "@/components/enrollmentdatashow";
import AllDownloads from "@/components/studentdashboard/Downloads";
import { Enrollmenttype } from "@/lib/typs";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollmenttype | null>(null);
  const [selectedexmform, setselectedexmform] = useState<Enrollmenttype | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const fetchfn = async () => {
    const { enrollments } = await fetcherWc("/AllEnrollments", "GET");
    return enrollments as Enrollmenttype[];
  };

  const {
    data: exmforms,
    isLoading,
    isError,
  } = useQuery<Enrollmenttype[]>({
    queryKey: ["enrollments", "alldownloads", currentPage],
    queryFn: async () => {
      // Use fetchfn to fetch the main data
      const enrollments = await fetchfn();

      // Use fetcherWc for additional fetch logic (e.g., pagination)
      const paginatedData = await fetcherWc(
        `/AllEnrollments?page=${currentPage}&limit=${PAGE_SIZE}`,
        "GET"
      );

      // Ensure a valid return value
      if (Array.isArray(paginatedData) && paginatedData.length > 0) {
        return paginatedData;
      } else if (Array.isArray(enrollments) && enrollments.length > 0) {
        return enrollments;
      } else {
        return []; // Return an empty array if both are undefined or empty
      }
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <Loader />;
  if (!Array.isArray(exmforms) || isError)
    return <h1>Error occurred while fetching data</h1>;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = exmforms.slice(startIndex, startIndex + PAGE_SIZE);

  const filteredEnrollment = currentEnrollments.filter((enrollment) => {
    return (
      enrollment.EnrollmentNo.toString()
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (filterStatus === "All" ||
        enrollment.status.val.toLowerCase() === filterStatus.toLowerCase())
    );
  });

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl text-center font-bold mb-6">All Enrollments</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-40 border rounded-md p-1">
            {filterStatus}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", "Pending", "Pass Out"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setFilterStatus(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="text"
          placeholder="Search enrollment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-6 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Admission Date</span>
        <span>Course Name</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      <div>
        {filteredEnrollment.map((enrollment, index: number) => (
          <div
            key={index}
            className={
              "click grid grid-cols-6 items-center xs:text-xs text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer hover:bg-blue-100"
            }
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
            <div>{enrollment.EnrollmentNo}</div>
            <span>{new Date(enrollment.createdAt).toDateString()}</span>
            <span>{enrollment.course.CName} </span>
            <div className="p-2 border rounded-md">{enrollment.status.val}</div>
            <Button
              className="mx-2 hover:bg-violet-800"
              onClick={() => {
                setselectedexmform(enrollment);
                setDownloadModalOpen(true);
              }}
            >
              Download
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
                  startIndex + PAGE_SIZE < exmforms.length ? prev + 1 : prev
                )
              }
              isActive={startIndex + PAGE_SIZE < exmforms.length}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Enrollment Modal */}
      {isModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="relative bg-white rounded-xl w-full max-w-fit h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="w-full p-6">
                <ProgressBar value={selectedEnrollment.status.id} />
              </div>
              <button
                className="relative mx-4 p-2 hover:text-red-600 hover:bg-gray-300 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            <EnrollmentDetails enrollment={selectedEnrollment} />
          </div>
        </div>
      )}

      {/* Download Modal */}
      {downloadModalOpen && selectedexmform && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-full overflow-auto">
            <button
              className="absolute top-4 right-4 p-2 hover:text-red-600 bg-gray-200 rounded-full hover:bg-gray-300"
              onClick={() => setDownloadModalOpen(false)}
            >
              <X size={24} />
            </button>
            <AllDownloads enrollment={selectedexmform} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
