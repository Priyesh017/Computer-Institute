"use client";

import { useEffect, useState, useRef } from "react";

import Image from "next/image";
import anime from "animejs";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { fetcher } from "@/helper";
import { menuItems } from "@/data";
import Loader from "../Loader";
// import Notice from "@/components/landingpage/NoticeBoard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import NoticeBoard from "./NoticeB";

// Social links and icons combined
const socialLinks = [
  {
    icon: FaFacebookF,
    url: "https://facebook.com/nyctcofficial",
    hoverColor: "hover:text-blue-500",
  },
  {
    icon: FaInstagram,
    url: "https://instagram.com/nyctcofficial",
    hoverColor: "hover:text-pink-500",
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/918670468683",
    hoverColor: "hover:text-green-400",
  },
  {
    icon: FaTwitter,
    url: "https://twitter.com/nyctcofficial",
    hoverColor: "hover:text-sky-400",
  },
  {
    icon: FaYoutube,
    url: "https://youtube.com/nyctcofficial",
    hoverColor: "hover:text-red-500",
  },
  {
    icon: FaLinkedinIn,
    url: "https://linkedin.com/company/nyctc",
    hoverColor: "hover:text-blue-400",
  },
];

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  const { data: intro, isLoading } = useQuery<string[]>({
    queryKey: ["bannerpic"],
    queryFn: () =>
      fetcher("/fetch_aws_res", "POST", { Prefix: "images/bannerpic" }).then(
        (res) => res.data
      ),
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
    if (document.readyState === "complete") handleComplete();
    else window.addEventListener("load", handleComplete);
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

    const handleScroll = () =>
      setShowScrollButton(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading || isLoading) return <Loader />;
  if (!intro) return <div>Some error happened...</div>;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="bg-white text-white">
      <section className="overflow-hidden border-b border-gray-900">
        {/* Header Strip */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 px-4 py-1 bg-purple-900 text-white text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> info@yctc.in
            </span>
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-yellow-500" /> +91 8670468683
            </span>
          </div>
          <div className="flex items-center gap-4 text-lg">
            {socialLinks.map(({ icon: Icon, url, hoverColor }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${hoverColor}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Banner */}
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
            <p className="mt-2 text-gray-900 text-sm md:text-base">
              Master in-demand digital skills with expert training at Mission
              National Youth Computer Center and step into a future of endless
              opportunities!
            </p>
          </div>
        </div>

        <Navbar />

        {/* Carousel */}
        <Carousel
          ref={bannerRef}
          opts={{ loop: true, duration: 100 }}
          plugins={[Autoplay({ delay: 3000 }), Fade()]}
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
                  className="w-full h-[250px] md:h-[600px] object-fill"
                  quality={100}
                  priority={index === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* <Notice /> */}
      <NoticeBoard />

      {/* Main Sections */}
      <div className="min-h-screen text-white relative">
        {menuItems.map((section, index) => (
          <section
            key={index}
            id={section.name.toLowerCase()}
            className="w-full min-h-screen text-black"
          >
            {section.pos}
          </section>
        ))}

        <footer className="text-center p-4 bg-gray-800 text-white">
          <span>Copyright &copy; 2024-2025 | All Rights Reserved - </span>
          <span className="text-purple-500">
            National Youth Computer Training Centre
          </span>
          <p>
            Developed and maintained by{" "}
            <a
              href="https://linkedin.com/in/mainak908"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Mainak
            </a>
          </p>
          <p>
            Contact:{" "}
            <a
              href="mailto:ghosh.mainak0401@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ghosh.mainak0401@gmail.com
            </a>
          </p>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollButton && (
          <motion.div
            className="fixed bottom-8 right-2 z-40"
            initial={{ y: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <motion.button
              className="bg-yellow-500 text-white p-3 w-12 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
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
  );
}
