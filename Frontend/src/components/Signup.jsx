import React, { useState } from "react";
import { url } from "../url";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing the eye icons
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for showing password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing confirm password
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
    vertical: "top",
    horizontal: "center",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (confirmPassword !== formData.password) {
        setSnackbar({
          open: true,
          message: "Confirm Password and Password do not match.",
          severity: "error",
          vertical: "top",
          horizontal: "right",
        });
        return;
      }
      setLoading(true);
      const res = await axios.post(url + "user/signup", formData);
      setLoading(false);

      setSnackbar({
        open: true,
        message: "Signup successful! Redirecting to login...",
        severity: "success",
        vertical: "top",
        horizontal: "right",
      });

      setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Signup failed. Please try again.",
        severity: "error",
        vertical: "top",
        horizontal: "right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:outline-none transition duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:outline-none transition duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:outline-none transition duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:outline-none transition duration-300"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-500 focus:outline-none transition duration-300"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle show/hide confirm password
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Log In
          </NavLink>
        </p>
      </div>
      <Snackbar
  open={snackbar.open}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={handleSnackbarClose}
    severity={snackbar.severity}
    sx={{
      width: "100%",
      backgroundColor: snackbar.severity === "error" ? "#8B0000" : "#006400", // Dark red for error, dark green for success
      color: "white", 
    }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </div>
  );
};

export default Signup;
