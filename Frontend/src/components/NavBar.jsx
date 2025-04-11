import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [username, setusername] = useState("User");

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 bg-teal-600 text-white shadow-lg">
        <NavLink to="/dashboard" className="text-3xl font-bold hover:text-teal-300 transition duration-200">
          Investophile
        </NavLink>
    
        <div>
          <button
            onClick={logouthandler}
            className="bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
