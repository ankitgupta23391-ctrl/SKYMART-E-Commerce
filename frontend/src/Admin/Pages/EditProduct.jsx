import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";

import {
  getSingleProduct,
  updateProduct,
} from "../../service/product.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: "",
    sku: "",
    description: "",
    image: "",
  });

  // Fetch Single Product
  const fetchProduct = async () => {
    const toastId = toast.loading("Loading product...");

    try {
      const res = await getSingleProduct(id);

      if (res?.status === 200) {
        setFormData(res.data.product);

        toast.update(toastId, {
          render: "Product loaded successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to load product ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating product...");

    try {
      const res = await updateProduct(id, formData);

      if (res?.status === 200) {
        toast.update(toastId, {
          render: "Product updated successfully 🚀",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/admin/products");
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to update product ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex bg-slate-100 min-h-screen m-10">
        <AdminSidebar />

        <div className="w-full">
          <AdminHeader />

          <div className="p-8 ml-64 mt-20">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">
              Edit Product
            </h1>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 bg-white p-6 rounded-xl shadow"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                placeholder="Discount Price"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="SKU"
                className="border p-3 rounded-lg"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Description"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="border p-3 rounded-lg"
              />

              <button className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;