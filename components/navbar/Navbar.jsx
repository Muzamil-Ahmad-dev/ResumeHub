"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

/**
 * Navbar Component
 * -----------------------------------------------------------------------------
 * A responsive navigation bar with dropdowns for desktop and a collapsible
 * mobile menu. Designed for a modern SaaS-style UI using TailwindCSS.
 *
 * Features:
 * - Desktop dropdown for template categories
 * - Mobile hamburger toggle
 * - Smooth transition and blur background effects
 */

export default function Navbar() {
  /** -------------------------------------------------------------------------
   *  Component State
   *  -------------------------------------------------------------------------
   */
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls dropdown visibility

  /** -------------------------------------------------------------------------
   *  Dropdown Items Configuration
   *  -------------------------------------------------------------------------
   */
  const dropdownItems = [
    { href: "/templates/professional", label: "Professional" },
    { href: "/templates/creative", label: "Creative" },
    { href: "/templates/simple", label: "Simple" },
  ];

  /** -------------------------------------------------------------------------
   *  Render
   *  -------------------------------------------------------------------------
   */
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-md text-white shadow-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* -------------------------------------------------------------------
             * Logo Section
             * ------------------------------------------------------------------- */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              R
            </div>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              ResumeHub
            </Link>
          </div>

          {/* -------------------------------------------------------------------
             * Desktop Navigation Menu
             * ------------------------------------------------------------------- */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="hover:text-purple-400 transition-colors text-sm font-medium"
            >
              Home
            </Link>

            {/* Dropdown Menu - Templates */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="hover:text-purple-400 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                Templates{" "}
                <span className="text-xs">{isDropdownOpen ? "▲" : "▼"}</span>
              </button>

              {/* Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-gray-800/95 text-white rounded-lg shadow-xl w-48 border border-white/10 z-50">
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-purple-500/20 hover:text-purple-400 transition-colors text-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-purple-400 transition-colors text-sm font-medium"
            >
              About
            </Link>

            <Link
              href="/login"
              className="hover:text-purple-400 transition-colors text-sm font-medium"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
            >
              Register
            </Link>
          </div>

          {/* -------------------------------------------------------------------
             * Mobile Hamburger Icon
             * ------------------------------------------------------------------- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------------
         * Mobile Navigation Menu
         * ----------------------------------------------------------------------- */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-2 border-t border-white/10">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg text-sm"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Dropdown Menu */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg text-sm"
          >
            Templates <span className="text-xs">{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className="pl-4 mt-1 space-y-1">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg text-sm"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/about"
            className="block px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg text-sm"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          <Link
            href="/login"
            className="block px-4 py-2 hover:bg-purple-500/20 hover:text-purple-400 transition-colors rounded-lg text-sm"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>

          <Link
            href="/register"
            className="block px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm text-center"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
