"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";

function LoginPage() {
  const [toggle, setToggle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [studentNameError, setStudentNameError] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const role = useSearchParams().get("role");
  const Role = role === "badmin" ? "Branch Admin" : "Control Admin";
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Add form validation logic here
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    // Handle input change validation logic here
  }

  function guestModeHandler(): void {
    setGuestLoader(true);
    // Simulate guest login
    setTimeout(() => {
      setGuestLoader(false);
      setShowPopup(true);
    }, 2000);
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
          {role === "cadmin" ? (
            <div className="relative">
              <input
                type="text"
                id="studentName"
                name="studentName"
                className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  studentNameError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder=" "
                onChange={handleInputChange}
              />
              <label
                htmlFor="studentName"
                className={`absolute left-4 p-1 bg-white top-[-4] text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                  studentNameError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Name
              </label>
              {studentNameError && (
                <p className="text-sm text-red-500 mt-1">Name is required</p>
              )}
            </div>
          ) : (
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder=" "
                onChange={handleInputChange}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 p-1 top-[-4] bg-white  text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                  emailError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Email
              </label>
              {emailError && (
                <p className="text-sm text-red-500 mt-1">Email is required</p>
              )}
            </div>
          )}
          <div className="relative">
            <input
              type={toggle ? "text" : "password"}
              id="password"
              name="password"
              className={`peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              htmlFor="password"
              className={`absolute left-4 p-1 bg-white top-[-4] text-sm text-gray-500 transition-all transform scale-100 -translate-y-1/2 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 peer-focus:-translate-y-1/2 peer-focus:scale-90 ${
                passwordError ? "text-red-500" : "text-gray-700"
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
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">Password is required</p>
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
            onClick={() => router.push("/admin/dashboard")}
          >
            {loader ? "Loading..." : "Login"}
          </button>
          <button
            type="button"
            onClick={guestModeHandler}
            className="w-full py-3 text-purple-600 font-bold border border-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            Login as Guest
          </button>
          {role === "cadmin" && (
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
      </div>

      {/* Right Side: Background Image */}
      <div className="hidden md:flex flex-grow bg-cover bg-center bg-[url('/designlogin.jpg')]"></div>

      {/* Backdrop */}
      {guestLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white">
            <div className="animate-spin h-10 w-10 border-4 border-t-transparent border-white rounded-full"></div>
            <p className="mt-2">Please Wait</p>
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p>Guest mode activated!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
