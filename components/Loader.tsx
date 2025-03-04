"use client";

import { motion } from "framer-motion";
import anime from "animejs";

const Loader = () => {
  anime({
    targets: ".loader div",
    rotate: "1turn",
    easing: "linear",
    duration: 1000,
    loop: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div className="loader grid w-14 aspect-square border-4 border-transparent border-r-grad-4 rounded-full animate-spin">
        <div className="absolute inset-0 m-[2px] border-4 border-transparent border-r-grad-8 rounded-full animate-[spin_2s_linear_infinite]"></div>
        <div className="absolute inset-0 m-[8px] border-4 border-transparent border-r-grad-3 rounded-full animate-[spin_3s_linear_infinite]"></div>
      </div>
    </motion.div>
  );
};

export default Loader;
