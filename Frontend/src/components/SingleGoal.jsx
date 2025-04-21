import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { url } from "../url";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    padding: theme.spacing(2),
    maxWidth: "400px",
    width: "100%",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: theme.palette.error.main,
  "& .MuiTypography-root": {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  "& .MuiDialogContentText-root": {
    fontSize: "1.1rem",
    color: theme.palette.text.secondary,
  },
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(1),
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
  padding: "8px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  padding: "8px 24px",
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
}));

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteGoal = async () => {
    try {
      await axios.delete(url + "user/deleteGoal", {
        data: {
          userToken: localStorage.getItem("token"),
          goalId: goal._id,
        },
      });
      setSnackbar({
        open: true,
        message: "Goal deleted successfully!",
        severity: "success",
      });
      handleDeleteDialogClose();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete goal:", error);
      setSnackbar({
        open: true,
        message: "Something went wrong while deleting the goal.",
        severity: "error",
      });
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

          {/* Financial Metrics Section */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">💼 Portfolio Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-1">Projected Return</p>
                <p className="text-2xl font-bold text-green-600">{goal.allocation?.projected_return?.toFixed(2)}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-1">CAGR</p>
                <p className="text-2xl font-bold text-blue-600">{goal.allocation?.projected_cagr?.toFixed(2)}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-1">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-purple-600">{goal.allocation?.sharpe_ratio?.toFixed(2)}</p>
              </div>
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
            <Button
              onClick={handleDeleteDialogOpen}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                padding: "8px 24px",
              }}
            >
              Delete Goal
            </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {allocation.map((asset) => (
                <div
                  key={asset.label}
                  className="bg-white rounded-xl shadow-md p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-2xl font-bold text-gray-800">
                      {parseFloat(asset.value).toFixed(1)}%
                    </div>
                    <div className="text-sm font-medium text-gray-600 capitalize">
                      {asset.label}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${asset.value}%` }}
                      ></div>
                    </div>
                  </div>
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

        {/* Delete Confirmation Dialog */}
        <StyledDialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionProps={{
            onEntering: (node) => {
              node.style.transform = "scale(1)";
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleDeleteDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <StyledDialogTitle id="alert-dialog-title">
            <WarningAmberIcon color="error" />
            Delete Goal
          </StyledDialogTitle>
          <StyledDialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete "{goal.goalName}"? This action cannot be undone and all associated data will be permanently removed.
            </DialogContentText>
          </StyledDialogContent>
          <StyledDialogActions>
            <CancelButton onClick={handleDeleteDialogClose}>
              Cancel
            </CancelButton>
            <DeleteButton
              onClick={handleDeleteGoal}
              variant="contained"
              startIcon={<DeleteIcon />}
              autoFocus
            >
              Delete
            </DeleteButton>
          </StyledDialogActions>
        </StyledDialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          TransitionProps={{
            onEntering: (node) => {
              node.style.transform = "translateY(0)";
            },
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              "& .MuiAlert-icon": {
                fontSize: "1.5rem",
              },
              "& .MuiAlert-message": {
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SingleGoal;
