import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../../../service/wishlist";

import { allProducts } from "../../../service/product";
import { addToCart } from "../../../service/cart";
import { toast } from "react-toastify";

function FeaturedProducts() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
  }, []);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await allProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const userId = user._id || user.id;

      const res = await getWishlist(userId);

      const ids =
        res.data?.wishlist?.products?.map((item) => item._id) || [];

      setWishlist(ids);
    } catch (error) {
      console.log(error);
    }
  };

  // Add / Remove Wishlist
  const toggleWishlist = async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const userId = user._id || user.id;

      if (wishlist.includes(productId)) {
        await removeWishlist({
          user: userId,
          product: productId,
        });

        setWishlist((prev) =>
          prev.filter((id) => id !== productId)
        );

        toast.success("Removed from wishlist");
      } else {
        await addWishlist({
          user: userId,
          product: productId,
        });

        setWishlist((prev) => [...prev, productId]);

        toast.success("Added to wishlist");
      }

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  console.log(localStorage.getItem("user"));

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
        toast.success("Product added to cart successfully.");

        // Navbar cart count update
        window.dispatchEvent(new Event("cartUpdated"));

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

  // Category Filter
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
        (product) => product.category === activeCategory
      );

  return (
    <section className="w-full py-20 px-6 bg-gray-300">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-white">
          Featured Products
        </h2>

        <p className="text-gray-300 mt-3">
          Discover our trending collections
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {["All", "Trending", "New Arrival", "Best Seller"].map(
          (category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-white text-black shadow-xl"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
            >
              {category === "All"
                ? "All Products"
                : category}
            </button>
          )
        )}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl group"
          >
            {/* Product Image */}
            <div className="relative h-72 overflow-hidden">

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-4 right-4 z-20 bg-white p-3 rounded-full shadow-lg"
              >
                <FaHeart
                  className={`text-lg ${wishlist.includes(product._id)
                    ? "text-red-500"
                    : "text-gray-400"
                    }`}
                />
              </button>

              {/* Category */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                onClick={() =>
                  navigate(`/product-details/${product._id}`)
                }
              />
            </div>

            {/* Product Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-1">
                {product.brand}
              </p>

              <div className="flex items-center justify-between mt-3">
                <div>
                  {product.discountPrice > 0 ? (
                    <>
                      <p className="text-xl font-bold text-green-600">
                        ₹{product.discountPrice}
                      </p>

                      <p className="text-sm text-gray-400 line-through">
                        ₹{product.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-bold text-green-600">
                      ₹{product.price}
                    </p>
                  )}
                </div>

                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Stock: {product.stock}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">

                {/* Add To Cart */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                  Add Cart
                </button>

                {/* Buy Now */}
                <button
                  onClick={() =>
                    navigate(`/product-details/${product._id}`)
                  }
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition"
                >
                  Buy Now
                </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;