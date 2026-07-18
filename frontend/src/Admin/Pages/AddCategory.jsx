import React, { useState } from "react";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addCatogry } from "../../service/category";

function AddCategory() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-"),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      toast.error("Name and Slug are required");
      return;
    }

    try {
      setLoading(true);

      const response = await addCatogry(formData);

      if (response?.data?.success) {
        toast.success("Category Added Successfully");

        setFormData({
          name: "",
          slug: "",
          status: "Active",
        });
      } else {
        toast.error(response?.data?.message || "Failed to add category");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      name: "",
      slug: "",
      status: "Active",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100 ml-15">
      <ToastContainer position="top-right" autoClose={2000} />

      <AdminSidebar />

      <div className="w-full">
        <AdminHeader />

        <div className="p-6 ml-65">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Add New Category
            </h1>
            <p className="text-gray-500">
              Create category with name, slug and status
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <form onSubmit={handleSubmit} className="grid gap-6">

              {/* Category Name */}
              <div>
                <label className="font-medium">Category Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Electronics"
                  className="
                    w-full mt-2 border p-3 rounded-xl
                    outline-none focus:ring-2 focus:ring-green-500
                  "
                />
              </div>

              {/* Category Slug */}
              <div>
                <label className="font-medium">Category Slug</label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="electronics"
                  className="
                    w-full mt-2 border p-3 rounded-xl
                    outline-none focus:ring-2 focus:ring-green-500
                  "
                />
              </div>

              {/* Status */}
              <div>
                <label className="font-medium">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    w-full mt-2 border p-3 rounded-xl
                    outline-none focus:ring-2 focus:ring-green-500
                  "
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    bg-green-600 text-white px-8 py-3 rounded-xl
                    hover:bg-green-700 disabled:opacity-50
                  "
                >
                  {loading ? "Adding..." : "Add Category"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="
                    border px-8 py-3 rounded-xl
                    hover:bg-gray-100
                  "
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddCategory;