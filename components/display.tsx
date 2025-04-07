"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect } from "react";
import Image from "next/image";

interface Coordinator {
  name: string;
  image: string;
}

const coordinators: Coordinator[] = [
  {
    name: "John Doe",
    image: "/project.png",
  },
];

export default function CoordinatorCard() {
  useEffect(() => {
    anime({
      targets: ".coordinator-card",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200),
      duration: 800,
      easing: "easeOutQuad",
    });
  }, []);

  return (
    <div className="fixed top-0 right-0 flex flex-wrap justify-center gap-3 p-2">
      {coordinators.map((coordinator, index) => (
        <motion.div
          key={index}
          className="flex flex-row justify-center items-center gap-3 w-fit p-2 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={coordinator.image}
            alt={coordinator.name}
            width={160}
            height={160}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div className="">
            <h3 className="text-lg font-semibold text-gray-800">
              {coordinator.name}
            </h3>
            <p className="text-sm text-gray-500">District Coordinator</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
