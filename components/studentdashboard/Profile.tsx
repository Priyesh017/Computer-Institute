"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store";

export interface StudentProfileProps {
  name: string;
  Enrollmentno: string;
  imageLink: string;
  IdCardNo: string;
  mobileNo: string;
  wpNo: string;
  dob: string;
  father: string;
  mother: string;
  center: string;
  course: string;
  eduqualification: string;
  EnrollmentType: string;
  idCardLink: string;
  admitLink: string;
  certificateLink: string;
  marksheetLink: string;
  createdAt: string;
}

const StudentProfile: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const student = useAuthStore().user as unknown as StudentProfileProps;

  useEffect(() => {
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  if (!student) {
    return (
      <p className="relative top-1/2 text-center text-red-500 ">
        Student data is not available.
      </p>
    );
  }

  const studentDetails = [
    {
      id: "enrollment",
      label: "Enrollment No:",
      value: student.Enrollmentno,
    },
    { id: "card", label: "Student Card:", value: student.IdCardNo },
    { id: "phone", label: "Phone:", value: student.mobileNo },
    { id: "whatsapp", label: "WhatsApp:", value: student.wpNo },
    {
      id: "dob",
      label: "Date of Birth:",
      value: new Date(student.dob).toLocaleDateString(),
    },
    { id: "father", label: "Father:", value: student.father },
    { id: "mother", label: "Mother:", value: student.mother },
    { id: "center", label: "Center:", value: student.center },
    {
      id: "qualification",
      label: "Qualification:",
      value: student.eduqualification,
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      className="max-w-5xl mx-auto my-5 bg-white shadow-lg rounded-2xl p-6 border border-gray-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-6 mb-10">
        {student.imageLink ? (
          <Image
            src={student.imageLink}
            alt="Student Image"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full shadow-lg border-2 border-purple-500"
          />
        ) : (
          <p className="text-gray-500">No Image Available</p>
        )}
        <div>
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
            {student.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{student.course}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-md text-gray-700 dark:text-gray-300">
        {studentDetails.map((detail) => (
          <div key={detail.id} className="flex flex-col">
            <p className="font-semibold">{detail.label}</p>
            <p>{detail.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentProfile;
