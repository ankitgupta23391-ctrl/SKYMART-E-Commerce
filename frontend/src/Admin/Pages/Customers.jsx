import React, { useEffect, useMemo, useState } from "react";

import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";

import {
  FaEye,
  FaSearch,
  FaUser,
  FaShoppingBag,
  FaTrash,
} from "react-icons/fa";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  getAllCustomers,
  updateCustomerStatus,
  deleteCustomer,
} from "../../service/customer";

function Customers() {

  // States

  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  // Fetch Customers

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await getAllCustomers();

      if (res.data.success) {
        setCustomers(res.data.customers || []);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Block / Unblock Customer

  const handleStatusChange = async (
    id,
    isBlocked
  ) => {
    try {
      const res = await updateCustomerStatus(
        id,
        isBlocked
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setCustomers((prev) =>
          prev.map((customer) =>
            customer._id === id
              ? {
                ...customer,
                isBlocked,
                status: isBlocked
                  ? "Inactive"
                  : "Active",
              }
              : customer
          )
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Status update failed"
      );
    }
  };

  // Delete Customer

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteCustomer(id);

      if (res.data.success) {
        toast.success(res.data.message);

        setCustomers((prev) =>
          prev.filter(
            (customer) => customer._id !== id
          )
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  // Search + Filter

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchSearch =
        customer.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All Status"
          ? true
          : customer.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [customers, search, statusFilter]);

  // Dashboard Stats

  const totalCustomers = customers.length;

  const activeUsers = customers.filter(
    (c) => c.status === "Active"
  ).length;

  const newCustomers = customers.filter((c) => {
    const created = new Date(c.createdAt);
    const today = new Date();

    return (
      created.getMonth() === today.getMonth() &&
      created.getFullYear() ===
      today.getFullYear()
    );
  }).length;

  const totalRevenue = customers.reduce(
    (sum, customer) =>
      sum + (customer.spent || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-slate-100 ml-20 mt-25">
      <ToastContainer position="top-right" autoClose={2000} />

      <AdminSidebar />

      <div className="w-full">
        <AdminHeader />

        <div className="p-6 ml-65">

          {/* ================= TITLE ================= */}

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Customers Management
            </h1>

            <p className="text-gray-500">
              Manage your store customers
            </p>
          </div>

          {/* ================= STATS ================= */}

          <div className="grid md:grid-cols-4 gap-5 mb-6">

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Total Customers
              </p>

              <h2 className="text-3xl font-bold">
                {totalCustomers}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Active Users
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {activeUsers}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                New Customers
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                {newCustomers}
              </h2>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-gray-500">
                Revenue
              </p>

              <h2 className="text-3xl font-bold text-purple-600">
                ₹{totalRevenue.toLocaleString()}
              </h2>
            </div>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="bg-white p-4 rounded-2xl shadow mb-6 flex gap-4">

            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Customer..."
                className="w-full border rounded-xl py-3 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border px-5 rounded-xl"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

          </div>

          {/* ================= TABLE ================= */}

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr>

                  <th className="p-4 text-left">
                    Customer
                  </th>

                  <th className="p-4 text-left">
                    Orders
                  </th>

                  <th className="p-4 text-left">
                    Total Spent
                  </th>

                  <th className="p-4 text-left">
                    Last Order
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

                {loading ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading Customers...
                    </td>
                  </tr>

                ) : filteredCustomers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-red-500"
                    >
                      No Customers Found
                    </td>
                  </tr>

                ) : (

                  filteredCustomers.map((customer) => (

                    <tr
                      key={customer._id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">

                            <FaUser />

                          </div>

                          <div>

                            <h3 className="font-semibold">
                              {customer.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {customer.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="p-4">

                        <span className="flex items-center gap-2">

                          <FaShoppingBag className="text-gray-400" />

                          {customer.orders}

                        </span>

                      </td>

                      <td className="p-4 font-semibold">
                        ₹{Number(customer.spent).toLocaleString()}
                      </td>

                      <td className="p-4">

                        {customer.lastOrder
                          ? new Date(
                            customer.lastOrder
                          ).toLocaleDateString("en-IN")
                          : "No Orders"}

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${customer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {customer.status}
                        </span>

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          {/* VIEW */}

                          <button
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                          >
                            <FaEye />
                          </button>

                          {/* BLOCK / UNBLOCK */}

                          <button
                            onClick={() =>
                              handleStatusChange(
                                customer._id,
                                !customer.isBlocked
                              )
                            }
                            className={`px-3 py-2 rounded-lg text-white ${customer.isBlocked
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-yellow-500 hover:bg-yellow-600"
                              }`}
                          >
                            {customer.isBlocked
                              ? "Unblock"
                              : "Block"}
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(customer._id)
                            }
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

            {/* ================= FOOTER ================= */}

            <div className="flex justify-between items-center p-4 border-t">

              <p className="text-gray-500">
                Showing {filteredCustomers.length} Customers
              </p>

              <div className="flex gap-2">

                <button className="border px-4 py-2 rounded-lg">
                  Prev
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  1
                </button>

                <button className="border px-4 py-2 rounded-lg">
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Customers;