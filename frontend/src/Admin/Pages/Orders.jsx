import React, { useEffect, useState } from "react";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaShoppingBag,
} from "react-icons/fa";

import {
  toast,
  ToastContainer
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../service/order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      if (res?.data?.success) {
        setOrders(
          res.data.orders || []
        );
      }
    }
    catch (error) {
      console.log(error);
      toast.error(
        "Failed to fetch orders"
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  // ================= DELETE ORDER =================


  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );
    if (!confirmDelete)
      return;
    try {
      setDeleteLoading(true);
      const res =
        await deleteOrder(id);
      if (res?.data?.success) {
        toast.success(
          "Order deleted successfully"
        );

        // remove without refresh

        setOrders((prev) =>
          prev.filter(
            (order) =>
              order._id !== id
          )
        );
      }
    }
    catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
    finally {
      setDeleteLoading(false);
    }
  };

  // ================= UPDATE STATUS =================

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      const res =
        await updateOrderStatus(
          id,
          {
            status
          }
        );
      if (res?.data?.success) {
        toast.success(
          "Status Updated"
        );
        fetchOrders();
      }
    }
    catch (error) {
      console.log(error);
      toast.error(
        "Status update failed"
      );
    }
  };

  return (

    <div className="flex min-h-screen bg-slate-100 ml-20 mt-25">
      <ToastContainer />
      <AdminSidebar />
      <div className="w-full">
        <AdminHeader />
        <div className="p-6 ml-65">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Orders Management
          </h1>

          <p className="text-gray-500 mb-6">
            Manage all customer orders
          </p>

          {/* SEARCH */}

          <div className="bg-white p-4 rounded-2xl shadow mb-6 flex gap-4">
            <div className="relative flex-1">
              <FaSearch
                className=" absolute left-4 top-4 text-gray-400 " />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Order / Customer"

                className="w-full border py-3 pl-12 rounded-xl"/>
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }

              className="border px-5 rounded-xl">
              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Shipped">
                Shipped
              </option>
              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>

                  <th className="p-4 text-left">
                    Order ID
                  </th>

                  <th className="p-4 text-left">
                    Customer
                  </th>

                  <th className="p-4 text-left">
                    Products
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>
                  <th className="p-4 text-left">
                    Status
                  </th>
                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  orders
                    .filter((order) => {
                      const name =
                        order.user?.name
                          ?.toLowerCase() || "";
                      const id =
                        order._id
                          .toLowerCase();

                      return (
                        name.includes(
                          search.toLowerCase()
                        )
                        ||
                        id.includes(
                          search.toLowerCase()
                        )
                      )
                        &&
                        (
                          statusFilter === ""
                          ||
                          order.orderStatus === statusFilter
                        );
                    })
                    .map((order) => (
                      <tr
                        key={order._id}
                        className="border-t hover:bg-gray-50">
                        <td className="p-4 font-bold">
                          {order._id.slice(-8)}
                        </td>
                        <td className="p-4">
                          <p className="font-semibold">
                            {
                              order.user?.name ||
                              "User"
                            }
                          </p>
                          <p className="text-sm text-gray-500">

                            {
                              order.user?.email
                            }

                          </p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {
                              order.products?.map(
                                (item) => (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-2">
                                    <FaShoppingBag
                                      className="text-gray-400"
                                    />
                                    <span>
                                      {
                                        item.productId?.name ||
                                        "Product"
                                      }
                                    </span>
                                    <span className="text-gray-500">
                                      ×
                                      {
                                        item.quantity
                                      }
                                    </span>
                                  </div>
                                )
                              )
                            }
                          </div>
                        </td>
                        <td className="p-4 font-semibold">
                          ₹
                          {
                            order.totalAmount
                          }
                        </td>

                        <td className="p-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }

                            className="border rounded-lg px-3 py-2">

                            <option>
                              Pending
                            </option>

                            <option>
                              Processing
                            </option>

                            <option>
                              Shipped
                            </option>

                            <option>
                              Delivered
                            </option>

                            <option>
                              Cancelled
                            </option>
                          </select>
                        </td>

                        <td className="p-4">
                          <div className="flex gap-4">

                            <button
                              className="text-green-600">
                              <FaEye />
                            </button>

                            <button
                              className="text-blue-600">
                              <FaEdit />
                            </button>

                            <button
                              disabled={deleteLoading}
                              onClick={() => handleDelete(order._id)}

                              className="text-red-600 hover:scale-110 disabled:opacity-50
">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orders;