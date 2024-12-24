import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Root = () => {
  const location = useLocation();
  const hideNavBarRoutes = ["/login", "/signup", "/"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavBar && <NavBar />}
      <Outlet />
    </div>
  );
};

export default Root;
