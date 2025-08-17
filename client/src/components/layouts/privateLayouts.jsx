// src/components/layouts/privateLayouts.jsx
import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { UserAuth } from "../../context/authContext.jsx";
import { Toaster } from "react-hot-toast";
import Logo from "../../assets/f3news-logo-new.png";
import profile_icon from "../../assets/profile_icon.png";
import bell_icon from "../../assets/bell_icon.svg";

export default function PrivateLayout() {
  const { signOut, user } = UserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = "User";
  const email = "tahafirozkhan39@gmail.com";

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };
  console.log(user.email);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (searchQuery.length > 0) {
  //     navigate("/products");
  //   }
  // }, [searchQuery]);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Articles", link: "/edit-article" },
    { name: "Guidelines", link: "/" },
    { name: "Tutorials", link: "/" },
  ];

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
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
          <Link to="/" onClick={() => setOpen(false)}>
            <img className="h-9" src={Logo} alt="dummyLogoColored" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-8">
            <Link to="/">Home</Link>
            <Link to="/edit-article">Article</Link>
            <Link to="/tutorials">Tutorials</Link>

            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
              <input
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search Articles"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.836 10.615 15 14.695"
                  stroke="#7A7B7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  clip-rule="evenodd"
                  d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                  stroke="#7A7B7D"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div
              onClick={() => navigate("/notification")}
              className="relative cursor-pointer"
            >
              <img src={bell_icon} alt="" className="w-auto h-auto" />
              <button className="absolute -top-0.75 -right-0.75 text-xs text-white bg-green-600 w-[10px] h-[10px] rounded-full"></button>
            </div>

            <div className="relative group">
              <div className="w-8 h-8 capitalize flex justify-center items-center bg-amber-700 text-white font-semibold rounded-full">
                {user.email.slice(0, 1)}
              </div>
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li
                  onClick={() => navigate(`/articles/?author=${user.email}`)}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My Articles
                </li>
                <li
                  onClick={signOut}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:hidden ">
            <button
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              aria-label="Menu"
              className=""
            >
              {/* Menu Icon SVG */}
              <svg
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="21" height="1.5" rx=".75" fill="#426287" />
                <rect
                  x="8"
                  y="6"
                  width="13"
                  height="1.5"
                  rx=".75"
                  fill="#426287"
                />
                <rect
                  x="6"
                  y="13"
                  width="15"
                  height="1.5"
                  rx=".75"
                  fill="#426287"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div
              className={`${
                open ? "flex" : "hidden"
              } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
            >
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link to="/edit-articles" onClick={() => setOpen(false)}>
                Articles
              </Link>

              <Link to="/tutorials" onClick={() => setOpen(false)}>
                Tutorials
              </Link>

              <button onClick={handleLogout}>Logout</button>

              <button
                onClick={signOut}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-indigo-600 transition text-white rounded-full text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="bg-gray-200 p-6 md:hidden transition-all duration-1000">
            <ul className="flex flex-col space-y-4 text-gray-800 text-lg">
              {navLinks.map((nav, i) => (
                <li key={i}>
                  <Link
                    to={nav.link}
                    className="text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout}
              className="bg-white text-gray-700 mt-6 w-full text-sm hover:opacity-90 active:scale-95 transition-all h-11 rounded-full"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-grow">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="border-t py-10 bg-[#1c1c1d] border-gray-300 px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white text-white">
            {/* Logo & Address */}
            <div className="flex flex-col md:flex-row gap-5">
              <img className="w-20 rounded-full" src={Logo} alt="Logo" />
              <div>
                <div className="text-xl font-medium">F3News</div>
                <div className="text-base font-light">
                  FAST | FACTS | FEARLESS
                </div>
                <p className="max-w-[410px] mt-4 text-sm text-white/80">
                  Address: F3 News, Tattoo, Office No 1, 1st Floor, 545,
                  Kalbadevi Street, opp. Metro Cinema, near Mao Resturant,
                  Mumbai, Maharashtra 400002
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-8 w-full md:w-[50%]">
              {linkSections.map((section, index) => (
                <div key={index} className="min-w-[120px]">
                  <h3 className="font-semibold text-base mb-3">
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

          <p className="py-4 text-center text-xs md:text-sm text-white/70">
            Copyright 2025 © F3News. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
