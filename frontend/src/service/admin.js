import axios from "axios";

const API = "http://localhost:3000/api/adminroutes";

// AUTH CONFIG

const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ADMIN SIGNUP

export const adminSignup = async (data) => {
  return axios.post(`${API}/signup`, data);
};

// ADMIN LOGIN

export const adminLogin = async (data) => {
  return axios.post(`${API}/login`, data);
};

// GET ADMIN PROFILE

export const adminProfile = async () => {
  return axios.get(`${API}/profile`, getAuthConfig());
};

// UPDATE ADMIN PROFILE

export const updateAdminProfile = async (data) => {
  return axios.patch(`${API}/profile`, data, getAuthConfig());
};

// CHANGE ADMIN PASSWORD

export const changeAdminPassword = async (data) => {
  return axios.patch(`${API}/change-password`, data, getAuthConfig());
};
