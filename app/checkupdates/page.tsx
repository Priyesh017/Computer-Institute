"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store";

export default function StudentLogin() {
  const router = useRouter();
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push("/student/dashboard");
      return;
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!enrollmentNo || !password) {
      setError("Please enter both Enrollment No. and Password.");
      return;
    }

    const data = await fetcherWc("/studentLogin", "POST", {
      enrollmentNo: enrollmentNo,
      password,
    });

    if (data.success) {
      toast("login successful");
      login(data.data);

      router.push("/student/dashboard");
    } else {
      setError("Invalid Enrollment No. or Password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">
          Student Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white">Enrollment No.</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter Enrollment No."
              value={enrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-violet-600 rounded-md hover:bg-violet-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="w-full px-4 py-2 mt-4 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
