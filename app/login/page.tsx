"use client";
import { Button } from "@/components/ui/button";
import { fetcher, fetcherWc } from "@/helper";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa6";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import OtpModal from "@/components/otp_enter";

export default function LoginPage() {
  const { utype, user, login } = useAuthStore();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [fd, setfd] = useState({
    email: "",
    password: "",
  });
  const [email, setemail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setloading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/admin");
      return;
    }
  }, [user, router]); // Runs only when `user` changes

  const Role = utype === "center" ? "Branch Admin" : "Control Admin";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);
    try {
      const data = await fetcherWc("/loginRoute", "POST", {
        email: fd.email,
        password: fd.password,
      });

      setLoader(false);

      if (data.message === "Login successful") {
        if (data.user.role.toLowerCase() !== utype) {
          toast(`u r not authorised`);
          return;
        }
        login(data.user);
        toast("Login Successfully");
        router.push("/admin");
      } else if (data.message === "enabled") {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast("some error happened");
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setfd({ ...fd, [e.target.name]: e.target.value });
  }

  const handleForgotPassword = async () => {
    setloading(true);
    const { success, message } = await fetcher("/SendResetLink", "POST", {
      email,
    });
    setloading(false);
    setIsOpen(false);
    if (!success) {
      toast.error("some error happend");
      return;
    }
    toast.success(message);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md px-8 py-12 bg-white shadow-lg md:rounded-lg">
        <Button
          className="absolute top-8 left-8 text-md font-bold bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/chooseuser")}
        >
          <FaArrowLeft />
        </Button>
        <h1 className="text-3xl font-bold text-purple-900 mb-4 capitalize">
          {Role} Login
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome back! Please enter your details.
        </p>
        <form onSubmit={handleSubmit} className="w-full space-y-6" noValidate>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className="absolute left-4 p-1 bg-white top-[-4] text-sm  transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 text-gray-700"
            >
              Email
            </label>
          </div>
          <div className="relative">
            <input
              type={toggle ? "text" : "password"}
              id="password"
              name="password"
              className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className="absolute left-4 p-1 bg-white top-[-4] text-sm  transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-purple-700"
              aria-label="Toggle password visibility"
            >
              {toggle ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="mr-2 rounded text-purple-600 focus:ring-purple-500"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm text-purple-600 hover:underline"
              onClick={() => setIsOpen(true)}
            >
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            className={`w-full py-3 text-white font-bold rounded-lg 
               "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
             transition`}
            disabled={loader}
          >
            Login
            {loading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Enter Your Correct Email ID"
      >
        <Input
          type="email"
          id="email"
          placeholder="Enter Your Email ID"
          className="mt-6"
          onChange={(e) => setemail(e.target.value)}
        />
        <Button
          className="mt-4 bg-purple-600 hover:bg-purple-700"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          Reset Password
          {loading && <Loader2 className="animate-spin" />}
        </Button>
      </Modal>

      {/* Right Side: Background Image */}
      <div className="hidden md:flex flex-grow bg-cover bg-center bg-[url('/designlogin.jpg')]"></div>
      <OtpModal open={open} setOpen={setOpen} email={fd.email} />
    </div>
  );
}
