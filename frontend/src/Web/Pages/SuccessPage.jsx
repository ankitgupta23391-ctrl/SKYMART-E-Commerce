import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  FaCheckCircle,
  FaShoppingBag,
  FaBoxOpen,
  FaHome,
} from "react-icons/fa";

function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Auto Redirect after 10 sec
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-center px-4 py-10">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-10 text-center">

        {/* Success Icon */}
        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-8xl animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-green-600 mt-6">
          🎉 Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mt-4">
          Thank you for shopping with us.
        </p>

        <p className="text-gray-500 mt-2 leading-7">
          Your order has been placed successfully and is being processed.
          You can track your order anytime from the <b>My Orders</b> page.
        </p>

        {/* Status Card */}
        <div className="mt-8 bg-green-100 border border-green-300 rounded-2xl p-5">

          <h2 className="text-xl font-bold text-green-700">
            Order Status
          </h2>

          <p className="mt-3 text-green-600 text-lg font-semibold">
            ✅ Confirmed
          </p>

          <p className="text-gray-600 mt-2">
            Your order has been received successfully.
          </p>

        </div>

        {/* Auto Redirect */}
        <p className="text-gray-500 mt-6 text-sm">
          You will be redirected to <b>My Orders</b> in 10 seconds...
        </p>

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mt-8">

          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaBoxOpen />
            My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition duration-300"
          >
            <FaShoppingBag />
            Continue Shopping
          </button>

        </div>

        {/* Home Link */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 text-blue-600 hover:text-blue-800 flex items-center justify-center gap-2 mx-auto font-medium"
        >
          <FaHome />
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default SuccessPage;