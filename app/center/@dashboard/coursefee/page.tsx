"use client";

import { useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { Enrollment } from "@/lib/typs";
import { Button } from "@/components/ui/button";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
} from "@tanstack/react-query";
import { fetcherWc } from "@/helper";
import { Loader2 } from "lucide-react";
import Loader from "@/components/Loader";

const ExamFee = () => {
  const [feesPaid, setFeesPaid] = useState<{ [key: number]: number }>({});
  const queryClient = useQueryClient();
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setloading] = useState<number | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<{ enrollments: Enrollment[]; nextCursor: number }>({
    queryKey: ["examfee"],
    queryFn: ({ pageParam }) =>
      fetcherWc(`/amountFetch?cursor=${pageParam ?? ""}&limit=5`, "GET"),
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

  const mutation = useMutation({
    mutationFn: async ({
      EnrollmentNo,
      id,
      remainingAmount,
    }: {
      EnrollmentNo: number;
      id: number;
      remainingAmount: number;
    }) => {
      setloading(EnrollmentNo);

      const amountPaid = feesPaid[id] || 0;
      if (amountPaid < 0 || amountPaid > remainingAmount) {
        throw new Error("Invalid amount entered.");
      }
      return fetcherWc("/amountEdit", "POST", {
        EnrollmentNo: EnrollmentNo,
        tp: amountPaid,
        ar: remainingAmount - amountPaid,
      });
    },
    onSuccess: (_, { id, remainingAmount }) => {
      const amountPaid = feesPaid[id];

      queryClient.setQueryData(
        ["examfee"],
        (
          olddata: InfiniteData<{
            enrollments: Enrollment[];
            nextCursor: number;
          }>
        ) => {
          if (!olddata) return;

          return {
            ...olddata,
            pages: olddata.pages.map((page) => ({
              ...page,
              enrollments: page.enrollments.map((item) =>
                item.EnrollmentNo === id
                  ? {
                      ...item,
                      amount: { amountRemain: remainingAmount - amountPaid },
                    }
                  : item
              ),
            })),
          };
        }
      );

      toast.success("Payment updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update payment.");
    },
    onSettled: () => {
      setloading(null);
    },
  });

  if (isLoading || !data) return <Loader />;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="min-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl text-center font-bold mb-6">All Course Fees</h2>

      <div className="grid grid-cols-7 text-xs md:text-lg text-center gap-2 font-bold py-2 border-b border-gray-500">
        <span>Name</span>
        <span>Enrollment No</span>
        <span>Course Name</span>
        <span>Total Fee</span>
        <span>Fees Paid</span>
        <span>Fees Due</span>
        <span>Action</span>
      </div>

      {data?.pages.map((page) =>
        page.enrollments.map((enrollment) => {
          const remainingAmount =
            enrollment.amount?.amountRemain ?? enrollment.course.price;

          return (
            <div
              key={enrollment.EnrollmentNo}
              className="grid md:grid-cols-7 items-center text-gray-600 text-center gap-2 font-bold py-3 border-b border-l border-r border-gray-500 cursor-pointer hover:bg-blue-100"
            >
              <div className="hover:text-violet-800">{enrollment.name}</div>
              <div>{enrollment.EnrollmentNo}</div>
              <div>
                {enrollment.course.CName} <br />
                {` (${enrollment.course.Duration} months)`}
              </div>
              <span>{enrollment.course.price}</span>
              <input
                type="number"
                value={feesPaid[enrollment.EnrollmentNo] || ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setFeesPaid((prev) => ({
                    ...prev,
                    [enrollment.EnrollmentNo]: value,
                  }));
                }}
                className="p-2 rounded-md text-center bg-gray-100 text-gray-900 border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                min={0}
                max={remainingAmount}
              />
              <span>{remainingAmount}</span>
              <Button
                className="mx-4 bg-green-600 hover:bg-green-500"
                onClick={() =>
                  mutation.mutate({
                    EnrollmentNo: enrollment.EnrollmentNo,
                    id: enrollment.EnrollmentNo,
                    remainingAmount,
                  })
                }
                disabled={
                  mutation.isPending && loading === enrollment.EnrollmentNo
                }
              >
                Save
                {mutation.isPending && loading === enrollment.EnrollmentNo && (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </div>
          );
        })
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

export default ExamFee;
