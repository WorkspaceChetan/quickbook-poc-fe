import React from "react";
import { Navigate } from "react-router-dom";

const UnauthorizedRoute = ({ children }) => {
  // const isLoggedIn = localStorage.getItem("isLoggedIn");
  // if (isLoggedIn === true) {
  //   return <Navigate to="/account" replace />;
  // }
  return children;
};

export default UnauthorizedRoute;
