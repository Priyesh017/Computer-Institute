"use client";
import { useAuthStore } from "@/store";
import { AccountCircle, School } from "@mui/icons-material";

import { useRouter } from "next/navigation";
import {} from "next/router";

const ChooseUser = () => {
  const { setUtype } = useAuthStore();
  const router = useRouter();

  const onclickHandler = (e: "admin" | "center") => {
    setUtype(e);
    router.push("/login");
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 h-screen p-8 flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        {/* Central Admin Login */}
        <button
          onClick={() => onclickHandler("admin")}
          className="p-5 text-center bg-gray-800 text-gray-400 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition w-80"
        >
          <div>
            <div className="mb-4 flex justify-center">
              <AccountCircle className="text-5xl" />
            </div>
            <h2 className="text-lg mb-2 font-bold">Central Admin Login</h2>
            <p className="text-sm">Login as a Central Admin to manage data.</p>
          </div>
        </button>

        {/* Branch Login */}
        <div className="p-5 text-center bg-gray-800 text-gray-400 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition w-80">
          <button onClick={() => onclickHandler("center")}>
            <div>
              <div className="mb-4 flex justify-center">
                <School className="text-5xl" />
              </div>
              <h2 className="text-lg mb-2 font-bold">Branch Login</h2>
              <p className="text-sm">Login as a Branch to manage admissions.</p>
            </div>
          </button>
        </div>

        {/* Student Login */}
        <div className="p-5 text-center bg-gray-800 text-gray-400 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition w-80">
          <button onClick={() => router.push("/checkupdates")}>
            <div>
              <div className="mb-4 flex justify-center">
                <School className="text-5xl" />
              </div>
              <h2 className="text-lg mb-2 font-bold">Student Login</h2>
              <p className="text-sm">Login as a Student to view student details.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseUser;
