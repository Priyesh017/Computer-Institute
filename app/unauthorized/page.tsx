"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
      <div className="flex flex-col items-center gap-4 p-8 bg-white shadow-xl rounded-2xl max-w-md w-full">
        <ShieldAlert className="text-red-500 h-16 w-16" />
        <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
        <p className="text-gray-600 text-sm">
          You do not have permission to view this page. Please login with an
          authorized account or go back.
        </p>
        <div className="flex gap-4 mt-4">
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </div>
    </div>
  );
}
