import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../url";
import Chart from "../utility/Chart";
import LinearProgress from "@mui/material/LinearProgress";
const DashBoard = () => {
  const [goal, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateGoal = () => {
    navigate("/createGoal"); // Redirect to /createGoal page
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    setIsLoading(true);
    axios
      .post(url + "user/getGoals", {
        userToken: localStorage.getItem("token"),
      })
      .then((goals) => {
        setGoals(goals.data);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10 px-6">
      {/* Loading Bar */}
      {isLoading && (
        <div className="mb-10">
          <LinearProgress color="primary" />
        </div>
      )}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Your Dashboard</h1>
        <button
          onClick={handleCreateGoal}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          + Create Goal
        </button>
      </div>
      {/* Goals */}
      {!isLoading && goal.length == 0 && <div>No goals created yet</div>}
      <div className="flex flex-wrap gap-8">
        {goal.map((el) => (
          <div className="border-2 p-4 ">
            <div>
              <Chart goal={el} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{el.goalName}</h2>
              <p className="text-gray-500">{el.description}</p>
              <p className="text-gray-500">Target Amount: {el.targetAmount} |  Current Amount: {el.investmentAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
