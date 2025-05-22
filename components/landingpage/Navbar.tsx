"use client";

import { useEffect, useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import { menuItems } from "@/data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, usertype } from "@/store";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { DialogTitle } from "@radix-ui/react-dialog";

const navLinks = (user: usertype | null) => [
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

  const handleNav = (loginLink: { label: string }) => {
    setIsMenuOpen(false);
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
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
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
      {/* ===================== Mobile Nav ===================== */}

      <div className="flex justify-end md:hidden">
        <Sheet onOpenChange={setIsMenuOpen} open={isMenuOpen}>
          <FiAlignRight
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />

          <SheetContent className="">
            <DialogTitle></DialogTitle>
            <li
              className={`${navLinkStyle} py-1 font-semibold`}
              onClick={scrollToTop}
            >
              Home
            </li>
            {menuItems
              .filter((item) => item.name !== "Home")
              .map((item, index) => (
                <li
                  key={index}
                  className={`${navLinkStyle} py-1 font-semibold`}
                  onClick={() => scrollToSection(item.name.toLowerCase())}
                >
                  {item.name}
                </li>
              ))}

            {navLinks(user).map((link, index) => (
              <li key={index} className={`${navLinkStyle} py-1 font-semibold`}>
                {!link.isLogin ? (
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="transition hover:opacity-80 block"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <>
                    <button className="transition hover:opacity-80">
                      {link.label}
                    </button>
                    <ul className="space-y-2 mt-2">
                      {[
                        "Central Admin Login",
                        "Branch Admin Login",
                        "Student Login",
                      ].map((label, i) => (
                        <li key={i}>
                          <button
                            onClick={() => handleNav({ label })}
                            className={`${navLinkStyle} block py-1 font-semibold`}
                          >
                            {label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </SheetContent>
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
