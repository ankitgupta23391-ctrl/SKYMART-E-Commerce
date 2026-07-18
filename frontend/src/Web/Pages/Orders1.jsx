import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { getUserOrders } from "../../service/order";

function Orders1() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.warning("Please login first");
        setLoading(false);
        return;
      }

      const userId = user._id || user.id;

      const res = await getUserOrders(userId);

      if (res?.data?.success) {
        setOrders(res.data.orders || []);
      } else {
        toast.error("No Orders Found");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Unable to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-3xl font-bold">
            Loading Orders...
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  if (!orders.length) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen flex flex-col justify-center items-center">
          <FaBox
            className="text-gray-400 mb-5"
            size={70}
          />

          <h1 className="text-3xl font-bold">
            No Orders Found
          </h1>

          <p className="text-gray-500 mt-2">
            You have not placed any order yet.
          </p>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-100 py-10 px-5">

        <div className="max-w-4xl mx-auto mt-20">

          <h1 className="text-4xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mb-8">
            Track and manage your orders
          </p>

          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b">

                  <div>
                    <h2 className="font-bold text-lg">
                      Order ID
                    </h2>

                    <p className="text-blue-600 text-sm">
                      {order._id}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
                    {order.orderStatus}
                  </span>
                </div>

                {/* Product Section */}
                <div className="p-5 space-y-6">
                  {order.products?.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-2xl overflow-hidden shadow-sm"
                    >

                      {/* Product Image */}
                      <div className="bg-gray-100 p-5 flex justify-center">
                        <img
                          src={
                            item.productId?.image ||
                            item.productId?.images?.[0] ||
                            "https://via.placeholder.com/400"
                          }
                          alt={item.productId?.name}
                          className="w-full max-h-72 object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="p-5">

                        <h2 className="text-2xl font-bold text-gray-800">
                          {item.productId?.name}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 mt-5">

                          <div className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-gray-500 text-sm">
                              Brand
                            </p>

                            <p className="font-semibold">
                              {item.productId?.brand || "No Brand"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-gray-500 text-sm">
                              Quantity
                            </p>

                            <p className="font-semibold">
                              {item.quantity}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-gray-500 text-sm">
                              Category
                            </p>

                            <p className="font-semibold">
                              {item.productId?.category || "N/A"}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-xl">
                            <p className="text-gray-500 text-sm">
                              Price
                            </p>

                            <p className="font-bold text-green-600">
                              ₹
                              {(
                                item.productId?.discountPrice ||
                                item.productId?.price ||
                                0
                              ).toLocaleString()}
                            </p>
                          </div>

                        </div>

                        <div className="mt-5">
                          <h3 className="font-bold mb-2">
                            Description
                          </h3>

                          <p className="text-gray-600 leading-7">
                            {item.productId?.description ||
                              "No description available"}
                          </p>
                        </div>

                      </div>

                    </div>
                  ))}

                  {/* Order Information */}
                  <div className="grid md:grid-cols-3 gap-5">

                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-bold mb-3">
                        Payment
                      </h3>

                      <p>
                        <span className="font-semibold">
                          Method :
                        </span>{" "}
                        {order.paymentMethod || "COD"}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-bold mb-3">
                        Delivery Address
                      </h3>

                      <p>
                        {order.shippingAddress?.name}
                      </p>

                      <p>
                        {order.shippingAddress?.phone}
                      </p>

                      <p>
                        {order.shippingAddress?.address}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-bold mb-3">
                        Total Amount
                      </h3>

                      <h2 className="text-3xl font-bold text-green-600">
                        ₹
                        {order.totalAmount?.toLocaleString()}
                      </h2>
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-4">

                    <button
                      onClick={() =>
                        navigate(`/track-order/${order._id}`)
                      }
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Track Order
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/order-details/${order._id}`)
                      }
                      className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-semibold transition"
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Orders1;