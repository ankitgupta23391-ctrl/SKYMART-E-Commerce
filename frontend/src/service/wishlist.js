import axios from "axios";

// Add Wishlist
export const addWishlist = async (data) => {
  return await axios.post("http://localhost:3000/api/wishlist/add-wish", data);
};

// Get Wishlist
export const getWishlist = async (userId) => {
  return await axios.get(`http://localhost:3000/api/wishlist/wish/${userId}`);
};

// Remove Wishlist
export const removeWishlist = async (data) => {
  return await axios.delete("http://localhost:3000/api/wishlist/wish/remove", {
    data,
  });
};

// Clear Wishlist
export const clearWishlist = async (userId) => {
  return await axios.delete(
    `http://localhost:3000/api/wishlist/wish/clear/${userId}`,
  );
};

// Delete Wishlist
export const deleteWishlist = async (userId) => {
  return await axios.delete(
    `http://localhost:3000/api/wishlist/wish/delete/${userId}`,
  );
};
