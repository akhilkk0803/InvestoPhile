import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { url } from "../url";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";

const SingleGoal = () => {
  const location = useLocation();
  const { goalid } = useParams();
  const [goal, setGoal] = useState({});
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [newProgress, setNewProgress] = useState({
    investment: "",
  });

  useEffect(() => {
    if (location?.state?.goal) {
      console.log(location.state.goal);
      setGoal(location.state.goal);
    }
  }, [location, goalid]);

  // Handle updating the progress
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
      const res = await axios.put(url + "user/updateGoal", {
        userToken: localStorage.getItem("token"),
        goalDetails: {
          ...goal,
          progress: [...goal.progress, updatedProgress],
        },
      });
      setShowProgressForm(false);
      setNewProgress({ investment: "" });
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-4xl font-extrabold">
          {goal.goalName || "Goal Details"}
        </h1>
        <p className="mt-2 text-xl">
          Created on:{" "}
          <span className="font-semibold">
            {new Date(goal.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-semibold mb-6">Goal Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">
                Target Amount:
              </span>{" "}
              ₹{goal.targetAmount}
            </p>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">
                Investment Amount:
              </span>{" "}
              ₹{goal.investmentAmount}
            </p>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">Duration:</span>{" "}
              {goal.duration} months
            </p>
          </div>
          <div>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">
                Investment Type:
              </span>{" "}
              {goal.investmentType}
            </p>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">Frequency:</span>{" "}
              {goal.frequency}
            </p>
            <p className="text-xl mb-4">
              <span className="font-semibold text-gray-700">
                Risk Tolerance:
              </span>{" "}
              {goal.riskTolerance}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-3xl font-semibold mb-6">Asset Allocation</h2>
        {goal?.allocation?.length > 0 && (
          <div className="flex justify-center items-center mb-6">
            <PieChart
              series={[{ data: goal?.allocation, innerRadius: 80 }]}
              width={750}
              height={450}
            />
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
          {goal?.allocation?.map((asset) => (
            <p key={asset.label} className="font-semibold text-gray-700">
              <span className="capitalize">{asset.label}:</span>{" "}
              {parseFloat(asset.value).toFixed(2)}%
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-6 flex justify-center items-center flex-col">
        {goal?.progress?.length > 0 ? (
          <LineChart
            xAxis={[
              {
                data: goal?.progress?.map((data) => data.progressNumber),
                scaleType: "linear", // or "band", "log", etc.
                label: "Progress ",
              },
            ]}
            yAxis={[
              {
                label: "Current Amount",
              },
            ]}
            series={[
              {
                area: true,
                showMark: false,
                data: goal?.progress?.map((data) => data.investment),
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
          <div>No progress data available</div>
        )}
        <button
          onClick={() => setShowProgressForm(!showProgressForm)}
          className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
        >
          {showProgressForm ? "Cancel" : "Update Progress"}
        </button>

        {showProgressForm && (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  Current Amount
                </label>
                <input
                  type="number"
                  value={newProgress.investment}
                  onChange={(e) =>
                    setNewProgress({
                      ...newProgress,
                      investment: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter current amount"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleUpdateProgress}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Add Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleGoal;
