"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { fetcherWc } from "@/helper";
import { DropzoneMul } from "@/components/dropzonemultiple";

export default function BannerInsertion() {
  const [images, setImages] = useState<{ src: string; file: File }[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, { src: reader.result as string, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (src: string) => {
    setImages(images.filter((img) => img.src !== src));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    // try {
    //   for (const image of images) {
    //     const { url }: { url: string } = await fetcherWc(
    //       `/generate-presigned-url?fileName=${encodeURIComponent(
    //         image.file.name
    //       )}&fileType=${encodeURIComponent(image.file.type)}`,
    //       "GET"
    //     );

    //     if (!url) throw new Error("Failed to generate pre-signed URL");

    //     const uploadResponse = await fetch(url, {
    //       method: "PUT",
    //       body: image.file,
    //       headers: {
    //         "Content-Type": image.file.type,
    //       },
    //     });

    //     if (!uploadResponse.ok) throw new Error("Upload failed");
    //   }

    //   setImages([]);
    // } catch (err) {
    //   console.error(err);
    //   setError("Something went wrong during upload.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white text-gray-900 rounded-lg">
      <h1 className="text-4xl text-center font-bold">Banner Insertion</h1>
      <div className="border p-4 rounded-lg shadow-md bg-gray-100 text-gray-900 relative">
        <DropzoneMul onDrop={onDrop} />
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <motion.img
                src={img.src}
                alt={`Preview ${index}`}
                className="gallery-item w-full h-32 object-cover rounded-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <button
                onClick={() => handleDeleteImage(img.src)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        onClick={handleSave}
        disabled={loading || images.length === 0}
        className="w-full"
      >
        Save
        {loading && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  );
}
