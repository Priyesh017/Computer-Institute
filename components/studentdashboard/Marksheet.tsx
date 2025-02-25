"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Trash2 } from "lucide-react";
import { details, marks } from "@/data/index";

interface Subject {
  subject: string;
  theoryFullMarks: string;
  practicalFullMarks: string;
  theoryMarks: string;
  practicalMarks: string;
}

const Marksheet = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      subject: "",
      theoryFullMarks: "",
      practicalFullMarks: "",
      theoryMarks: "",
      practicalMarks: "",
    },
  ]);

  const [name, setName] = useState<string>("N/A");
  const [enrollno, setEnrollno] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [totalFullMarks, setTotalFullMarks] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [grade, setGrade] = useState<string>("N/A");

  useEffect(() => {
    anime({
      targets: ".marks-row",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 500,
    });
  }, [subjects]);

  useEffect(() => {
    if (enrollno === "1") {
      setName("John Doe");
    } else if (enrollno === "2") {
      setName("Jane Doe");
    } else {
      setName("N/A");
    }

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
    setTotalFullMarks(fullMarks);

    if (fullMarks > 0) {
      const calculatedPercentage = (totalObtained / fullMarks) * 100;
      setPercentage(parseFloat(calculatedPercentage.toFixed(2)));
      setGrade(getGrade(calculatedPercentage));
    } else {
      setPercentage(0);
      setGrade("N/A");
    }
  }, [subjects, enrollno]);

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const allFieldsFilled = subjects.every(
    (item) =>
      item.subject.trim() !== "" &&
      item.theoryMarks.trim() !== "" &&
      item.practicalMarks.trim() !== "" &&
      item.theoryFullMarks.trim() !== "" &&
      item.practicalFullMarks.trim() !== ""
  );

  const handleAddRow = () => {
    if (!allFieldsFilled) {
      alert("Please fill all fields before adding a new row!");
      return;
    }
    setSubjects([
      ...subjects,
      {
        subject: "",
        theoryFullMarks: "",
        practicalFullMarks: "",
        theoryMarks: "",
        practicalMarks: "",
      },
    ]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index][field as keyof (typeof newSubjects)[number]] = value;
    setSubjects(newSubjects);
  };

  const handleDeleteRow = (index: number) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleSubmit = () => {
    if (!allFieldsFilled) {
      alert("Please fill all fields before submitting!");
      return;
    }
    alert("Marksheet submitted successfully!");
  };

  const handlePreview = () => {
    if (!allFieldsFilled) {
      alert("Please fill all fields before previewing!");
      return;
    }
    alert(
      `Preview:\n${JSON.stringify(
        subjects,
        null,
        2
      )}\nTotal Marks: ${totalMarks}\nPercentage: ${percentage}%\nGrade: ${grade}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white text-black rounded-lg shadow-lg border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center">Marksheet</h2>
      <div className="grid grid-cols-2 text-center gap-2 my-3">
        {details.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="font-bold">{item.label}</span>
            <input
              type={item.type}
              placeholder={item.label}
              value={item.value}
              onChange={(e) => setEnrollno(e.target.value)}
              className="mx-3 px-3 py-1 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-bold bg-gray-200 p-3 rounded-lg">
        <span>Subject</span>
        <span>Theory Full Marks</span>
        <span>Practical Full Marks</span>
        <span>Theory Marks</span>
        <span>Practical Marks</span>
        <span>Total</span>
        <span>Action</span>
      </div>
      <div className="space-y-2 mt-2">
        {subjects.map((item, index) => (
          <motion.div
            key={index}
            className="marks-row grid grid-cols-7 gap-2 p-2 bg-gray-100 border border-gray-300 rounded-lg items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {marks.map((items, i) => (
              <input
                key={i}
                type={items.type}
                pattern={items.pattern}
                placeholder={items.placeholder}
                value={items.value}
                onChange={(e) =>
                  handleChange(index, items.name, e.target.value)
                }
                className="p-2 bg-white border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
            <p className="text-center font-bold text-blue-500">
              {parseInt(item.theoryMarks) + parseInt(item.practicalMarks) || 0}
            </p>
            <button
              onClick={() => handleDeleteRow(index)}
              className="p-2 bg-red-500 hover:bg-red-600 transition rounded text-white"
            >
              <Trash2 className="mx-auto" size={20} />
            </button>
          </motion.div>
        ))}
        <button
          onClick={handleAddRow}
          className={`w-full p-3 rounded text-white font-bold ${
            allFieldsFilled
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          + Add New Row
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-6 text-center">
        <motion.p className="text-lg font-semibold">
          Total Marks: <span className="text-blue-500">{totalMarks}</span>
        </motion.p>
        <motion.p className="text-lg font-semibold text-center">
          Percentage: <span className="text-green-500">{percentage}%</span>
        </motion.p>
        <motion.p className="text-lg font-semibold text-center">
          Grade: <span className="text-purple-500">{grade}</span>
        </motion.p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreview}
          className={`w-1/2 p-2 rounded text-white font-bold mx-2 ${
            allFieldsFilled
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Preview
        </button>
        <button
          onClick={handleSubmit}
          className={`w-1/2 p-2 rounded text-white font-bold mx-2 ${
            allFieldsFilled
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 cursor-not-allowed"
          }`}
          disabled={!allFieldsFilled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Marksheet;
