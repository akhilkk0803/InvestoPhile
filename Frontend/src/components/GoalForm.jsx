// goal webpage creation
//goal name
// investment type : sip, lump sum
// investment ammount
//risk tolerance  drop down -- very low, low, moderate,high, very high

import React, { useState } from "react";

const GoalForm = () => {
  const [formData, setFormData] = useState({
    goalName: "",
    investmentType: "",
    investmentAmount: "",
    riskTolerance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form Submitted: ${JSON.stringify(formData)}`);
    // You can send this data to your backend using Axios or Fetch.
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
            <option value="sip">SIP</option>
            <option value="lump sum">Lump Sum</option>
          </select>
        </div>

        {/* Investment Amount */}
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
            <option value="very low">Very Low</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="very high">Very High</option>
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
    </div>
  );
};

export default GoalForm;
