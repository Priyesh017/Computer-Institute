"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import anime from "animejs";
import { FaArrowUp, FaTimes } from "react-icons/fa";
import { contactIcons, menuItems } from "@/data";
import Navbar from "@/components/landingpage/Navbar";

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
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-white">
      <div className="min-h-screen text-white relative">
        <Navbar />

        {menuItems.map((section, index) => (
          <section
            key={index}
            id={section.name.toLowerCase()}
            className={`${section.name} w-[100%] min-h-screen mt-10 text-black`}
          >
            {section.pos}
          </section>
        ))}

        <footer className="text-center py-4 bg-gray-800 text-white">
          <span> Copyright &copy; 2015-2025 | All Right Reserved - </span>
          <span className="text-purple-500">
            PMK National Youth Computer Centre
          </span>
        </footer>

        <div className="fixed bottom-8 right-4 flex flex-col items-center space-y-3 z-50">
          {showContactOptions && (
            <>
              {contactIcons.map((icons, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-indigo-800 p-3 rounded-full shadow-lg cursor-pointer hover:bg-indigo-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => icons.url}
                >
                  {icons.icon}
                </motion.div>
              ))}
            </>
          )}

          {/* Scroll to Top Arrow Button */}
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

          {/* Contact Us Button */}
          <motion.div
            className="text-center font-bold p-2"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }} // Subtle up & down animation
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.button
              className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all"
              onClick={() => setShowContactOptions(!showContactOptions)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              {showContactOptions ? (
                <FaTimes size={24} />
              ) : (
                <p className="font-bold">Contact Us</p>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
