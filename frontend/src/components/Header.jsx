import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-neutral-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-24 lg:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-md sm:shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 md:group-hover:scale-110">
              <span className="text-white font-extrabold text-lg sm:text-xl md:text-2xl">S</span>
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-black-900 tracking-tight">
              Shop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-12">
            <Link
              to="/"
              className="text-neutral-700 hover:text-neutral-900 font-bold transition-colors duration-200 text-sm lg:text-base tracking-wide"
            >
              Products
            </Link>
            <a
              href="#"
              className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors duration-200 text-sm lg:text-base tracking-wide"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-neutral-600 hover:text-neutral-900 font-semibold transition-colors duration-200 text-sm lg:text-base tracking-wide"
            >
              About
            </a>
          </nav>

          {/* CTA Button */}
          <button className="hidden md:flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl lg:rounded-2xl text-sm lg:text-base transition-all duration-200 shadow-md lg:shadow-lg hover:shadow-xl hover:scale-105 lg:hover:scale-110">
            Get Started
          </button>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors active:bg-neutral-200">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
