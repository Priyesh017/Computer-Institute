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
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle =
    "block cursor-pointer text-xl py-2 border-b-2 border-white/0 hover:text-yellow-400 hover:border-yellow-500 transition-all";

  return (
    <nav
      className={`${
        isScrolled ? "fixed top-0 shadow-lg" : "relative"
      } w-full bg-purple-900 text-white font-semibold z-40 transition-all duration-300 ease-in-out px-4 pt-1`}
    >
      {/* Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
        className={`md:hidden w-full flex justify-end items-center text-2xl ${
          isMenuOpen ? "text-red-600" : "text-white"
        }`}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Combined Menu */}
      <ul
        className={`
    ${
      isMenuOpen
        ? "fixed top-0 right-0 w-60 bg-white/70 backdrop-blur-lg rounded-lg p-4 mt-4 mx-2 space-y-4 text-center z-40 md:hidden"
        : "hidden"
    }
    md:flex md:static md:flex-row md:justify-center md:items-center md:space-x-10 md:space-y-0 md:bg-transparent md:backdrop-blur-0 md:p-0 md:mt-0 text-lg transition-all
  `}
      >
        {/* Home */}
        <li
          className={`${navLinkStyle} ${isMenuOpen ? "" : "md:inline-block"}`}
          onClick={() => {
            scrollToTop();
            setIsMenuOpen(false);
          }}
        >
          Home
        </li>

        {/* Dynamic Menu Items */}
        {menuItems
          .filter((item) => item.name !== "Home")
          .map((item, index) => (
            <li
              key={index}
              className={navLinkStyle}
              onClick={() => {
                scrollToSection(item.name.toLowerCase());
                setIsMenuOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}

        {/* Auth & Other Links */}
        {[
          { label: "Search Enrollment", href: "/certificate" },
          { label: "Franchise", href: "/enquiry" },
          {
            label: user ? "Dashboard" : "Login",
            href: user ? (user.role ? "/admin" : "/student") : "/chooseuser",
          },
        ].map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`${navLinkStyle} ${
                isMenuOpen ? "" : "md:inline-block"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
