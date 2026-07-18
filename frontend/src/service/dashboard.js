import axios from "axios";

const API = "http://localhost:3000/api/dashboard";

// AUTH CONFIG
const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// DASHBOARD STATS
export const getDashboardStats = async () => {
  return await axios.get(`${API}/stats`, getAuthConfig());
};
