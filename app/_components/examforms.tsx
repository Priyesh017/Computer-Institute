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
import { X } from "lucide-react";
import { toast } from "react-toastify";

type DataItem = {
  id: number;
  EnrollmentNo: string;
  verified: boolean;
  createdAt: string;
  enrollment: {
    name: string;
    mobileNo: string;
    wpNo: string;
    Enrollmentno: string;
    address: string;
    center: {
      Centername: string;
    };
    IdCardNo: string;
    amount: {
      lastPaymentRecieptno: string;
    };
    course: {
      CName: string;
    };
  };
};

type ApiResponse = {
  data: DataItem[];
};

const PAGE_SIZE = 5;

const ExamForm = () => {
  const [exmforms, setexmforms] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedexmform, setselectedexmform] = useState<DataItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const fetchfn = async () => {
    const data = await fetcherWc("/exmformsfetch", "GET");

    setexmforms(data.data);
  };

  console.log(exmforms);
  useEffect(() => {
    fetchfn();
  }, []);

  const toggleActivation = async ({ verified, id }: DataItem) => {
    toast("plz wait");
    if (verified) {
      const data = await fetcherWc("/exmformDisApprove", "POST", { id });
      console.log(data);
      if (data.ok) {
        setexmforms((prev) =>
          prev.map((p) => (p.id === id ? { ...p, verified: false } : p))
        );
      }
      toast(data.ok ? "success" : "failed");
      return;
    }

    const data = await fetcherWc("/exmformApprove", "POST", { id });
    console.log(data);
    if (data.ok) {
      setexmforms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, verified: true } : p))
      );
    }
    toast(data.ok ? "success" : "failed");
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentEnrollments = exmforms.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">Exam Forms</h2>
      <div className="grid grid-cols-4 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Date</span>
        <span>Approval</span>
      </div>
      <div>
        {currentEnrollments.map((enrollment, index: number) => (
          <div
            key={index}
            className={`click grid grid-cols-4 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer ${
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
              {enrollment.enrollment.name}
            </div>
            <div>{enrollment.EnrollmentNo}</div>
            <span>{new Date(enrollment.createdAt).toDateString()}</span>
            <div className="flex items-center justify-center gap-2">
              <Switch
                id={`activation-${startIndex + index}`}
                checked={enrollment.verified}
                onCheckedChange={() => toggleActivation(enrollment)}
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
            <EnrollmentDetails enrollment={selectedexmform} />
          </div>
        </div>
      )}
    </div>
  );
};

const EnrollmentDetails = ({ enrollment }: { enrollment: DataItem }) => {
  const data = {
    id: enrollment.id,
    EnrollmentNo: enrollment.EnrollmentNo,
    verified: enrollment.verified,
    createdAt: enrollment.createdAt,
    name: enrollment.enrollment.name,
    mobileNo: enrollment.enrollment.name,
    wpNo: enrollment.enrollment.name,
    Enrollmentno: enrollment.enrollment.name,
    address: enrollment.enrollment.name,

    Centername: enrollment.enrollment.center.Centername,

    IdCardNo: enrollment.enrollment.IdCardNo,
    "Last Payment Reciept No":
      enrollment.enrollment.amount.lastPaymentRecieptno,

    CName: enrollment.enrollment.course.CName,
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="p-3 border-b border-gray-300">
            <span className="font-semibold capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span className="block text-gray-900">
              {key === "createdAt"
                ? new Date(value as string).toDateString()
                : value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamForm;
