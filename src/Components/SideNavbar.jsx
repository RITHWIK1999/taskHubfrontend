import { faChartLine, faList, faPlus, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem("token");
    localStorage.removeItem("existingUser");

   
    navigate("/");
  };
  return (
    <nav className="h-screen bg-linear-to-br from-blue-400 to-blue-950 p-6">
      <NavLink
        to="/home"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-300 ${
            isActive
              ? "bg-white text-blue-950 shadow-lg"
              : "text-white hover:bg-white/20"
          }`
        }
      >
        <FontAwesomeIcon icon={faChartLine} className="text-xl" />
        <span className="font-bold">Dashboard</span>
      </NavLink>

      <NavLink
        to="/home/addtask"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg mb-2 transition-all duration-300 ${
            isActive
              ? "bg-white text-blue-950 shadow-lg"
              : "text-white hover:bg-white/20"
          }`
        }
      >
        <FontAwesomeIcon icon={faPlus} className="text-xl" />
        <span className="font-bold">Add Task</span>
      </NavLink>

      <NavLink
        to="/home/listtask"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-white text-blue-950 shadow-lg"
              : "text-white hover:bg-white/20"
          }`
        }
      >
        <FontAwesomeIcon icon={faList} className="text-xl" />
        <span className="font-bold">List Task</span>
      </NavLink>
       <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 py-3 px-4 rounded-lg text-white hover:bg-red-500 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="text-xl" />
        <span className="font-bold">Logout</span>
      </button>
    </nav>
  );
}

export default SideNavbar;
