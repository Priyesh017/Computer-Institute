import { DataItem } from "@/lib/typs";

export const EnrollmentDetails = ({ enrollment }: { enrollment: DataItem }) => {
  const data = {
    id: enrollment.id,
    EnrollmentNo: enrollment.EnrollmentNo,
    verified: enrollment.verified,
    createdAt: enrollment.createdAt,
    name: enrollment.enrollment.name,
    mobileNo: enrollment.enrollment.name,
    wpNo: enrollment.enrollment.name,
    Enrollmentno: enrollment.enrollment.name,
    address: enrollment.enrollment.name,

    Centername: enrollment.enrollment.center.Centername,

    IdCardNo: enrollment.enrollment.IdCardNo,
    "Last Payment Reciept No":
      enrollment.enrollment.amount.lastPaymentRecieptno,

    CName: enrollment.enrollment.course.CName,
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="p-3 border-b border-gray-300">
            <span className="font-semibold capitalize text-gray-600">
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span className="block text-gray-900">
              {key === "createdAt"
                ? new Date(value as string).toDateString()
                : value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
