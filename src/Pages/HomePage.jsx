import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideNavbar from "../Components/SideNavbar";
import Topbar from "../Components/Topbar";
import Dashboard from "./Dashboard";
import AddTask from "./AddTask";
import ListTask from "./ListTask";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          className={`
            fixed lg:static top-16 left-0 h-[calc(100vh-64px)]
            w-56 bg-white shadow-lg z-40
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <SideNavbar />
        </div>

        <div className="flex-1 p-5 lg:ml-0">
          <div className="shadow-2xl bg-white rounded-3xl min-h-[calc(100vh-104px)] p-5">
            <Routes>
                 <Route path="/" element={<Dashboard/>} />
                 <Route path="/addtask" element={<AddTask/>} />
                 <Route path="/listtask" element={<ListTask/>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;