"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import anime from "animejs";
import { FaArrowUp } from "react-icons/fa";
import { menuItems } from "@/data";
import Navbar from "@/components/landingpage/Navbar";
import Loader from "../Loader";
import Link from "next/link";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => setLoading(false);

    if (document.readyState === "complete") {
      handleComplete(); // If already loaded
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => window.removeEventListener("load", handleComplete);
  }, []);

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
  if (loading) return <Loader />;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-white text-white">
      <div className="min-h-screen text-white relative">
        <Navbar />

        {menuItems.map((section, index) => (
          <section
            key={index}
            id={section.name.toLowerCase()}
            className={`${section.name} w-[100%] min-h-screen text-black`}
          >
            {section.pos}
          </section>
        ))}

        <footer className="text-center p-4 bg-gray-800 text-white">
          <span> Copyright &copy; 2015-2025 | All Right Reserved - </span>
          <span className="text-purple-500">
            PMK National Youth Computer Centre
          </span>
        </footer>

        <div className="fixed bottom-8 right-2 flex flex-col items-center z-40">
          <div className="flex flex-col md:flex-row">
            {/* Scroll to Top Arrow Button */}
            {showScrollButton && (
              <motion.div
                className="text-center font-bold p-2"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <motion.button
                  className="bg-yellow-500 text-white mx-auto my-2 p-3 w-12 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaArrowUp size={24} />
                </motion.button>
              </motion.div>
            )}

            {/* Enquiry Button */}
            <motion.div
              className="text-center font-bold p-2"
              initial={{ y: 0 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <motion.button
                className="bg-red-600 text-white text-sm md:text-lg font-bold p-4 rounded-full shadow-lg hover:bg-red-500 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link href="/enquiry">Enquiry</Link>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
