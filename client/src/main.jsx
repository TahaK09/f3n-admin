import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import HomeSection from "./components/custom/homeSection";
import ImageSection from "./components/custom/imageSection";
import VideoFeatures from "./Pages/videoFeatured";
import Article from "./Pages/articlePage";
import "./index.css";
import App from "./App.jsx";
import ArticlesEdit from "./Pages/articlesEdit";
import Signin from "./Auth/Signin.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import AuthGuard from "./lib/authGaurd.jsx";
import PublicLayout from "./components/layouts/publicLayouts.jsx";
import PrivateLayout from "./components/layouts/privateLayouts.jsx";
import Tutorials from "./Pages/tutorials.jsx";
import Guides from "./Pages/guides.jsx";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/signin", element: <Signin /> },
      { path: "signup", element: <Navigate to="/signin" replace /> },
    ],
  },
  {
    element: (
      <AuthGuard>
        <PrivateLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <HomeSection /> },
      { path: "add-article", element: <Article /> },
      { path: "edit-article", element: <ArticlesEdit /> },
      { path: "image-gallery", element: <ImageSection /> },
      { path: "featured-video", element: <VideoFeatures /> },
      { path: "add-links", element: <>Add Links</> },
      { path: "edit/:_id", element: <Article /> },
      { path: "tutorials", element: <Tutorials /> },
      { path: "tutorials/guides", element: <Guides /> },
    ],
  },
  { path: "*", element: "Nothing Found!" },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
