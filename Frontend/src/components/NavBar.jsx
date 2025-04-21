import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setusername(storedName);
    }
  }, []);

  const logouthandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-8 py-4 bg-teal-600 text-white shadow-lg">
        <NavLink to="/dashboard" className="text-3xl font-bold hover:text-teal-300 transition duration-200">
          Investophile
        </NavLink>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-teal-500 px-3 py-1.5 rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium text-white">{username}</span>
          </div>
          <button
            onClick={logouthandler}
            className="bg-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-300 active:scale-95"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
