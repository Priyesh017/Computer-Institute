"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Plus, Check, Trash2, Edit, Loader2 } from "lucide-react";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { typefd } from "@/lib/typs";
import { frameworksCourse } from "@/data";
import { ComboboxDemo } from "@/components/combo";
import { Button } from "@/components/ui/button";

type Subject = {
  name: string;
  practical: string;
  theory: string;
};

const SubjectEntry = () => {
  const [fd, setfd] = useState<typefd>({ courseid: "" });
  const [courseName, setCourseName] = useState("");
  const [subjectInput, setSubjectInput] = useState<Subject>({
    name: "",
    practical: "",
    theory: "",
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selected = frameworksCourse.find((c) => c.value === fd.courseid);
    setCourseName(selected?.label || "");
  }, [fd.courseid]);

  const resetInput = () =>
    setSubjectInput({ name: "", practical: "", theory: "" });

  const addOrEditSubject = () => {
    const { name, practical, theory } = subjectInput;

    if (!fd.courseid.trim()) return toast("Please select a course.");
    if (!name.trim()) return toast("Please enter a subject name.");
    if (!practical.trim() || !theory.trim()) return toast("Enter all marks.");

    const trimmedInput = {
      name: name.trim(),
      practical: practical.trim(),
      theory: theory.trim(),
    };

    if (editingIndex !== null) {
      const updated = [...subjects];
      updated[editingIndex] = trimmedInput;
      setSubjects(updated);
      setEditingIndex(null);
    } else {
      const isDuplicate = subjects.some(
        (s) => s.name.toLowerCase() === trimmedInput.name.toLowerCase()
      );
      if (isDuplicate) return toast("Subject already exists.");
      setSubjects([...subjects, trimmedInput]);
    }

    resetInput();
  };

  const removeSubject = (index: number) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
    if (updated.length === 0) {
      setfd({ courseid: "" });
      setCourseName("");
    }
  };

  const editSubject = (index: number) => {
    setEditingIndex(index);
    setSubjectInput(subjects[index]);
  };

  const handleSubmit = async () => {
    anime({
      targets: "#submit-button",
      scale: [1, 1.1, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });

    try {
      setLoading(true);
      const data = await fetcherWc("/subjectAdd", "POST", {
        c: JSON.stringify(subjects),
        cid: fd.courseid,
      });
      if (data.success) toast("Subjects added successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col items-center bg-gray-100 text-gray-900 rounded-xl shadow-lg border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Subject Entry
      </h2>

      <div className="w-full flex items-center gap-4 mb-4">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Course Name
        </label>
        <ComboboxDemo
          frameworks={frameworksCourse}
          heading={"Select Course"}
          value={fd.courseid}
          setValue={setfd}
          data="courseid"
        />
      </div>

      <div className="w-full flex flex-col gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectInput.name}
          onChange={(e) =>
            setSubjectInput({ ...subjectInput, name: e.target.value })
          }
          className="w-full p-4 bg-white border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-row gap-4">
          <input
            type="text"
            placeholder="Practical Marks"
            value={subjectInput.practical}
            onChange={(e) =>
              setSubjectInput({ ...subjectInput, practical: e.target.value })
            }
            className="w-full p-4 bg-white border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Theory Marks"
            value={subjectInput.theory}
            onChange={(e) =>
              setSubjectInput({ ...subjectInput, theory: e.target.value })
            }
            className="w-full p-4 bg-white border border-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={addOrEditSubject}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-md shadow-md"
          >
            <Plus size={30} />
          </motion.button>
        </div>
      </div>

      {subjects.length > 0 && (
        <div className="w-full mt-6 p-6 bg-white rounded-md border border-gray-300 shadow-md">
          <h3 className="text-lg font-semibold text-indigo-700 mb-4">
            {courseName}
          </h3>
          <ul>
            {subjects.map((subject, idx) => (
              <motion.li
                key={idx}
                className="flex justify-between items-center p-4 bg-gray-200 border border-gray-300 rounded-md mb-3 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {editingIndex === idx ? (
                  <div className="flex flex-col gap-2 w-full mr-4">
                    <input
                      type="text"
                      value={subjectInput.name}
                      onChange={(e) =>
                        setSubjectInput({
                          ...subjectInput,
                          name: e.target.value,
                        })
                      }
                      className="p-2 border border-gray-400 rounded-md"
                    />
                    <input
                      type="text"
                      value={subjectInput.practical}
                      onChange={(e) =>
                        setSubjectInput({
                          ...subjectInput,
                          practical: e.target.value,
                        })
                      }
                      className="p-2 border border-gray-400 rounded-md"
                    />
                    <input
                      type="text"
                      value={subjectInput.theory}
                      onChange={(e) =>
                        setSubjectInput({
                          ...subjectInput,
                          theory: e.target.value,
                        })
                      }
                      className="p-2 border border-gray-400 rounded-md"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">
                      {subject.name}
                    </span>
                    <span>Practical: {subject.practical}</span>
                    <span>Theory: {subject.theory}</span>
                  </div>
                )}
                <div className="flex gap-2">
                  {editingIndex === idx ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={addOrEditSubject}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
                    >
                      <Check size={20} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => editSubject(idx)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
                    >
                      <Edit size={20} />
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeSubject(idx)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <Button
        id="submit-button"
        className="mt-6"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit {loading && <Loader2 className="ml-2 animate-spin" />}
      </Button>
    </div>
  );
};

export default SubjectEntry;
