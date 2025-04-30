import { Enrollmenttype } from "@/lib/typs";
import { motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { MdDeleteOutline } from "react-icons/md";

export const EnrollmentDetails = ({
  enrollment,
  editable = false,
  deletehandler,
  loading,
  updatehandler,
  setFormData,
  formData,
}: {
  enrollment: Enrollmenttype;
  editable?: boolean;
  deletehandler?: () => void;
  loading?: boolean;
  updatehandler?: () => void;
  setFormData?: Dispatch<SetStateAction<Enrollmenttype | null>>;
  formData?: Enrollmenttype | null;
}) => {
  if (!setFormData) return;

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [key]: value || "" };
    });
  };
  const download = [
    "marksheetLink",
    "admitLink",
    "certificateLink",
    "imageLink",
    "idCardLink",
  ];
  const ignore = ["status", "activated", "id", "centerid", "EnrollmentNo"];
  console.log(formData);
  if (!formData) return;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Enrollment Details
      </h2>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        {Object.entries(formData).map(([key, value]) => {
          if (key === "course") return null;
          if (download.includes(key))
            return (
              value !== "notavl" && (
                <motion.a
                  key={key}
                  href={value}
                  download
                  className="download-item flex items-center justify-between p-4 border  rounded-lg shadow-md hover:bg-violet-700/40 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg font-medium">
                    {key.split("Link")[0].toUpperCase()}
                  </span>
                  <Download size={24} />
                </motion.a>
              )
            );
          if (ignore.includes(key)) return null;
          const displayLabel = key.replace(/([A-Z])/g, " $1").trim();

          return (
            <div key={key} className="p-3 border-b border-gray-300">
              <label
                htmlFor={key}
                className="font-semibold capitalize text-gray-600 block mb-1"
              >
                {key === "createdAt" ? "Admission Date" : displayLabel}:
              </label>
              {editable ? (
                <input
                  id={key}
                  type={key === "dob" || key === "createdAt" ? "date" : "text"}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={
                    key === "status"
                      ? value.value
                      : key === "createdAt" || key === "dob"
                      ? new Date(value).toISOString().substring(0, 10)
                      : value
                  }
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <span className="block text-gray-900">
                  {key === "status"
                    ? value.value
                    : key === "createdAt" || key === "dob"
                    ? new Date(value).toDateString()
                    : value || "-"}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {enrollment.status.val !== "passout" && (
        <Button
          variant={"destructive"}
          className="mt-2"
          onClick={deletehandler}
        >
          delete <MdDeleteOutline />
          {loading && <Loader2 className="animate-spin" />}
        </Button>
      )}
      {editable && (
        <Button className="mt-2 ml-2" onClick={updatehandler}>
          update
          {loading && <Loader2 className="animate-spin" />}
        </Button>
      )}
    </div>
  );
};
