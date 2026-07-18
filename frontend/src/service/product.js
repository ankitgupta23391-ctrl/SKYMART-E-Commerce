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

// ADD PRODUCT
export const addProduct = async (data) => {
  return await axios.post(`${API}/add-product`, data, getAuthConfig());
};

// GET ALL PRODUCTS
export const allProducts = async () => {
  return await axios.get(`${API}/getAll`, getAuthConfig());
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (id) => {
  return await axios.get(`${API}/getby/${id}`, getAuthConfig());
};

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  return await axios.patch(`${API}/update/${id}`, data, getAuthConfig());
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  return await axios.delete(`${API}/delete/${id}`, getAuthConfig());
};
