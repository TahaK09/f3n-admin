// src/components/layouts/privateLayouts.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/authContext.jsx";

export default function PrivateLayout() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="h-[80px] relative w-full px-6 md:px-14 lg:px-16 xl:px-20 flex items-center justify-between z-30 bg-gradient-to-r from-indigo-700 to-violet-500 transition-all">
        {/* Logo */}
        <Link to="/" className="flex flex-row gap-3">
          <img
            src="https://f3news-webapp.vercel.app/assets/f3news-logo-new-CBLpgAvk.png"
            alt="F3News Logo"
            className="h-10 rounded-full"
          />
          <div className="text-lg text-white font-medium flex justify-center items-center">
            F3News - Admin Panel
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="text-white md:flex hidden items-center gap-10">
          <li>
            <Link to="/" className="hover:text-white/70 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/edit-article" className="hover:text-white/70 transition">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-white/70 transition">
              Guidelines
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-white/70 transition">
              Tutorials
            </Link>
          </li>
        </ul>

        {/* Desktop Button */}
        <button
          onClick={handleLogout}
          className="bg-white text-gray-700 md:inline hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
        >
          Sign Out
        </button>

        {/* Mobile Menu Button */}
        <button
          aria-label="menu-btn"
          type="button"
          className="menu-btn inline-block md:hidden active:scale-90 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="#fff"
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 md:hidden">
            <ul className="flex flex-col space-y-4 text-white text-lg">
              <li>
                <a href="#" className="text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Pricing
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="bg-white text-gray-700 mt-6 inline md:hidden text-sm hover:opacity-90 active:scale-95 transition-all w-40 h-11 rounded-full"
            >
              Get started
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} F3News
      </footer>
    </div>
  );
}
