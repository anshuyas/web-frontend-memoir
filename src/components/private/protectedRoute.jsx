import React from "react";
import { Navigate } from "react-router-dom";

const protectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default protectedRoute;