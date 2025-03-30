"use client";
import { StudentProfileProps } from "@/lib/typs";
import { useAuthStore } from "@/store";

export default function AdminDashboardHome() {
  const student = useAuthStore().user as unknown as StudentProfileProps;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Welcome {student.name} </h1>
      <p className="text-lg text-gray-600 mt-2">
        Select an option from the sidebar to view your details
      </p>
    </div>
  );
}
