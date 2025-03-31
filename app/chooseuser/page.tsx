"use client";
import SvgComp from "@/components/svgComp";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const ChooseUser = () => {
  const { setUtype } = useAuthStore();
  const router = useRouter();

  const onclickHandler = (e: "admin" | "center") => {
    setUtype(e);
    router.push("/login");
  };

  return (
    <div className="bg-gradient-to-b from-purple-900 to-blue-900 h-screen p-8 flex items-center justify-center">
      <Button
        className="absolute top-8 left-8 text-md font-bold bg-purple-600 hover:bg-purple-700"
        onClick={() => router.replace("/")}
      >
        <FaArrowLeft />
      </Button>
      <div className="flex flex-col gap-8 items-center">
        {/* Central Admin Login */}
        <button onClick={() => onclickHandler("admin")} className="btn-custom">
          <div className="mb-4 flex justify-center">
            <SvgComp />{" "}
          </div>
          <h2 className="text-lg mb-2 font-bold">Central Admin Login</h2>
          <p className="text-sm">Login as a Central Admin to manage data.</p>
        </button>

        {/* Branch Login */}
        <div className="btn-custom">
          <button onClick={() => onclickHandler("center")}>
            <div className="mb-4 flex justify-center">
              <SvgComp />{" "}
            </div>
            <h2 className="text-lg mb-2 font-bold">Branch Login</h2>
            <p className="text-sm">Login as a Branch to manage admissions.</p>
          </button>
        </div>

        {/* Student Login */}
        <div className="btn-custom">
          <Link href={"/studentlogin"}>
            <div className="mb-4 flex justify-center">
              <SvgComp />
            </div>
            <h2 className="text-lg mb-2 font-bold">Student Login</h2>
            <p className="text-sm">
              Login as a Student to view student details.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseUser;
