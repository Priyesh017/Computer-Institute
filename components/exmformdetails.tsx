import { DataItem } from "@/lib/typs";
import { useState } from "react";

export const EnrollmentDetails = ({
  enrollment,
  editable = false,
}: {
  enrollment: DataItem;
  editable?: boolean;
}) => {
  const initialData = {
    id: enrollment.id,
    EnrollmentNo: enrollment.EnrollmentNo,
    createdAt: enrollment.createdAt,
    Name: enrollment.enrollment.name,
    MobileNo: enrollment.enrollment.mobileNo,
    "Email Id": enrollment.enrollment.email,
    address: enrollment.enrollment.address,
    CenterName: enrollment.enrollment.center.Centername,
    IdCardNo: enrollment.enrollment.IdCardNo,
    "Last Payment Reciept No":
      enrollment.enrollment.amount.lastPaymentRecieptno,
    "Course Name": enrollment.enrollment.course.CName,
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-2xl mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="p-3 border-b border-gray-300">
            <label
              htmlFor={key}
              className="font-semibold capitalize text-gray-600 block mb-1"
            >
              {key}:
            </label>
            {editable ? (
              <input
                id={key}
                type={key === "createdAt" ? "date" : "text"}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={
                  key === "createdAt"
                    ? new Date(value).toISOString().substring(0, 10)
                    : value
                }
                onChange={(e) => handleChange(key, e.target.value)}
              />
            ) : (
              <span className="block text-gray-900">
                {key === "createdAt"
                  ? new Date(value).toDateString()
                  : value || "-"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
