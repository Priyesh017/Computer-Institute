"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";

type ProgressBarProps = {
  value: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const stages = [
    { label: "Enrollment Done", completed: false },
    { label: "Enrollment Verified", completed: false },
    { label: "Exam Form Verified", completed: false },
    { label: "Marksheet Verified", completed: false },
    { label: "Passout", completed: false },
  ];

  for (let i = 0; i < value; i++) {
    stages[i].completed = true;
  }

  const progressRef = useRef<HTMLDivElement>(null);

  const completedStages = stages.filter((stage) => stage.completed).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  useEffect(() => {
    if (progressRef.current) {
      anime({
        targets: progressRef.current,
        width: `${progressPercentage}%`,
        easing: "easeInOutQuad",
        duration: 800,
      });
    }
  }, [progressPercentage]);

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-4 m-2">
      <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="absolute h-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 transition-all shadow-lg"
          style={{
            width: "0%",
            boxShadow:
              "0 0 10px rgba(138, 43, 226, 0.8), 0 0 20px rgba(75, 0, 130, 0.8), 0 0 30px rgba(0, 0, 255, 0.8)",
          }}
        ></div>
      </div>
      <div className="absolute top-0 flex justify-around w-full px-5">
        {stages.map((stage, index) => (
          <motion.div
            key={index}
            className={`relative flex flex-col items-center`}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all shadow-md border-2 border-white ${
                stage.completed ? "bg-violet-500 scale-110" : "bg-gray-400"
              }`}
              initial={{ scale: 0.9 }}
              animate={{ scale: stage.completed ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {stage.completed ? <Check size={20} /> : <X size={20} />}
            </motion.div>
            <span className="mt-2 text-xs text-center text-gray-600 dark:text-gray-300">
              {stage.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
