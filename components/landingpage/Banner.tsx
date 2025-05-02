"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";

const intro = [
  { imgSrc: "/Banner.jpg" },
  { imgSrc: "/project.png" },
  { imgSrc: "/Banner.jpg" },
  { imgSrc: "/project.png" },
];

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
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
      className="w-full min-h-screen relative overflow-hidden"
    >
      {/* Carousel Background */}
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="absolute inset-0 z-0"
      >
        <CarouselContent>
          {intro.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full relative h-screen w-full"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.imgSrc}
                  alt={`Slide ${index + 1}`}
                  className="absolute w-full h-full z-0"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Foreground Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col-reverse md:flex-row items-center justify-between p-2 md:p-12 bg-gradient-to-r from-grad-2/80 via-grad-3/60 to-grad-8/50">
        <div className="space-y-5 p-4 md:mt-20">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              START BETTER LEARNING
            </h3>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              MISSION NATIONAL YOUTH COMPUTER CENTER
            </h1>
            <div className="bg-yellow-500 px-4 py-1 inline-block font-semibold text-black rounded-md text-sm">
              COMPUTER CENTER
            </div>
            <div className="text-gray-900 text-md md:text-base md:w-2/3">
              <p className="text-md text-gray-900 font-bold">
                Unlock Your Potential! 🚀
              </p>
              Master in-demand digital skills with expert training at Mission
              National Youth Computer Center and step into a future of endless
              opportunities!
            </div>
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
            <Link href="/certificate">
              <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all">
                Search Enrollment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
