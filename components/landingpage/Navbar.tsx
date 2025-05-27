"use client";

import { useEffect, useState } from "react";

import { FaBars } from "react-icons/fa";

import { menuItems } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, usertype } from "@/store";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import Image from "next/image";

const navLinks = (user: usertype | null) => [
  { label: "Search Enrollment", href: "/certificate" },
  { label: "Franchise", href: "/enquiry" },
  {
    label: user ? "Dashboard" : "Login",
    href: user ? `/${user.role.toLowerCase()}` : "/login",
    isLogin: !user,
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLogin, setHoveredLogin] = useState(false);
  const { user, setUtype } = useAuthStore();

  const router = useRouter();

  const onclickHandler = (e: "admin" | "center") => {
    setUtype(e);
    router.push("/login");
  };

  const handleNav = (loginLink: { label: string }) => {
    if (loginLink.label === "Student Login") {
      router.push("/studentlogin");
    } else if (loginLink.label === "Central Admin Login") {
      onclickHandler("admin");
    } else {
      onclickHandler("center");
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
    "block cursor-pointer border-b-2 border-white/0 hover:text-yellow-400 hover:border-yellow-500 transition-all";

  return (
    <nav
      className={`${
        isScrolled ? "fixed top-0 shadow-lg" : "relative"
      } w-full bg-purple-900 text-white font-semibold z-40 transition-all duration-300 ease-in-out px-4 pt-1 pb-1 md:pb-0`}
    >
      <div className="relative md:hidden my-2 flex justify-center items-center gap-2 text-center">
        <Image
          src="/logo.jpg"
          alt="Student"
          width={100}
          height={100}
          className="w-[50px] rounded-full"
        />
        <h1 className="text-md font-bold text-white text-center">
          Mission National Youth Computer Training Centre
        </h1>

        {/* ===================== Mobile Nav ===================== */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden">
              <FaBars />
            </Button>
          </SheetTrigger>
          <SheetClose asChild>
            <SheetContent className="bg-purple-900 text-white text-lg">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Settings Panel</SheetTitle>
                </VisuallyHidden>
              </SheetHeader>
              <ul>
                <li className={`${navLinkStyle} py-1`} onClick={scrollToTop}>
                  Home
                </li>
                {menuItems
                  .filter((item) => item.name !== "Home")
                  .map((item, index) => (
                    <li
                      key={index}
                      className={`${navLinkStyle} py-1`}
                      onClick={() => scrollToSection(item.name.toLowerCase())}
                    >
                      {item.name}
                    </li>
                  ))}

                {[
                  "Central Admin Login",
                  "Branch Admin Login",
                  "Student Login",
                ].map((label, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleNav({ label })}
                      className={`${navLinkStyle} py-1`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </SheetClose>
        </Sheet>
      </div>

      {/* ===================== Desktop Nav ===================== */}
      <ul className="hidden md:flex md:flex-row md:justify-center md:items-center md:space-x-10 text-lg">
        <li className={`${navLinkStyle} py-1`} onClick={scrollToTop}>
          Home
        </li>
        {menuItems
          .filter((item) => item.name !== "Home")
          .map((item, index) => (
            <li
              key={index}
              className={`${navLinkStyle} py-1`}
              onClick={() => scrollToSection(item.name.toLowerCase())}
            >
              {item.name}
            </li>
          ))}

        {navLinks(user).map((link, index) => (
          <li
            key={index}
            className={`${navLinkStyle} py-1 relative`}
            onMouseEnter={() => link.isLogin && setHoveredLogin(true)}
            onMouseLeave={() => link.isLogin && setHoveredLogin(false)}
          >
            {!link.isLogin ? (
              <Link href={link.href} className="transition hover:opacity-80">
                {link.label}
              </Link>
            ) : (
              <>
                <button className="transition hover:opacity-80">
                  {link.label}
                </button>
                {hoveredLogin && (
                  <ul className="absolute left-1/2 -translate-x-1/2 top-full w-52 bg-purple-900 text-white shadow-lg z-50 text-center">
                    {[
                      "Central Admin Login",
                      "Branch Admin Login",
                      "Student Login",
                    ].map((label, i) => (
                      <li key={i}>
                        <button
                          onClick={() => handleNav({ label })}
                          className={`${navLinkStyle} w-fit mx-auto py-1`}
                        >
                          {label}
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
