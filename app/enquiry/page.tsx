"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/app/_components/combo"; // Ensure this path is correct
import { useDropzone } from "react-dropzone";
import { Loader2, X } from "lucide-react";
import anime from "animejs";
import {
  CategoryValue,
  frameworksEdu,
  IdCardType,
  indianStatesWithDistricts,
  Nationality,
  sexValue,
} from "@/data";
import { fetcher } from "@/helper";
import { toast } from "react-toastify";

const bathroom = ["Yes", "No"];

const initialFormData = {
  name: "",
  father: "",
  coName: "",
  email: "",
  dob: "",
  sex: "",
  category: "",
  nationality: "",
  mobileNo: "",
  stateCoordinator: "",
  districtCoordinator: "",
  subdistrictCoordinator: "",
  address: {
    AddressLine: "",
    vill: "",
    po: "",
    ps: "",
    pin: "",
  },
  state: "",
  dist: "",
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

  const filterfn = () => {
    const data = indianStatesWithDistricts.find(
      (val) => val.label == formData.state
    );
    if (data == undefined) return;

    const arr = data.districts.map((district) => ({
      value: district,
      label: district,
    }));
    return arr;
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
  const [loading, setloading] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);

    try {
      if (!images) return;

      const { url } = await fetcher(
        `/generate-presigned-url?fileName=${images.file.name}&fileType=${images.file.type}&category=enquiry`,
        "GET"
      );
      if (!url) {
        toast("didnot generate url");
        return;
      }

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: images.file,
        headers: {
          "Content-Type": images.file.type,
        },
      });

      if (!uploadResponse.ok) return toast("Upload failed");

      const signatureLink = url.split("?")[0];

      const { success } = await fetcher("/TakeEnquiry", "POST", {
        ...formData,
        signatureLink,
      });

      if (success) toast("success");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
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
            <label className="block text-gray-700 mb-1">
              Applicant&apos;s Name
            </label>
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
            <label className="block text-gray-700 mb-1">Email</label>
            <Input
              type="text"
              name="applicantName"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              Father&apos;s Name
            </label>
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

            <label className="block text-gray-700 ml-5 mb-1">
              Address Line 1
            </label>
            <Input
              type="text"
              name="address"
              placeholder="address line "
              value={formData.address.AddressLine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    AddressLine: e.target.value,
                  },
                })
              }
              className="w-[95%] border rounded-md ml-5 p-2"
            />
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
            <ComboboxDemo
              frameworks={filterfn() ?? []}
              heading={"Select District"}
              value={formData.dist}
              setValue={setFormData}
              data="dist"
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

            <ComboboxDemo
              frameworks={indianStatesWithDistricts}
              heading={"Select State"}
              value={formData.state}
              setValue={setFormData}
              data="state"
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
                setFormData({
                  ...formData,
                  mobileNo: e.target.value.slice(0, 10),
                })
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
              data="idProof"
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
            <label className="block text-gray-700 mb-1">trade License</label>
            <Input
              type="text"
              name="tradeLicense"
              value={formData.tradeLicense}
              onChange={(e) =>
                setFormData({ ...formData, tradeLicense: e.target.value })
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
              heading={"Education Qualification"}
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
          <div>
            <label className="block text-gray-700 mb-1">
              subdistrict Coordinator
            </label>
            <Input
              type="text"
              name="subdistrictCoordinator"
              value={formData.subdistrictCoordinator}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subdistrictCoordinator: e.target.value,
                })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              district Coordinator
            </label>
            <Input
              type="text"
              name="districtCoordinator"
              value={formData.districtCoordinator}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  districtCoordinator: e.target.value,
                })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">
              state Coordinator
            </label>
            <Input
              type="text"
              name="stateCoordinator"
              value={formData.stateCoordinator}
              onChange={(e) =>
                setFormData({ ...formData, stateCoordinator: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex-row md:flex w-full gap-2">
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Applicant&apos;s Signature
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
          disabled={loading}
          className="w-1/3 mx-auto block bg-violet-600 hover:bg-violet-700 text-white rounded-lg mt-4"
        >
          Submit
          {loading && <Loader2 className="animate-spin" />}
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
