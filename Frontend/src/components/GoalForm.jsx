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

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "investmentType" && value === "Sip") {
      setSnackbar({
        open: true,
        message: "SIP option is in progress and will be available soon!",
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
    try {
      if (formData.investmentType === "Sip") {
        setSnackbar({
          open: true,
          message: "SIP option is not available yet!",
          severity: "info",
        });
        return;
      }

      await axios.post(url + "user/createGoal", {
        userToken: localStorage.getItem("token"),
        goalDetails: formData,
      });
      setSnackbar({
        open: true,
        message: "Goal created successfully!",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to create goal. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Your Goal
        </h2>

        {/* Goal Name */}
        <div className="mb-4">
          <label
            htmlFor="goalName"
            className="block text-sm font-medium text-gray-700"
          >
            Goal Name
          </label>
          <input
            type="text"
            id="goalName"
            name="goalName"
            value={formData.goalName}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your goal name"
          />
        </div>

        {/* Investment Type */}
        <div className="mb-4">
          <label
            htmlFor="investmentType"
            className="block text-sm font-medium text-gray-700"
          >
            Investment Type
          </label>
          <select
            id="investmentType"
            name="investmentType"
            value={formData.investmentType}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            <option value="Sip" >
              SIP
            </option>
            <option value="Lumpsum">Lump Sum</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="investmentAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Investment Amount
          </label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            value={formData.investmentAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Target Amount */}
        <div className="mb-4">
          <label
            htmlFor="targetAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Target Amount
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter target amount"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration in months
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter duration in months"
          />
        </div>

        {/* Risk Tolerance */}
        <div className="mb-4">
          <label
            htmlFor="riskTolerance"
            className="block text-sm font-medium text-gray-700"
          >
            Risk Tolerance
          </label>
          <select
            id="riskTolerance"
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select risk tolerance</option>
            <option value="Very Low">Very Low</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbar.severity === "error" ? "#8B0000" : "#006400", // Dark red for error, dark green for success
            color: "white",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default GoalForm;
