"use client";

import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import anime from "animejs";
import {
  CategoryValue,
  frameworksCourse,
  frameworksEdu,
  IdCardType,
  Nationality,
  sexValue,
} from "@/data";
import { tfd } from "@/lib/typs";
import { ComboboxDemo } from "@/components/combo";
import { Dropzone } from "@/components/dropzone";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  Address: z.string().min(5, "Address must be at least 5 characters long"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  eduqualification: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  courseid: z.string().min(1, "Required"),
  idtype: z.string().min(1, "Required"),
  idProofNo: z.string().min(1, "Required"),
  nationality: z.string().min(1, "Required"),
  sex: z.string().min(1, "Required"),
  mobile: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
  wapp: z.string().regex(/^\d{10}$/, "Invalid WhatsApp number"),
});

const AddStudent: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState<{ src: string; file: File } | null>(
    null
  );
  const [fd, setfd] = useState<tfd>({
    name: "",
    fatherName: "",
    motherName: "",
    Address: "",
    dob: "",
    mobile: "",
    wapp: "",
    eduqualification: "",
    courseid: "",
    category: "",
    nationality: "",
    sex: "",
    idProofNo: "",
    idtype: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setfd((prevFd) => ({ ...prevFd, [id]: value }));
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

  const handleDeleteImage = () => setImages(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = formSchema.safeParse(fd);
    if (!result.success) {
      toast("Please correct the input fields");
      return;
    }
    try {
      setLoader(true);
      if (!images) return;

      const { url } = await fetcherWc(
        `/generate-presigned-url?fileName=${images.file.name}&fileType=${images.file.type}&category=face`,
        "GET"
      );
      if (!url) {
        toast("Failed to generate upload URL");
        return;
      }

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: images.file,
        headers: { "Content-Type": images.file.type },
      });
      if (!uploadResponse.ok) throw new Error("Upload failed");

      const imageUrl = url.split("?")[0];
      const data = await fetcherWc("/createEnrollment", "POST", {
        ...fd,
        imageUrl,
      });
      toast(data.success);
    } catch (error) {
      toast("An error occurred");
    }
    setLoader(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 md:px-8">
      <form
        className="w-full min-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">
          Add Student
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            "name",
            "fatherName",
            "motherName",
            "Address",
            "mobile",
            "wapp",
            "dob",
            "idProofNo",
          ].map((field) => (
            <input
              key={field}
              id={field}
              type="text"
              placeholder={field}
              value={fd[field as keyof tfd]}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
          {[
            { label: "Course", key: "courseid", values: frameworksCourse },
            {
              label: "Education",
              key: "eduqualification",
              values: frameworksEdu,
            },
            { label: "Nationality", key: "nationality", values: Nationality },
            { label: "Category", key: "category", values: CategoryValue },
            { label: "Sex", key: "sex", values: sexValue },
            { label: "ID Type", key: "idtype", values: IdCardType },
          ].map(({ label, key, values }) => (
            <ComboboxDemo
              key={key}
              frameworks={values}
              heading={label}
              value={fd[key as keyof tfd]}
              setValue={setfd}
              data={key}
            />
          ))}
          <div className="flex flex-col md:flex-row w-full gap-4">
            {/* Dropzone Section */}
            <div className="w-full md:w-auto">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Applicant Image
              </label>
              <Dropzone onDrop={(files) => onDrop(files)} accept="image/*" />
            </div>

            {/* Image Preview Section */}
            <div className="flex-1 flex items-start gap-4 min-w-fit mt-2">
              {images && (
                <div className="relative w-auto h-[98.91px]">
                  <motion.img
                    src={images.src}
                    alt="student_image"
                    className="w-32 h-32 object-cover rounded-md shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <button
                    onClick={() => handleDeleteImage()}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loader}
          className=" text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
        >
          Submit
          {loader && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </div>
  );
};

export default AddStudent;
