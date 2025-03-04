"use client";

import { CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { ComboboxDemo } from "./combo";
import { z } from "zod";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";

const frameworksCourse = [
  {
    label: "DOAP",
    value: "15",
  },
  {
    label: "DITA",
    value: "16",
  },
  {
    label: "ADCA",
    value: "17",
  },
  {
    label: "ADOAP",
    value: "18",
  },
  {
    label: "WEBSITE DESIGNING & DEVELOPMENT",
    value: "19",
  },
  {
    label: "COMPUTER HARDWARE & NETWORKING",
    value: "14",
  },
  {
    label: "DCA",
    value: "13",
  },
  {
    label: "TYPING",
    value: "12",
  },
  {
    label: "DTP",
    value: "11",
  },
  {
    label: "KNOWLEDGE ON C/C++ PROGRAMMING",
    value: "7",
  },
  {
    label: "CCTV INSTALLATION & MAINTENANCE",
    value: "10",
  },
  {
    label: "ADVANCE EXCEL",
    value: "9",
  },
  {
    label: "PYTHON",
    value: "8",
  },
  {
    label: "Knowledge on LINUX",
    value: "6",
  },
  {
    label: "CITA",
    value: "5",
  },
  {
    label: "CCA",
    value: "4",
  },
  {
    label: "BASIC HARDWARE MAINTENANCE",
    value: "3",
  },
  {
    label: "TALLY",
    value: "2",
  },
  {
    label: "OFFICE MANAGEMENT",
    value: "",
  },
  {
    label: "BASIC COMPUTER CONCEPT",
    value: "1",
  },
];

const frameworksEdu = [
  {
    value: "8th Pass",
    label: "8th Pass",
  },
  {
    value: "10th Pass",
    label: "10th Pass",
  },
  {
    value: "12th Pass",
    label: "12th Pass",
  },
  {
    value: "Graduation",
    label: "Graduation",
  },
];
export interface tfd {
  name: string;
  fatherName: string;
  motherName: string;
  Address: string;
  dob: Date;
  mobile: string;
  wapp: string;
  idno: string;
  enrollmentNo: string;
  eduqualification: string;
  courseid: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  Address: z.string().min(5, "Address must be at least 5 characters long"),
  idno: z.string(),
  enrollmentNo: z.string(),
  dob: z.date(),
  eduqualification: z.string(),
  courseid: z.string(),
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
    dob: new Date(),
    mobile: "",
    wapp: "",
    eduqualification: "",
    courseid: "",
    idno: "",
    enrollmentNo: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target;

    setfd((prevFd) => {
      if (id === "dob") {
        return { ...prevFd, [id]: new Date(value) };
      }

      // Allow backspace by only restricting new character additions
      if (id === "enrollmentNo" && value.length > 14) {
        return prevFd;
      }

      return { ...prevFd, [id]: value };
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = formSchema.safeParse(fd);

    if (!result.success) {
      const errorMessages: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        errorMessages[issue.path[0] as string] = issue.message;
      });
      toast("some error happend");
      console.log(errorMessages);
    } else {
      setLoader(true);

      const data = await fetcherWc("/createEnrollment", "POST", fd);
      setLoader(false);

      toast(data.success);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        className="w-full min-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">
          Add Student
        </h2>

        {/* Name Field */}
        <div className="grid grid-cols-2 gap-6">
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
              Father&apos;s Name
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
              Mother&apos;s Name
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
              Enrollment No
            </label>
            <input
              id="enrollmentNo"
              type="text"
              placeholder="Enter enrollment No."
              value={fd.enrollmentNo}
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
              ID Card No.
            </label>
            <input
              id="idno"
              type="text"
              placeholder="Enter ID Card No."
              value={fd.idno}
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
            <input
              type="date"
              id="dob"
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <ComboboxDemo
              frameworks={frameworksCourse}
              heading={"Select Course"}
              value={fd.courseid}
              setValue={setfd}
              data="courseid"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="className"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Educational Qualification
            </label>
            <ComboboxDemo
              frameworks={frameworksEdu}
              heading={"Select Educational Qualification"}
              value={fd.eduqualification}
              setValue={setfd}
              data="eduqualification"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-center items-center w-full">
          <button
            type="submit"
            disabled={loader}
            className="w-1/2 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
