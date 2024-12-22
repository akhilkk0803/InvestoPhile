import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = ({ username }) => {
  const navigate = useNavigate();

  const handleCreateGoal = () => {
    navigate("/createGoal"); // Redirect to /createGoal page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-green-500 text-white shadow-md">
        <h1 className="text-2xl font-bold">Investophile</h1>
        <div className="text-lg">
          <span>Welcome, </span>
          <span className="font-semibold">{username}</span>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <button
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
          onClick={handleCreateGoal}
        >
          Create Goal
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
