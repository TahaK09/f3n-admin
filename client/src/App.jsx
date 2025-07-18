import { useEffect, useState } from "react";
import axios from "axios";
import Logo from "./assets/f3news-logo-new.png";
import HomeSection from "./components/homeSection";
import VideoFeatures from "./Pages/videoFeatured";

export default function AdminNewsPage() {
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <div className="bg-[#bbbbbb] text-white py-14 px-6 w-full flex flex-col justify-center items-center">
        <div className="flex flex-row gap-3 justify-center items-center">
          <div className="w-24 h-24">
            <img src={Logo} alt="logo" className="w-full h-full rounded-full" />
          </div>
          <div className=" flex flex-col gap-2">
            <div className="text-4xl font-bold">F3News Admin Dashboard</div>{" "}
            <div className="text-lg opacity-90">
              Manage news articles, publish updates, and highlight top stories.
            </div>
          </div>
        </div>
      </div>

      {/* Section */}
      {/* <HomeSection /> */}
      <VideoFeatures />
    </div>
  );
}
