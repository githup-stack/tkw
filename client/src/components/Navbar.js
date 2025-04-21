import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCartIcon,
  UserIcon,
  CakeIcon,
  FireIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { GlassWater } from "lucide-react";
import SearchGlobal from "./searchGlobal";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top section with gradient background */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-violet-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo with improved hover effect */}
            <Link
              to="/"
              className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300 ease-out"
              aria-label="Home"
            >
              <img
                src={assets.logo}
                alt="Logo"
                className="h-16 w-auto drop-shadow-sm"
                loading="eager"
              />
            </Link>

            {/* Enhanced search bar with better spacing */}
            <div className="flex-1 max-w-md mx-auto px-4">
              <div className="flex items-center bg-white rounded-full border border-gray-200 overflow-hidden pr-2 focus-within:border-indigo-300 focus-within:ring-1 focus-within:ring-indigo-200 transition-all">
                <div className="px-3 py-2 text-gray-400">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </div>
                <SearchGlobal />
              </div>
            </div>

            {/* Navigation actions with improved spacing and accessibility */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Login button with enhanced hover effects */}
              <button
                onClick={() => navigate("/Login")}
                className="hidden sm:flex items-center gap-2 bg-white border border-indigo-200 rounded-full px-6 py-2.5 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md transition-all duration-300 ease-in-out transform hover:translate-y-[-2px]"
                aria-label="Login"
              >
                <span className="font-medium">Login</span>
                <UserIcon className="w-5 h-5" />
              </button>

              {/* Shopping cart with badge and improved accessibility */}
              <Link
                to="/Cart"
                className="flex items-center group transition duration-300 relative"
                aria-label="Shopping Cart"
              >
                <div className="bg-white p-2.5 rounded-full shadow-sm group-hover:shadow-md group-hover:bg-indigo-50 transition-all duration-300 ease-in-out transform group-hover:translate-y-[-2px]">
                  <ShoppingCartIcon className="w-6 h-6 text-indigo-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    0
                  </span>
                </div>
                <span className="ml-2 font-medium text-indigo-800 hidden md:inline-block">
                  Giỏ Hàng
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category navigation with improved styling */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-center items-center">
            <NavItem
              to="/Foods"
              icon={<FireIcon className="h-5 w-5 text-orange-500" />}
              label="Foods"
            />
            <NavItem
              to="/Drinks"
              icon={<GlassWater className="h-5 w-5 text-blue-500" />}
              label="Drinks"
            />
            <NavItem
              to="/Desserts"
              icon={<CakeIcon className="h-5 w-5 text-pink-500" />}
              label="Desserts"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-8 py-4 transition-all duration-300 flex items-center gap-3 font-medium relative ${
        isActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <div className="p-1.5 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50">
          {icon}
        </div>
        <span>{label}</span>
        <div
          className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 ease-out ${
            isActive
              ? "bg-indigo-600 scale-x-100"
              : "bg-indigo-400 scale-x-0 group-hover:scale-x-75"
          }`}
        ></div>
      </>
    )}
  </NavLink>
);

export default Navbar;
