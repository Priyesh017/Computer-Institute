"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import anime from "animejs";
import { FaArrowUp } from "react-icons/fa";
import { menuItems } from "@/data";
import Notice from "@/components/landingpage/NoticeBoard";
const Navbar = dynamic(() => import("@/components/landingpage/Navbar"), {
  ssr: false,
});
import Loader from "../Loader";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const intro = [
  { imgSrc: "/Banner.jpg" },
  { imgSrc: "/project.png" },
  { imgSrc: "/Banner.jpg" },
  { imgSrc: "/project.png" },
];

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: bannerRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      easing: "easeOutQuad",
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const handleComplete = () => setLoading(false);

    if (document.readyState === "complete") {
      handleComplete(); // If already loaded
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => window.removeEventListener("load", handleComplete);
  }, []);

  useEffect(() => {
    anime({
      targets: ".fade-in",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 1000,
      delay: anime.stagger(200),
    });

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (loading) return <Loader />;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-white text-white">
      <section className="overflow-hidden">
        {/* Header Strip */}
        <div className="flex items-center justify-between px-4 py-2 bg-purple-900 text-white text-sm">
          {/* Contact Info */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> info@nyctc.co.in
            </span>
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-500" /> +91 8001063536
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-white text-lg">
            <a
              href="https://facebook.com"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/918001063536"
              className="hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Top Banner */}
        <div className="my-2.5 flex justify-center items-center">
          <span className="absolute top-10 bg-yellow-500 px-4 py-1 my-1 font-semibold text-black rounded-md text-sm">
            COMPUTE TRAINING CENTER
          </span>

          <div className="flex flex-cols justify-center items-center gap-6 text-center">
            <Image
              src="/Logo.png"
              alt="Student"
              width={150}
              height={150}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-purple-900">
                Mission National Youth Computer Training Centre
              </h1>

              <div className="text-gray-900 text-md md:text-base">
                Master in-demand digital skills with expert training at Mission
                National Youth Computer Center and step into a future of endless
                opportunities!
              </div>
            </div>
          </div>

          <span className="absolute top-40 text-lg font-semibold text-red-600">
            Now open for free registration
          </span>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Carousel */}
        <div className="relative w-full h-screen" ref={bannerRef}>
          <Carousel
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="absolute inset-0 z-0"
          >
            <CarouselContent>
              {intro.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full relative h-screen w-full"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imgSrc}
                      alt={`Slide ${index + 1}`}
                      className="absolute w-full h-full z-0"
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <Notice />

      {/* Main Content */}
      <div className="min-h-screen text-white relative">
        {menuItems.map((section, index) => (
          <section
            key={index}
            id={section.name.toLowerCase()}
            className={`${section.name} w-[100%] min-h-screen text-black`}
          >
            {section.pos}
          </section>
        ))}

        <footer className="text-center p-4 bg-gray-800 text-white">
          <span> Copyright &copy; 2015-2025 | All Right Reserved - </span>
          <span className="text-purple-500">
            PMK National Youth Computer Centre
          </span>
        </footer>

        <div className="fixed bottom-8 right-2 flex flex-col items-center z-40">
          <div className="flex flex-col md:flex-row">
            {/* Scroll to Top Arrow Button */}
            {showScrollButton && (
              <motion.div
                className="text-center font-bold p-2"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <motion.button
                  className="bg-yellow-500 text-white mx-auto my-2 p-3 w-12 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
                  onClick={scrollToTop}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <FaArrowUp size={24} />
                </motion.button>
              </motion.div>
            )}

            {/* Enquiry Button */}
            {/* <Link href="/enquiry">
              <motion.div
                className="text-center font-bold p-2"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <motion.button
                  className="bg-red-600 text-white text-sm md:text-lg font-bold p-4 rounded-full shadow-lg hover:bg-red-500 transition-all"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  Franchise
                </motion.button>
              </motion.div>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
