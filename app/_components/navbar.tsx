"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-900 w-full text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 lg:ml-24">
            <SidebarTrigger />
            <div className="text-2xl font-bold">Admin Panel</div>
          </div>

          {/* Navbar Links for Desktop */}
          <div className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/settings" className="hover:text-gray-300">
              Settings
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <Link href="/logout" className="hover:text-gray-300">
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-800">
          <Link
            href="/dashboard"
            className="block px-4 py-2 hover:bg-purple-700"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-purple-700"
          >
            Settings
          </Link>
          <Link href="/profile" className="block px-4 py-2 hover:bg-purple-700">
            Profile
          </Link>
          <Link href="/logout" className="block px-4 py-2 hover:bg-purple-700">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
