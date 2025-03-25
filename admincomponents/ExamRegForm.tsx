"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

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
    subjects: string[];
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

  const [remain, setremain] = useState({
    ATI_CODE: "",
    ExamCenterCode: "",
    lastpaymentR: "",
    SemNo: "",
    ted: "",
    ped: "",
    tet: "",
    pet: "",
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
    { key: "whatsappNo", label: "WhatsApp No", value: fd?.wpNo || "" },
  ];

  const fetchData = async () => {
    try {
      const data = (await fetcherWc("/exmformfillupDatafetch", "POST", {
        enrollmentNo,
      })) as ApiResponse;

      if (data.success && data.data == null) toast("invalid enrollment id");
      setfd(data.data);
    } catch (error) {
      toast("error happened");
    }
  };

  const fetchHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast("plz wait while data is fetching...");
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

    try {
      setLoading(true);

      const response = await fetcherWc("/examFormFillup", "POST", {
        enrollmentNo,
        ...remain,
      });

      if (response.success) {
        toast("✅ Success!");
      } else {
        if (response.error?.code === "P2002") {
          toast("❌ EnrollmentNo already exists!");
        } else {
          toast("❌ Submission failed!");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast("⚠️ Some error happened");
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
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Enrollment No</label>
            <div className="w-full flex justify-center items-center gap-5">
              <input
                type="text"
                value={enrollmentNo}
                onChange={handleChange}
                className="w-full p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
              <Button className="h-10" onClick={fetchHandler}>Fetch</Button>
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

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Semester No</label>
            <input
              type="text"
              name="SemNo"
              value={remain.SemNo}
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Theory Exam Date</label>
            <input
              type="text"
              name="ted"
              value={remain.ted}
              onChange={handleChange2}
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
              name="ped"
              value={remain.ped}
              placeholder="dd/mm/yy"
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Theory Exam Time</label>
            <input
              type="text"
              name="tet"
              value={remain.tet}
              placeholder="hh:mm"
              onChange={handleChange2}
              className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">
              Practical Exam Time
            </label>
            <input
              type="text"
              name="pet"
              value={remain.pet}
              placeholder="hh:mm"
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
