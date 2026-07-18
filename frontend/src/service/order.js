import axios from "axios";

const API = "https://skymart-e-commerce.onrender.com/api/order";

// AUTH CONFIG (ADMIN)
const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// CREATE ORDER (USER)
export const createOrder = async (data) => {
  return await axios.post(`${API}/add-order`, data);
};

// GET ALL ORDERS (ADMIN)
export const getAllOrders = async () => {
  return await axios.get(`${API}/getall`, getAuthConfig());
};

// GET USER ORDERS (USER)
export const getUserOrders = async (userId) => {
  return await axios.get(`${API}/user/${userId}`);
};

// UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = async (id, data) => {
  return await axios.patch(`${API}/update/${id}`, data, getAuthConfig());
};

// DELETE ORDER (ADMIN)
export const deleteOrder = async (id) => {
  return await axios.delete(`${API}/delete/${id}`, getAuthConfig());
};

// GET ORDER BY ID
export const getOrderById = async (id) => {
  return await axios.get(`${API}/${id}`, getAuthConfig());
};

// GET SINGLE ORDER
export const getSingleOrder = async (id) => {
  return await axios.get(`${API}/singleorderby/${id}`, getAuthConfig());
};
