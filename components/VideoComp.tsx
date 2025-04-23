"use client";

import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { useEffect, useState } from "react";
import { fetcher } from "@/helper";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import ReactPlyrExample from "./vdotemp";

const ReceivedVideos: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    anime({
      targets: ".video-title",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutExpo",
      duration: 800,
      delay: anime.stagger(100),
    });
  }, []);

  const fetchGalleryImages = async () => {
    const data = await fetcher("/fetch_master", "POST", {
      Prefix: `hls/`,
    });

    return data as string[];
  };

  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["galleryVideos"],
    queryFn: fetchGalleryImages,
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) return <Loader />;

  if (videos == undefined || isError) return <h1>error happened</h1>;

  return (
    <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto space-y-6 mt-6 p-4">
      <h1 className="text-3xl font-bold text-center text-purple-600">
        Received Videos
      </h1>
      {/* Video Titles Column */}
      <div className="flex flex-col w-full items-start gap-3 p-6 bg-gray-800 rounded-lg shadow-md">
        {videos.map((video, id) => {
          const videoname = video.split("/")[0] + ".mp4";
          return (
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
              {videoname}
            </motion.button>
          );
        })}
      </div>

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
              <ReactPlyrExample
                src={`${process.env.NEXT_PUBLIC_BUCKET_URI}${selectedVideo}master.m3u8`}
              />

              <div className="p-3 text-white text-center font-semibold">
                {videos.find((video) => video === selectedVideo)?.split("/")[0]}
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
