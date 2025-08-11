import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import HomeSection from "./components/custom/homeSection";
import ImageSection from "./components/custom/imageSection";
import VideoFeatures from "./Pages/videoFeatured";
import Article from "./Pages/articlePage";
import "./index.css";
import App from "./App.jsx";
import ArticlesEdit from "./Pages/articlesEdit";
import Auth from "./Auth.jsx";
import Signin from "./Auth/Signin.jsx";
import Signup from "./Auth/Signup.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeSection /> },
      { path: "/add-articles", element: <Article /> },
      { path: "/edit-article", element: <ArticlesEdit /> },
      { path: "/image-gallery", element: <ImageSection /> },
      { path: "/promotions", element: "Promotions" },
      { path: "/featured-video", element: <VideoFeatures /> },
      { path: "/add-links", element: "Add Links" },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  // {
  //   path: "auth",
  //   element: <Auth />,
  //   children: [
  //     { path: "signin", element: <Signin /> },
  //     { path: "signup", element: <Signup /> },
  //   ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
