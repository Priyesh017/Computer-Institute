"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import anime from "animejs";
import { FaArrowUp, FaTimes } from "react-icons/fa";
import { menuItems } from "@/data";
import Navbar from "@/components/landingpage/Navbar";
import { fetcher } from "@/helper";
import { toast } from "react-toastify";
import Loader from "../Loader";

interface etype {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fd, setfd] = useState<etype>({ name: "", email: "", message: "" });
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
  const handleSubmit = async () => {
    try {
      const data = await fetcher("/TakeEnquiry", "POST", fd);
      if (data.success) toast("form submitted successfully");
      else toast("failed to submit");
    } catch (error) {
      console.log(error);
      toast.error("fatal error");
    }
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

        <footer className="text-center py-4 bg-gray-800 text-white">
          <span> Copyright &copy; 2015-2025 | All Right Reserved - </span>
          <span className="text-purple-500">
            PMK National Youth Computer Centre
          </span>
        </footer>

        <div className="fixed bottom-8 right-2 flex flex-col items-center z-40">
          <div className="flex flex-row">
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
                className="bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-500 transition-all"
                onClick={() => setIsModalOpen(!isModalOpen)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                {isModalOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <p className="text-lg font-bold">Enquiry</p>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Enquiry Form */}
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute bottom-24 right-2 w-64 p-5 bg-white text-gray-900 rounded-2xl shadow-xl border border-gray-300"
            >
              <h2 className="text-lg font-semibold mb-3">Enquiry Form</h2>
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setfd({ ...fd, name: e.target.value })}
                className="w-full p-2 mb-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <input
                type="email"
                onChange={(e) => setfd({ ...fd, email: e.target.value })}
                placeholder="Your Email"
                className="w-full p-2 mb-3 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <textarea
                placeholder="Your Message"
                onChange={(e) => setfd({ ...fd, message: e.target.value })}
                className="w-full p-2 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                className="w-full mt-3 bg-violet-600 hover:bg-violet-500 text-gray-100 font-semibold py-2 rounded-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
