"use client";

import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { useEffect, useState } from "react";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { bucketRegion, s3Client } from "@/lib/utils";
import Loader from "../Loader";

const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

const ReceivedVideos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loadingtime, setloadingTime] = useState(false);
  const [videos, setvideos] = useState<string[]>([]);

  useEffect(() => {
    anime({
      targets: ".video-title",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100),
    });

    const fetchGalleryImages = async () => {
      setloadingTime(true);
      try {
        const command = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: `videos/temp`,
        });

        const data = await s3Client.send(command);

        const imageUrls =
          data.Contents?.map((item) => {
            if (!item.Key) return null;
            return `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${item.Key}`;
          }).filter(Boolean) || [];

        setvideos(imageUrls as string[]);

        setloadingTime(false);
      } catch (error) {
        console.error("Error fetching gallery videos:", error);
      }
    };

    fetchGalleryImages();
  }, []);
  if (loadingtime) return <Loader />;
  return (
    <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto space-y-6 mt-6 p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600">
        Received Videos
      </h1>
      {/* Video Titles Column */}
      <div className="flex flex-col w-full items-start gap-3 p-6 bg-gray-800 rounded-lg shadow-md">
        {videos.map((video, id) => (
          <motion.button
            key={id}
            className={`video-title w-full text-left px-6 py-4 rounded-lg font-semibold transition-colors ${
              selectedVideo === video
                ? "bg-violet-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-violet-600 hover:text-white"
            }`}
            onClick={() => setSelectedVideo(video)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {video.split("/")[5]}
          </motion.button>
        ))}
      </div>

      {/* Modal for Selected Video */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              className="relative bg-gray-900 rounded-lg shadow-lg w-full max-w-lg mx-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video controls className="w-full rounded-lg">
                <source
                  src={videos.find((video) => video === selectedVideo)}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="p-3 text-white text-center font-semibold">
                {videos.find((video) => video === selectedVideo)?.split("/")[5]}
              </div>
              <button
                className="absolute top-2 right-2 text-white bg-gray-700 hover:bg-red-600 rounded-full px-2 py-0.5"
                onClick={() => setSelectedVideo(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceivedVideos;
