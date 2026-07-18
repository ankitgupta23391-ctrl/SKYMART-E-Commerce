import React from "react";
import { useNavigate, useLocation } from "react-router";
import { createOrder } from "../../service/order";
import { clearCart } from "../../service/cart";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../service/payment";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold text-red-500">
          No Order Data Found
        </h2>
      </div>
    );
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      // Create Razorpay Order
      const data = await createPaymentOrder(orderData.totalAmount);

      console.log("Order Response:", data);

      const options = {
        key: "rzp_test_TAfMp8VXbW2KXa",

        amount: data.amount,
        currency: data.currency,
        order_id: data.id,

        name: "My Ecommerce",
        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              await createOrder(orderData);

              await clearCart(orderData.user);

              alert("Payment Successful");

              navigate("/success");
            } else {
              alert("Payment Verification Failed");

              navigate("/failed");
            }
          } catch (err) {
            console.log(err);

            alert(
              err.response?.data?.message ||
                err.message ||
                "Verification Failed"
            );
          }
        },

        prefill: {
          name: orderData.shippingAddress.name,
          contact: orderData.shippingAddress.phone,
        },

        notes: {
          address: orderData.shippingAddress.address,
        },

        theme: {
          color: "#2563EB",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log(response.error);

        alert(response.error.description);
      });

      razorpay.open();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Payment Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Payment
        </h1>

        <h2 className="text-xl text-center mb-6 text-green-600">
          ₹{orderData.totalAmount}
        </h2>

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Pay ₹{orderData.totalAmount}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;