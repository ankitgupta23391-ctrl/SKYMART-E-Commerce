import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaCalendarAlt,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  adminProfile,
  updateAdminProfile,
} from "../../service/admin";
import AdminHeader from "../componets/AdminHeader";
import AdminSidebar from "../componets/AdminSidebar";

function Profile() {
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    createdAt: "",
  });

  // GET ADMIN PROFILE

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await adminProfile();

      if (res.data.success) {
        const user = res.data.user;

        setFormData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "",
          createdAt: user.createdAt || "",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // HANDLE CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE PROFILE

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);

      const res = await updateAdminProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.user)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="ml-72 mt-28 flex justify-center">
        <h2 className="text-xl font-semibold">
          Loading Profile...
        </h2>
      </div>
    );
  }

  return (
    <div className="ml-72 mt-28 p-8 bg-slate-100 min-h-screen">

      {/* Heading */}
      <AdminHeader/>
      <AdminSidebar/>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account information
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">


              {/* LEFT PROFILE CARD */}


        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="flex flex-col items-center">

            <FaUserCircle
              size={120}
              className="text-blue-600"
            />

            <h2 className="text-2xl font-bold mt-5">
              {formData.name}
            </h2>

            <span className="mt-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
              {formData.role}
            </span>

          </div>

          <div className="mt-8 space-y-5">

            <div className="flex items-center gap-3">

              <FaEnvelope className="text-blue-600" />

              <span>{formData.email}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaPhone className="text-green-600" />

              <span>
                {formData.phone || "Not Available"}
              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaUserShield className="text-purple-600" />

              <span>{formData.role}</span>

            </div>

            <div className="flex items-center gap-3">

              <FaCalendarAlt className="text-orange-600" />

              <span>
                {formData.createdAt
                  ? new Date(
                    formData.createdAt
                  ).toLocaleDateString("en-IN")
                  : "--"}
              </span>

            </div>

          </div>

        </div>


              {/* EDIT PROFILE FORM */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Edit Profile
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Role
              </label>

              <input
                type="text"
                value={formData.role}
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Created At */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Account Created
              </label>

              <input
                type="text"
                value={
                  formData.createdAt
                    ? new Date(formData.createdAt).toLocaleString("en-IN")
                    : "--"
                }
                disabled
                className="w-full border rounded-xl px-4 py-3 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Update Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={btnLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-3 transition"
              >
                <FaSave />

                {btnLoading
                  ? "Updating..."
                  : "Update Profile"}
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;