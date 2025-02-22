"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { menuItems } from "@/data";
import Link from "next/link";
import { useAuthStore } from "@/store";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-1 bg-indigo-900 bg-opacity-70 backdrop-blur-lg z-50 flex justify-between items-center p-4 shadow-lg rounded-lg mx-10 my-2">
        <h1 className="text-3xl font-bold">School Name</h1>
        <div className="md:hidden fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <ul className={`md:flex space-x-6 hidden`}>
          {menuItems.map((item, index) => (
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
      </nav>

      {isMenuOpen && (
        <ul className="md:hidden fixed top-16 left-0 w-full bg-indigo-900 bg-opacity-80 backdrop-blur-lg p-4 space-y-4 text-center z-40">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-indigo-300 transition-all"
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </li>
          ))}
          <li>
            <motion.button
              className="px-6 py-2 bg-white text-indigo-800 font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={user ? "admin/dashboard" : "/chooseuser"}>
                {user ? "dashboard" : "Login"}
              </Link>
            </motion.button>
          </li>
        </ul>
      )}
    </>
  );
}
