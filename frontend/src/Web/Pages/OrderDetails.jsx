import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import { getSingleOrder } from "../../service/order";

function OrderDetails() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (id) {
      fetchOrder();
    }

  }, [id]);

  const fetchOrder = async () => {

    try {

      const res = await getSingleOrder(id);

      if (res?.data?.success) {

        setOrder(res.data.order);

      } else {

        toast.error("Order not found");

      }

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load order"
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
            Loading Order...
          </h1>

        </div>

        <Footer />
      </>
    );

  }

  if (!order) {

    return (
      <>
        <Navbar />

        <div className="min-h-screen flex justify-center items-center">

          <h1 className="text-3xl font-bold">
            Order Not Found
          </h1>

        </div>

        <Footer />
      </>
    );

  }

  return (

    <>

      <Navbar />

      <section className="min-h-screen bg-slate-100 py-12 px-6">

        <div className="max-w-7xl mx-auto mt-20">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h1 className="text-4xl font-bold">
              Order Details
            </h1>

            <p className="text-gray-500 mt-3">

              Order ID :

              <span className="ml-2 text-blue-600 font-semibold">

                {order._id}

              </span>

            </p>

            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-6">

                Ordered Products

              </h2>

              <div className="space-y-6">

                {

                  order.products?.map((item) => (

                    <div
                      key={item._id}
                      className="
                      flex
                      flex-col
                      md:flex-row
                      gap-6
                      border
                      rounded-2xl
                      p-5
                      "
                    >

                      <img
                        src={
                          item.productId?.image ||
                          item.productId?.images?.[0]
                        }
                        alt={item.productId?.name}
                        className="
                        w-full
                        md:w-56
                        h-56
                        object-cover
                        rounded-2xl
                        "
                      />

                      <div className="flex-1">

                        <h2 className="text-3xl font-bold">

                          {item.productId?.name}

                        </h2>

                        <p className="text-gray-500 mt-4">

                          Brand :

                          <span className="font-semibold ml-2">

                            {item.productId?.brand}

                          </span>

                        </p>

                        <p className="text-gray-500 mt-2">

                          Quantity :

                          <span className="font-semibold ml-2">

                            {item.quantity}

                          </span>

                        </p>

                        <p className="text-green-600 text-3xl font-bold mt-5">

                          ₹{

                            (
                              (
                                item.productId?.discountPrice ||
                                item.productId?.price ||
                                0
                              ) *
                              item.quantity
                            ).toLocaleString()

                          }

                        </p>

                      </div>

                    </div>

                  ))

                }

              </div>

              {/* CUSTOMER + ADDRESS + PAYMENT */}

              <div className="grid md:grid-cols-3 gap-6 mt-10">

                {/* CUSTOMER */}

                <div className="bg-slate-50 rounded-2xl p-6">

                  <div className="flex items-center gap-2 mb-4">

                    <FaUser className="text-blue-600 text-xl" />

                    <h2 className="text-xl font-bold">
                      Customer
                    </h2>

                  </div>

                  <p className="text-gray-600">

                    <span className="font-semibold">
                      Name :
                    </span>

                    {" "}

                    {order.user?.name}

                  </p>

                  <p className="text-gray-600 mt-2">

                    <span className="font-semibold">
                      Email :
                    </span>

                    {" "}

                    {order.user?.email}

                  </p>

                </div>

                {/* ADDRESS */}

                <div className="bg-slate-50 rounded-2xl p-6">

                  <div className="flex items-center gap-2 mb-4">

                    <FaMapMarkerAlt className="text-red-500 text-xl" />

                    <h2 className="text-xl font-bold">
                      Shipping Address
                    </h2>

                  </div>

                  <p>{order.shippingAddress?.name}</p>

                  <p className="mt-2">
                    {order.shippingAddress?.phone}
                  </p>

                  <p className="mt-2">
                    {order.shippingAddress?.address}
                  </p>

                  <p className="mt-2">

                    {order.shippingAddress?.city}

                    {" - "}

                    {order.shippingAddress?.pincode}

                  </p>

                </div>

                {/* PAYMENT */}

                <div className="bg-slate-50 rounded-2xl p-6">

                  <div className="flex items-center gap-2 mb-4">

                    <FaCreditCard className="text-green-600 text-xl" />

                    <h2 className="text-xl font-bold">
                      Payment
                    </h2>

                  </div>

                  <p>

                    <span className="font-semibold">
                      Method :
                    </span>

                    {" "}

                    {order.paymentMethod}

                  </p>

                  <p className="mt-3">

                    <span className="font-semibold">
                      Payment Status :
                    </span>

                    {" "}

                    <span
                      className={`font-bold ${order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-orange-500"
                        }`}
                    >

                      {order.orderStatus === "Delivered"
                        ? "Paid"
                        : order.paymentStatus}

                    </span>

                  </p>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mt-10 bg-green-50 rounded-2xl p-6 flex justify-between items-center">

                <div>

                  <h2 className="text-xl font-bold">
                    Total Amount
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Including all taxes
                  </p>

                </div>

                <h1 className="text-4xl font-bold text-green-600">

                  ₹{order.totalAmount?.toLocaleString()}

                </h1>

              </div>

              {/* ORDER STATUS */}

              <div className="mt-8 bg-blue-50 rounded-2xl p-6">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-blue-600 text-2xl" />

                  <div>

                    <h2 className="text-xl font-bold">

                      Order Status

                    </h2>

                    <p className="text-blue-600 font-semibold mt-1">

                      {order.orderStatus}

                    </p>

                  </div>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 mt-10">

                <button

                  onClick={() =>
                    navigate(`/track-order/${order._id}`)
                  }

                  className="
                flex-1
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
                "
                >
                  Track Order

                </button>

                <button

                  onClick={() => navigate("/orders")}

                  className="
                flex-1
                border
                border-gray-300
                hover:bg-gray-100
                py-3
                rounded-xl
                font-semibold
                transition
                "
                >
                  Back To Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>

  );

}

export default OrderDetails;