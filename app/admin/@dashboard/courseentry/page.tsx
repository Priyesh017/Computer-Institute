"use client";

import { fetcherWc } from "@/helper";
import { useState } from "react";
import { toast } from "react-toastify";

interface CourseFormValues {
  courseName: string;
  duration: string;
  price: string;
}

export default function CourseEntryForm() {
  const [form, setForm] = useState<CourseFormValues>({
    courseName: "",
    duration: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!form.courseName || !form.duration || !form.price) {
        alert("Please fill in all fields.");
        return;
      }
      const { success } = await fetcherWc("/createCourse", "POST", { form });
      if (success) {
        setForm({ courseName: "", duration: "", price: "" });
        toast.success("successfully added");
      }
    } catch (error) {
      console.log(error);
      toast.error("some error happened");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="courseName"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={form.courseName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter course name"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="duration"
          >
            Duration(in months)
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 3 "
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-semibold mb-1"
            htmlFor="price"
          >
            Price (in INR)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 299"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
