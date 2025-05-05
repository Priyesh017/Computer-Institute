"use client";

import Loader from "@/components/Loader";
import { fetcher } from "@/helper";
import { Course, useAuthStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { ReactNode, useEffect } from "react";

const Datafetch = ({ children }: { children: ReactNode }) => {
  const { setframeworksCourse } = useAuthStore();

  const {
    data: courses,

    isLoading,
  } = useQuery<Course[]>({
    queryKey: ["AllCourses"],
    queryFn: () => fetcher("/fetchAllCourse", "GET"),
    staleTime: 1000 * 60 * 10 * 6,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (courses) {
      const data = courses.map((c) => ({
        label: c.CName,
        value: c.CName,
        courseId: c.id.toString(),
      }));
      setframeworksCourse(data);
    }
  }, [courses, setframeworksCourse]);

  if (isLoading) return <Loader />;
  return <>{children}</>;
};

export default Datafetch;
