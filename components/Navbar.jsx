"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const closeMenu = () => setIsOpen(false);
      document.body.addEventListener("click", closeMenu);
      return () => document.body.removeEventListener("click", closeMenu);
    }
  }, [isOpen]);

  return (
    <>
      {/* Contact bar - responsive */}
      <div className="w-full bg-gray-400">
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          <div className="py-2 flex flex-col  sm:flex-row sm:items-center md:gap-4">
            <span className="flex gap-1 items-center mb-2 sm:mb-0">
              <Phone size={18} />
              +91 7709874425
            </span>
            <Link href={"#"} className="flex gap-1 items-center">
              <Mail size={18} />
              shubhampra25@gmail.com
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`fixed w-full z-40 transition-all duration-300  ${
          scrolled
            ? "bg-white backdrop-blur-sm shadow-md py-2 sticky top-0"
            : "py-3 sm:py-4 bg-white/80"
        }`}
      >
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center py-1 gap-3">
            <Image
              src="/Logo.svg"
              alt="Staff Booster"
              width={180}
              height={80}
              className="h-8 sm:h-10 w-auto rounded-full"
            />
            <span className="text-xl sm:text-2xl font-bold text-black">
              Staff Booster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/testimonials"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden  focus:outline-none z-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu - Improved */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute right-0 top-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-16 pb-6 px-6 flex flex-col space-y-6">
                <Link
                  href="/"
                  className="font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/testimonials"
                  className="font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#contact"
                  className="font-medium text-lg hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
              {/* <div className="py-2 flex flex-col  sm:flex-row sm:items-center md:gap-4">
                <span className="flex gap-1 items-center mb-2 sm:mb-0">
                  <Phone size={18} />
                  +91 7709874425
                </span>
                <Link href={"#"} className="flex gap-1 items-center">
                  <Mail size={18} />
                  shubhampra25@gmail.com
                </Link>
              </div> */}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
