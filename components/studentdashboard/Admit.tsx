"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { admitFields } from "@/data/index";

const AdmitForm = () => {
  const [formData, setFormData] = useState(
    Object.fromEntries(admitFields.map(({ key }) => [key, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors = admitFields.reduce((acc, { key, label }) => {
      if (!formData[key]) acc[key] = `${label} is required`;
      return acc;
    }, {} as Record<string, string>);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-10 p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Admit Card Form
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
        Clearly fill the form below
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {admitFields.map(({ key, label, type }) => (
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
                required
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

export default AdmitForm;
