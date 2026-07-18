import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AdminSidebar from "../componets/AdminSidebar";
import AdminHeader from "../componets/AdminHeader";
import { viewCategory } from "../../service/category";

function ViewCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await viewCategory(id);

      if (response?.data?.success) {
        setCategory(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 ml-10 mt-30">
      <AdminSidebar />

      <div className="w-full ml-64">
        <AdminHeader />

        <div className="p-6">
          <div className="bg-white rounded-2xl shadow p-6">

            <h1 className="text-3xl font-bold mb-6">
              View Category
            </h1>

            <div className="space-y-4">
              <div>
                <strong>ID:</strong> {category._id}
              </div>

              <div>
                <strong>Name:</strong> {category.name}
              </div>

              <div>
                <strong>Slug:</strong> {category.slug}
              </div>

              <div>
                <strong>Status:</strong> {category.status}
              </div>

              <div>
                <strong>Created At:</strong>{" "}
                {new Date(category.createdAt).toLocaleString()}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;