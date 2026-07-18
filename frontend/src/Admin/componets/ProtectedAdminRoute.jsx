import React from "react";
import { Navigate } from "react-router";

function ProtectedAdminRoute({ children }) {

  const token = localStorage.getItem("adminToken");
  const admin = JSON.parse(localStorage.getItem("admin"));

  // Not Logged In
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Admin Data Missing
  if (!admin) {
    localStorage.removeItem("adminToken");

    return <Navigate to="/admin/login" replace />;
  }

  // Not Admin
  if (admin.role !== "admin") {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;