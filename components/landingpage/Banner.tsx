"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./NewNavbar";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

// Social links and icons combined
const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://facebook.com/nyctcofficial",
    color: "hover:text-blue-500",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com/nyctcofficial",
    color: "hover:text-pink-500",
    bg: "hover:bg-pink-50",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/918670468683",
    color: "hover:text-green-400",
    bg: "hover:bg-green-50",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com/nyctcofficial",
    color: "hover:text-sky-400",
    bg: "hover:bg-sky-50",
  },
  {
    icon: FaYoutube,
    url: "https://youtube.com/nyctcofficial",
    color: "hover:text-red-500",
    bg: "hover:bg-red-50",
  },
  {
    icon: FaLinkedinIn,
    url: "https://linkedin.com/company/nyctc",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-50",
  },
];

export default function Banner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden flex flex-col font-['Inter',sans-serif]">
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top left blue blob - more organic */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 0.4, rotate: 0 }}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-300 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(60% 70% at 30% 40%)",
          }}
        />

        {/* Bottom right pink blob - more organic */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 45 }}
          animate={{ scale: 1, opacity: 0.3, rotate: 0 }}
          transition={{ duration: 2.5, delay: 0.4, ease: "easeOut" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-pink-200 via-orange-200 to-yellow-200 rounded-full blur-3xl"
          style={{
            clipPath: "ellipse(70% 60% at 60% 70%)",
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-40 blur-sm"
        />

        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-50 blur-sm"
        />

        {/* Animated small circles */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-60 left-1/2 w-6 h-6 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-70"
        />
        {/* <motion.div
          animate={{
            scale: [1, 1.5, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/4 left-[42%] w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-80"
        /> */}

        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-12 right-8 md:top-32 md:right-8 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-90 shadow-lg"
        />
        <motion.div
          animate={{
            y: [0, 12, 0],
            x: [0, -8, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-8 right-4 md:bottom-40 md:right-8 w-6 h-6 md:w-10 md:h-10 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-90 shadow-lg"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-80 shadow-md"
        />
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} // smooth hover
        className="absolute flex items-center space-x-3 w-4/5 md:w-full px-6 py-4"
      >
        <motion.div
          whileHover={{ rotate: 10 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mx-1.5"
        >
          <Image
            src="/Logo.png"
            alt="Student"
            width={100}
            height={100}
            className="w-[70px]"
          />
        </motion.div>

        <div className="text-indigo-500">
          <div className="text-2xl md:text-4xl font-bold tracking-wide leading-none">
            MNYCTC
          </div>
          <div className="text-sm sm:text-base md:text-lg font-bold text-gray-700 tracking-wider mt-0.5">
            Mission National Youth Computer Training Centre
          </div>
        </div>
      </motion.div>

      {/* Enhanced Header with better styling */}
      <Header />

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 mt-8 w-full">
          <div className="flex items-center h-full md:mt-10 mt-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <motion.span
                    className="text-gray-800"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    Learn
                  </motion.span>
                  <br />
                  <motion.span
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    Grow
                  </motion.span>
                  <br />
                  <motion.div
                    className="text-gray-800 flex justify-center md:justify-start items-end"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                  >
                    Succeed
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                      className="relative bottom-0 md:bottom-3 left-1 w-3 h-3 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-80"
                    />
                  </motion.div>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Master computer skills with expert guidance, practical
                  classes, and real-time support—all from your trusted
                  neighborhood institute.
                </motion.p>
              </div>

              {/* Enhanced Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start"
              >
                <Link href="/certificate" passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 sm:px-10 py-3 md:py-5 border-2 border-transparent  rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Search Enrollment</span>
                    </Button>
                  </motion.div>
                </Link>

                <Link href="/enquiry" passHref>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-gray-400 text-gray-700 px-8 sm:px-10 py-3 md:py-5 rounded-full text-base sm:text-lg font-semibold hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
                    >
                      Get Franchise
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Enhanced Social Icons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="flex flex-wrap gap-5 pt-4 px-4 md:pt-2 md:px-0 justify-center md:justify-start"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 10,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-purple-200 flex items-center justify-center text-purple-400 ${social.color} ${social.bg} transition-all duration-300 hover:border-current shadow-lg bg-white/80 backdrop-blur-sm`}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
