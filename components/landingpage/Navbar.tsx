"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { menuItems } from "@/data";
import Link from "next/link";
import { useAuthStore } from "@/store";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // Track navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const { user } = useAuthStore();

  // Handle scrolling: show/hide navbar
  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // If scroll down, hide navbar
        setShowNavbar(false);
      } else {
        // If scroll up, show navbar
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY); // Update last scroll position
    }
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll); // Add scroll listener

      return () => {
        window.removeEventListener("scroll", handleScroll); // Clean up listener on unmount
      };
    }
  }, [lastScrollY, handleScroll]);

  return (
    <nav
      className={`sticky top-0 bg-purple-700 backdrop-blur-lg z-50 flex justify-between items-center p-4 shadow-lg transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <h1 className="text-3xl font-bold">Institution</h1>
      <div className="md:hidden flex justify-center z-50 ">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-2xl"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className={`md:flex space-x-6 hidden`}>
        <motion.li
          className="fade-in cursor-pointer hover:text-indigo-300 transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={scrollToTop}
        >
          Home
        </motion.li>
        {menuItems
          .filter((item) => item.name !== "Home")
          .map((item, index) => (
            <motion.li
              key={index}
              className="fade-in cursor-pointer hover:text-indigo-300 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </motion.li>
          ))}
      </ul>
      <motion.button
        className="hidden md:block px-6 py-2 bg-white text-indigo-800 font-bold rounded-lg shadow-lg transition-all transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={user ? "admin/dashboard" : "/chooseuser"}>
          {user ? "dashboard" : "Login"}
        </Link>
      </motion.button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden fixed top-16 right-0 w-fit bg-indigo-900 bg-opacity-95 backdrop-blur-lg rounded-lg p-4 mt-4 space-y-4 text-center z-40">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-yellow-400 transition-all"
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </li>
          ))}
          <li>
            <button className="px-6 py-2 bg-white text-indigo-800 font-bold rounded-xl shadow-lg transition-all transform hover:scale-105">
              <Link href={user ? "admin/dashboard" : "/chooseuser"}>
                {user ? "dashboard" : "Login"}
              </Link>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
