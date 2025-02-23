"use client";

import { CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import BasicDatePicker from "./datepicker";
import { ComboboxDemo } from "./combo";
import { z } from "zod";
import { toast } from "react-toastify";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  Address: z.string().min(5, "Address must be at least 5 characters long"),
  dob: z
    .date()
    .nullable()
    .refine((date) => date !== null, "Date of Birth is required"),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  wapp: z.string().regex(/^\d{10}$/, "Invalid WhatsApp number"),
});

const AddStudent: React.FC = () => {
  const [loader, setLoader] = useState(false);

  const [fd, setfd] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    Address: "",
    dob: null,
    mobile: "",
    wapp: "",
    courseName: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setfd({ ...fd, [e.target.id]: e.target.value });
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = formSchema.safeParse(fd);

    if (!result.success) {
      const errorMessages: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        errorMessages[issue.path[0] as string] = issue.message;
      });
      toast("some error happend");
    } else {
      setLoader(true);
      console.log("Valid data:", result.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 mt-20">
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">
          Add Student
        </h2>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Applicant Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter student's name..."
            value={fd.name}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Father's Name
          </label>
          <input
            id="fatherName"
            type="text"
            placeholder="Enter Father's Name..."
            value={fd.fatherName}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Mother's Name
          </label>
          <input
            id="motherName"
            type="text"
            placeholder="Enter Mother's Name..."
            value={fd.motherName}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="Address"
            type="text"
            placeholder="Enter Address..."
            value={fd.Address}
            onChange={handleInputChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile No
          </label>
          <input
            id="mobile"
            type="number"
            placeholder="Enter Mobile No..."
            value={fd.mobile}
            onChange={
              (e) => setfd({ ...fd, mobile: e.target.value.slice(0, 10) }) // Ensures only 10 digits
            }
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            WhatsApp No
          </label>
          <input
            id="wapp"
            type="number"
            placeholder="Enter WhatsApp No..."
            value={fd.wapp}
            onChange={
              (e) => setfd({ ...fd, wapp: e.target.value.slice(0, 10) }) // Ensures only 10 digits
            }
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Date Of Birth
          </label>
          <BasicDatePicker selectedDate={fd.dob} setSelectedDate={setfd} />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Course Name
          </label>
          <ComboboxDemo frameworks={frameworks} heading={"Select Course"} />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="className"
            className="text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Educational Qualification
          </label>
          <ComboboxDemo
            frameworks={frameworks}
            heading={"Select Educational Qualification"}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loader}
          className="w-full py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
        >
          {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
