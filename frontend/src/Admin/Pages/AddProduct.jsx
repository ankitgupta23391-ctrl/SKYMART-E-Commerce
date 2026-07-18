import React, { useState } from "react";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addProduct } from "../../service/product.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const initialState = {
    name: "",
    brand: "",
    price: "",
    discountPrice: "",
    category: "",
    stock: "",
    sku: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState("");

  // Reset Form
  const resetForm = () => {
    setFormData(initialState);
    setImagePreview("");
  };

  // Handle Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreview(imageUrl);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl, // only preview URL save
      }));
    }
  };

  // Handle Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addProduct(formData);

      if (res?.status === 200 || res?.status === 201) {
        toast.success("Product added successfully 🚀");
        resetForm();
      } else {
        toast.error("Failed to add product ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex bg-slate-100 min-h-screen ml-10 mt-5">
        <AdminSidebar />

        <div className="w-full">
          <AdminHeader />

          <div className="p-8 ml-64 mt-20">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-800">
                Add New Product
              </h1>
              <p className="text-gray-500">
                Create a new product for your store
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="Discount Price"
                  className="w-full border p-3 rounded-xl"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Category</option>
                  <option>Electronics</option>
                  <option>Mobiles</option>
                  <option>Laptop</option>
                  <option>Fashion</option>
                  <option>Book</option>
                </select>

                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="w-full border p-3 rounded-xl"
                />

                <input
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="SKU"
                  className="w-full border p-3 rounded-xl"
                />

                {/* Image */}
                <div>
                  <label className="font-medium block mb-2">
                    Product Image
                  </label>

                  <label className="border-2 border-dashed rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 object-cover rounded-xl"
                      />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p className="mt-2 text-gray-500">Upload Image</p>
                      </>
                    )}

                    <input type="file" hidden onChange={handleImage} />
                  </label>
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Description"
                  className="lg:col-span-2 border p-3 rounded-xl"
                />

                <div className="lg:col-span-2 flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                  >
                    Add Product
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="border px-8 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;