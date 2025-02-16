"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import BasicDatePicker from "./datepicker";

interface AddStudentProps {
  situation: string;
}

const AddStudent: React.FC<AddStudentProps> = () => {
  // State variables
  const [name, setName] = useState("");

  const [className, setClassName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoader(true);

    // Simulated API call or submission logic
    setTimeout(() => {
      setLoader(false);
      setShowPopup(true);
      setMessage("Student added successfully!");
    }, 2000);
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            Father's Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Father's Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            id="name"
            type="text"
            placeholder="Enter Mother's Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            id="name"
            type="text"
            placeholder="Enter Address..."
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            id="name"
            type="number"
            placeholder="Enter Mobile No..."
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            id="name"
            type="number"
            placeholder="Enter WhatsApp No..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <BasicDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Center Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Center Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            Course Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Course Name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoComplete="name"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="className"
            className="text-sm font-semibold text-gray-700 dark:text-gray-200"
          >
            Educational Qualification
          </label>
          <select
            id="className"
            value={className}
            onChange={(event) => setClassName(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               bg-white text-gray-700 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-purple-500 
               dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          >
            <option value="">Select Class</option>
            <option value="Class 1">Graduation</option>
            <option value="Class 2">Higher Secondary</option>
            <option value="Class 3">10th</option>
          </select>
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
