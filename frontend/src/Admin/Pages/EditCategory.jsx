import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";

import {
  getSingleCategory,
  updateCategory,
} from "../../service/category";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "Active",
    image: "",
  });

  // Fetch Category
  const fetchCategory = async () => {
    try {
      const response = await getSingleCategory(id);

      if (response?.data?.success) {
        const category = response.data.category;

        setFormData({
          name: category.name || "",
          slug: category.slug || "",
          status: category.status || "Active",
          image: category.image || "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load category");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle Input
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

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateCategory(id, formData);

      if (response?.data?.success) {
        toast.success("Category Updated Successfully");

        setTimeout(() => {
          navigate("/admin/categories");
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Update Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 ml-10 mt-30">
      <ToastContainer />

      <AdminSidebar />

      <div className="w-full ml-64">
        <AdminHeader />

        <div className="p-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h1 className="text-3xl font-bold mb-6">
              Edit Category
            </h1>

            <form
              onSubmit={handleUpdate}
              className="grid gap-6"
            >
              {/* Category Name */}
              <div>
                <label className="font-medium">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                  placeholder="Category Name"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="font-medium">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                  placeholder="Slug"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="font-medium">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                  placeholder="https://example.com/image.jpg"
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl mt-4 border"
                  />
                )}
              </div>

              {/* Status */}
              <div>
                <label className="font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
              >
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCategory;