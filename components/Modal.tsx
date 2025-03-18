"use client";

import { motion, AnimatePresence } from "framer-motion";
import anime from "animejs";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      anime({
        targets: "#modal-content",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: "easeOutElastic(1, .6)",
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            id="modal-content"
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-white transition"
              onClick={onClose}
            >
              ✖
            </button>

            {/* Modal Title */}
            {title && (
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}

            {/* Modal Body */}
            <div className="flex flex-col justify-center items-center mt-4 text-gray-700 dark:text-gray-300">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
