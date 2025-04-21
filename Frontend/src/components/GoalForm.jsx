import React, { useState } from "react";
import axios from "axios";
import { url } from "../url";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const GoalForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goalName: "",
    investmentType: "",
    investmentAmount: "",
    riskTolerance: "",
    duration: "",
    frequency: "Monthly",
    targetAmount: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false); // New loading state

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "investmentType" && value === "Sip") {
      setSnackbar({
        open: true,
        message: "Will be available soon",
        severity: "info",
      });

      setFormData((prev) => ({
        ...prev,
        investmentType: "",
      }));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.investmentType === "Sip") {
      setSnackbar({
        open: true,
        message: "SIP option is not available yet!",
        severity: "info",
      });
      return;
    }

    setLoading(true); // Start loading
    setSnackbar({
      open: true,
      message: "Model is allocating your investments...",
      severity: "info",
    });

    try {
      await axios.post(url + "user/createGoal", {
        userToken: localStorage.getItem("token"),
        goalDetails: formData,
      });

      // Fetch the newly created goal
      const goalsResponse = await axios.post(url + "user/getGoals", {
        userToken: localStorage.getItem("token"),
      });

      // Get the most recently created goal
      const newGoal = goalsResponse.data[goalsResponse.data.length - 1];

      setSnackbar({
        open: true,
        message: "Goal created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate(`/goal/${newGoal._id}`, { state: { goal: newGoal } });
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to create goal. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🎯 Create Your Investment Goal
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="goalName" className="text-sm font-semibold text-gray-700">
              Goal Name
            </label>
            <input
              type="text"
              id="goalName"
              name="goalName"
              value={formData.goalName}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Eg: Buy a car, Save for wedding"
              required
            />
          </div>

          <div>
            <label htmlFor="investmentType" className="text-sm font-semibold text-gray-700">
              Investment Type
            </label>
            <select
              id="investmentType"
              name="investmentType"
              value={formData.investmentType}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select an option</option>
              <option value="Sip">SIP</option>
              <option value="Lumpsum">Lump Sum</option>
            </select>
          </div>

          <div>
            <label htmlFor="investmentAmount" className="text-sm font-semibold text-gray-700">
              Investment Amount (₹)
            </label>
            <input
              type="number"
              id="investmentAmount"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Eg: 50000"
              required
            />
          </div>

          <div>
            <label htmlFor="targetAmount" className="text-sm font-semibold text-gray-700">
              Target Amount (₹)
            </label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Eg: 1000000"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="text-sm font-semibold text-gray-700">
              Duration (in months)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Eg: 24"
              required
            />
          </div>

          <div>
            <label htmlFor="riskTolerance" className="text-sm font-semibold text-gray-700">
              Risk Tolerance
            </label>
            <select
              id="riskTolerance"
              name="riskTolerance"
              value={formData.riskTolerance}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">Select risk tolerance</option>
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Moderate</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "⏳ Allocating..." : "🚀 Submit Goal"}
          </button>
        </div>
      </form>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbar.severity === "error"
                ? "#8B0000"
                : snackbar.severity === "info"
                  ? "#007BFF"
                  : "#006400",
            color: "white",
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GoalForm;
