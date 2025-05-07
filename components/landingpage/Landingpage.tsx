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
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/helper";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  const { data: intro, isLoading } = useQuery<string[]>({
    queryFn: () =>
      fetcher("/fetch_aws_res", "POST", { Prefix: "images/bannerpic" }).then(
        (data) => data.data
      ),
    queryKey: ["bannerpic"],
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

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

  if (loading || isLoading) return <Loader />;
  if (!intro) return <div>some error happened...</div>;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-white text-white">
      <section className="overflow-hidden">
        {/* Header Strip */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 px-4 py-1 bg-purple-900 text-white text-sm">
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
        <div className="relative hidden my-2 px-4 md:flex justify-center items-center gap-6 text-center">
          <Image
            src="/Logo.png"
            alt="Student"
            width={100}
            height={100}
            className="w-full md:w-[100px] rounded-full"
          />
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-purple-900">
              Mission National Youth Computer Training Centre
            </h1>
            <p className="mt-2 text-center text-gray-900 text-sm md:text-base">
              Master in-demand digital skills with expert training at Mission
              National Youth Computer Center and step into a future of endless
              opportunities!
            </p>
          </div>
        </div>

        {/* Navbar */}
        <Navbar />

        {/* Carousel */}
        <Carousel
          ref={bannerRef}
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 3000 })]}
          className="relative w-full z-0"
        >
          <CarouselContent>
            {intro.map((item, index) => (
              <CarouselItem key={index} className="w-full">
                <Image
                  src={item}
                  alt={`Slide ${index + 1}`}
                  width={2160}
                  height={1920}
                  className="w-full h-[250px] md:h-[650px] object-fill"
                  quality={100}
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
          </div>
        </div>
      </div>
    </div>
  );
}
