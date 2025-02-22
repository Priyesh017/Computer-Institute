"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";

const Banner = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime.timeline({ loop: false }).add({
      targets: textRef.current?.querySelectorAll("span"),
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <div className="relative bottom-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-4 p-4">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-bold">
          <span className="text-black dark:text-white">Better </span>
          <span className="text-red-500">Learning </span>
          <span className="text-red-500">Future </span>
          <span className="text-black dark:text-white">Starts</span>
          <br />
          <span className="text-black dark:text-white">With Youth </span>
          <span className="text-black dark:text-white">Computer</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          It is a long established fact that a reader is distracted by readable
          content.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all">
            Check enrollment
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 flex flex-col items-center space-y-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/project.png"
            alt="Student"
            width={300}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Stats Card */}
        {/* <motion.div
          className="absolute top-10 right-10 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
            Monthly Spent Hours
          </p>
          <p className="text-lg font-bold">67 Hrs 29 Mins</p>
          <div className="h-10 flex space-x-1 mt-2">
            <div className="w-2 bg-red-500 h-full"></div>
            <div className="w-2 bg-green-500 h-2/3"></div>
            <div className="w-2 bg-orange-500 h-1/2"></div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Banner;
