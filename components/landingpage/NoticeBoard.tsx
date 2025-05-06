"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

import Loader from "../Loader";
import { fetcher } from "@/helper";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";

interface inotice {
  body: string;
  heading: string;
}

export default function NoticeBoard() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const {
    isPending,
    error,
    data: notices,
  } = useQuery<inotice[]>({
    queryKey: ["noticeData"],
    queryFn: () => fetcher("/noticefetch", "GET"),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (expanded || !notices) return;

    const interval = setInterval(() => {
      anime({
        targets: ".notice-text",
        opacity: [1, 0],
        translateY: [0, -10],
        duration: 500,
        easing: "easeInOutQuad",
        complete: () => {
          setIndex((prevIndex) => (prevIndex + 1) % notices.length);
          anime({
            targets: ".notice-text",
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 500,
            easing: "easeInOutQuad",
          });
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [expanded, notices]);

  if (isPending) return <Loader />;
  if (error) return <div>error happend...</div>;

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-100 p-5 rounded-md shadow-md"
      >
        <div className="flex justify-start items-center mb-4 gap-5">
          <span className="w-fit bg-blue-100 text-blue-500 p-2 rounded-full">
            📌
          </span>
          <span className="md:text-3xl text-2xl text-black">Announcement</span>
        </div>
        {notices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-700 rounded-lg p-6">
            <AlertTriangle size={40} className="text-red-500 mb-2" />
            <p className="text-lg font-semibold">No Notices Available</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Stay tuned! New notices will appear here.
            </p>
          </div>
        ) : (
          <div>
            {!expanded ? (
              <div className="relative flex flex-col gap-2">
                <motion.h3
                  key={index}
                  className="notice-text md:text-xl text-lg font-semibold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {notices[index].heading}
                </motion.h3>
                <p className="text-gray-700 md:text-lg text-md">
                  {notices[index].body}
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 max-h-72 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent">
                {notices.map((notice, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-gray-50 rounded-lg shadow-md text-gray-900 flex flex-col gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold">{notice.heading}</h3>
                    <p className="text-gray-700">{notice.body}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
      <button
        className={`px-5 py-3 font-bold transition duration-300 shadow-lg w-full ${
          notices.length === 0
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-500"
        }`}
        onClick={() => setExpanded(!expanded)}
        disabled={notices.length === 0}
      >
        {expanded ? "Collapse Notices" : "View All Notices"}
      </button>
    </div>
  );
}
