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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
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
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
