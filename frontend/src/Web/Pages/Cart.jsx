import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaTrash,
  FaShoppingBag,
} from "react-icons/fa";
import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgressBar from "./ScrollProgressBar";

// Cart Service
import {
  getCart,
  updateCart,
  removeCartItem,
  clearCart,
} from "../../service/cart";

// Order Service
import { createOrder } from "../../service/order";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Cart
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchCart();
  }, []);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setLoading(false);
        toast.warning("Please login first.");
        navigate("/login");
        return;
      }

      const userId = user._id || user.id;

      const res = await getCart(userId);

      if (res.data.success) {
        setCartItems(res.data.cart.products || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.log(error.response?.data || error);

      setCartItems([]);

      toast.error(
        error.response?.data?.message ||
        "Failed to load cart."
      );
    } finally {
      setLoading(false);
    }
  };

  // Increase Quantity
  const increaseQty = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await updateCart({
        user: user._id || user.id,
        product: item.product._id,
        quantity: item.quantity + 1,
      });

      toast.success("Quantity updated");

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update quantity."
      );
    }
  };

  // Decrease Quantity
  const decreaseQty = async (item) => {
    try {
      if (item.quantity <= 1) return;

      const user = JSON.parse(localStorage.getItem("user"));

      await updateCart({
        user: user._id || user.id,
        product: item.product._id,
        quantity: item.quantity - 1,
      });

      toast.success("Quantity updated");

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update quantity."
      );
    }
  };

  // Remove Product
  const removeItem = async (item) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await removeCartItem({
        user: user._id || user.id,
        product: item.product._id,
      });

      toast.success("Product removed from cart");

      fetchCart();

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(
        error.response?.data?.message ||
        "Failed to remove product."
      );
    }
  };

  // Checkout
  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.warning("Please login first.");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }

    // Sirf Checkout page open karo
    navigate("/checkout");
  };
  // Price Calculations
  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.product.discountPrice > 0
        ? item.product.discountPrice
        : item.product.price;

    return total + price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + shipping;

  // Loading
  if (loading) {
    return (
      <>
        <ScrollProgressBar />
        <Navbar />

        <div className="min-h-screen flex items-center justify-center">
          <h2 className="text-3xl font-bold">
            Loading Cart...
          </h2>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mt-20 mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= CART ITEMS ================= */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.length === 0 ? (

              <div className="bg-white shadow rounded-xl p-10 text-center">

                <FaShoppingBag
                  size={60}
                  className="mx-auto text-gray-400 mb-4"
                />

                <h2 className="text-3xl font-bold">
                  Your Cart is Empty
                </h2>

                <p className="text-gray-500 mt-3">
                  Add some products to continue shopping.
                </p>


              </div>

            ) : (

              cartItems.map((item) => {

                const product = item.product;

                const price =
                  product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;

                return (

                  <div
                    key={product._id}
                    className="
                      bg-white
                      rounded-2xl
                      shadow-lg
                      p-5
                      flex
                      flex-col
                      md:flex-row
                      gap-5
                      items-center
                    "
                  >

                    {/* Product Image */}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-32
                        h-32
                        rounded-xl
                        object-cover
                        border
                      "
                    />

                    {/* Product Info */}

                    <div className="flex-1">

                      <h2 className="text-2xl font-bold">
                        {product.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Brand :
                        <span className="ml-2">
                          {product.brand}
                        </span>
                      </p>

                      <p className="text-gray-500 mt-2">
                        Price :
                        <span className="ml-2 font-semibold text-green-600">
                          ₹{price.toLocaleString()}
                        </span>
                      </p>

                      <div className="flex items-center gap-3 mt-5">

                        <button
                          onClick={() => decreaseQty(item)}
                          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                          -
                        </button>

                        <span className="text-xl font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item)}
                          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300"
                        >
                          +
                        </button>

                      </div>

                      <p className="text-xl text-green-600 font-bold mt-5">
                        Total : ₹
                        {(price * item.quantity).toLocaleString()}
                      </p>

                    </div>

                    <button
                      onClick={() => removeItem(item)}
                      className="bg-red-100 text-red-600 p-4 rounded-xl hover:bg-red-600 hover:text-white transition"
                    >
                      <FaTrash size={20} />
                    </button>

                  </div>

                );

              })

            )}

          </div>

          {/* ================= ORDER SUMMARY ================= */}

          <div className="bg-white shadow rounded-2xl p-6 h-fit sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString()}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>

              <span className="text-green-600">
                ₹{total.toLocaleString()}
              </span>
            </div>

            {/* Checkout */}

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="
    w-full
    mt-6
    bg-blue-600
    hover:bg-blue-700
    disabled:bg-gray-400
    text-white
    py-3
    rounded-xl
    font-semibold
    transition
  "
            >
              Checkout
            </button>

            {/* Clear Cart */}

            <button
              onClick={async () => {
                try {
                  const user = JSON.parse(
                    localStorage.getItem("user")
                  );

                  await clearCart(user._id || user.id);

                  toast.success("Cart cleared successfully.");

                  setCartItems([]);

                  window.dispatchEvent(
                    new Event("cartUpdated")
                  );

                } catch (error) {
                  console.log(error.response?.data || error);

                  toast.error(
                    error.response?.data?.message ||
                    "Failed to clear cart."
                  );
                }
              }}
              disabled={cartItems.length === 0}
              className="
                w-full
                mt-3
                border
                border-red-500
                text-red-600
                hover:bg-red-500
                hover:text-white
                disabled:border-gray-300
                disabled:text-gray-400
                py-3
                rounded-xl
                transition
              "
            >
              Clear Cart
            </button>


          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Cart;