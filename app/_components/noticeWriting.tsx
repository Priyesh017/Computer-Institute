"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NoticeWriting = () => {
  const [form, setForm] = useState({
    dateOfIssue: "",
    subject: "",
    details: "",
    expiryDate: "",
  });

  useEffect(() => {
    anime({
      targets: ".notice-form",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 800,
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto p-8 bg-white border border-gray-300 shadow-lg rounded-lg text-gray-900 notice-form"
    >
      <div className="border-b-2 border-gray-200 pb-4 mb-4 text-center">
        <h2 className="text-3xl font-semibold uppercase tracking-wide">
          Official Notice
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Subject</label>
          <Input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Details</label>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Enter details here..."
            className="w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-2 focus:ring-violet-400 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">
            Notice Expiry Date
          </label>
          <Input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-fit border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-violet-400 focus:border-transparent"
          />
        </div>
        <div className="text-center">
          <Button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition"
          >
            Submit Notice
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default NoticeWriting;
