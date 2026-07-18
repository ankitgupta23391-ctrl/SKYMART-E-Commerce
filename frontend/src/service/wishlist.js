import axios from "axios";

// Add Wishlist
export const addWishlist = async (data) => {
  return await axios.post("https://skymart-e-commerce.onrender.com/api/wishlist/add-wish", data);
};

// Get Wishlist
export const getWishlist = async (userId) => {
  return await axios.get(`https://skymart-e-commerce.onrender.com/api/wishlist/wish/${userId}`);
};

// Remove Wishlist
export const removeWishlist = async (data) => {
  return await axios.delete("https://skymart-e-commerce.onrender.com/api/wishlist/wish/remove", {
    data,
  });
};

// Clear Wishlist
export const clearWishlist = async (userId) => {
  return await axios.delete(
    `https://skymart-e-commerce.onrender.com/api/wishlist/wish/clear/${userId}`,
  );
};

// Delete Wishlist
export const deleteWishlist = async (userId) => {
  return await axios.delete(
    `https://skymart-e-commerce.onrender.com/api/wishlist/wish/delete/${userId}`,
  );
};
