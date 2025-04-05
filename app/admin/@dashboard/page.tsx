"use client";
import Display from "@/components/display";
import { useAuthStore } from "@/store";

export default function AdminDashboardHome() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      {user && user.role === "CENTER" && <Display />}

      <p className="text-lg text-gray-600 mt-2">
        Select an option from the sidebar to manage the system.
      </p>
    </div>
  );
}
