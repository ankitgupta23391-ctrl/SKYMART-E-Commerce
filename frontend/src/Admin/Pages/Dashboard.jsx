import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaRupeeSign,
  FaArrowUp,
} from "react-icons/fa";

import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import SalesChart from "./SalesChart";

import { getDashboardStats } from "../../service/dashboard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentOrders: [],
    monthlySales: [],
  });

  const fetchDashboard = async () => {
    const toastId = toast.loading("Loading dashboard...");

    try {
      const res = await getDashboardStats();

      if (res.data.success) {
        setStats(res.data.dashboard);

        toast.update(toastId, {
          render: "Dashboard Loaded Successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to Load Dashboard ❌",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Something went wrong ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const dashboardStats = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-blue-500 to-blue-700",
      growth: "+12%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "from-green-500 to-green-700",
      growth: "+8%",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: <FaUsers />,
      color: "from-purple-500 to-purple-700",
      growth: "+15%",
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <FaRupeeSign />,
      color: "from-red-500 to-pink-600",
      growth: "+20%",
    },
  ];

  return (
    <>
      <ToastContainer />

      <div className="bg-slate-100 min-h-screen">
        <AdminSidebar />

        <div className="ml-72">
          <AdminHeader />

          <div className="pt-36 px-8 pb-10">

            {/* Heading */}

            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800">
                Dashboard Overview
              </h1>

              <p className="text-slate-500 mt-2">
                Monitor your store performance and analytics.
              </p>
            </div>

            {/* Stats Cards */}

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {dashboardStats.map((item, index) => (
                <div
                  key={index}
                  className={`
                    bg-gradient-to-r
                    ${item.color}
                    text-white
                    rounded-3xl
                    p-6
                    shadow-xl
                    hover:scale-105
                    transition
                    duration-300
                  `}
                >
                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-white/80">
                        {item.title}
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        {item.value}
                      </h2>

                    </div>

                    <div className="text-4xl opacity-80">
                      {item.icon}
                    </div>

                  </div>

                  <div className="flex items-center gap-2 mt-5">

                    <FaArrowUp />

                    <span>
                      {item.growth} this month
                    </span>

                  </div>

                </div>
              ))}

            </div>

            {/* Analytics Section */}

            <div className="grid lg:grid-cols-3 gap-6 mt-8">

              {/* Sales Analytics */}

              <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-2xl font-bold">
                    Sales Analytics
                  </h2>

                  <select className="border rounded-xl px-4 py-2">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last Year</option>
                  </select>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                  <div className="flex items-center justify-between mb-5">

                    <h2 className="text-xl font-bold text-slate-800">
                      Sales Overview
                    </h2>

                    <select className="border rounded-lg px-3 py-2">
                      <option>2026</option>
                      <option>2025</option>
                    </select>

                  </div>

                  <SalesChart />

                </div>

              </div>

              {/* Quick Actions */}

              <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-5">
                  Quick Actions
                </h2>

                <div className="space-y-4">

                  <button
                    onClick={() => navigate("/admin/add-product")}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                  >
                    Add Product
                  </button>

                  <button
                    onClick={() => navigate("/admin/add-category")}
                    className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
                  >
                    Add Category
                  </button>

                  <button
                    onClick={() => navigate("/admin/orders")}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
                  >
                    View Orders
                  </button>

                  <button
                    onClick={() => navigate("/admin/customers")}
                    className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    Manage Users
                  </button>

                </div>

              </div>

            </div>


            {/* Recent Orders */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Recent Orders
                </h2>

                <button
                  onClick={() => navigate("/admin/orders")}
                  className="text-blue-600 font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4">Order ID</th>
                      <th className="text-left py-4">Customer</th>
                      <th className="text-left py-4">Amount</th>
                      <th className="text-left py-4">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats.recentOrders?.length > 0 ? (
                      stats.recentOrders.map((order) => (
                        <tr
                          key={order._id}
                          className="border-b hover:bg-slate-50"
                        >
                          <td className="py-4">
                            #{order._id.slice(-6)}
                          </td>

                          <td>
                            {order.user?.name || "Unknown User"}
                          </td>

                          <td>
                            ₹{order.totalAmount}
                          </td>

                          <td>
                            <span
                              className={`px-3 py-1 rounded-full text-sm
                  ${order.orderStatus === "Delivered"
                                  ? "bg-green-100 text-green-700"
                                  : order.orderStatus === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order.orderStatus === "Cancelled"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-8 text-gray-500"
                        >
                          No Recent Orders Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          <ToastContainer position="top-right" autoClose={2000} />

        </div>

      </div>

    </>

  );

}

export default Dashboard;