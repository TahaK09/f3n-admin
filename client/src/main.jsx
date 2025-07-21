import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import HomeSection from "./components/homeSection";
import ArticleSection from "./components/articleSection";
import ImageSection from "./components/imageSection";
import "./index.css";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeSection /> },
      { path: "/add-articles", element: <ArticleSection /> },
      { path: "/edit-article", element: "Edit Articles" },
      { path: "/image-gallery", element: <ImageSection /> },
      { path: "/promotions", element: "Promotions" },
      { path: "/add-links", element: "Add Links" },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
