import axios from "axios";

const API = "http://localhost:3000/api/admin/customer";

// AUTH CONFIG

const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET ALL CUSTOMERS

export const getAllCustomers = async () => {
  return await axios.get(`${API}/get-all`, getAuthConfig());
};

// GET SINGLE CUSTOMER

export const getSingleCustomer = async (id) => {
  return await axios.get(`${API}/getby/${id}`, getAuthConfig());
};

// BLOCK / UNBLOCK CUSTOMER

export const updateCustomerStatus = async (id, isBlocked) => {
  return await axios.patch(
    `${API}/status/${id}`,
    { isBlocked },
    getAuthConfig(),
  );
};

// DELETE CUSTOMER

export const deleteCustomer = async (id) => {
  return await axios.delete(`${API}/delete/${id}`, getAuthConfig());
};
