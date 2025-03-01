"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect } from "react";
import { Download } from "lucide-react";
import { EnrollmentType } from "@/admincomponents/AllDownloads";

const Downloads = ({ enrollment }: { enrollment: EnrollmentType }) => {
  useEffect(() => {
    anime({
      targets: ".download-item",
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: "easeOutBack",
      delay: anime.stagger(150),
    });
  }, []);

  const downloadItems = [
    { id: 1, name: "Student ID", file: enrollment.idCardLink },
    { id: 2, name: "Admit Card", file: enrollment.admitLink },
    { id: 3, name: "Marksheet", file: enrollment.marksheetLink },
    { id: 4, name: "Certificate", file: enrollment.certificateLink },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 text-white p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold mb-6 text-black"
      >
        Downloads
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
        {downloadItems.map((item) => (
          <motion.a
            key={item.id}
            href={item.file}
            download
            className="download-item flex items-center justify-between p-4 bg-violet-700 border border-violet-500 rounded-lg shadow-md hover:bg-violet-700/40 transition-colors cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-medium">{item.name}</span>
            <Download size={24} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Downloads;
