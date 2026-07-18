import axios from "axios";

// Add Product
export const addToCart = async (data) => {
  return await axios.post("http://localhost:3000/api/cart/add-cart", data);
};

// Get User Cart
export const getCart = async (userId) => {
  return await axios.get(`http://localhost:3000/api/cart/get/${userId}`);
};

// Update Quantity
export const updateCart = async (data) => {
  return await axios.patch("http://localhost:3000/api/cart/cart/update", data);
};

// Remove Product
export const removeCartItem = async (data) => {
  return await axios.delete("http://localhost:3000/api/cart/cart/remove", {
    data,
  });
};

// Clear Cart
export const clearCart = async (userId) => {
  return await axios.delete(
    `http://localhost:3000/api/cart/cart/clear/${userId}`,
  );
};

// Delete Cart
export const deleteCart = async (userId) => {
  return await axios.delete(
    `http://localhost:3000/api/cart/cart/delete/${userId}`,
  );
};
