// src/components/layouts/privateLayouts.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/authContext.jsx";
import { Toaster } from "react-hot-toast";
import Logo from "../../assets/f3news_transparent_logo.png";

export default function PrivateLayout() {
  const { signOut } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", link: "/" },
        { name: "Mumbai", link: "/mumbai" },
        { name: "World", link: "/world" },
        { name: "Politics", link: "/politics" },
        { name: "Sports", link: "/sports" },
        { name: "Contact Us", link: "/contact" },
        { name: "F3 Plus", link: "/" },
      ],
    },
    {
      title: "Careers",
      links: [
        { name: "Apply for Journalist", link: "/apply-for-journalist" },
        { name: "Apply for Copywriter", link: "/apply-for-copywriting" },
        { name: "Video Editors", link: "/video-editors" },
        { name: "Internships", link: "/apply-for-internships" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { name: "Instagram", link: "https://instagram.com/f3news" },
        { name: "Facebook", link: "https://facebook.com/f3news.in" },
        { name: "Youtube", link: "https://youtube.com/@f3news" },
        { name: "X", link: "https://x.com/F3NewsOfficial" },
        { name: "LinkedIn", link: "https://linkedin.com/company/f3news" },
      ],
    },
  ];
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="h-[90px] relative w-full px-6 md:px-14 lg:px-16 xl:px-20 flex items-center justify-between z-30 bg-[#1e2939] transition-all">
          {/* Logo */}
          <Link to="/" className="flex flex-row gap-3">
            <img src={Logo} alt="F3News Logo" className="h-10 rounded-full" />
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
              <Link
                to="/edit-article"
                className="hover:text-white/70 transition"
              >
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

        <Outlet />

        {/* Footer */}
        <div className="border-t py-20 bg-[#1c1c1d] border-gray-300 px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white text-white">
            <div>
              <div className="min-w-3xl flex flex-row gap-5">
                <img
                  className="w-24 md:w-24 rounded-full"
                  src={Logo}
                  alt="dummyLogoColored"
                />
                <div className="flex flex-col gap-4">
                  <div className="text-xl font-medium">F3News</div>
                  <div className="text-base font-light">
                    FAST | FACTS | FEARLESS
                  </div>
                </div>
              </div>

              <p className="max-w-[410px] mt-6">
                Address: F3 News, Tattoo, Office No 1, 1st Floor, 545, Kalbadevi
                Street, opp. Metro Cinema, near Mao Resturant, Mumbai,
                Maharashtra 400002
              </p>
            </div>
            <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
              {linkSections.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                    {section.title}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.link}
                          className="hover:underline transition"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="py-4 text-center text-sm md:text-base text-white/80">
            Copyright 2025 © F3News Right Reserved.
          </p>
        </div>
      </div>
    </>
  );
}
