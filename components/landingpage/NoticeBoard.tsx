"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

const notices = [
  {
    subject: "🚀 Welcome Announcement",
    details: "Welcome to our official website! Stay tuned for updates.",
    date: "March 18, 2025",
  },
  {
    subject: "📢 Admissions Open",
    details: "Admissions for the new session are now open. Apply now!",
    date: "March 15, 2025",
  },
  {
    subject: "🎉 Annual Sports Day",
    details: "Join us for the Annual Sports Day on March 25th. Don't miss out!",
    date: "March 10, 2025",
  },
  {
    subject: "📝 Exam Schedule Released",
    details:
      "The new exam schedule has been released. Check the portal for details.",
    date: "March 8, 2025",
  },
  {
    subject: "🔔 Latest Campus News",
    details: "Stay updated with the latest campus news and announcements.",
    date: "March 5, 2025",
  },
];

export default function NoticeBoard() {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) return;
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
  }, [expanded]);

  return (
    <div className="relative md:w-full md:max-w-6xl md:mx-auto mx-2 md:py-6 md:px-10 p-4 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 backdrop-blur-lg">
      <div className="flex justify-between items-center md:mb-4 mb-2">
        <h2 className="md:text-2xl text-xl font-bold text-gray-800">Notice to All</h2>
        <img src="/logo.png" alt="Logo" className="w-12 h-12" />
      </div>
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
          <span className="md:text-3xl text-2xl">Announcement</span>
        </div>
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
              {notices[index].subject}
            </motion.h3>
            <p className="text-gray-700 md:text-lg text-md">
              {notices[index].details}
            </p>
            <span className="text-sm text-gray-500">{notices[index].date}</span>
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
                <h3 className="text-lg font-semibold">{notice.subject}</h3>
                <p className="text-gray-700">{notice.details}</p>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      <button
        className="mt-5 px-5 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition duration-300 shadow-lg w-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Collapse Notices" : "View All Notices"}
      </button>
    </div>
  );
}
