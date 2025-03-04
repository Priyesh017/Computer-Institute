"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";

export type EnrollmentData = {
  id: number;
  Enrollmentno: string;
  IdCardNo: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  name: string;
  dob: string;
  father: string;
  mother: string;
  address: string;
  mobileNo: string;
  wpNo: string;
  eduqualification: string;
  activated: boolean;
  courseId: number;
  centerid: number;
  createdAt: string;

  center: {
    Centername: string;
  };
  course: {
    CName: string;
  };
};

export type ApiResponse = {
  success: boolean;
  data: EnrollmentData;
};

const ExamForm = () => {
  const [fd, setfd] = useState<EnrollmentData>();
  const [loading, setLoading] = useState(false);
  const [enrollmentNo, setEnrollmentNo] = useState<string>("");
  const [ATI_CODE, setATI_CODE] = useState<string>("");
  const [ExamCenterCode, setExamCenterCode] = useState<string>("");
  const [lastpaymentR, setlastpaymentR] = useState<string>("");
  const [SemNo, setSemNo] = useState<string>("");

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
    { key: "whatsappNo", label: "WhatsApp No", value: fd?.wpNo || "" },
  ];

  const fetchData = async () => {
    const data = (await fetcherWc("/exmformfillupDatafetch", "POST", {
      enrollmentNo,
    })) as ApiResponse;

    if (data.success && data.data == null) toast("invalid enrollment id");
    setfd(data.data);
  };

  useEffect(() => {
    if (enrollmentNo.length === 14) {
      toast("plz wait while data is fetching...");
      fetchData();
    }
  }, [enrollmentNo]);

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

    setLoading(true);

    const response = await fetcherWc("/examFormFillup", "POST", {
      enrollmentNo,
      ATI_CODE,
      ExamCenterCode,
      lprn: lastpaymentR,
    });

    if (response.success) {
      toast("success");
    } else {
      toast("failed");
    }

    setLoading(false);
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
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Enrollment No</label>
            <input
              type="text"
              value={enrollmentNo}
              onChange={handleChange}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          {examFields.map(({ value, key, label }) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="text-sm font-medium mb-1">
                {label}
              </label>
              <div
                id={key}
                className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                {value}
              </div>
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ATI Code</label>
            <input
              type="text"
              value={ATI_CODE}
              onChange={(e) => setATI_CODE(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">ExamCenter Code</label>
            <input
              type="text"
              value={ExamCenterCode}
              onChange={(e) => setExamCenterCode(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Last Payment Reciept No
            </label>
            <input
              type="text"
              value={lastpaymentR}
              onChange={(e) => setlastpaymentR(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Semester No</label>
            <input
              type="text"
              value={SemNo}
              onChange={(e) => setSemNo(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Theory Exam Date</label>
            <input
              type="text"
              value={SemNo}
              onChange={(e) => setSemNo(e.target.value)}
              placeholder="dd/mm/yy"
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Practical Exam Date
            </label>
            <input
              type="text"
              value={SemNo}
              placeholder="dd/mm/yy"
              onChange={(e) => setSemNo(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Theory Exam Time</label>
            <input
              type="text"
              value={SemNo}
              placeholder="dd/mm/yy"
              onChange={(e) => setSemNo(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Practical Exam Time
            </label>
            <input
              type="text"
              value={SemNo}
              placeholder="dd/mm/yy"
              onChange={(e) => setSemNo(e.target.value)}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>
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
      </form>
    </motion.div>
  );
};

export default ExamForm;
