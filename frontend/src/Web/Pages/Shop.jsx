import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import FilterSort from "../components/HomePage/FilterSort";
import ProductCard from "../components/HomePage/ProductCard";
import ScrollProgressBar from "./ScrollProgressBar";

// Wishlist API
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "../../service/wishlist.js";

// Product API
import { allProducts } from "../../service/product.js";

// Category API
import { allCategory } from "../../service/category";

// Cart API
import { addToCart } from "../../service/cart";

function Shop() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromURL || ""
  );

  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ================= SYNC CATEGORY =================
  useEffect(() => {
    setSelectedCategory(categoryFromURL || "");
  }, [categoryFromURL]);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProducts();
    fetchCategories();
    fetchWishlist();
  }, []);

  // ================= PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await allProducts();
      if (res?.data?.success) {
        setProducts(res.data.products || []);
      }
    } catch (error) {
      toast.error("Failed to load products");
    }
  };

  // ================= CATEGORIES =================
  const fetchCategories = async () => {
    try {
      const res = await allCategory();
      if (res?.data?.success) {
        setCategories(res.data.categories || []);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // ================= WISHLIST =================
  const fetchWishlist = async () => {
    try {
      if (!user) return;

      const userId = user._id || user.id;
      const res = await getWishlist(userId);

      if (res?.data?.success) {
        setWishlist(res.data.wishlist.products || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= WISHLIST TOGGLE =================
  const handleWishlist = async (product) => {
    try {
      if (!user) {
        toast.warning("Please login first");
        navigate("/login");
        return;
      }

      const userId = user._id || user.id;

      const isWishlisted = wishlist.some(
        (item) => (item.product?._id || item.product) === product._id
      );

      if (isWishlisted) {
        await removeWishlist({
          user: userId,
          product: product._id,
        });

        // UI instantly update
        setWishlist((prev) =>
          prev.filter(
            (item) =>
              (item.product?._id || item.product) !== product._id
          )
        );

        toast.success("Removed from wishlist");
      } else {
        await addWishlist({
          user: userId,
          product: product._id,
        });

        // UI instantly update
        setWishlist((prev) => [
          ...prev,
          {
            product: {
              _id: product._id,
            },
          },
        ]);

        toast.success("Added to wishlist");
      }

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      toast.error("Wishlist update failed");
    }
  };
  // ================= CART =================
  const handleAddToCart = async (product) => {
    try {
      if (!user) {
        toast.warning("Please login first");
        navigate("/login");
        return;
      }

      const userId = user._id || user.id;

      const res = await addToCart({
        user: userId,
        product: product._id,
        quantity: 1,
      });

      if (res?.data?.success) {
        toast.success("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  // ================= FILTER =================
  let filteredProducts = products.filter((product) => {
    if (selectedCategory) {
      if (product.category !== selectedCategory) {
        return false;
      }
    }

    return true;
  });

  // ================= SORT =================
  if (sortBy === "low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      <section className="min-h-screen py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 mt-20">

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-center mb-12">
            Shop Products
          </h1>

          {/* Selected Category */}
          {selectedCategory && (
            <div className="text-center mb-8">
              <span className="bg-white shadow px-6 py-3 rounded-full text-blue-600 font-semibold">
                {categories.find(
                  (cat) => cat._id === selectedCategory
                )?.name || "Category"}
              </span>
            </div>
          )}

          {/* Filter */}
          <FilterSort
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Count */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Products</h3>
            <span className="bg-white px-4 py-2 rounded-xl shadow">
              {filteredProducts.length} Items Found
            </span>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() =>
                    handleAddToCart(product)
                  }
                  onWishlist={() =>
                    handleWishlist(product)
                  }
                  isWishlisted={wishlist.some(
                    (item) =>
                      (item.product?._id || item.product) ===
                      product._id
                  )}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-20">
                <h2 className="text-3xl font-bold">
                  No Products Found
                </h2>
                <p className="text-gray-500 mt-3">
                  Try another category or price range
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;