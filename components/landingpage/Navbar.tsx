"use client";

import { useEffect, useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { menuItems } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, usertype } from "@/store";

const navLinks = (user: usertype) => [
  //fixme
  { label: "Search Enrollment", href: "/certificate" },
  { label: "Franchise", href: "/enquiry" },
  {
    label: user ? "Dashboard" : "Login",
    href: user ? (user.role ? "/admin" : "/student") : "/login",
    isLogin: !user,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLogin, setHoveredLogin] = useState(false);
  const { user, setUtype } = useAuthStore();

  const router = useRouter();

  const onclickHandler = (e: "admin" | "center") => {
    setUtype(e);
    router.push("/login");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const rightPath = (loginLink: { label: string }) => {
    setIsMenuOpen(false);
    if (loginLink.label === "Student Login") {
      router.push("/studentlogin");
    } else if (loginLink.label === "Central Admin Login") {
      onclickHandler("admin");
    } else onclickHandler("center");
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle =
    "block cursor-pointer border-b-2 border-white/0 hover:text-yellow-400 hover:border-yellow-500 transition-all";
  if (!user) return;
  return (
    <nav
      className={`${
        isScrolled ? "fixed top-0 shadow-lg" : "relative"
      } w-full bg-purple-900 text-white font-semibold z-40 transition-all duration-300 ease-in-out px-4 pt-1 pb-1 md:pb-0 `}
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
          className={`${navLinkStyle} py-1 ${
            isMenuOpen ? "" : "md:inline-block"
          }`}
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
              className={`${navLinkStyle} py-1`}
              onClick={() => {
                scrollToSection(item.name.toLowerCase());
                setIsMenuOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}

        {/* Auth & Other Links */}
        {navLinks(user).map((link, index) => (
          <li
            key={index}
            className={`${navLinkStyle} py-1 relative`}
            onMouseEnter={() => link.isLogin && setHoveredLogin(true)}
            onMouseLeave={() => link.isLogin && setHoveredLogin(false)}
          >
            {!link.isLogin ? (
              <Link
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`transition hover:opacity-80 ${
                  isMenuOpen ? "block" : "md:inline-block"
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <>
                <button
                  className={`${navLinkStyle} transition hover:opacity-80 ${
                    isMenuOpen ? "block" : "md:inline-block"
                  }`}
                >
                  {link.label}
                </button>

                {hoveredLogin && (
                  <ul className="absolute left-1/2 -translate-x-1/2 top-full w-52 bg-purple-900 text-white shadow-lg z-50 text-center">
                    {[
                      { label: "Central Admin Login" },
                      { label: "Branch Admin Login" },
                      { label: "Student Login" },
                    ].map((loginLink, i) => (
                      <li key={i}>
                        <button
                          onClick={() => rightPath(loginLink)}
                          className={`${navLinkStyle} w-fit mx-auto py-1`}
                        >
                          {loginLink.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
