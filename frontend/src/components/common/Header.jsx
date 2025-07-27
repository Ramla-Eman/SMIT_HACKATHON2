import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../layouts/ThemeToggle";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-card shadow-sm border-b border-app">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SF</span>
            </div>
            <span className="text-xl font-bold text-app">StudentFeedback</span>
          </Link>

          {/* Navigation Links (conditional) */}
          <nav className="hidden md:flex items-center space-x-6">
            {location.pathname === "/admin/dashboard" && (
              <Link
                to="/admin/login"
                className="text-secondary-app hover:text-primary transition-colors"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Theme Toggle Button */}
          <div className="flex items-center justify-center gap-6">
            <ThemeToggle />
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-app text-app  font-medium rounded-lg transition duration-300 ease-in-out"
          >
            Admin Login
          </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
