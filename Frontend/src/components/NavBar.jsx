import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [username, setusername] = useState("");
  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-green-500 text-white shadow-md">
        <NavLink to="/dashboard">
          <h1 className="text-2xl font-bold">Investophile</h1>
        </NavLink>
        <div className="text-lg">
          <span>Welcome, </span>
          <span className="font-semibold">{username}</span>
        </div>
        <div>
          <button onClick={logouthandler}>Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
