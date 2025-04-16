import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import { url } from "../url";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
    vertical: "top",
    horizontal: "center",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { vertical, horizontal, open, message, severity } = snackbar;

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
      setLoading(true);
      const res = await axios.post(url + "user/login", formData);
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Login Successfull redirecting to dashboard",
        severity: "success",
        vertical: "top",
        horizontal: "right",
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Login failed. Please try again.",
        severity: "error",
        vertical: "top",
        horizontal: "right",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-label="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              aria-label="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign Up
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
          severity={severity}
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

export default Login;
