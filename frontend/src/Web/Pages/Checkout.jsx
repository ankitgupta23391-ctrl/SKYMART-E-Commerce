import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgressBar from "./ScrollProgressBar";

import {
  getCart,
  clearCart,
} from "../../service/cart";

import { createOrder } from "../../service/order";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  // Load Checkout
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    loadCheckout();
  }, []);

  // Load Cart
  const loadCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please Login First");
        navigate("/login");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
      }));

      const userId = user._id || user.id;

      const res = await getCart(userId);

      if (res.data.success) {
        setCartItems(res.data.cart.products || []);
      }
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to Load Checkout"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Price Calculation
  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.product.discountPrice > 0
        ? item.product.discountPrice
        : item.product.price;

    return total + price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 99 : 0;

  const total = subtotal + shipping;

  // Loading Screen
  if (loading) {
    return (
      <>
        <ScrollProgressBar />
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-3xl font-bold">
            Loading Checkout...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10 mt-20">

        <h1 className="text-4xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= Left Side ================= */}

          <div className="lg:col-span-2">

            <div className="bg-white shadow-lg rounded-2xl p-8">

              <h2 className="text-2xl font-bold mb-6">
                Shipping Address
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Full Name */}

                <div>
                  <label className="font-semibold block mb-2">
                    Full Name
                  </label>

                  <div className="flex items-center border rounded-lg px-3">
                    <FaUser className="text-gray-500" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      className="w-full p-3 outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}

                <div>
                  <label className="font-semibold block mb-2">
                    Phone Number
                  </label>

                  <div className="flex items-center border rounded-lg px-3">
                    <FaPhoneAlt className="text-gray-500" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full p-3 outline-none"
                    />
                  </div>
                </div>

                {/* Address */}

                <div className="md:col-span-2">
                  <label className="font-semibold block mb-2">
                    Address
                  </label>

                  <div className="flex items-start border rounded-lg px-3">
                    <FaMapMarkerAlt className="text-gray-500 mt-4" />

                    <textarea
                      rows="4"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No, Street, Area..."
                      className="w-full p-3 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* City */}

                <div>
                  <label className="font-semibold block mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lucknow"
                    className="w-full border rounded-lg p-3 outline-none"
                  />
                </div>

                {/* State */}

                <div>
                  <label className="font-semibold block mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Uttar Pradesh"
                    className="w-full border rounded-lg p-3 outline-none"
                  />
                </div>

                {/* Pincode */}

                <div>
                  <label className="font-semibold block mb-2">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="226001"
                    className="w-full border rounded-lg p-3 outline-none"
                  />
                </div>

                {/* Payment Method */}

                <div>
                  <label className="font-semibold block mb-2">
                    Payment Method
                  </label>

                  <div className="flex items-center border rounded-lg px-3">

                    <FaMoneyBillWave className="text-green-600" />

                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="w-full p-3 outline-none bg-white"
                    >
                      <option value="COD">
                        Cash On Delivery
                      </option>

                      <option value="ONLINE">
                        Online Payment
                      </option>
                    </select>

                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-5">
                Order Summary
              </h2>

              {cartItems.map((item) => {
                const price =
                  item.product.discountPrice > 0
                    ? item.product.discountPrice
                    : item.product.price;

                return (
                  <div
                    key={item.product._id}
                    className="flex justify-between mb-3 border-b pb-3"
                  >
                    <div>
                      <h4 className="font-semibold">
                        {item.product.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>
                    </div>

                    <div className="font-bold text-green-600">
                      ₹{(price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                );
              })}

              <div className="flex justify-between mt-4">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span className="text-green-600">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* ================= PLACE ORDER ================= */}

              <button
                onClick={async () => {
                  try {
                    if (
                      !formData.name ||
                      !formData.phone ||
                      !formData.address ||
                      !formData.city ||
                      !formData.state ||
                      !formData.pincode
                    ) {
                      toast.warning("Please fill all fields.");
                      return;
                    }

                    if (formData.phone.length !== 10) {
                      toast.warning("Enter valid phone number.");
                      return;
                    }

                    if (formData.pincode.length !== 6) {
                      toast.warning("Enter valid pincode.");
                      return;
                    }

                    const user = JSON.parse(
                      localStorage.getItem("user")
                    );

                    if (!user) {
                      toast.warning("Please login first.");
                      navigate("/login");
                      return;
                    }

                    const userId = user._id || user.id;

                    const orderData = {
                      user: userId,

                      products: cartItems.map((item) => ({
                        productId: item.product._id,
                        quantity: item.quantity,
                        price:
                          item.product.discountPrice > 0
                            ? item.product.discountPrice
                            : item.product.price,
                      })),

                      totalAmount: total,

                      shippingAddress: {
                        name: formData.name,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        state: formData.state,
                        pincode: formData.pincode,
                      },

                      paymentMethod: formData.paymentMethod,
                    };

                    // ================= COD =================

                    if (formData.paymentMethod === "COD") {
                      const res = await createOrder(orderData);

                      if (res.data.success) {
                        await clearCart(userId);

                        window.dispatchEvent(
                          new Event("cartUpdated")
                        );

                        toast.success("Order Placed Successfully");

                        navigate("/success");   // 👈 Change only this line
                      } else {
                        toast.error(res.data.message);
                      }

                      return;
                    }
                    // ================= ONLINE PAYMENT =================

                    navigate("/payment", {
                      state: {
                        orderData,
                      },
                    });

                  } catch (error) {
                    console.log(error);

                    toast.error(
                      error.response?.data?.message ||
                      "Something went wrong."
                    );
                  }
                }}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-3 rounded-xl shadow-lg transition-all duration-300"
              >
                {formData.paymentMethod === "COD"
                  ? "📦 Place Order"
                  : "💳 Continue to Payment"}
              </button>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;