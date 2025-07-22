"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "react-toastify";
import { fetcherWc } from "@/helper";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { onValue, ref } from "firebase/database";
import { db } from "@/lib/firebaseC";

const VideoUpload = () => {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const [Transcode, setTranscode] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  }, []);

  useEffect(() => {
    if (Transcode >= 100) toast.success("transcoding Successfull");
  }, [Transcode]);

  useEffect(() => {
    const progressRef = ref(db, `progress`);
    const unsubscribe = onValue(progressRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setTranscode(data);
    });

    return () => unsubscribe();
  }, [uploadComplete]);

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
    setVideoFile(null);
  };

  const handleSubmitVideo = async () => {
    if (!videoFile) return toast("no video found");

    try {
      setloading(true);
      const { url } = await fetcherWc(
        `/generate-presigned-url?fileName=${encodeURIComponent(
          videoFile.name
        )}&fileType=${encodeURIComponent(videoFile.type)}&category=temp`,
        "GET"
      );
      if (!url) {
        toast("didnot generate url");
        return;
      }

      await axios.put(url, videoFile, {
        headers: {
          "Content-Type": videoFile.type,
        },
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) {
            toast.warn("Total file size is not available.");
            return;
          }
          const percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(percent);
        },
      });
      setUploadComplete(true);
      toast("Upload successful");
    } catch (error) {
      toast("Upload failed with error");
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 border border-gray-300 bg-gray-100 text-gray-900 rounded-xl shadow-lg w-full max-w-lg mt-5 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800">Upload Video</h2>
      {!videoPreview && (
        <motion.div
          {...getRootProps({
            className: `flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 w-full cursor-pointer transition-all ${
              isDragActive
                ? "border-violet-400 bg-violet-100"
                : "border-gray-400"
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
      )}

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
          <div className="flex space-x-4">
            <Button
              onClick={handleDeleteVideo}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Delete Video
            </Button>
            <Button
              onClick={handleSubmitVideo}
              className={`px-4 py-2 text-white rounded-lg shadow transition ${
                videoFile
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              Submit Video
              {loading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
      )}
      {loading && <Progress value={progress} className="w-[60%]" />}
      {uploadComplete && Transcode <= 100 && (
        <div className="flex flex-col items-center justify-center w-full space-y-4 mt-10">
          <div className="w-[60%] bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-500 ease-in-out"
              style={{ width: `${Transcode}%` }}
            />
          </div>
          <p className="text-lg font-semibold text-indigo-700">
            {Transcode}% Transcoded
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
