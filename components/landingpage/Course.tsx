"use client";

import { motion } from "framer-motion";
import anime from "animejs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { categories } from "@/data/index";

export default function CourseCategory() {
  const router = useRouter();

  useEffect(() => {
    anime({
      targets: ".course-card",
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(200),
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <section className="p-6 max-w-6xl mx-auto text-black">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Courses</h2>
      <div className="flex gap-6 justify-center flex-wrap">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="course-card relative bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-2xl w-80 cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={category.image}
              alt={category.title}
              width={320}
              height={160}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.description}
              </p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                <span>{category.lessons} Lessons</span>
                <span>{category.duration}</span>
              </div>
              <div className="mt-2 text-lg font-bold text-violet-600 dark:text-violet-400">
                {category.price}
              </div>
              {category.badge && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {category.badge}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/courses")}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-violet-700 transition-all"
        >
          More Courses
        </button>
      </div>
    </section>
  );
}
