"use client";

import { fetcherWc } from "@/helper";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FC } from "react";
import Loader from "./Loader";

interface iType {
  CName: string;
  subjects: {
    id: number;
    SubName: string;
    theoryFullMarks: number;
    practFullMarks: number;
  }[];
}
const CourseGrid: FC = () => {
  const {
    data: subjects,
    isLoading,
    isError,
  } = useQuery<iType[]>({
    queryFn: () => fetcherWc("/fetchAllCourseWithSub", "GET"),
    queryKey: ["fetchAllCourseWithSub"],
  });

  if (isLoading || !subjects) return <Loader />;
  if (isError) <div>some error happened...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {subjects.map((course, index) => (
        <motion.div
          key={course.CName}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15 }}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">
              {course.CName}
            </h2>
            <ul className="space-y-3">
              {course.subjects.map((subject) => (
                <li
                  key={subject.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">
                        {subject.SubName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Theory: {subject.theoryFullMarks} | Practical:{" "}
                        {subject.practFullMarks}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CourseGrid;
