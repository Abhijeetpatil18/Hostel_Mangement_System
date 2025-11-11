import React from "react";
import Navabar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="min-h-screen antialiased bg-slate-300 text-slate-800">
        <Navabar />
        <div className="flex min-h-screen mr-4">
          <aside className="w-65  text-white ">
            <Sidebar />
          </aside>

          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
