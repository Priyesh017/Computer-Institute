"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function UploadNotes() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<{ src: string; file: File } | null>(
    null
  );

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

  const handleDeleteImage = () => {
    setImages(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subject || !description || !images?.file) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("image", images.file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
    >
      <div className="w-full max-w-lg p-8 bg-yellow-100 text-gray-900 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Upload Written Notes
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <input
              type="text"
              placeholder="Subject Name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Image
            </label>
            <Dropzone onDrop={onDrop} />
          </div>
          {images && (
            <div className="gallery-item relative mt-4">
              <Image
                src={images.src}
                alt="Uploaded Preview"
                className="w-full rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-sm"
              >
                ✕
              </button>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-3 rounded-lg shadow-md"
          >
            Upload
          </button>
        </form>
      </div>
    </motion.div>
  );
}

function Dropzone({ onDrop }: { onDrop: (file: File) => void }) {
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
      className="p-6 max-w-full border-dashed border-2 border-gray-400 rounded-md text-center cursor-pointer hover:border-gray-600 transition bg-gray-50"
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        Drag & drop an image here or click to select
      </p>
    </div>
  );
}
