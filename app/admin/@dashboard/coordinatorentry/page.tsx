"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { Dropzone } from "@/components/dropzone";
import { fetcherWc } from "@/helper";
import { toast } from "react-toastify";
import { ComboboxDemo } from "@/components/combo";
import { WestBengalDistricts } from "@/data";
import { Button } from "@/components/ui/button";

export default function EntryForm() {
  const [coordinator, setCoordinator] = useState({
    name: "",
    dist: "",
  });
  const [image, setImage] = useState<{ src: string; file: File } | null>(null);

  const [loading, setloading] = useState(false);

  const handleDeleteImage = () => {
    setImage(null);
  };

  const onDrop = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setImage({ src: reader.result as string, file });
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      setloading(true);
      if (!image) return;

      const { url } = await fetcherWc(
        `/generate-presigned-url?fileName=${image.file.name}&fileType=${image.file.type}&category=coordinator`,
        "GET"
      );

      if (!url) {
        toast("didnot generate url");
        return;
      }

      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: image.file,
        headers: {
          "Content-Type": image.file.type,
        },
      });
      if (!uploadResponse.ok) throw new Error("Upload failed");
      const imageUrl = url.split("?")[0];

      const data = await fetcherWc("/Coordinator_Update", "POST", {
        ...coordinator,
        imageUrl,
      });

      toast(data.success ? "success" : "failed");
    } catch (error) {
      toast("error happened");
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 text-black rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center">Coordinator Entry</h2>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District Co-Ordinator Name
          </label>
          <input
            type="text"
            placeholder="District Co-Ordinator Name"
            className="w-full p-2 rounded bg-gray-200 text-black"
            onChange={(e) =>
              setCoordinator({ ...coordinator, name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <ComboboxDemo
            frameworks={WestBengalDistricts}
            heading={`Select District`}
            value={coordinator.dist}
            setValue={setCoordinator}
            data={"dist"}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-center w-full gap-4">
        <div className="w-full md:w-auto">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700"
          >
            District Co-Ordinator Image
          </label>
          <Dropzone onDrop={(files) => onDrop(files)} accept="image/*" />
        </div>

        {image?.src && (
          <div className="relative w-auto h-[98.91px]">
            <motion.img
              src={image.src} // Directly use the data URL
              alt="profile_image"
              className="w-32 h-32 object-cover rounded-md shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <button
              onClick={handleDeleteImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700 shadow-lg"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="">
        Submit {loading && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  );
}
