"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { setUtype, user } = useAuthStore();
  const router = useRouter();

  const roles = [
    { role: "ADMIN", name: "Central Admin Login", link: "/login" },
    { role: "CENTER", name: "Branch Admin Login", link: "/login" },
    { role: "STUDENT", name: "Student Login", link: "/studentlogin" },
  ];

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Course", href: "#course" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleRoleSelect = (role: string, link: string) => {
    if (role === "CENTER") setUtype("center");
    else if (role === "ADMIN") setUtype("admin");
    router.push(link);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-0 right-0 z-50"
      >
        <div className="py-4 sm:py-5">
          <div className="bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-blue-600/90 backdrop-blur-lg rounded-l-full lg:rounded-l-full px-4 md:px-10 py-2 md:py-4 flex items-center justify-between">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.05, delay: 0.1 * index }}
                  whileHover={{
                    scale: 1.1,
                    color: "#fbbf24",
                  }}
                  className="text-white font-bold hover:text-yellow-300 transition-all duration-300"
                >
                  {item.name}
                </motion.a>
              ))}

              {/* Login Dropdown */}
              <div className="relative">
                {user ? (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/${user.role.toLowerCase()}`)}
                    whileHover={{
                      scale: 1.1,
                      color: "#fbbf24",
                    }}
                    className="text-white font-bold flex items-center gap-1 hover:text-yellow-300"
                  >
                    Dashboard
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    whileHover={{
                      scale: 1.1,
                      color: "#fbbf24",
                    }}
                    className="text-white font-bold flex items-center gap-1 hover:text-yellow-300"
                  >
                    Login <ChevronDown className="w-4 h-4" />
                  </motion.button>
                )}

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-10 right-0 bg-white text-black rounded shadow-lg my-2 w-52 z-50"
                    >
                      {roles.map((r) => (
                        <li
                          key={r.role}
                          onClick={() => handleRoleSelect(r.role, r.link)}
                          className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                        >
                          {r.name}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-24 right-0 z-50 bg-white text-indigo-700 rounded px-6 py-4 shadow-md mx-2"
          >
            <span className="block mb-3 text-sm font-bold text-gray-500">
              Menu:
            </span>
            <ul className="space-y-3 text-base font-semibold">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block hover:text-yellow-500 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}

              {/* Mobile Login Dropdown */}
              <li className="border-t pt-3">
                <span className="block mb-3 text-sm font-bold text-gray-500">
                  Login as:
                </span>
                <ul className="space-y-3 text-base font-semibold">
                  {roles.map((r) => (
                    <li
                      key={r.role}
                      onClick={() => handleRoleSelect(r.role, r.link)}
                      className="cursor-pointer hover:text-yellow-500"
                    >
                      {r.name}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
