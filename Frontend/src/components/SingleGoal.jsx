import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { url } from "../url";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const SingleGoal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { goalid } = useParams();
  const [goal, setGoal] = useState({});
  const [allocation, setAllocation] = useState([]);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [newProgress, setNewProgress] = useState({
    investment: "",
  });

  const mapRisk = {
    1: "Very Low",
    2: "Low",
    3: "Moderate",
    4: "High",
    5: "Very High",
  };
  const currentAmount = goal?.progress?.at(-1)?.investment || 0;

  useEffect(() => {
    if (location?.state?.goal) {
      const { stock, fixedDeposit, gold, govt_bond, mutualFund } =
        location.state.goal.allocation;
      const allocationData = [
        { value: stock, label: "Stock" },
        { value: fixedDeposit, label: "Fixed Deposit" },
        { value: gold, label: "Gold" },
        { value: govt_bond, label: "Govt Bond" },
        { value: mutualFund, label: "Mutual Fund" },
      ];
      setGoal({
        ...location.state.goal,
      });
      setAllocation(allocationData);
      console.log(allocationData);
    }
  }, [location, goalid]);

  const handleUpdateProgress = async () => {
    if (newProgress.investment) {
      const updatedProgress = {
        investment: newProgress.investment,
        progressNumber: +goal.progress.at(-1).progressNumber + 1,
      };
      setGoal((prevGoal) => ({
        ...prevGoal,
        progress: [...prevGoal.progress, updatedProgress],
      }));
      await axios.put(url + "user/updateGoal", {
        userToken: localStorage.getItem("token"),
        goalDetails: {
          ...goal,
          allocation: goal.allocation,
          progress: [...goal.progress, updatedProgress],
        },
      });
      setShowProgressForm(false);
      setNewProgress({ investment: "" });
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const handleDeleteGoal = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(url + "user/deleteGoal", {
        data: {
          userToken: localStorage.getItem("token"),
          goalId: goal._id,
        },
      });
      alert("Goal deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete goal:", error);
      alert("Something went wrong while deleting the goal.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl shadow-lg p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-extrabold flex items-center gap-3">
            🎯 {goal.goalName || "Goal Details"}
          </h1>
          <p className="mt-2 text-lg md:text-xl">
            Created on:{" "}
            <span className="font-semibold">
              {new Date(goal.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Goal Summary */}
        <div className="bg-white rounded-xl shadow p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6">📋 Goal Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-800 text-lg">
              <p>
                <strong>🎯 Target Amount:</strong> ₹{goal.targetAmount}
              </p>
              <p>
                <strong>💰 Initial Investment:</strong> ₹{goal.investmentAmount}
              </p>
              <p>
                <strong>📈 Current Amount:</strong> ₹{currentAmount}
              </p>
              <p>
                <strong>⏳ Duration:</strong> {goal.duration} months
              </p>
            </div>
            <div className="space-y-4 text-gray-800 text-lg">
              <p>
                <strong>📊 Investment Type:</strong> {goal.investmentType}
              </p>
              <p>
                <strong>🔁 Frequency:</strong> {goal.frequency}
              </p>
              <p>
                <strong>⚖️ Risk Tolerance:</strong>{" "}
                {mapRisk[goal.riskTolerance]}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.max(
                    ((currentAmount - goal.investmentAmount) /
                      (goal.targetAmount - goal.investmentAmount)) *
                      100,
                    0
                  )}%`,
                }}
              />
            </div>
            <p className="mt-2 text-lg text-center font-semibold">
              {Math.max(
                (
                  ((currentAmount - goal.investmentAmount) /
                    (goal.targetAmount - goal.investmentAmount)) *
                  100
                ).toFixed(2),
                0
              )}
              % completed
            </p>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDeleteGoal}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              🗑️ Delete Goal
            </button>
          </div>
        </div>

        {/* Asset Allocation */}
        {allocation?.length > 0 && (
          <>
            <div className="flex justify-center items-center mb-6">
              <PieChart
                series={[{ data: allocation, innerRadius: 80 }]}
                width={750}
                height={450}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg text-gray-700 font-medium">
              {allocation.map((asset) => (
                <div key={asset.label}>
                  <span className="capitalize">{asset.label}:</span>{" "}
                  {parseFloat(asset.value).toFixed(2)}%
                </div>
              ))}
            </div>
          </>
        )}

        {/* Progress Over Time */}
        <div className="bg-white rounded-xl shadow p-6 md:p-10 flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold">📊 Progress Over Time</h2>
          {goal?.progress?.length > 0 ? (
            <LineChart
              xAxis={[
                {
                  data: goal?.progress?.map((d) => d.progressNumber),
                  scaleType: "linear",
                  label: "Progress",
                },
              ]}
              yAxis={[{ label: "Amount" }]}
              series={[
                {
                  area: true,
                  showMark: true,
                  data: goal?.progress?.map((d) => d.investment),
                },
              ]}
              sx={{
                [`& .${lineElementClasses.root}`]: {
                  display: "none",
                },
              }}
              width={700}
              height={300}
            />
          ) : (
            <p className="text-gray-500">No progress data available.</p>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setShowProgressForm(!showProgressForm)}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-md transition"
          >
            {showProgressForm ? "Cancel" : "➕ Update Progress"}
          </button>

          {/* Add Progress Form */}
          {showProgressForm && (
            <div className="w-full md:w-1/2 mt-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter Updated Amount
              </label>
              <input
                type="number"
                value={newProgress.investment}
                onChange={(e) =>
                  setNewProgress({ ...newProgress, investment: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
                placeholder="₹ Current amount"
              />
              <button
                onClick={handleUpdateProgress}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md transition"
              >
                ✅ Add Progress
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGoal;
