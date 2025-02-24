"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useRef } from "react";
import MapComponent from "../Map/map";

const ContactInfo = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      easing: "easeOutExpo",
      duration: 1000,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center py-16 xl:pt-24 bg-gray-900 text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl font-bold text-yellow-400 mb-4"
      >
        CONTACT US
      </motion.h2>
      <p className="text-gray-400 text-center mb-8 max-w-lg">
        We align leaders around a shared purpose and strategic story that
        catalyzes their business and brand to take action.
      </p>
      <motion.div
        ref={cardRef}
        className="relative z-20 bg-white text-gray-900 p-8 rounded-lg shadow-lg w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 p-3 rounded-full mb-2">📍</div>
          <h3 className="font-semibold">Address:</h3>
          <p className="text-sm text-gray-600 text-center">
            121 Rock Street, 21 Avenue,
            <br /> New York, NY 92103-9000
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 p-3 rounded-full mb-2">✉️</div>
          <h3 className="font-semibold">Email:</h3>
          <p className="text-sm text-gray-600">
            <a
              href="mailto:hello@company.com"
              className="text-blue-600 hover:underline"
            >
              hello@company.com
            </a>
            <br />
            <a
              href="mailto:support@company.com"
              className="text-blue-600 hover:underline"
            >
              support@company.com
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-yellow-400 p-3 rounded-full mb-2">📞</div>
          <h3 className="font-semibold">Call us:</h3>
          <p className="text-sm text-gray-600">
            1 (234) 567-891
            <br />1 (234) 987-654
          </p>
        </div>
      </motion.div>
      <MapComponent />
    </div>
  );
};

export default ContactInfo;
