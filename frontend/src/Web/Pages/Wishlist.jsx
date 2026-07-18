import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgressBar from "./ScrollProgressBar";

import {
  getWishlist,
  removeWishlist,
} from "../../service/wishlist";

import { addToCart } from "../../service/cart";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        return;
      }

      const userId = user._id || user.id;

      const res = await getWishlist(userId);

      setWishlistItems(
        res.data?.wishlist?.products || []
      );
    } catch (error) {
      console.log(error.response?.data || error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Remove Wishlist Product
  const removeFromWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const userId = user._id || user.id;

      await removeWishlist({
        user: userId,
        product: productId,
      });

      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== productId)
      );

      toast.success("Removed from wishlist");

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Failed to remove product."
      );
    }
  };

  // Add To Cart
  const handleAddToCart = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const userId = user._id || user.id;

      const res = await addToCart({
        user: userId,
        product: productId,
        quantity: 1,
      });

      if (res.data.success) {
        toast.success(
          "Product added to cart successfully."
        );

        // Navbar Cart Count Update
        window.dispatchEvent(
          new Event("cartUpdated")
        );

        // Remove from Wishlist
        await removeWishlist({
          user: userId,
          product: productId,
        });

        setWishlistItems((prev) =>
          prev.filter(
            (item) => item._id !== productId
          )
        );

        window.dispatchEvent(
          new Event("wishlistUpdated")
        );

        navigate("/cart");
      }
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add product to cart."
      );
    }
  };

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-center gap-3 mb-8 mt-20">
          <FaHeart className="text-red-500 text-3xl" />
          <h1 className="text-4xl font-bold">
            My Wishlist
          </h1>
        </div>

        {loading ? (
          <div className="text-center text-xl font-semibold py-20">
            Loading...
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-10 text-center">
            <FaHeart className="mx-auto text-6xl text-gray-300 mb-4" />

            <h2 className="text-2xl font-semibold mb-2">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500">
              Save your favorite products here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover"
                />

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.brand}
                  </p>

                  <div className="mt-3">
                    {item.discountPrice > 0 ? (
                      <>
                        <p className="text-green-600 text-xl font-bold">
                          ₹{item.discountPrice.toLocaleString()}
                        </p>

                        <p className="text-gray-400 line-through text-sm">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-green-600 text-xl font-bold">
                        ₹{item.price.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="text-yellow-500">
                      ⭐⭐⭐⭐⭐
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-5">

                    {/* Add To Cart */}
                    <button
                      onClick={() =>
                        handleAddToCart(item._id)
                      }
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                    >
                      <FaShoppingCart />
                      Add Cart
                    </button>

                    {/* Remove Wishlist */}
                    <button
                      onClick={() =>
                        removeFromWishlist(item._id)
                      }
                      className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600 transition"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Wishlist;