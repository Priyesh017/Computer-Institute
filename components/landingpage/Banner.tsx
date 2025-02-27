"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";

const Banner = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // anime.timeline({ loop: false }).add({
    //   targets: textRef.current?.querySelectorAll("span"),
    //   translateY: [20, 0],
    //   opacity: [0, 1],
    //   delay: anime.stagger(100),
    // });
    anime({
      targets: bannerRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      easing: "easeOutQuad",
      duration: 1000,
    });
  }, []);

  return (
    <motion.div
      ref={bannerRef}
      className="w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/Banner.jpg"
        alt="Banner Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute w-full h-full z-0"
      />
      <div className="relative w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-12 bg-gradient-to-r from-grad-2/80 via-grad-3/50 to-grad-8/20">
        <div className="space-y-5 p-4 mt-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              START BETTER LEARNING
            </h3>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              MISSION NATIONAL YOUTH COMPUTER CENTER
            </h1>
            <div className="bg-yellow-500 px-4 py-1 inline-block font-semibold text-black rounded-md text-sm">
              COMPUTER CENTER
            </div>
            <p className="text-gray-900 text-sm md:text-base md:w-2/3">
              <p className="text-md font-bold">Unlock Your Potential! 🚀</p>{" "}
              Master in-demand digital skills with expert training at Mission
              National Youth Computer Center and step into a future of endless
              opportunities!
            </p>
            <p className="text-lg font-semibold text-red-600">
              Now open for free registration
            </p>
            <div className="mt-2 text-sm font-bold text-gray-900">
              <p>000 123 456 789 &nbsp; | &nbsp; email@gmail.com</p>
            </div>
          </motion.div>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 transition-all"
              onClick={() => scrollToSection("center")}
            >
              Contact Us
            </button>
            <button
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all"
              onClick={() => scrollToSection("about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
