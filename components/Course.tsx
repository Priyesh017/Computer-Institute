'use client';

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { courses } from '@/data';

const Course: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleDescription = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-[90%] mx-auto p-4">

      <motion.h2
        className="text-5xl font-bold fade-in mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Courses
      </motion.h2>

      <div className="flex flex-col gap-4 bg-gray-900 bg-opacity-20 backdrop-blur-lg text-white p-4 rounded-2xl shadow-lg">
        <div className="flex justify-between bg-gray-800 bg-opacity-75 p-3 rounded-lg font-semibold">
          <span>Course Name</span>
          <span>Fees</span>
        </div>
        {courses.map((course, index) => (
          <div key={index} className="flex flex-col rounded-lg border border-gray-700 hover:bg-gray-800 hover:bg-opacity-75 transition duration-200 cursor-pointer">
            <div 
              className="flex justify-between items-center p-3 rounded-lg" 
              onClick={() => toggleDescription(index)}
            >
              <span className="font-semibold text-lg flex items-center">
                {course.name}
                <span className="ml-2 px-2 py-1 text-xs bg-violet-600 text-white rounded-full">Details</span>
              </span>
              <span>{course.fees}</span>
            </div>
            {expandedIndex === index && (
              <div className="bg-gray-800 bg-opacity-75 p-3 rounded-b-lg text-gray-300 italic text-sm">
                📌 {course.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
