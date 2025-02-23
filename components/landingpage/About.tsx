"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import Image from "next/image";
import { stats } from "@/data/index";

const AboutInfo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && ref.current) {
      stats.forEach((stat, index) => {
        const targetElement = document.getElementById(`stat-${index}`);
        if (targetElement) {
          anime({
            targets: targetElement,
            innerHTML: [0, stat.value],
            easing: "easeOutQuad",
            round: 1,
            duration: 2000,
          });
        }
      });
    }
  }, [isInView]);

  return (
    <div className="relative dark:from-gray-900 dark:to-gray-800 p-10 shadow-xl">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 justify-items-center">
            <h2 className="relative top-[-40] text-4xl py-2 font-bold">
              About Us
            </h2>
            <div className="flex gap-10 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <span
                    id={`stat-${index}`}
                    className="text-3xl font-bold"
                  >
                    0
                  </span>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Get professional & innovative service for your Civil, Commercial,
              Industrial, and Residential projects. We will make your dream
              design come true with the perfect architecture, construction
              documentation, and everything else you need.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
            >
              Contact Now
            </motion.button>
          </div>
          <div className="flex-1 justify-items-end">
            <Image
              src="/project.png"
              alt="About us"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutInfo;
