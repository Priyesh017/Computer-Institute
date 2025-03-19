"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import Image from "next/image";
import Notice from "@/components/landingpage/NoticeBoard";
import { stats } from "@/data/index";

const AboutInfo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
    <>
      <div className="relative min-h-screen flex items-center justify-center py-20 px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="flex-1 justify-items-center">
              <h2 className="relative top-[-40] text-5xl py-2 font-bold">
                About Us
              </h2>
              <div className="flex gap-10 mb-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span id={`stat-${index}`} className="text-3xl font-bold">
                      0
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-gray-700 text-lg text-justify mb-4">
                At Mission National Youth Computer Center, we provide
                top-quality training in cutting-edge technology. With expert
                instructors, modern labs, and industry-focused courses, we equip
                students with the skills needed for success in the digital
                world. Whether you&apos;re a beginner or an advanced learner,
                our programs help you stay ahead in technology.{" "}
                <p className="mt-5 font-bold text-center">
                  Join us and build your future today!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
                onClick={() => scrollToSection("center")}
              >
                Contact Now
              </motion.button>
            </div>
            <div className="flex-1 justify-items-end">
              <Image
                src="/Logo.png"
                alt="About us"
                width={500}
                height={300}
                className="mb-20 md:mb-2 rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
      <Notice />
    </>
  );
};

export default AboutInfo;
