"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { idCardFields } from "@/data/index";

const IDcardForm = () => {
  const initialFormState = Object.fromEntries(
    idCardFields.map(({ key }) => [key, ""])
  );

  const [formData, setFormData] =
    useState<Partial<typeof initialFormState>>(initialFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors = Object.fromEntries(
      idCardFields
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-10 p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold text-center mb-4">ID Card Form</h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Clearly fill the form below
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {idCardFields.map(({ key, label, type }) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                id={key}
                name={key}
                value={formData[key] || ""}
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
            className="w-1/3 mx-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition"
          >
            Submit
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default IDcardForm;
