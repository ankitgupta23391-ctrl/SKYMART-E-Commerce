import React, { useEffect, useState } from "react";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import { useNavigate } from "react-router";

import {
  allProducts,
  deleteProduct,
} from "../../service/product.js";

import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllProducts() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    const toastId = toast.loading("Loading products...");

    try {
      const res = await allProducts();

      if (res?.status === 200) {
        setProducts(res.data.products);

        toast.update(toastId, {
          render: "Products loaded successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to load products ❌",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Error loading products ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting product...");

    try {
      const res = await deleteProduct(id);

      if (res?.status === 200) {
        setProducts((prev) =>
          prev.filter((item) => item._id !== id)
        );

        toast.update(toastId, {
          render: "Product deleted successfully 🗑️",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to delete product ❌",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Error deleting product ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex bg-slate-100 min-h-screen mt-30 ml-5">
        <AdminSidebar />

        <div className="w-full">
          <AdminHeader />

          <div className="p-6 ml-70">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  All Products
                </h1>

                <p className="text-slate-500">
                  Total Products: {filteredProducts.length}
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/add-product")}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                <FaPlus />
                Add Product
              </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl shadow mb-6">
              <div className="relative">
                <FaSearch className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search Product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border pl-11 pr-4 py-3 rounded-xl outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-left p-4">Price</th>
                    <th className="text-left p-4">Category</th>
                    <th className="text-left p-4">Stock</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />

                          <div>
                            <h3 className="font-semibold">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ID: {product._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-medium">
                        ₹{product.price}
                      </td>

                      <td className="p-4">{product.category}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-4">
                          {/* View */}
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/product/view/${product._id}`
                              )
                            }
                            className="text-green-600 hover:scale-110 transition"
                          >
                            <FaEye size={18} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/edit-product/${product._id}`
                              )
                            }
                            className="text-blue-600 hover:scale-110 transition"
                          >
                            <FaEdit size={18} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:scale-110 transition"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <p className="text-center py-6 text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllProducts;