"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { Button } from "@/components/ui/button";

export default function CertificateGenerator() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [certificateVisible, setCertificateVisible] = useState(false);

  const generateCertificate = () => {
    if (enrollmentNo.trim() === "") return;
    setCertificateVisible(true);
    anime({
      targets: ".certificate",
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 800,
      easing: "easeOutBounce",
    });
  };

  const downloadCertificate = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-violet-400">
            Certificate Generator
          </h1>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter Enrollment No"
            value={enrollmentNo}
            onChange={(e) => setEnrollmentNo(e.target.value)}
            className="p-2 rounded-lg border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <Button
            onClick={generateCertificate}
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg"
          >
            Generate Certificate
          </Button>
        </div>

        {certificateVisible && (
          <motion.div
            className="certificate mt-6 p-6 bg-white text-black rounded-lg shadow-lg w-96 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-bold">Certificate of Completion</h2>
            <p className="mt-2">This is to certify that</p>
            <p className="text-lg font-semibold">Student ID: {enrollmentNo}</p>
            <p className="mt-2">has successfully completed the course.</p>
            <Button
              onClick={downloadCertificate}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Download Certificate
            </Button>
          </motion.div>
        )}
      </div>
    );
  };
}
