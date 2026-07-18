import axios from "axios";

const API = "https://skymart-e-commerce.onrender.com/api/dashboard";

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
