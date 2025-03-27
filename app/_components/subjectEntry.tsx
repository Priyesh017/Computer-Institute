import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Plus, Check, Trash2, Edit } from "lucide-react";
import { ComboboxDemo } from "./combo";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { typefd } from "@/lib/typs";
import { frameworksCourse } from "@/data";

const SubjectEntry = () => {
  const [fd, setfd] = useState<typefd>({
    courseid: "",
  });
  const [courseName, setCourseName] = useState(""); // Single course name
  const [subjectName, setSubjectName] = useState(""); // Input for subject name
  const [subjects, setSubjects] = useState<string[]>([]); // List of subjects
  const [editingSubject, setEditingSubject] = useState<string | null>(null); // Subject being edited
  const [newSubjectName, setNewSubjectName] = useState(""); // New subject name during editing
  const [loading, setloading] = useState(false);

  // Update courseName whenever fd.courseid changes
  useEffect(() => {
    const selectedCourse = frameworksCourse.find(
      (course) => course.value === fd.courseid
    );
    setCourseName(selectedCourse ? selectedCourse.label : "");
  }, [fd.courseid]);

  const addSubject = () => {
    if (!fd.courseid.trim()) {
      alert("Please select a course.");
      return;
    }
    if (!subjectName.trim()) {
      alert("Please enter a subject name.");
      return;
    }

    setSubjects((prev) => [...prev, subjectName.trim()]);
    setSubjectName(""); // Reset the subject name input
  };

  const removeSubject = (subject: string) => {
    setSubjects((prev) => {
      const updatedSubjects = prev.filter((subj) => subj !== subject);

      // If the subjects array becomes empty, reset the combo box and course state
      if (updatedSubjects.length === 0) {
        setfd({ courseid: "" }); // Reset the combo box value
        setCourseName(""); // Reset the course name
      }

      return updatedSubjects;
    });
  };

  const editSubject = (oldSubject: string) => {
    setEditingSubject(oldSubject);
    setNewSubjectName(oldSubject);
  };

  const saveEditedSubject = () => {
    if (!editingSubject || !newSubjectName.trim()) return;

    if (
      subjects.includes(newSubjectName.trim()) &&
      newSubjectName.trim() !== editingSubject
    ) {
      toast("A subject with this name already exists.");
      return;
    }

    setSubjects((prev) =>
      prev.map((subj) =>
        subj === editingSubject ? newSubjectName.trim() : subj
      )
    );
    setEditingSubject(null);
    setNewSubjectName("");
  };

  const handleSubmit = async () => {
    anime({
      targets: "#submit-button",
      scale: [1, 1.1, 1],
      duration: 500,
      easing: "easeInOutQuad",
    });
    const c = JSON.stringify(subjects);

    try {
      setloading(true);
      const data = await fetcherWc("/subjectAdd", "POST", {
        c,
        cid: fd.courseid,
      });
      if (data.success) toast("success");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col justify-center items-center bg-gray-100 text-gray-900 rounded-xl shadow-lg border border-gray-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Subject Entry
      </h2>
      <div className="w-full flex items-center gap-4 mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
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
      <div className="w-full flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="w-full p-4 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-md shadow-md"
          onClick={addSubject}
        >
          <Plus size={30} />
        </motion.button>
      </div>

      <div className="w-full mt-6 p-6 bg-white rounded-md border border-gray-300 shadow-md">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4">
          {subjects.length > 0 ? courseName : "Course Name"}
        </h3>
        <ul>
          {subjects.map((subject) => (
            <motion.li
              key={subject}
              className="flex justify-between items-center p-4 bg-gray-200 border border-gray-300 rounded-md mb-3 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {editingSubject === subject ? (
                <input
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span>{subject}</span>
              )}
              <div className="flex gap-3">
                {editingSubject === subject ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 ml-4 rounded-md"
                    onClick={saveEditedSubject}
                  >
                    <Check size={20} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
                    onClick={() => editSubject(subject)}
                  >
                    <Edit size={20} />
                  </motion.button>
                )}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                  onClick={() => removeSubject(subject)}
                >
                  <Trash2 size={20} />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.button
        id="submit-button"
        whileTap={{ scale: 1 }}
        className="mt-6 w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md shadow-lg"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </motion.button>
    </div>
  );
};

export default SubjectEntry;
