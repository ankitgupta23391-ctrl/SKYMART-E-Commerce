import axios from "axios";

const API = "http://localhost:3000/api/auth";

// AUTH HEADER

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET USER PROFILE

export const getProfile = async () => {
  return await axios.get(
    `${API}/profile`,
    getAuthConfig()
  );
};

// UPDATE USER PROFILE

export const updateProfile = async (data) => {
  return await axios.patch(
    `${API}/profile`,
    data,
    getAuthConfig()
  );
};

// CHANGE PASSWORD

export const changePassword = async (data) => {
  return await axios.patch(
    `${API}/change-password`,
    data,
    getAuthConfig()
  );
};

// DELETE ACCOUNT

export const deleteAccount = async () => {
  return await axios.delete(
    `${API}/delete-account`,
    getAuthConfig()
  );
};