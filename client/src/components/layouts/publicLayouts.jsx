import React from "react";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      {/* Page Content */}

      <Outlet />

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
        Public Footer
      </footer> */}
    </>
  );
}
