import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleProduct } from "../../service/product";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import { FaBoxOpen, FaTag, FaRupeeSign, FaLayerGroup } from "react-icons/fa";

function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getSingleProduct(id);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <div className="p-6">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 m-30">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader />

        <div className="p-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto">

            {/* Product Image */}
            <div className="flex justify-center mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-72 h-72 object-cover rounded-xl border"
              />
            </div>

            {/* Product Details */}
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {product.name}
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="flex items-center gap-2">
                <FaTag className="text-blue-500" />
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>

              <p className="flex items-center gap-2">
                <FaRupeeSign className="text-green-500" />
                <span className="font-semibold">Price:</span> ₹
                {product.price}
              </p>

              <p className="flex items-center gap-2">
                <FaLayerGroup className="text-purple-500" />
                <span className="font-semibold">Stock:</span>{" "}
                {product.stock}
              </p>

              <p className="flex items-center gap-2">
                <FaBoxOpen className="text-orange-500" />
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button
                onClick={() => window.history.back()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;