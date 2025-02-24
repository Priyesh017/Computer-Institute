"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import anime from "animejs";
import { Input } from "@/components/ui/input";
import { ChevronsDown } from "lucide-react"; // Better Sort Icon
import { FaClock, FaBook } from "react-icons/fa";

const categories = ["All", "Published", "Upcoming"];
const sortOptions = ["Recency", "Alphabetically"];

const courses = [
  {
    id: 1,
    category: "Published",
    title: "Fear Of Driving And Automatic Negative Thoughts",
    description: "Fear Of Driving And Automatic Negative Thoughts",
    lessons: 12,
    duration: "3 hr 30 min",
    image: "/project.png",
    price: "$49.99",
  },
  {
    id: 2,
    category: "Upcoming",
    title: "Work more, Earn more while sitting at your home",
    description: "Fear Of Driving And Automatic Negative Thoughts",
    lessons: 23,
    duration: "1 hr 30 min",
    image: "/project.png",
    price: "$49.99",
  },
  {
    id: 3,
    category: "Published",
    title: "Foundation course to understand about Software",
    description: "Fear Of Driving And Automatic Negative Thoughts",
    lessons: 23,
    duration: "1 hr 30 min",
    image: "/project.png",
    price: "$49.99",
    badge: "new",
  },
  {
    id: 4,
    category: "Published",
    title: "Advanced JavaScript Course",
    description: "Master JavaScript with in-depth knowledge",
    lessons: 18,
    duration: "2 hr 45 min",
    image: "/project.png",
    price: "$59.99",
    badge: "new",
  },
  {
    id: 5,
    category: "Upcoming",
    title: "Python for Beginners",
    description: "Learn Python from scratch",
    lessons: 30,
    duration: "5 hr 10 min",
    image: "/project.png",
    price: "$39.99",
  },
];

export default function CourseCategories() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortedBy, setSortedBy] = useState("Alphabetically");
  const [isDescending, setIsDescending] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    anime({
      targets: ".course-card",
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: "easeOutExpo",
      delay: anime.stagger(150),
    });
  }, [filteredCourses]);

  useEffect(() => {
    let filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (sortedBy === "Alphabetically") {
      filtered.sort((a, b) =>
        isDescending
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      );
    } else if (sortedBy === "Recency") {
      // Show only courses with the "new" badge
      filtered = filtered.filter((course) => course.badge === "new");
    }

    setFilteredCourses(filtered);
  }, [search, selectedCategory, sortedBy, isDescending]);

  return (
    <div className="container py-14 xl:pt-24 px-6">
      <motion.h2
        className="text-5xl font-bold fade-in text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Courses
      </motion.h2>

      {/* Filters */}
      <div className="md:my-1 my-4">
        <div className="flex justify-between items-center my-1">
          {/* Search Bar */}
          <Input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 p-2 border border-gray-400 rounded-lg"
          />

          {/* Sorting */}
          <div className="flex border border-gray-400 rounded-lg overflow-hidden">
            {sortOptions.map((option) => (
              <motion.button
                key={option}
                onClick={() => {
                  if (option === "Alphabetically") {
                    setIsDescending((prev) => !prev);
                  }
                  setSortedBy(option);
                }}
                className={`px-2 py-2 flex items-center gap-1 transition-all duration-300 ${
                  sortedBy === option
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {option}
                {option === "Alphabetically" && (
                  <motion.div
                    animate={{ rotate: isDescending ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronsDown className="w-5 h-5" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons & Duration */}
      <div className="flex flex-col gap-4">
        {/* Category Selection */}
        <div className="flex justify-center items-center gap-2">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-violet-600 text-white"
                  : "bg-gray-200"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="flex gap-6 justify-center flex-wrap">
          {filteredCourses
            .slice(0, showAll ? filteredCourses.length : 3)
            .map((course) => (
              <motion.div
                key={course.id}
                className="course-card relative bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-2xl w-80 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  width={320}
                  height={160}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-500">{course.category}</p>
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1">
                      <FaBook className="text-pink-500" /> {course.lessons}{" "}
                      Lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="text-pink-500" /> {course.duration}
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-bold text-violet-600 dark:text-violet-400">
                    {course.price}
                  </div>
                  {course.badge && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
        </div>
        {/* Show More Button */}
        {!showAll && filteredCourses.length > 3 && (
          <div className="text-center mt-4">
            <motion.button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg"
              whileTap={{ scale: 0.95 }}
            >
              Show More
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
