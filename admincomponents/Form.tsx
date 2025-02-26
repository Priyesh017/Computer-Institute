"use client";

import { useState } from "react";
import { motion } from "framer-motion";
export const examFields = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "enrollmentNo", label: "Enrollment No", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "centerName", label: "Center Name", type: "text" },
  { key: "idCardNo", label: "ID Card No", type: "number" },
  {
    key: "lastPaymentReceiptNo",
    label: "Last Payment Receipt No",
    type: "text",
  },
  { key: "registeredCourse", label: "Registered Course", type: "text" },
  { key: "mobileNo", label: "Mobile No", type: "number" },
  { key: "whatsappNo", label: "WhatsApp No", type: "number" },
];
const ExamForm = () => {
  
  const initialFormState: Record<string, string> = Object.fromEntries(
    examFields.map(({ key }) => [key, ""])
  );

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors = Object.fromEntries(
      examFields
        .filter(({ key }) => !formData[key])
        .map(({ key, label }) => [key, `${label} is required`])
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch("/api/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit the form");

      setSuccess("Form submitted successfully!");
      setFormData(initialFormState); // Reset form after success
    } catch (error) {
      console.error(error);
      setSuccess("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-10 p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Exam Registration Form
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Clearly fill the form below and ensure to indicate the courses
        registered for.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {examFields.map(({ key, label, type }) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              {errors[key] && (
                <span className="text-red-500 text-xs mt-1">{errors[key]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-1/3 mx-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </div>

        {success && (
          <p
            className={`text-center mt-4 font-semibold ${
              success.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {success}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default ExamForm;
