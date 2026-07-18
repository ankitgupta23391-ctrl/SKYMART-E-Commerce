import axios from "axios";

const API_URL = "https://skymart-e-commerce.onrender.com/api/product";

// SEARCH PRODUCTS

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
