"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FranchiseForm = () => {
  type FormDataKey = keyof typeof initialFormData;

  const initialFormData = {
    applicantName: "",
    fatherName: "",
    coName: "",
    dob: "",
    sex: "",
    category: "",
    nationality: "",
    mobileNo: "",
    address: {
      vill: "",
      po: "",
      ps: "",
      dist: "",
      pin: "",
      state: "",
    },
    education: "",
    idProof: "",
    idProofNo: "",
    houseRoomNo: "",
    squareFit: "",
    tradeLicense: "",
    bathroom: "",
  };

  const [formData, setFormData] =
    useState<typeof initialFormData>(initialFormData);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto my-10 p-6 bg-white border border-1 shadow-2xl rounded-2xl"
    >
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Franchise Application Form
      </h1>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Applicant’s Name", key: "applicantName" },
            { label: "Father’s Name", key: "fatherName" },
            { label: "C/O Name", key: "coName" },
            { label: "Date of Birth", key: "dob", type: "date" },
            { label: "Mobile No", key: "mobileNo", type: "tel" },
            { label: "ID Proof No", key: "idProofNo" },
            { label: "House Room No", key: "houseRoomNo" },
            { label: "Square Fit", key: "squareFit" },
            { label: "Trade License", key: "tradeLicense" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-gray-700 mb-1">{field.label}</label>
              <Input
                type={field.type || "text"}
                value={
                  typeof formData[field.key as FormDataKey] === "object"
                    ? ""
                    : (formData[field.key as FormDataKey] as
                        | string
                        | number
                        | undefined)
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.key as FormDataKey]: e.target.value,
                  })
                }
                className="w-full border rounded-md p-5"
              />
            </div>
          ))}
          <div>
            <label className="block text-gray-700 mb-1">Sex</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border rounded-md p-2">
                {formData.sex || "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Male", "Female", "Transgender"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setFormData({ ...formData, sex: option })}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border rounded-md p-2">
                {formData.category || "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["General", "SC", "ST", "OBC", "PH", "Others"].map(
                  (option) => (
                    <DropdownMenuItem
                      key={option}
                      onClick={() =>
                        setFormData({ ...formData, category: option })
                      }
                    >
                      {option}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nationality</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border rounded-md p-2">
                {formData.nationality || "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Indian", "Foreigner"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() =>
                      setFormData({ ...formData, nationality: option })
                    }
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Bathroom</label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border rounded-md p-2">
                {formData.bathroom || "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Yes", "No"].map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() =>
                      setFormData({ ...formData, bathroom: option })
                    }
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button className="w-1/3 mx-auto block bg-violet-600 hover:bg-violet-700 text-white rounded-lg mt-4">
          Submit
        </Button>
      </form>
    </motion.div>
  );
};

export default FranchiseForm;
