"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/dropzone";

export default function UploadNotes() {
  const [pdf, setPdf] = useState<{ src: string; file: File } | null>(null);
  const [loading, setloading] = useState(false);

  const onDrop = (acceptedFile: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPdf({ src: reader.result as string, file: acceptedFile });

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
    setPdf(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pdf?.file) {
      toast("Please fill all fields and upload an image.");
      return;
    }
    setloading(true);
    const { url } = await fetcherWc(
      `/generate-presigned-url?fileName=${pdf.file.name}&fileType=${pdf.file.type}&category=notes`,
      "GET"
    );
    if (!url) {
      toast("didnot generate url");
      return;
    }

    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: pdf.file,
      headers: {
        "Content-Type": pdf.file.type,
      },
    });
    setloading(false);
    if (!uploadResponse.ok) {
      toast.error("error happend");
      return;
    }

    toast.success("uploaded");
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
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Notes PDF
            </label>
            <Dropzone onDrop={onDrop} accept="application/pdf" />
          </div>
          {pdf && (
            <div className="gallery-item relative mt-4">
              <embed
                src={pdf.src}
                type="application/pdf"
                className="w-full h-96 rounded-lg shadow-md"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-[-15] right-[-15] bg-red-500 text-white rounded-md p-2 text-sm"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-3 rounded-lg shadow-md"
          >
            Upload
            {loading && <Loader2 className="animate-spin" />}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
