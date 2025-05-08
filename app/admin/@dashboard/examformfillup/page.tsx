"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ApiResponse, EnrollmentData } from "@/lib/typs";
import { Loader2 } from "lucide-react";

const ExamForm = () => {
  const [fd, setfd] = useState<EnrollmentData>();
  const [loading, setLoading] = useState<"fetch" | "send" | null>(null);

  const [EnrollmentNo, setEnrollmentNo] = useState<string>("");

  const [remain, setremain] = useState({
    ATI_CODE: "",
    ExamCenterCode: "",
    lastpaymentR: "",
  });

  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setremain((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const examFields = [
    { key: "firstName", label: "Name", value: fd?.name || "" },

    { key: "address", label: "Address", value: fd?.address || "" },
    {
      key: "centerName",
      label: "Center Name",
      value: fd?.center.Centername || "",
    },
    { key: "idCardNo", label: "ID Card No", value: fd?.IdCardNo || "" },

    {
      key: "registeredCourse",
      label: "Registered Course",
      value: fd?.course.CName || "",
    },
    { key: "mobileNo", label: "Mobile No", value: fd?.mobileNo || "" },
    { key: "email", label: "Email Id", value: fd?.email || "" },
  ];

  const fetchData = async () => {
    setLoading("fetch");

    try {
      const data = (await fetcherWc("/exmformfillupDatafetch", "POST", {
        EnrollmentNo: parseInt(EnrollmentNo),
      })) as ApiResponse;

      if (data.success && data.data == null) toast("invalid enrollment id");
      setfd(data.data);
    } catch (error) {
      console.log(error);
      toast("error happened");
    } finally {
      setLoading(null);
    }
  };

  const fetchHandler = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    if (value.length <= 14) {
      setEnrollmentNo(value);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fd!.activated) {
      toast("enrollment isn't activated yet");
      return;
    }
    try {
      setLoading("send");

      const response = await fetcherWc("/examFormFillup", "POST", {
        EnrollmentNo: parseInt(EnrollmentNo),
        ...remain,
      });

      toast(response.success ? "✅ Success!" : "some error happened");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        const { error: backendError } = error.response.data;
        toast.error(
          backendError.code === "P2002"
            ? "duplicate entry"
            : backendError.code === "P2025" && "complete the payment first"
        );
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto my-10 p-10  dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md"
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
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Enrollment No</label>
            <div className="w-full flex justify-center items-center gap-5">
              <input
                type="text"
                value={EnrollmentNo}
                onChange={handleChange}
                className="w-full p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <Button
                className="h-10"
                onClick={fetchHandler}
                disabled={loading === "fetch"}
              >
                Fetch
                {loading === "fetch" && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </div>
          {examFields.map(({ value, key, label }) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium mb-1">
                {label}
              </label>
              <div
                id={key}
                className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                {value}
              </div>
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ATI Code</label>
            <input
              type="text"
              name="ATI_CODE"
              value={remain.ATI_CODE}
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ExamCenter Code</label>
            <input
              type="text"
              name="ExamCenterCode"
              value={remain.ExamCenterCode}
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Last Payment Reciept No
            </label>
            <input
              type="text"
              name="lastpaymentR"
              value={remain.lastpaymentR}
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading === "send"}
            className={`w-1/3 mx-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded-md transition ${
              loading === "send" && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading === "send" ? "Submitting..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ExamForm;
