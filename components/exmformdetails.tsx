import { Enrollmenttype } from "@/lib/typs";

export const EnrollmentDetails = ({
  enrollment,
}: {
  enrollment: Enrollmenttype;
}) => {
  const initialData = {
    id: enrollment?.EnrollmentNo,
    EnrollmentNo: enrollment?.EnrollmentNo,
    "Addmission date": enrollment?.createdAt,
    Name: enrollment.name,
    "Date Of Birth": new Date(enrollment.dob).toLocaleDateString(),
    Address: enrollment.address,
  };

  return (
    <div className="w-2xl mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(initialData).map(([key, value]) => (
          <div key={key} className="p-3 border-b border-gray-300">
            <label
              htmlFor={key}
              className="font-semibold capitalize text-gray-600 block mb-1"
            >
              {key}:
            </label>

            <span className="block text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
