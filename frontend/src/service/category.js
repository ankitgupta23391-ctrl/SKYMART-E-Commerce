import axios from "axios";

const API = "http://localhost:3000/api/admin";


// AUTH CONFIG
const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ADD CATEGORY
export const addCatogry = async (data) => {
  return await axios.post(`${API}/category/add`, data, getAuthConfig());
};

// GET ALL CATEGORIES
export const allCategory = async () => {
  return await axios.get(`${API}/category`, getAuthConfig());
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  return await axios.delete(`${API}/category/delete/${id}`, getAuthConfig());
};

// GET SINGLE CATEGORY
export const getSingleCategory = async (id) => {
  return await axios.get(`${API}/category/getby/${id}`, getAuthConfig());
};

// UPDATE CATEGORY
export const updateCategory = async (id, data) => {
  return await axios.patch(
    `${API}/category/update/${id}`,
    data,
    getAuthConfig(),
  );
};

// VIEW CATEGORY
export const viewCategory = async (id) => {
  return await axios.get(`${API}/category/getby/${id}`, getAuthConfig());
};

// SEARCH CATEGORY
export const searchCategory = async (name) => {
  return await axios.get(
    `${API}/category/search?name=${name}`,
    getAuthConfig(),
  );
};
