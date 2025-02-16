"use client";

import { motion } from "framer-motion";
// import anime from "animejs";
import { useRef } from "react";
import MapComponent from "@/components/Map/map";

export default function Center() {
  const cardRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (cardRef.current) {
  //     anime({
  //       targets: cardRef.current,
  //       scale: [0.9, 1],
  //       duration: 800,
  //       easing: "easeOutElastic(1, .8)",
  //     });
  //   }
  // }, []);

  return (
    <main className="flex justify-center">

      <motion.h2
        className="text-5xl font-bold fade-in mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Location & Contact Information
      </motion.h2>

      <div className="w-[70%] h-[40%] flex flex-row justify-center items-center px-4 py-4 space-x-10 border-2">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="relative p-6 w-[300px] bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 transition-all hover:border-violet-400 hover:shadow-violet-400"
        >
          <h3 className="text-lg font-semibold text-white">John Doe</h3>
          <p className="text-sm text-gray-300">1234 Elm Street</p>
          <p className="text-sm text-gray-300">Los Angeles, CA 90001</p>
          <p className="text-sm text-gray-300">USA</p>
        </motion.div>
        <MapComponent />
      </div>
    </main>
  );
}
