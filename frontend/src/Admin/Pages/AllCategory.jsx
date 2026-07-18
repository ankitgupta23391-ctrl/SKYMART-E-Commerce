import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";



import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allCategory, deleteCategory } from "../../service/category";

function AllCategories() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  // Get All Categories
  const fetchCategories = async () => {
    try {
      const response = await allCategory();

      if (response?.data?.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const response = await deleteCategory(id);

      if (response?.data?.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Search Filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-100 ml-10">
      <ToastContainer />

      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-white shadow">
        <AdminSidebar />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64">
        <AdminHeader />

        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                All Categories
              </h1>

              <p className="text-gray-500">
                Total Categories: {categories.length}
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/add-category")}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
            >
              <FaPlus />
              Add Category
            </button>
          </div>

          {/* Search */}
          <div className="bg-white p-4 rounded-2xl shadow mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Category..."
                className="w-full border rounded-xl py-3 pl-12 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left">Category Name</th>
                  <th className="p-4 text-left">Slug</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Category */}
                    <td className="p-4">
                      <div>
                        <h3 className="font-semibold">{cat.name}</h3>
                        <p className="text-sm text-gray-500">
                          ID: {cat._id}
                        </p>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="p-4">{cat.slug}</td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          cat.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {cat.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex gap-4">

                        {/* View */}
                        <button
                          onClick={() =>
                            navigate(`/admin/view-category/${cat._id}`)
                          }
                          className="text-green-600 hover:scale-110 transition"
                        >
                          <FaEye />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-category/${cat._id}`)
                          }
                          className="text-blue-600 hover:scale-110 transition"
                        >
                          <FaEdit />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="text-red-600 hover:scale-110 transition"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AllCategories;