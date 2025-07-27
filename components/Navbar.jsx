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

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

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
              +91 9835968923
            </span>
            <Link href={"#"} className="flex gap-1 items-center">
              <Mail size={18} />
              connect@staffbooster.com
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors z-50 relative"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <Menu size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation Menu - Modern Design */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-50 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          >
            <div 
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800">Menu</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              
              {/* Navigation Links */}
              <nav className="px-6 py-8">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/services"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/testimonials"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#contact"
                    className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </nav>
              
              {/* Contact Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} className="text-primary" />
                    <span className="text-sm">+91 9835968923</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-primary" />
                    <span className="text-sm">connect@staffbooster.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
