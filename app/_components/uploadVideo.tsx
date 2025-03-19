"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

const VideoUpload = () => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  }, []);

  // Cleanup the preview URL when the component unmounts or the video changes
  useEffect(() => {
    return () => {
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
    };
  }, [videoPreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
  });

  const handleDeleteVideo = () => {
    setVideoPreview(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 border border-gray-300 bg-gray-100 text-gray-900 rounded-xl shadow-lg w-full max-w-lg mt-5 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Video</h2>
      <motion.div
        {...getRootProps({
          className: `flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 w-full cursor-pointer transition-all ${
            isDragActive ? "border-violet-400 bg-violet-100" : "border-gray-400"
          }`,
        })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 text-violet-400" />
        <p className="text-gray-600 mt-2">
          Drag & drop a video file here, or click to select one
        </p>
      </motion.div>

      {videoPreview && (
        <div className="w-full flex flex-col justify-center items-center space-y-4">
          <motion.video
            id="video-preview"
            src={videoPreview}
            controls
            className="w-full rounded-lg shadow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <button
            onClick={handleDeleteVideo}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Delete Video
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
