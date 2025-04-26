"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { marks } from "@/data/index";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import Dropdown from "@/components/DropDown";
import { Button } from "@/components/ui/button";
import { ApiResponse, EnrollmentData, Subject } from "@/lib/typs";
import { Loader2 } from "lucide-react";
import { PreviewModal } from "@/components/PreviewMarks";

const Marksheet = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [isPreviewOpen, setPreviewOpen] = useState(false);

  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [grade, setGrade] = useState<string>("N/A");
  const [EnrollmentNo, setEnrollmentNo] = useState("");
  const [year, setyear] = useState("");
  const [fd, setfd] = useState<EnrollmentData>();
  const [selected, setSelected] = useState<"PASS" | "FAIL" | "Select">(
    "Select"
  );
  const [loading, setloading] = useState<"fetch" | "send" | null>(null);

  useEffect(() => {
    const totalObtained = subjects.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.theoryMarks) || 0) +
        (parseInt(item.practicalMarks) || 0),
      0
    );

    const fullMarks = subjects.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.theoryFullMarks) || 0) +
        (parseInt(item.practicalFullMarks) || 0),
      0
    );

    setTotalMarks(totalObtained);

    if (fullMarks > 0) {
      const calculatedPercentage = (totalObtained / fullMarks) * 100;
      setPercentage(parseFloat(calculatedPercentage.toFixed(2)));
      setGrade(getGrade(calculatedPercentage));
    } else {
      setPercentage(0);
      setGrade("N/A");
    }
  }, [subjects]);

  const details = [
    { key: "sName", label: "Student Name", value: fd?.name || "" },
    { key: "swdName", label: "S/W/D Name", value: fd?.father || "" },

    { key: "courseName", label: "Course Name", value: fd?.course.CName || "" },
    {
      key: "centerName",
      label: "Center Name",
      value: fd?.center.Centername || "",
    },
    {
      key: "cAddress",
      label: "Center Address",
      value: fd?.center.address || "",
    },
    {
      key: "dob",
      label: "Date of Birth",
      value: fd && fd.dob ? new Date(fd.dob).toLocaleDateString("en-GB") : "",
    },
  ];

  const fetchData = async () => {
    try {
      setloading("fetch");
      const data = (await fetcherWc("/exmformfillupDatafetch", "POST", {
        EnrollmentNo: parseInt(EnrollmentNo),
      })) as ApiResponse;
      if (data.success && data.data == null) {
        toast("invalid enrollment id");
        return;
      }

      setfd(data.data);
      const subjectName = data.data.course.subjects;

      setSubjects(
        subjectName.map((sub) => ({
          subject: sub.SubName,
          theoryFullMarks: sub.theoryFullMarks.toString(),
          practicalFullMarks: sub.practFullMarks.toString(),
          theoryMarks: "",
          practicalMarks: "",
        }))
      );
    } catch (error) {
      console.log(error);
      toast("error happened");
    } finally {
      setloading(null);
    }
  };

  const check = () =>
    !allFieldsFilled || !fd?.name || year === "" || selected === "Select";

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return "AA";
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "B+";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    return "D";
  };

  const allFieldsFilled = subjects.every(
    (item) =>
      // item.subject.trim() !== "" &&
      item.theoryMarks.trim() !== "" &&
      item.practicalMarks.trim() !== "" &&
      item.theoryFullMarks.trim() !== "" &&
      item.practicalFullMarks.trim() !== ""
  );

  const handleChange = (index: number, field: string, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field as keyof (typeof newSubjects)[number]] = value;
    setSubjects(newSubjects);
  };

  const handleSubmit = async () => {
    // add if exmformfillup not verfied
    if (!fd!.examformFillup.verified) {
      toast("exam form isn't verified yet.");
      return;
    }
    if (check()) {
      toast("Please fill all fields before submitting!");
      return;
    }
    try {
      setloading("send");
      const data = await fetcherWc("/exmmarksentry", "POST", {
        EnrollmentNo: parseInt(EnrollmentNo),
        marks: subjects,
        remarks: selected,
        grade,
        percentage,
        totalMarks,
        year,
      });

      toast(
        data.success ? "Marksheet submitted successfully!" : "error happened"
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === "P2002") {
        toast("duplicate entry not accepted");
        return;
      }
      toast("error happend");
    } finally {
      setloading(null);
    }
  };

  const handlePreview = () => {
    if (!allFieldsFilled) {
      toast("Please fill all fields before previewing!");
      return;
    }
    setPreviewOpen(true);
  };

  // Calculate totals
  const totalTheoryFullMarks = subjects.reduce(
    (sum, subj) => sum + parseInt(subj.theoryFullMarks || "0"),
    0
  );
  const totalPracticalFullMarks = subjects.reduce(
    (sum, subj) => sum + parseInt(subj.practicalFullMarks || "0"),
    0
  );
  const totalTheoryMarks = subjects.reduce(
    (sum, subj) => sum + (parseInt(subj.theoryMarks) || 0),
    0
  );
  const totalPracticalMarks = subjects.reduce(
    (sum, subj) => sum + (parseInt(subj.practicalMarks) || 0),
    0
  );
  const grandTotal = totalTheoryMarks + totalPracticalMarks;

  return (
    <div className="max-w-full mx-auto my-10 p-3 md:p-10 bg-white text-black rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-center">Marksheet</h2>
      <p className="text-gray-500 text-center mb-6">
        Clearly fill the form below
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 my-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Enrollment no</label>
          <div className="w-full flex justify-center items-center gap-5">
            <input
              type="text"
              value={EnrollmentNo}
              onChange={(e) => setEnrollmentNo(e.target.value)}
              className="w-full p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:outline-none"
            />
            <Button
              className="h-10"
              onClick={fetchData}
              disabled={loading === "fetch"}
            >
              Fetch{" "}
              {loading === "fetch" && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
        {details.map((item, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium mb-1">{item.label}</label>
            <div className="p-2 h-fit md:h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none">
              {item.value}
            </div>
          </div>
        ))}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            onChange={(e) => setyear(e.target.value)}
            value={year}
            placeholder="enter year"
            className="p-2 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-violet-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-2 text-center text-xs md:text-lg font-bold bg-gray-200 p-3 rounded-lg">
        <span>Subject</span>
        <span>Theory Full Marks</span>
        <span>Practical Full Marks</span>
        <span>Theory Marks</span>
        <span>Practical Marks</span>
        <span>Total</span>
        {/* <span>Action</span> */}
      </div>
      <div className="space-y-2 mt-2">
        {subjects.map((item, index) => (
          <motion.div
            key={index}
            className="marks-row grid md:grid-cols-6 gap-2 p-2 bg-gray-100 border border-gray-300 rounded-lg items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="w-full h-full p-2 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center">
              {item.subject}
            </span>
            {marks.map((items, i) => (
              <input
                key={i}
                name={items.name}
                type={items.type}
                pattern={items.pattern}
                placeholder={items.placeholder}
                value={item[items.name as keyof Subject]}
                onChange={(e) =>
                  handleChange(
                    index,
                    items.name as keyof Subject,
                    e.target.value
                  )
                }
                className="p-2 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
            ))}
            <p className="text-center font-bold text-blue-500">
              {parseInt(item.theoryMarks) + parseInt(item.practicalMarks) || 0}
            </p>
          </motion.div>
        ))}

        {/* Totals Section */}
        <motion.div
          className="mt-6 p-4 bg-gray-200 rounded-lg text-gray-800 font-semibold grid grid-cols-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>Total</p>
          <p className="text-blue-600">{totalTheoryFullMarks}</p>
          <p className="text-blue-600">{totalPracticalFullMarks}</p>
          <p className="text-green-600">{totalTheoryMarks}</p>
          <p className="text-green-600">{totalPracticalMarks}</p>
          <p className="text-purple-600 pl-3">{grandTotal}</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-4 items-center justify-center gap-2 mt-6 text-center">
        <motion.p className="text-lg font-semibold">
          Grand Total: <span className="text-blue-500">{totalMarks}</span>
        </motion.p>
        <motion.p className="text-lg font-semibold text-center">
          Percentage: <span className="text-green-500">{percentage}%</span>
        </motion.p>
        <motion.p className="text-lg font-semibold text-center">
          Grade: <span className="text-purple-500">{grade}</span>
        </motion.p>
        <Dropdown selected={selected} setSelected={setSelected} />
      </div>
      <div className="mt-4 flex justify-between gap-4">
        <button
          onClick={handlePreview}
          className={`w-1/2 p-2 rounded text-white font-bold ${
            allFieldsFilled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Preview
        </button>
        <Button
          onClick={handleSubmit}
          className={`w-1/2 p-2 rounded text-white font-bold ${
            !check()
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={
            !allFieldsFilled ||
            !fd?.name ||
            year === "" ||
            selected === "Select" ||
            loading === "send"
          }
        >
          Submit {loading === "send" && <Loader2 className="animate-spin" />}
        </Button>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        subjects={subjects}
        totalMarks={totalMarks}
        percentage={percentage}
        grade={grade}
        result={selected}
      />
    </div>
  );
};

export default Marksheet;
