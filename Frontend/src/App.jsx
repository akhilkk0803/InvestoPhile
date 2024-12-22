import React from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import GoalForm from "./components/GoalForm";
import "./index.css";
import Home from "./components/Home";
import DashBoard from "./components/DashBoard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "createGoal",
          element: <GoalForm />,
        },
        {
          path: "dashboard",
          element: <DashBoard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
