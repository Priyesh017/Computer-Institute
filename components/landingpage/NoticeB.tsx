"use client";

import { fetcher } from "@/helper";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { toast } from "react-toastify";

interface inotice {
  id: number;
  body: string;
  heading: string;
  createdAt: string;
}

export default function NoticeBoard() {
  const [, setHoveredNotice] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const noticesRef = useRef<HTMLDivElement>(null);

  const {
    isPending,
    error,
    data: notices,
  } = useQuery<inotice[]>({
    queryKey: ["noticeData"],
    queryFn: () => fetcher("/noticefetch", "GET"),
    staleTime: 1000 * 60 * 5 * 100,
    refetchOnMount: false,
  });

  // Sort notices by 'upto' date (newest first) or add 'createdAt' to inotice if needed
  const sortedNotices = (notices ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  // For animation in collapsed mode, show only 3 notices
  const displayedNotices = isExpanded
    ? sortedNotices
    : sortedNotices.slice(0, 3);

  const noticeColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-gray-500",
  ];

  const formatCreatedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "1 day ago";
    }

    return `${diffInDays} days ago`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (error) {
    toast("Error in fetching Notices");
    return;
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row border-b border-slate-300">
      {/* Left Side - Dark Background with Notice Board Header */}
      <motion.div
        className="w-full md:w-1/3 bg-slate-700 flex flex-col items-center justify-center relative overflow-hidden py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Header Content */}
        <div className="relative z-10 text-center">
          {/* Large Pushpin Icon */}
          <motion.div
            className="mb-8"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PushpinIcon className="w-24 h-24 text-teal-400 mx-auto" />
          </motion.div>

          {/* Notice Board Title */}
          <motion.h1
            className="text-6xl font-bold text-white mb-4 tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Notice Board
          </motion.h1>

          {/* Computer Center Subtitle */}
          <motion.div
            className="space-y-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-2xl text-teal-200 font-medium">
              Computer Training Center
            </p>
            <p className="text-lg text-slate-300">Announcements</p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="w-2 h-2 bg-teal-300 rounded-full"></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Light Background with Notices */}
      {isPending ? (
        <div className="text-center">Loading...</div>
      ) : notices.length === 0 ? (
        <div className="flex justify-center items-center w-full md:w-2/3 text-2xl text-gray-500">
          Notice not available
        </div>
      ) : (
        <motion.div
          className="w-full md:w-2/3 bg-gray-50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%">
              <defs>
                <pattern
                  id="dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="10" cy="10" r="1" fill="#94a3b8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          {/* Header for the list */}
          <motion.div
            className="relative z-10 p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <PushpinIcon className="w-6 h-6 text-teal-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Recent Notices
                  {notices.length != 0 && (
                    <p className="md:hidden text-xs font-normal text-slate-600 flex items-center gap-2">
                      <span>📋</span>
                      <span>{`Last updated: ${formatCreatedDate(
                        sortedNotices[0]?.createdAt
                      )}`}</span>
                    </p>
                  )}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {isExpanded
                    ? `All ${sortedNotices.length}`
                    : `${displayedNotices.length} of ${sortedNotices.length}`}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notices Container */}
          {isExpanded ? (
            <div>
              {/* Static view for all notices (expanded mode) */}
              <div className="relative z-10 p-6 overflow-y-auto h-[calc(100vh-160px)]">
                <div className="space-y-4 pb-20">
                  <AnimatePresence>
                    {displayedNotices.map((notice, index) => (
                      <motion.div
                        key={notice.id}
                        className="group cursor-pointer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setHoveredNotice(notice.id)}
                        onHoverEnd={() => setHoveredNotice(null)}
                      >
                        <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                          {/* Order Number */}
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                noticeColors[index % noticeColors.length]
                              }`}
                            >
                              {index + 1}
                            </div>
                          </div>

                          {/* Notice Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📢</span>
                                <h3 className="font-bold font-serif text-slate-800 text-lg leading-tight">
                                  {notice.heading}
                                </h3>
                                {new Date().getTime() -
                                  new Date(notice.createdAt).getTime() <
                                  24 * 60 * 60 * 1000 && (
                                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="text-right text-xs text-slate-500">
                                <div>{formatCreatedDate(notice.createdAt)}</div>
                                <div className="font-medium">
                                  {formatDate(notice.createdAt)}
                                </div>
                              </div>
                            </div>

                            <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                              {notice.body}
                            </p>

                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs px-3 py-1 rounded-full font-medium text-gray-600`}
                              >
                                Announcement
                              </span>

                              {/* Colored accent bar */}
                              <div
                                className={`w-16 h-1 rounded-full opacity-60 ${
                                  noticeColors[index % noticeColors.length]
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              {/* Show Less Button */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={toggleExpand}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-full shadow-md transition-all duration-200 font-medium"
                >
                  <span>Show Less</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </motion.div>
            </div>
          ) : (
            // Static view for 3 notices (collapsed mode)
            <div>
              <div
                ref={scrollContainerRef}
                className="relative z-10 overflow-y-auto h-[calc(100vh-160px)]"
              >
                {/* Notices List - NO DUPLICATION */}
                <div ref={noticesRef} className="p-6 space-y-4">
                  {/* Only show the 3 notices without duplication */}
                  {displayedNotices.map((notice, index) => (
                    <motion.div
                      key={notice.id}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredNotice(notice.id)}
                      onHoverEnd={() => setHoveredNotice(null)}
                    >
                      <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                        {/* Order Number */}
                        <div className="flex-shrink-0">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              noticeColors[index % noticeColors.length]
                            }`}
                          >
                            {index + 1}
                          </div>
                        </div>

                        {/* Notice Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📢</span>
                              <h3 className="font-bold font-serif text-slate-800 text-lg leading-tight">
                                {notice.heading}
                              </h3>
                              {new Date().getTime() -
                                new Date(notice.createdAt).getTime() <
                                24 * 60 * 60 * 1000 && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-right text-xs text-slate-500">
                              <div>{formatCreatedDate(notice.createdAt)}</div>
                              <div className="font-medium">
                                {formatDate(notice.createdAt)}
                              </div>
                            </div>
                          </div>

                          <p className="text-slate-700 text-sm mb-3 leading-relaxed">
                            {notice.body}
                          </p>

                          <div className="flex items-center justify-between">
                            <span
                              className={`text-xs px-3 py-1 rounded-full font-medium text-gray-600`}
                            >
                              Announcement
                            </span>

                            {/* Colored accent bar */}
                            <div
                              className={`w-16 h-1 rounded-full opacity-60 ${
                                noticeColors[index % noticeColors.length]
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Show All Button positioned after notices */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={toggleExpand}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-full shadow-md transition-all duration-200 font-medium"
                >
                  <span className="md:block hidden">
                    Show All {sortedNotices.length} Notices
                  </span>
                  <span className="block md:hidden">Show All</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </motion.div>
            </div>
          )}

          {/* Bottom Info */}
          {notices.length != 0 && (
            <motion.div
              className="hidden md:block absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-gray-200 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="md:hidden text-xs font-normal text-slate-600 flex items-center gap-2">
                <span>📋</span>
                <span>{`Last updated: ${formatCreatedDate(
                  sortedNotices[0]?.createdAt
                )}`}</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Pushpin Icon Component
function PushpinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C13.1 2 14 2.9 14 4C14 4.8 13.6 5.5 13 5.9V7H16C16.6 7 17 7.4 17 8S16.6 9 16 9H13V10.1C13.6 10.5 14 11.2 14 12C14 13.1 13.1 14 12 14S10 13.1 10 12C10 11.2 10.4 10.5 11 10.1V9H8C7.4 9 7 8.6 7 8S7.4 7 8 7H11V5.9C10.4 5.5 10 4.8 10 4C10 2.9 10.9 2 12 2M12 15L13 22H11L12 15Z" />
    </svg>
  );
}
