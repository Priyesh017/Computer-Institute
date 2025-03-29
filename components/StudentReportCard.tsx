import { MarksWithEnrollment } from "@/lib/typs";
import React from "react";

const StudentReportCard = ({
  selectedEnrollment: se,
}: {
  selectedEnrollment: MarksWithEnrollment;
}) => {
  const student = {
    enrollment: {
      name: se.enrollment.name,
      father: se.enrollment.father,
      dob: se.enrollment.dob,
      CName: se.enrollment.course.CName,
      Centername: se.enrollment.center.Centername,
      address: se.enrollment.center.address,
    },
    EnrollmentNo: se.EnrollmentNo,
    marks: se.marks,
    remarks: se.remarks,
    totalMarks: se.totalMarks,
    percentage: se.percentage,
    grade: se.grade,
  };

  const { marks, enrollment } = student;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Student Report Card
      </h2>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p>
          <span className="font-semibold">Name:</span> {enrollment.name}
        </p>
        <p>
          <span className="font-semibold">Father&apos;s Name:</span>{" "}
          {enrollment.father}
        </p>
        <p>
          <span className="font-semibold">DOB:</span>{" "}
          {new Date(enrollment.dob).toDateString()}
        </p>
        <p>
          <span className="font-semibold">Enrollment No:</span>{" "}
          {student.EnrollmentNo}
        </p>
        <p>
          <span className="font-semibold">Course:</span> {enrollment.CName}
        </p>
        <p>
          <span className="font-semibold">Center:</span> {enrollment.Centername}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {enrollment.address}
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-6">Marks</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        {marks.map((mark, index) => (
          <div key={index} className="border-b py-2">
            <p>
              <span className="font-semibold">Subject:</span>{" "}
              {mark.subject.charAt(0).toUpperCase() + mark.subject.slice(1)}
            </p>
            <p>
              <span className="font-semibold">Theory:</span> {mark.theoryMarks}{" "}
              / {mark.theoryFullMarks}
            </p>
            <p>
              <span className="font-semibold">Practical:</span>{" "}
              {mark.practicalMarks} / {mark.practicalFullMarks}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center bg-blue-100 p-4 rounded-lg">
        <p>
          <span className="font-semibold">Total Marks:</span>{" "}
          {student.totalMarks}
        </p>
        <p>
          <span className="font-semibold">Percentage:</span>{" "}
          {student.percentage}%
        </p>
        <p>
          <span className="font-semibold">Grade:</span> {student.grade}
        </p>
      </div>

      <p
        className={`mt-4 text-center text-lg font-bold ${
          student.remarks === "PASS" ? "text-green-600" : "text-red-600"
        }`}
      >
        {student.remarks}
      </p>
    </div>
  );
};

export default StudentReportCard;
