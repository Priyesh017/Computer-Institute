"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { fetcherWc } from "@/helper";

const categories = [
  "Program",
  "Picnic",
  "Classroom",
  "Examination",
  "Tree Plantation",
  "Cultural Fest",
  "Award Ceremony",
  "Certification",
];

export default function GalleryInsertion() {
  const [images, setImages] = useState<
    { category: string; src: string; file: File }[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles: File[], category: string) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [
          ...prev,
          { category, src: reader.result as string, file },
        ]);
        anime({
          targets: ".gallery-item",
          opacity: [0, 1],
          translateY: [50, 0],
          easing: "easeOutElastic(1, .8)",
          duration: 1000,
        });
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

    try {
      for (const image of images) {
        const { url } = await fetcherWc(
          `/generate-presigned-url?fileName=${image.file.name}&fileType=${image.file.type}&category=${image.category}`,
          "GET"
        );
        console.log(image.file.type);
        if (!url) throw new Error("Failed to generate pre-signed URL");

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: image.file,
          headers: {
            "Content-Type": image.file.type,
          },
        });

        if (!uploadResponse.ok) throw new Error("Upload failed");
      }

      setImages([]); // Clear images after successful upload
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 bg-white text-gray-900 rounded-lg">
      {categories.map((category) => (
        <div
          key={category}
          className="border p-4 rounded-lg shadow-md bg-gray-100 text-gray-900 relative"
        >
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <Dropzone onDrop={(files) => onDrop(files, category)} />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images
              .filter((img) => img.category === category)
              .map((img, index) => (
                <div key={index} className="relative">
                  <motion.img
                    src={img.src}
                    alt={category}
                    className="gallery-item w-full h-32 object-cover rounded-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <button
                    onClick={() => handleDeleteImage(img.src)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
                  >
                    <X size={24} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <Button
        onClick={handleSave}
        disabled={loading || images.length === 0}
        className="w-full"
      >
        {loading ? "Saving..." : "Save Images"}
      </Button>
    </div>
  );
}

function Dropzone({ onDrop }: { onDrop: (files: File[]) => void }) {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="p-6 border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer hover:border-gray-600 transition bg-gray-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop images here or click to select
      </p>
    </div>
  );
}
