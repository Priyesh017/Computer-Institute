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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  status: string;
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
  const [temploading, settemploading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
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

  const toggleActivation = async (enrollment: Enrollment) => {
    toast("Please wait...");
    const endpoint = enrollment.activated
      ? "/deActivateEnrollment"
      : "/ActivateEnrollment";
    try {
      const data = await fetcherWc(endpoint, "POST", { id: enrollment.id });

      if (data.success) {
        setEnrollments((prev) =>
          prev.map((p) =>
            p.id === enrollment.id ? { ...p, activated: !p.activated } : p
          )
        );
        toast("Success");
      } else {
        toast("Failed");
      }
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  };

  const generateHandler = async (Enrollmentno: string) => {
    try {
      toast("Generating ID...");
      settemploading(true);
      const data = await fetcherWc("/generateId", "POST", { Enrollmentno });
      settemploading(false);
      toast(
        data.success ? "ID generated successfully" : "ID generation failed"
      );
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  };

  const filteredEnrollment = enrollments.filter((enrollment) => {
    const matchesSearch = enrollment.Enrollmentno.toString()
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      enrollment.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Enrollment Verify</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-40 border rounded-md p-1">
            {filterStatus}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["All", "Pending", "Pass Out", "Drop Out"].map((option) => (
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
        <span>Enrollment No.</span>
        <span>Date</span>
        <span>Status</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>

      {filteredEnrollment.map((enrollment) => (
        <div
          key={enrollment.id}
          className="click grid md:grid-cols-6 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer bg-gray-200 hover:bg-blue-100"
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
          <div>{enrollment.Enrollmentno}</div>
          <span>{new Date(enrollment.createdAt).toDateString()}</span>
          <div className="w-full h-full p-2 mx-auto text-red-600 bg-white border border-gray-900 rounded-md">
            {enrollment.status}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Switch
              id={`activation-${enrollment.id}`}
              checked={enrollment.activated}
              onCheckedChange={() => toggleActivation(enrollment)}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
          </div>
          <Button
            className={`mx-4 ${
              enrollment.activated
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => generateHandler(enrollment.Enrollmentno)}
            disabled={!enrollment.activated || temploading}
          >
            Generate ID
          </Button>
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
