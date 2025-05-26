"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";

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
import { EnrollmentDetails } from "@/components/enrollmentdatashow";
import { Enrollmenttype } from "@/lib/typs";
import Loader from "@/components/Loader";
import { Loader2, UserPen, X } from "lucide-react";
import { motion } from "framer-motion";

export interface etype {
  enrollments: Enrollmenttype[];
  nextCursor: number;
}

const EnrollmentList = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<Enrollmenttype | null>(null);
  const queryClient = useQueryClient();
  const [loading, setloading] = useState<number | null>(null);
  const [loading2, setloading2] = useState<"update" | "delete" | null>(null);
  const [editable, seteditable] = useState(false);

  const [formData, setFormData] = useState<Enrollmenttype | null>(null);

  const loaderRef = useRef<HTMLDivElement>(null);

  const iv = [["enrollments"], ["exmforms"], ["marksheets"]];
  useEffect(() => {
    if (selectedEnrollment) setFormData(selectedEnrollment);
  }, [selectedEnrollment]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<etype>({
    queryKey: ["enrollments"],
    queryFn: ({ pageParam }) =>
      fetcherWc(`/AllEnrollments?cursor=${pageParam ?? ""}&limit=5`, "GET"),
    getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    initialPageParam: null,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const toggleActivation = useMutation({
    mutationFn: async (enrollment: Enrollmenttype) => {
      const endpoint = enrollment.activated
        ? "/deActivateEnrollment"
        : "/ActivateEnrollment";
      return fetcherWc(endpoint, "POST", {
        EnrollmentNo: enrollment.EnrollmentNo,
      });
    },
    onSuccess: (_, enrollment) => {
      queryClient.setQueryData(
        ["enrollments"],
        (oldData: InfiniteData<etype>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              enrollments: page.enrollments.map((item) =>
                item.EnrollmentNo === enrollment.EnrollmentNo
                  ? { ...item, activated: !item.activated }
                  : item
              ),
            })),
          };
        }
      );
      toast("Success");
    },
    onError: () => toast("Some error happened"),
  });

  const generateHandler = useMutation({
    mutationFn: async (EnrollmentNo: number) => {
      setloading(EnrollmentNo);
      const data = await fetcherWc("/generateId", "POST", { EnrollmentNo });
      return data;
    },

    onSuccess: (data) => {
      toast(
        data.success ? "ID generated successfully" : "ID generation failed"
      );
      setloading(null);
    },

    onError: () => {
      setloading(null);
      toast("Some error happened");
    },
  });

  const updatehandler = useMutation({
    mutationFn: () => {
      setloading2("update");
      if (formData) {
        return fetcherWc("/updateEnrollment", "PUT", {
          EnrollmentNo: formData.EnrollmentNo,
          name: formData.name,
          address: formData.address,
          father: formData.father,
          dob: formData.dob,
        });
      }
      throw new Error("No enrollment selected");
    },

    onSuccess: () => {
      iv.forEach((data) => {
        queryClient.invalidateQueries({
          queryKey: data,
        });
        queryClient.refetchQueries({ queryKey: data });
      });

      toast("Success");
    },
    onError: () => toast("Some error happened"),
    onSettled: () => setloading2(null),
  });
  const deletehandler = useMutation({
    mutationFn: () =>
      fetcherWc("/Delete_Enrollment", "DELETE", {
        EnrollmentNo: selectedEnrollment!.EnrollmentNo,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      toast("Success");
    },
    onError: () => toast("Some error happened"),
    onSettled: () => setloading2(null),
  });

  const handleDelete = useCallback(() => {
    if (!selectedEnrollment) {
      toast("No enrollment selected");
      return;
    }
    setloading2("delete");
    deletehandler.mutate();
  }, [deletehandler, selectedEnrollment]);

  if (isLoading || !data) return <Loader />;
  if (isError) return <p>Error loading data</p>;

  const filteredEnrollment = data.pages.flatMap((page) =>
    page.enrollments.filter(
      (enrollment) =>
        enrollment.centerid
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (filterStatus === "All" ||
          enrollment.status.val.toLowerCase() === filterStatus.toLowerCase())
    )
  );

  return (
    <div className="min-w-lg mx-auto mt-10 p-4">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-xl font-bold">Enrollment Verify</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-40 border rounded-md p-1">
            {filterStatus}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {[
              "All",
              "Pending",
              "Enrollment Done",
              "Enrollment Verified",
              "Exam Form Verified",
              "Marksheet Verified",
              "PassOut",
            ].map((option) => (
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
          placeholder="Filter enrollment by branch id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-8 text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No.</span>
        <span>Admission Date</span>
        <span>Course Name</span>
        <span>Branch ID</span>
        <span>Status</span>
        <span>Approval</span>
        <span>Generate</span>
      </div>

      {filteredEnrollment.map((enrollment) => {
        const remc = 6 - Math.abs(enrollment.centerid).toString().length;
        const paddedNumberc = enrollment.centerid
          .toString()
          .padStart(remc, "0");

        return (
          <div
            key={enrollment.EnrollmentNo}
            className="grid md:grid-cols-8 items-center text-center py-3 border-b"
          >
            <div
              onClick={() => {
                setSelectedEnrollment(enrollment);
              }}
              className="hover:text-red-600 cursor-pointer"
            >
              {enrollment.name}
            </div>
            <div>{enrollment.EnrollmentNo}</div>
            <span>
              {new Date(enrollment.createdAt).toLocaleDateString("en-GB")}
            </span>
            <span>
              {enrollment.course.CName}
              <br />
              {`(${enrollment.course.Duration} months)`}
            </span>
            <span>{`YCTC${paddedNumberc}`}</span>
            <div className="p-2 border rounded-md">{enrollment.status.val}</div>
            <div className="flex items-center justify-center gap-2">
              <Switch
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={enrollment.activated}
                onCheckedChange={() => toggleActivation.mutate(enrollment)}
              />
            </div>
            <Button
              className={`mx-4 ${
                enrollment.activated
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => generateHandler.mutate(enrollment.EnrollmentNo)}
              disabled={!enrollment.activated}
            >
              Generate ID
              {generateHandler.isPending &&
                loading === enrollment.EnrollmentNo && (
                  <Loader2 className="animate-spin" />
                )}
            </Button>
          </div>
        );
      })}

      {selectedEnrollment && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="relative bg-white rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="absolute top-5 right-4 flex items-center gap-1">
              <button
                className="p-2 hover:text-red-600 hover:bg-gray-300 rounded-full"
                onClick={() => {
                  setSelectedEnrollment(null);
                  seteditable(false);
                }}
              >
                <X size={24} />
              </button>
              <UserPen
                className="cursor-pointer p-2 hover:bg-gray-300 hover:text-red-600 rounded-full"
                size={40}
                onClick={() => seteditable(!editable)}
              />
            </div>
            <EnrollmentDetails
              enrollment={selectedEnrollment}
              deletehandler={handleDelete}
              loading={loading2}
              editable={editable}
              updatehandler={updatehandler.mutate}
              setFormData={setFormData}
              formData={formData}
            />
          </motion.div>
        </motion.div>
      )}

      <div
        ref={loaderRef}
        className="text-center text-sm p-4 text-gray-500 w-full flex justify-center"
      >
        {isFetchingNextPage && <Loader2 className="animate-spin" />}
        {!hasNextPage && "Nothing to show"}
      </div>
    </div>
  );
};

export default EnrollmentList;
