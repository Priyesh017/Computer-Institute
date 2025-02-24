"use client";
import { fetcherWc } from "@/helper";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store";
import { redirect } from "next/navigation";

function LoginPage() {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useAuthStore();

  const [fd, setfd] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  if (user) return redirect("/admin/dashboard");

  const userSchema = z.object({
    name: z.string().min(2, { message: "Name too short!" }),
    email: z.string().email({ message: "Invalid email!" }),
    password: z
      .string()
      .min(6, { message: "Password too weak!" })
      .regex(/[A-Z]/, { message: "Must contain an uppercase letter!" })
      .regex(/[0-9]/, { message: "Must contain a number!" }),
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = userSchema.safeParse(fd);

    if (!result.success) {
      const formattedErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: formattedErrors.name?.[0] || "",
        email: formattedErrors.email?.[0] || "",
        password: formattedErrors.password?.[0] || "",
      });
    } else {
      setLoader(true);

      const data = await fetcherWc("/signupRoute", "POST", {
        email: fd.email,
        name: fd.name,
        password: fd.password,
      });

      setLoader(false);

      if (data.message === "User registered successfully") {
        toast("Signup Successfully plz login now");
      } else toast(data.error);
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
          Register
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.name != "" ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleInputChange}
            />
            <label
              htmlFor="name"
              className={`absolute left-4 p-1 bg-white top-[-4] text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                errors.name != "" ? "text-red-500" : "text-gray-700"
              }`}
            >
              Name
            </label>
            {errors.name != "" && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email != "" ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              htmlFor="email"
              className={`absolute left-4 p-1 top-[-4] bg-white  text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                errors.email != "" ? "text-red-500" : "text-gray-700"
              }`}
            >
              Email
            </label>
            {errors.email != "" && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={toggle ? "text" : "password"}
              id="password"
              name="password"
              className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.password != "" ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className={`absolute left-4 p-1 bg-white top-[-4] text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                errors.password != "" ? "text-red-500" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-purple-700"
            >
              {toggle ? "👁️" : "👁️‍🗨️"}
            </button>
            {errors.password != "" && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
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
            {loader ? "Loading..." : "Register"}
          </button>
        </form>
      </div>

      {/* Right Side: Background Image */}
      <div className="hidden md:flex flex-grow bg-cover bg-center bg-[url('/designlogin.jpg')]"></div>
    </div>
  );
}

export default function Fn() {
  return (
    <Suspense fallback="loading..">
      <LoginPage />
    </Suspense>
  );
}
