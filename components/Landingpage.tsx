"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import anime from "animejs";
import {
  FaArrowUp,
  FaPlus,
  FaPhone,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";
import { menuItems } from "@/data";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  useEffect(() => {
    anime({
      targets: ".fade-in",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 1000,
      delay: anime.stagger(200),
    });

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-indigo-900 text-white py-8 relative">

      <Navbar />
      
      {menuItems.map((section, index) => (
        <section
          key={index}
          id={section.name.toLowerCase()}
          className="text-center flex flex-col items-center justify-center min-h-screen pt-20 pb-14"
        >
          {/* <p className="mt-4 text-lg fade-in">
            This is the {section.name} section content.
          </p> */}
          <div className="section.name min-h-screen w-[100%]" id="section.name">
            {section.pos}
          </div>
        </section>
      ))}

      <div className="fixed bottom-8 right-8 flex flex-col items-center space-y-3">
        {showContactOptions && (
          <>
            <motion.div
              className="bg-white text-indigo-800 p-3 rounded-full shadow-lg cursor-pointer hover:bg-indigo-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaPhone size={24} />
            </motion.div>
            <motion.div
              className="bg-white text-indigo-800 p-3 rounded-full shadow-lg cursor-pointer hover:bg-indigo-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FaEnvelope size={24} />
            </motion.div>
          </>
        )}
        <motion.button
          className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-500 transition-all"
          onClick={() => setShowContactOptions(!showContactOptions)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          {showContactOptions ? <FaTimes size={24} /> : <FaPlus size={24} />}
        </motion.button>
        {showScrollButton && (
          <motion.button
            className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp size={24} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
