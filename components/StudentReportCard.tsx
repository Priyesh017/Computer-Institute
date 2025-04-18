import { MarksWithEnrollment } from "@/lib/typs";
import React, { useState } from "react";

const StudentReportCard = ({
  selectedEnrollment: se,
  editable = false,
}: {
  selectedEnrollment: MarksWithEnrollment;
  editable?: boolean;
}) => {
  const [formData, setFormData] = useState({
    name: se.enrollment.name,
    father: se.enrollment.father,
    dob: se.enrollment.dob,
    course: se.enrollment.course.CName,
    center: se.enrollment.center.Centername,
    address: se.enrollment.center.address,
    EnrollmentNo: se.EnrollmentNo,
    remarks: se.remarks,
    totalMarks: se.totalMarks,
    percentage: se.percentage,
    grade: se.grade,
    marks: se.marks,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMarkChange = (
    index: number,
    field: "theoryMarks" | "practicalMarks",
    value: string
  ) => {
    const updatedMarks = [...formData.marks];
    updatedMarks[index][field] = Number(value).toString();
    setFormData((prev) => ({
      ...prev,
      marks: updatedMarks,
    }));
  };

  const labelClass = "font-semibold";
  const inputClass =
    "w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";
  const renderField = (
    label: string,
    value: string,
    fieldName: string,
    isTextArea = false
  ) => (
    <div className="mb-2">
      <label className={labelClass}>{label}: </label>
      {editable ? (
        isTextArea ? (
          <textarea
            className={inputClass}
            rows={3}
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        ) : (
          <input
            type={fieldName === "dob" ? "date" : "text"}
            className={inputClass}
            value={
              fieldName === "dob"
                ? new Date(value).toISOString().substring(0, 10)
                : value
            }
            onChange={(e) => handleChange(fieldName, e.target.value)}
          />
        )
      ) : (
        <span
          className={`mt-1 ${
            fieldName === "remarks"
              ? value === "PASS"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
              : ""
          }`}
        >
          {fieldName === "dob" ? new Date(value).toDateString() : value}
        </span>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Student Report Card
      </h2>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg">
        {renderField("Name", formData.name, "name")}
        {renderField("Father's Name", formData.father, "father")}
        {renderField("DOB", formData.dob.toString(), "dob")}
        {renderField(
          "Enrollment No",
          formData.EnrollmentNo.toString(),
          "EnrollmentNo"
        )}
        {renderField("Course", formData.course, "course")}
        {renderField("Center", formData.center, "center")}
        {renderField("Address", formData.address, "address", true)}
      </div>

      <h3 className="text-lg font-semibold mt-6">Marks</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        {formData.marks.map((mark, index) => (
          <div key={index} className="border-b py-2">
            <p>
              <span className={labelClass}>Subject:</span>{" "}
              {mark.subject.charAt(0).toUpperCase() + mark.subject.slice(1)}
            </p>

            {editable ? (
              <>
                <div className="flex gap-4 mt-1">
                  <label className="flex justify-center items-center gap-2">
                    <span className={labelClass}>Theory:</span>
                    <input
                      type="number"
                      className={inputClass}
                      value={mark.theoryMarks}
                      onChange={(e) =>
                        handleMarkChange(index, "theoryMarks", e.target.value)
                      }
                    />
                  </label>
                  <label className="flex justify-center items-center gap-2">
                    <span className={labelClass}>Practical:</span>
                    <input
                      type="number"
                      className={inputClass}
                      value={mark.practicalMarks}
                      onChange={(e) =>
                        handleMarkChange(
                          index,
                          "practicalMarks",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
              </>
            ) : (
              <>
                <p>
                  <span className={labelClass}>Theory:</span> {mark.theoryMarks}{" "}
                  / {mark.theoryFullMarks}
                </p>
                <p>
                  <span className={labelClass}>Practical:</span>{" "}
                  {mark.practicalMarks} / {mark.practicalFullMarks}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center gap-2 bg-blue-100 p-4 rounded-lg">
        {renderField(
          "Total Marks",
          formData.totalMarks.toString(),
          "totalMarks"
        )}
        {renderField(
          "Percentage",
          formData.percentage.toString(),
          "percentage"
        )}
        {renderField("Grade", formData.grade, "grade")}
      </div>

      <div className="mt-4">
        {renderField("Remarks", formData.remarks, "remarks")}
      </div>
    </div>
  );
};

export default StudentReportCard;
