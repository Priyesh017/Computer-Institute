"use client";
import { useAuthStore } from "@/store";

export default function AdminDashboardHome() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Welcome {user?.name} </h1>
      <p className="text-lg text-gray-600 mt-2">
        Select an option from the sidebar to view your details
      </p>
    </div>
  );
}
