import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../components/Drawer";

function Layout() {
  return (
    <div className="flex">
      <Drawer />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
