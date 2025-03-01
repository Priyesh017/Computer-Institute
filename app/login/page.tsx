"use client";
import { Button } from "@/components/ui/button";
import { fetcherWc } from "@/helper";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const { utype, user, login } = useAuthStore();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [fd, setfd] = useState({
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
      return;
    }
  }, [user, router]); // Runs only when `user` changes

  const Role = utype === "center" ? "Branch Admin" : "Control Admin";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoader(true);

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
      router.push("/admin/dashboard");
    } else {
      toast(data.error);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setfd({ ...fd, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Side: Login Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md px-8 py-12 bg-white shadow-lg md:rounded-lg">
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
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white font-bold rounded-lg ${
              loader
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300"
            } transition`}
            disabled={loader}
          >
            {loader ? "Loading..." : "Login"}
          </button>

          {utype === "center" && (
            <div className="flex justify-center text-sm mt-4">
              <span>Don&apos;t have an account?</span>
              <a
                href="/signup"
                className="ml-2 text-purple-600 hover:underline"
              >
                Sign up
              </a>
            </div>
          )}
        </form>
        <Button
          className="mt-5 text-md font-bold bg-purple-600 hover:bg-purple-700"
          onClick={() => router.push("/chooseuser")}
        >
          Back
        </Button>
      </div>

      {/* Right Side: Background Image */}
      <div className="hidden md:flex flex-grow bg-cover bg-center bg-[url('/designlogin.jpg')]"></div>
    </div>
  );
}
