"use client";

import { useEffect, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { menuItems } from "@/data";
import Link from "next/link";
import { useAuthStore } from "@/store";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuthStore();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle =
    "block cursor-pointer border-b-2 border-white/0 hover:text-yellow-400 hover:border-yellow-500 transition-all";

  return (
    <nav
      className={`${
        isScrolled ? "fixed top-0 shadow-lg" : "relative"
      } w-full bg-purple-900 text-white font-bold z-40 transition-all duration-300 ease-in-out px-4 py-2`}
    >
      {/* Toggle Button (Mobile) */}
      <div className="md:hidden fixed top-3 right-5 z-50">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className={`text-2xl ${isMenuOpen ? "text-red-600" : "text-white"}`}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-center items-center space-x-10 text-lg">
        <li className={navLinkStyle} onClick={scrollToTop}>
          Home
        </li>

        {menuItems
          .filter((item) => item.name !== "Home")
          .map((item, index) => (
            <li
              key={index}
              className={navLinkStyle}
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </li>
          ))}

        {[
          { label: "Search Enrollment", href: "/certificate" },
          { label: "Franchise", href: "/enquiry" },
          {
            label: user ? "Dashboard" : "Login",
            href: user ? (user.role ? "/admin" : "/student") : "/chooseuser",
          },
        ].map((link, index) => (
          <li key={index}>
            <Link href={link.href} className={navLinkStyle}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden fixed top-0 right-0 w-60 bg-white/70 backdrop-blur-lg rounded-lg p-4 mt-4 mx-2 space-y-4 text-center z-40">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer border-b-2 border-white/0 hover:border-purple-700 transition-all"
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </li>
          ))}
          <li>
            <Link
              href={user ? (user.role ? "/admin" : "/student") : "/chooseuser"}
              className="inline-block px-6 py-2 bg-white text-indigo-800 font-bold rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              {user ? "Dashboard" : "Login"}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
