"use client";
import { AccountCircle, School } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

const ChooseUser = () => {
  const [loader, setLoader] = useState(false);
  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 h-screen p-8 flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        {/* Central Admin Login */}
        <div className="p-5 text-center bg-gray-800 text-gray-400 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition w-80">
          <Link href={"/login?role=cadmin"}>
            <div>
              <div className="mb-4 flex justify-center">
                <AccountCircle className="text-5xl" />
              </div>
              <h2 className="text-lg mb-2 font-bold">Central Admin Login</h2>
              <p className="text-sm">
                Login as a Central Admin to manage data.
              </p>
            </div>
          </Link>
        </div>

        {/* Branch Login */}
        <div className="p-5 text-center bg-gray-800 text-gray-400 cursor-pointer rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition w-80">
          <Link href={"/login?role=badmin"}>
            <div>
              <div className="mb-4 flex justify-center">
                <School className="text-5xl" />
              </div>
              <h2 className="text-lg mb-2 font-bold">Branch Login</h2>
              <p className="text-sm">Login as a Branch to manage admissions.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseUser;
