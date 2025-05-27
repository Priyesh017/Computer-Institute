"use client";
import { Enrollmenttype } from "@/lib/typs";
import AllDownloads from "@/components/studentdashboard/Downloads";
import { useQueryClient } from "@tanstack/react-query";

const Page = () => {
  const queryClient = useQueryClient();
  const enrollment = queryClient.getQueryData([
    "StudentData",
  ]) as Enrollmenttype;

  return <AllDownloads enrollment={enrollment} />;
};

export default Page;
