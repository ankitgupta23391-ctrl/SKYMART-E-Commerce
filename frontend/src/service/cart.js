import axios from "axios";

// Add Product
export const addToCart = async (data) => {
  return await axios.post("https://skymart-e-commerce.onrender.com/api/cart/add-cart", data);
};

// Get User Cart
export const getCart = async (userId) => {
  return await axios.get(`https://skymart-e-commerce.onrender.com/api/cart/get/${userId}`);
};

// Update Quantity
export const updateCart = async (data) => {
  return await axios.patch("https://skymart-e-commerce.onrender.com/api/cart/cart/update", data);
};

// Remove Product
export const removeCartItem = async (data) => {
  return await axios.delete("https://skymart-e-commerce.onrender.com/api/cart/cart/remove", {
    data,
  });
};

// Clear Cart
export const clearCart = async (userId) => {
  return await axios.delete(
    `https://skymart-e-commerce.onrender.com/api/cart/cart/clear/${userId}`,
  );
};

// Delete Cart
export const deleteCart = async (userId) => {
  return await axios.delete(
    `https://skymart-e-commerce.onrender.com/api/cart/cart/delete/${userId}`,
  );
};
