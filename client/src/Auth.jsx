import React from "react";
import Logo from "./assets/f3news-logo-new.png";
import { Outlet } from "react-router-dom";
import HomeSection from "./components/custom/homeSection";
import VideoFeatures from "./Pages/videoFeatured";
import { Toaster } from "react-hot-toast";

function Auth() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Auth;
