'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';

const SchoolAbout = () => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      anime({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutQuad',
      });
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl p-8 rounded-2xl shadow-xl border border-violet-400 bg-white/20 backdrop-blur-lg"
      >
        <h1 className="text-4xl font-bold text-white text-center">Welcome to XYZ School</h1>
        <p ref={textRef} className="mt-4 text-lg text-gray-200 text-center">
          XYZ School is dedicated to providing quality education and fostering a learning environment that encourages creativity and innovation.
        </p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="mt-6 p-4 border border-white rounded-xl text-center bg-white/20 backdrop-blur-lg"
        >
          <h2 className="text-2xl font-semibold text-white">&quot;Knowledge, Integrity, Growth&quot;</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
          className="mt-6"
        >
          <h3 className="text-2xl font-semibold text-white">Future Plans</h3>
          <ul className="mt-2 list-disc list-inside text-gray-200">
            <li>Expanding digital learning programs</li>
            <li>Introducing AI-based learning assistants</li>
            <li>Enhancing extracurricular activities</li>
            <li>Improving global student exchange programs</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SchoolAbout;
