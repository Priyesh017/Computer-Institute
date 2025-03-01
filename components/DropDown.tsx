"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { ChevronDown } from "lucide-react";

const options = ["P", "F"];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Bounce animation when opening
  useEffect(() => {
    if (isOpen) {
      anime({
        targets: ".dropdown-item",
        translateY: [10, 0],
        opacity: [0, 1],
        delay: anime.stagger(50),
        easing: "easeOutElastic(1, .6)",
      });
    }
  }, [isOpen]);

  return (
    <div className="relative flex justify-center items-center w-48" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-24 flex items-center justify-between p-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-md transition hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {selected}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
        >
          {options.map((option, index) => (
            <motion.li
              key={index}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="dropdown-item p-3 text-center text-gray-800 dark:text-white hover:bg-violet-100 dark:hover:bg-violet-800 cursor-pointer transition"
            >
              {option}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Dropdown;
