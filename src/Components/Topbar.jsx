import React from "react";

function Topbar({ isOpen, setIsOpen }) {
  const userName = localStorage.getItem("userName");

  return (
    <div className="bg-white shadow-md h-16 px-5 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-950 lg:ps-10 ps-0">
        TaskHub
      </h1>
      <div className="flex items-center gap-4 lg:pe-5 pe-0">
        <div className="text-right">
          <p className="text-xs text-black hidden sm:block">
            hi,
          </p>
          <h2 className="text-blue-950 font-semibold text-sm sm:text-base">
            {userName}
          </h2>
        </div>

        <button
          className="lg:hidden text-3xl text-blue-950"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </div>
  );
}

export default Topbar;