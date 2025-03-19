"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/app/_components/combo"; // Ensure this path is correct
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";
import anime from "animejs";
import {
  CategoryValue,
  frameworksEdu,
  IdCardType,
  Nationality,
  sexValue,
} from "@/data";

const bathroom = ["Yes", "No"];

export interface efd {
  applicantName: string;
  fatherName: string;
  coName: string;
  dob: string;
  gender: string;
  category: string;
  nationality: string;
  mobileNo: string;
  address: {
    vill: string;
    po: string;
    ps: string;
    dist: string;
    pin: string;
    state: string;
  };
  education: string;
  idProof: string;
  idProofNo: string;
  houseRoomNo: string;
  squareFit: string;
  tradeLicense: string;
  bathroom: string;
}
const initialFormData = {
  name: "",
  father: "",
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
  eduqualification: "",
  idProof: "",
  idProofNo: "",
  houseRoomNo: "",
  squareFit: "",
  tradeLicense: "",
  bathroom: "",
};
export type FormDataKey = typeof initialFormData;

const FranchiseForm = () => {
  const [images, setImages] = useState<{ src: string; file: File } | null>(
    null
  );

  const handleDeleteImage = () => {
    setImages(null);
  };

  const onDrop = (acceptedFile: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImages({ src: reader.result as string, file: acceptedFile });
      anime({
        targets: ".gallery-item",
        opacity: [0, 1],
        translateY: [50, 0],
        easing: "easeOutElastic(1, .8)",
        duration: 1000,
      });
    };
    reader.readAsDataURL(acceptedFile);
  };

  const [formData, setFormData] = useState<FormDataKey>(initialFormData);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
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
          <div>
            <label className="block text-gray-700 mb-1">Applicant’s Name</label>
            <Input
              type="text"
              name="applicantName"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Father’s Name</label>
            <Input
              type="text"
              name="fatherName"
              value={formData.father}
              onChange={(e) =>
                setFormData({ ...formData, father: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">C/O Name</label>
            <Input
              type="text"
              name="coName"
              value={formData.coName}
              onChange={(e) =>
                setFormData({ ...formData, coName: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-bold text-lg text-gray-700 mb-1">
              Address
            </label>
            <label className="block text-gray-700 ml-5 mb-1">Village</label>
            <Input
              type="text"
              name="address"
              value={formData.address.vill}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    vill: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md ml-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mt-7 mr-5 mb-1">
              Post Office
            </label>
            <Input
              type="text"
              name="address"
              value={formData.address.po}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    po: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md mr-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 ml-5 mb-1">
              Police Station
            </label>
            <Input
              type="text"
              name="address"
              value={formData.address.ps}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    ps: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md ml-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mr-5 mb-1">District</label>
            <Input
              type="text"
              name="address"
              value={formData.address.dist}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    dist: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md mr-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 ml-5 mb-1">Pincode</label>
            <Input
              type="text"
              name="address"
              value={formData.address.pin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    pin: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md ml-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mr-5 mb-1">State</label>
            <Input
              type="text"
              name="address"
              value={formData.address.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    state: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md mr-5 p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <ComboboxDemo
              frameworks={sexValue}
              heading={"Select Gender"}
              value={formData.sex}
              setValue={setFormData}
              data="sex"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <ComboboxDemo
              frameworks={CategoryValue}
              heading={"Select Category"}
              value={formData.category}
              setValue={setFormData}
              data="category"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nationality</label>
            <ComboboxDemo
              frameworks={Nationality}
              heading={"Select Nationality"}
              value={formData.nationality}
              setValue={setFormData}
              data="nationality"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Mobile No</label>
            <Input
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={(e) =>
                setFormData({ ...formData, mobileNo: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">ID Proof</label>
            <ComboboxDemo
              frameworks={IdCardType}
              heading={"Select ID Proof"}
              value={formData.idProof}
              setValue={setFormData}
              data="idtype"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">ID Proof No</label>
            <Input
              type="text"
              name="idProofNo"
              value={formData.idProofNo}
              onChange={(e) =>
                setFormData({ ...formData, idProofNo: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">House Room No</label>
            <Input
              type="number"
              name="houseRoomNo"
              value={formData.houseRoomNo}
              onChange={(e) =>
                setFormData({ ...formData, houseRoomNo: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Square Fit</label>
            <Input
              type="number"
              name="squareFit"
              value={formData.squareFit}
              onChange={(e) =>
                setFormData({ ...formData, squareFit: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Education Qualification
            </label>
            <ComboboxDemo
              frameworks={frameworksEdu}
              heading={"Select Bathroom"}
              value={formData.eduqualification}
              setValue={setFormData}
              data="eduqualification"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Bathroom</label>
            <ComboboxDemo
              frameworks={bathroom.map((item) => ({
                value: item,
                label: item,
              }))}
              heading={"Select Bathroom"}
              value={formData.bathroom}
              setValue={setFormData}
              data="bathroom"
            />
          </div>
          <div className="flex-row md:flex w-full gap-2">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Applicant Image
              </label>
              <Dropzone onDrop={(files) => onDrop(files)} />
            </div>
            <div className="flex-1 mt-2 gap-4 min-w-fit">
              <div className="relative">
                {images && (
                  <>
                    <motion.img
                      src={images.src}
                      alt="student_image"
                      className="gallery-item w-fit h-32 object-cover rounded-md"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    <button
                      onClick={() => handleDeleteImage()}
                      className="absolute top-0 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
                    >
                      <X size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          onClick={submitHandler}
          className="w-1/3 mx-auto block bg-violet-600 hover:bg-violet-700 text-white rounded-lg mt-4"
        >
          Submit
        </Button>
      </form>
    </motion.div>
  );
};

function Dropzone({ onDrop }: { onDrop: (files: File) => void }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles[0]); // Only take the first file
      }
    },
    accept: { "image/*": [] }, // Only allow images
    multiple: false, // Prevent multiple file selection
  });

  return (
    <div
      {...getRootProps()}
      className="p-6 max-w-56 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer hover:border-gray-600 transition bg-gray-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop images here or click to select
      </p>
    </div>
  );
}

export default FranchiseForm;
