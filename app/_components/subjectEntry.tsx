import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Check, X, Edit } from "lucide-react";
import { ComboboxDemo } from "./combo";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { typefd } from "@/lib/typs";
import { frameworksCourse } from "@/data";

const SubjectEntry = () => {
  const [fd, setfd] = useState<typefd>({
    courseid: "",
  });
  const [courses, setCourses] = useState<{ [key: string]: string[] }>({});
  const [subjectName, setSubjectName] = useState("");
  const [editingSubject, setEditingSubject] = useState<{
    course: string;
    subject: string;
  } | null>(null);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [newCourseName, setNewCourseName] = useState("");
  const [loading, setloading] = useState(false);

  const editCourse = (course: string) => {
    setEditingCourse(course);
    setNewCourseName(course);
  };

  const saveEditedCourse = () => {
    if (!editingCourse || !newCourseName.trim()) {
      alert("Course name cannot be empty.");
      return;
    }

    // Check if the new course name already exists and is not the same as the current course being edited
    if (courses[newCourseName] && newCourseName !== editingCourse) {
      alert("A course with this name already exists.");
      return;
    }

    setCourses((prev) => {
      const newCourses = { ...prev };
      // If the course name is unchanged, do nothing
      if (newCourseName === editingCourse) {
        return newCourses;
      }
      // Update the course name
      newCourses[newCourseName] = newCourses[editingCourse];
      delete newCourses[editingCourse];
      return newCourses;
    });
    // Reset editing state
    setEditingCourse(null);
    setNewCourseName("");
  };

  const removeCourse = (course: string) => {
    setCourses((prev) => {
      const newCourses = { ...prev };
      delete newCourses[course];
      return newCourses;
    });
  };

  const addSubject = () => {
    if (!fd.courseid.trim()) {
      alert("Please select a course.");
      return;
    }
    if (!subjectName.trim()) {
      alert("Please enter a subject name.");
      return;
    }

    setCourses((prev) => ({
      ...prev,
      [fd.courseid]: [...(prev[fd.courseid] || []), subjectName.trim()],
    }));
    setSubjectName(""); // Reset the subject name input
    setfd({ courseid: "" }); // Reset the course input
  };

  const removeSubject = (course: string, subject: string) => {
    setCourses((prev) => ({
      ...prev,
      [course]: prev[course].filter((subj) => subj !== subject),
    }));
  };

  const editSubject = (course: string, oldSubject: string) => {
    setEditingSubject({ course, subject: oldSubject });
    setNewSubjectName(oldSubject);
  };

  const saveEditedSubject = () => {
    if (!editingSubject || !newSubjectName.trim()) return;

    if (
      courses[editingSubject.course].includes(newSubjectName.trim()) &&
      newSubjectName.trim() !== editingSubject.subject
    ) {
      alert("A subject with this name already exists in the course.");
      return;
    }

    setCourses((prev) => ({
      ...prev,
      [editingSubject.course]: prev[editingSubject.course].map((subj) =>
        subj === editingSubject.subject ? newSubjectName.trim() : subj
      ),
    }));
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
    const c = JSON.stringify(courses);

    try {
      setloading(true);
      const data = await fetcherWc("/subjectAdd", "POST", { c });
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
          className="w-full p-4 bg-white border border-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md"
          onClick={addSubject}
        >
          Add
        </motion.button>
      </div>

      {Object.entries(courses).map(([course, subjects]) => (
        <div
          key={course}
          className="w-full mt-6 p-6 bg-white rounded-xl border border-gray-300 shadow-md"
        >
          <div className="flex justify-between items-center mb-3">
            {editingCourse === course ? (
              <ComboboxDemo
                frameworks={frameworksCourse}
                heading={"Select Course"}
                value={newCourseName} // Fixed: Use newCourseName instead of fd.courseid
                setValue={(value: string) => setNewCourseName(value)} // Update newCourseName directly
                data="courseid"
              />
            ) : (
              <h3 className="text-lg font-semibold text-indigo-700">
                {frameworksCourse.find((item) => item.value === course)
                  ?.label || course}
              </h3>
            )}
            <div className="flex gap-2">
              {editingCourse === course ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                  onClick={saveEditedCourse}
                >
                  <Check size={20} />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl"
                  onClick={() => editCourse(course)}
                >
                  <Edit size={20} />
                </motion.button>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
                onClick={() => removeCourse(course)}
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>
          <ul>
            {subjects.map((subject) => (
              <motion.li
                key={subject}
                className="flex justify-between items-center p-4 bg-gray-200 border border-gray-300 rounded-xl mb-3 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {editingSubject?.course === course &&
                editingSubject?.subject === subject ? (
                  <input
                    type="text"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span>{subject}</span>
                )}
                <div className="flex gap-3">
                  {editingSubject?.course === course &&
                  editingSubject?.subject === subject ? (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 ml-4 rounded-xl"
                      onClick={saveEditedSubject}
                    >
                      <Check size={20} />
                    </motion.button>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-xl"
                      onClick={() => editSubject(course, subject)}
                    >
                      <Edit size={20} />
                    </motion.button>
                  )}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl"
                    onClick={() => removeSubject(course, subject)}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}

      <motion.button
        id="submit-button"
        whileTap={{ scale: 1 }}
        className="mt-6 w-fit bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg"
        onClick={handleSubmit}
        disabled={loading}
      >
        Submit
      </motion.button>
    </div>
  );
};

export default SubjectEntry;
